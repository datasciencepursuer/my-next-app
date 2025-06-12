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

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // Rate limiting
    const rateLimitData = rateLimitMap.get(ip) || { count: 0, lastRequest: now };
    if (now - rateLimitData.lastRequest > RATE_LIMIT_WINDOW) {
      rateLimitData.count = 0;
    }

    rateLimitData.count++;
    rateLimitData.lastRequest = now;

    if (rateLimitData.count > MAX_REQUESTS) {
      return NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429 });
    }

    rateLimitMap.set(ip, rateLimitData);

    const body = await req.json();
    const { firstName, lastName, industry, email, message, middleName, recaptchaToken } = body;

    // Honeypot check
    if (middleName) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Honeypot triggered. Potential spam detected.');
      }
      return NextResponse.json({ message: 'Form submitted successfully.' }, { status: 200 });
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
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: result.error || 'Error sending email.' }, { status: 400 });
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
      return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}