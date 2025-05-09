import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const yourReceivingEmail = process.env.RECEIVING_EMAIL;

if (!yourReceivingEmail) {
  // This error will be on the server side, consider logging or a more graceful startup check
  console.error('CRITICAL: RECEIVING_EMAIL environment variable is not set.');
  // Optionally, you could prevent the app from starting or return an error for all requests
}

export async function POST(req: NextRequest) {
  if (!yourReceivingEmail) {
    // Handle case where env var might not be set during runtime if not caught at startup
    console.error('RECEIVING_EMAIL not configured for POST request.');
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    // The reCAPTCHA verification is now assumed to have been done
    // by the client calling the /api/googsrecaptcha endpoint before this one.
    // We directly process the form data.

    const body = await req.json();
    const { firstName, lastName, industry, email, message, middleName } = body;

    // Honeypot check
    if (middleName) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Honeypot triggered. Potential spam detected.');
      }
      // Return a generic success-like message to not reveal honeypot
      return NextResponse.json({ message: 'Form submitted successfully.' }, { status: 200 });
    }

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Replace Acme with your app name, ensure domain is verified with Resend
      to: [yourReceivingEmail],
      subject: `New Form Submission from ${firstName} ${lastName}`,
      html: `
        <h1>New Form Submission</h1>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Industry:</strong> ${industry || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error:', error.message);
      }
      return NextResponse.json({ message: 'Error sending email.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Server error:', error.message);
    }
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
        return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}