import type { Metadata } from "next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleCaptchaWrapper from '@/components/GoogleCaptchaWrapper'; // Adjust path if necessary
import StructuredData from '@/components/StructuredData';
import "./globals.css";

export const metadata: Metadata = {
  title: "GTC | Technology Consulting",
  description: "Discover innovative solutions and creative experiences with GTC Technology Consulting. We provide cloud solutions, custom software development, cybersecurity services, and data analytics.",
  keywords: "technology consulting, cloud solutions, custom software development, cybersecurity, data analytics, digital transformation, IT consulting",
  authors: [{ name: "GTC Technology Consulting" }],
  openGraph: {
    title: "GTC | Technology Consulting",
    description: "Discover innovative solutions and creative experiences with GTC Technology Consulting. We provide cloud solutions, custom software development, cybersecurity services, and data analytics.",
    url: "https://gtechnology.ca",
    siteName: "GTC Technology Consulting",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTC | Technology Consulting",
    description: "Discover innovative solutions and creative experiences with GTC Technology Consulting.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://gtechnology.ca",
  },
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
        <StructuredData />
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
