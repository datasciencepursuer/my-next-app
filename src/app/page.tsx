import { Metadata } from 'next';
import Hero from '@/presentation/components/Hero';
import Services from '@/presentation/components/Services';
import About from '@/presentation/components/About';
import Contact from '@/presentation/components/forms/Contact';
import ScrollToTop from '@/presentation/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'GTC Technology Consulting | Innovative IT Solutions & Digital Transformation',
  description: 'GTC Technology Consulting delivers cutting-edge technology solutions including cloud services, custom software development, cybersecurity, and data analytics. Transform your business with our expert consulting services.',
  keywords: 'technology consulting, IT solutions, cloud services, software development, cybersecurity, data analytics, digital transformation, GTC, business technology, IT consulting firm',
  openGraph: {
    title: 'GTC Technology Consulting | Innovative IT Solutions',
    description: 'Transform your business with cutting-edge technology solutions. Expert consulting in cloud, software development, cybersecurity, and data analytics.',
    url: 'https://gtechnology.ca',
    siteName: 'GTC Technology Consulting',
    images: [
      {
        url: 'https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmXQ7Ln51Ol0SVZyrj5JsoTuE2GBDW1kHNF9gc',
        width: 1200,
        height: 630,
        alt: 'GTC Technology Consulting',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTC Technology Consulting | Innovative IT Solutions',
    description: 'Transform your business with cutting-edge technology solutions.',
    images: ['https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmXQ7Ln51Ol0SVZyrj5JsoTuE2GBDW1kHNF9gc'],
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
    canonical: 'https://gtechnology.ca',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Contact />
      <ScrollToTop />
    </div>
  );
}