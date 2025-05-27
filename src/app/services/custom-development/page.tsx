import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Software Development | GTC Technology Consulting',
  description: 'Build tailored software solutions that perfectly align with your business needs. Expert development in Python, Node.js, React, and Next.js.',
  keywords: 'custom software development, web development, Python, Node.js, React, Next.js, software solutions, application development',
  openGraph: {
    title: 'Custom Software Development | GTC',
    description: 'Build tailored software solutions that perfectly align with your business needs and enhance operational efficiency.',
    url: 'https://yourdomain.com/services/custom-development',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yourdomain.com/services/custom-development',
  },
}

export default function SoftwareDevelopementWorks() {
  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Software Developement – Previous Works</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>Custom dashboard for retail analytics</li>
        <li>ETL pipeline for healthcare data</li>
        <li>Statistical modeling for finance</li>
      </ul>
    </main>
  );
}