import { NextRequest, NextResponse } from 'next/server';
import { ResendEmailService } from '@/infrastructure/email/ResendEmailService';
import { GoogleRecaptchaService } from '@/infrastructure/recaptcha/GoogleRecaptchaService';
import { SendContactMessageUseCase } from '@/core/use-cases/SendContactMessage';

const emailService = new ResendEmailService(process.env.RESEND_API_KEY!);
const recaptchaService = new GoogleRecaptchaService(process.env.GOOGLE_RECAPTCHA_SECRET_KEY!);
const sendContactMessageUseCase = new SendContactMessageUseCase(
  emailService,
  recaptchaService,
  process.env.RECEIVING_EMAIL!
);

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 8 * 60 * 60 * 1000; // 8 hours
const MAX_REQUESTS = 2;

// Allowed origins for form submissions
const ALLOWED_ORIGINS = [
  'https://gtechnology.ca',
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : null
].filter(Boolean) as string[];

// Helper function to add CORS headers
function addCorsHeaders(response: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Max-Age', '86400');
}

export async function POST(req: NextRequest) {
  try {
    // Origin validation - block requests from unauthorized domains
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');
    
    // Check if request has valid origin
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Blocked request from unauthorized origin: ${origin}`);
      }
      return NextResponse.json({ message: 'Unauthorized origin' }, { status: 403 });
    }
    
    // Additional referer check for extra security
    if (referer && !ALLOWED_ORIGINS.some(allowedOrigin => referer.startsWith(allowedOrigin))) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Blocked request with invalid referer: ${referer}`);
      }
      return NextResponse.json({ message: 'Invalid referer' }, { status: 403 });
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // Rate limiting check
    const rateLimitData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };
    if (now - rateLimitData.lastRequest > RATE_LIMIT_WINDOW) {
      rateLimitData.count = 0;
    }

    if (rateLimitData.count >= MAX_REQUESTS) {
      const response = NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429 });
      addCorsHeaders(response, origin);
      return response;
    }

    const body = await req.json();
    const { firstName, lastName, industry, email, message, middleName, recaptchaToken } = body;

    // Honeypot check
    if (middleName) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Honeypot triggered. Potential spam detected.');
      }
      const response = NextResponse.json({ message: 'Form submitted successfully.' }, { status: 200 });
      addCorsHeaders(response, origin);
      return response;
    }

    // Transform to clean architecture format
    const contactData = {
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      email: email || '',
      message: `Industry: ${industry || 'Not provided'}\n\n${message || ''}`,
      recaptchaToken: recaptchaToken
    };

    // Use clean architecture use case
    const result = await sendContactMessageUseCase.execute(contactData);

    if (result.success) {
      // Only count successful submissions towards rate limit
      rateLimitData.count++;
      rateLimitData.lastRequest = now;
      rateLimitMap.set(ip, rateLimitData);
      
      const response = NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
      addCorsHeaders(response, origin);
      return response;
    } else {
      const response = NextResponse.json({ message: result.error || 'Error sending email.' }, { status: 400 });
      addCorsHeaders(response, origin);
      return response;
    }
  } catch (error: unknown) {
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof Error) {
        console.error('Server error:', error.message);
      } else {
        console.error('Unknown server error:', error);
      }
    }

    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      const response = NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
      addCorsHeaders(response, req.headers.get('origin'));
      return response;
    }

    const response = NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
    addCorsHeaders(response, req.headers.get('origin'));
    return response;
  }
}