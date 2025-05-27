import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cybersecurity Services | GTC Technology Consulting',
  description: 'Protect your digital assets with comprehensive security solutions. Expert services in risk assessment, penetration testing, incident response, and security training.',
  keywords: 'cybersecurity, security services, penetration testing, risk assessment, incident response, SIEM, EDR, IAM, security audit',
  openGraph: {
    title: 'Cybersecurity Services | GTC',
    description: 'Protect your digital assets with comprehensive security solutions and proactive threat management.',
    url: 'https://yourdomain.com/services/cyber-security',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yourdomain.com/services/cyber-security',
  },
}

export default function CyberSecurityWorks() {
  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Cyber Security – Previous Works</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>Security audit for fintech application</li>
        <li>Penetration testing for e-commerce platform</li>
        <li>Implementation of multi-factor authentication</li>
      </ul>
    </main>
  );
}