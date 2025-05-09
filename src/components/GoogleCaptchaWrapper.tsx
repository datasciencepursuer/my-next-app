'use client'; // Recommended for providers that might manage context or use hooks internally,
// though GoogleReCaptchaProvider itself handles its logic.
// Using 'use client' ensures it behaves consistently if you add more client-side logic here later.

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface GoogleCaptchaWrapperProps {
  children: React.ReactNode;
}

const GoogleCaptchaWrapper: React.FC<GoogleCaptchaWrapperProps> = ({ children }) => {
  // It's best practice to load the site key from environment variables.
  // Ensure NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set in your .env.local file.
  const recaptchaV3SiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaV3SiteKey) {
    console.error(
      "reCAPTCHA V3 site key is not defined. " +
      "Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables. " +
      "reCAPTCHA will not be available."
    );
    // Fallback: Render children without the provider.
    // Components relying on reCAPTCHA will not function correctly.
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaV3SiteKey}
      // You can add other provider options here if needed, for example:
      // language="en"
      // scriptProps={{
      //   async: false, // Default: false
      //   defer: false, // Default: false
      //   appendTo: 'head', // Default: 'head'
      //   nonce: undefined // Optional: CSP nonce
      // }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default GoogleCaptchaWrapper;