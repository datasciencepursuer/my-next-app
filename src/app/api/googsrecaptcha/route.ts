import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json(); // Extract the reCAPTCHA token from the request body

    if (!token) {
      return NextResponse.json({ success: false, message: 'Missing reCAPTCHA token.' }, { status: 400 });
    }

    const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY; // Your secret key from .env.local

    if (!secretKey) {
      return NextResponse.json({ success: false, message: 'Server misconfiguration: Missing secret key.' }, { status: 500 });
    }

    // Verify the token with Google's reCAPTCHA API
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const verificationResult = await response.json();

    if (!verificationResult.success) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA verification failed.', details: verificationResult }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'reCAPTCHA verified successfully.', details: verificationResult });
  } catch (error: any) {
    console.error('Error verifying reCAPTCHA:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}