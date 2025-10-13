import type { Metadata } from "next";
import ConditionalLayout from '@/presentation/components/layout/ConditionalLayout';
import StructuredData from '@/presentation/components/StructuredData';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GTC | Technology Consulting - Professional IT Services",
    template: "%s | GTC Technology Consulting"
  },
  description: "Discover innovative solutions and creative experiences with GTC Technology Consulting. We provide cloud solutions, custom software development, cybersecurity services, and data analytics.",
  keywords: "technology consulting, cloud solutions, custom software development, cybersecurity, data analytics, digital transformation, IT consulting, AWS, Azure, Google Cloud, DevOps, software engineering",
  authors: [{ name: "GTC Technology Consulting", url: "https://gtechnology.ca" }],
  creator: "GTC Technology Consulting",
  publisher: "GTC Technology Consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gtechnology.ca'),
  openGraph: {
    title: "GTC | Technology Consulting - Professional IT Services",
    description: "Discover innovative solutions and creative experiences with GTC Technology Consulting. We provide cloud solutions, custom software development, cybersecurity services, and data analytics.",
    url: "https://gtechnology.ca",
    siteName: "GTC Technology Consulting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GTC Technology Consulting - Professional IT Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GTC | Technology Consulting - Professional IT Services",
    description: "Discover innovative solutions and creative experiences with GTC Technology Consulting.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://gtechnology.ca",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" }
    ]
  },
  verification: {
    google: "qqBaC_NIcm-4vEf31_3KjF1JQpWI7JhrghQBxYNuxHE",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
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
        <meta name="google-site-verification" content="qqBaC_NIcm-4vEf31_3KjF1JQpWI7JhrghQBxYNuxHE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://o6so15s6oe.ufs.sh" />
        <StructuredData />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col max-w-[100vw] sm:max-w-none overflow-x-hidden sm:overflow-x-visible`}
        style={{ fontFamily: 'Calibri, sans-serif' }}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
