import { NextRequest, NextResponse } from 'next/server';
import { GoogleRecaptchaService } from '@/infrastructure/recaptcha/GoogleRecaptchaService';

const recaptchaService = new GoogleRecaptchaService(process.env.GOOGLE_RECAPTCHA_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: 'Missing reCAPTCHA token.' }, { status: 400 });
    }

    const result = await recaptchaService.verifyToken(token);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'reCAPTCHA verified successfully.',
        score: result.score 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: result.error || 'reCAPTCHA verification failed.' 
      }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('Error verifying reCAPTCHA:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}