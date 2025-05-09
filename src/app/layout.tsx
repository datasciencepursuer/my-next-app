import type { Metadata } from "next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleCaptchaWrapper from '@/components/GoogleCaptchaWrapper'; // Adjust path if necessary
import "./globals.css";

export const metadata: Metadata = {
  title: "GTC | Technology Consulting",
  description: "Discover innovative solutions and creative experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col max-w-[100vw] sm:max-w-none overflow-x-hidden sm:overflow-x-visible`}
        style={{ fontFamily: 'Calibri, sans-serif' }}
      >
        <Header />
        <main className="pt-16 flex-grow">
          <GoogleCaptchaWrapper>
            {children}
          </GoogleCaptchaWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
