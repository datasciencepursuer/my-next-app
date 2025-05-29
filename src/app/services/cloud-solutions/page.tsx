import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cloud Solutions & Digital Transformation | GTC Technology Consulting',
  description: 'Modernize your business with scalable cloud infrastructure and digital transformation solutions. Expert services in Microsoft Azure, AWS, and Google Cloud Platform.',
  keywords: 'cloud solutions, digital transformation, Microsoft Azure, AWS, Google Cloud Platform, cloud migration, cloud computing, automation',
  openGraph: {
    title: 'Cloud Solutions & Digital Transformation | GTC',
    description: 'Modernize your business with scalable cloud infrastructure and digital transformation solutions that drive innovation and growth.',
    url: 'https://gtechnology.ca/services/cloud-solutions',
    type: 'website',
  },
  alternates: {
    canonical: 'https://gtechnology.ca/services/cloud-solutions',
  },
}

export default function CloudSolutionsWorks() {
  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Cloud solutions – Previous Works</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>Custom dashboard for retail analytics</li>
        <li>ETL pipeline for healthcare data</li>
        <li>Statistical modeling for finance</li>
      </ul>
    </main>
  );
}