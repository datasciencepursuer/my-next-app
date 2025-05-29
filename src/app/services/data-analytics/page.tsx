import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Analytics & Business Intelligence | GTC Technology Consulting',
  description: 'Transform your data into actionable insights with advanced analytics and BI solutions. Expert services in SQL, Power BI, Tableau, ETL, and statistical modeling.',
  keywords: 'data analytics, business intelligence, Power BI, Tableau, SQL, ETL, data visualization, statistical analysis, data infrastructure',
  openGraph: {
    title: 'Data Analytics & Business Intelligence | GTC',
    description: 'Transform your data into actionable insights with advanced analytics and business intelligence solutions.',
    url: 'https://gtechnology.ca/services/data-analytics',
    type: 'website',
  },
  alternates: {
    canonical: 'https://gtechnology.ca/services/data-analytics',
  },
}

export default function DataAnalyticsWorks() {
  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Data Analytics – Previous Works</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>Custom dashboard for retail analytics</li>
        <li>ETL pipeline for healthcare data</li>
        <li>Statistical modeling for finance</li>
      </ul>
    </main>
  );
}