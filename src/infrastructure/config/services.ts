import { Service, ServiceDetails } from '@/shared/types';

export const servicesData: Service[] = [
  {
    id: 'cloud-solutions',
    title: "Cloud Solutions & Digital Transformation",
    description: "Modernize your business with scalable cloud infrastructure and digital transformation solutions that drive innovation and growth.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmTEpv4zfSCPRDuYWvyrF4cotp7a8xf0gkU2X1",
    path: "/services/cloud-solutions",
    adjustments: "object-center",
    backgroundPosition: "center 35%"
  },
  {
    id: 'custom-development',
    title: "Custom Software Development",
    description: "Build tailored software solutions that perfectly align with your business needs and enhance operational efficiency.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmB18LqFYSwM3FWZlGYLbQmJyS1tXhnNoBEur5",
    path: "/services/custom-development",
    adjustments: "object-center"
  },
  {
    id: 'cyber-security',
    title: "Cybersecurity Services",
    description: "Protect your digital assets with comprehensive security solutions and proactive threat management.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmglWmBZUQk4VeBypsFOxH7dPYcWo6mXru9wiE",
    path: "/services/cyber-security",
    adjustments: "object-center"
  },
  {
    id: 'data-analytics',
    title: "Data Analytics & Business Intelligence",
    description: "Transform your data into actionable insights with advanced analytics and business intelligence solutions.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmrai6EReJaQvPlRUsw4ZYicMuObIrVHgXepGA",
    path: "/services/data-analytics",
    adjustments: "object-center"
  }
];

export const serviceDetailsData: Record<string, ServiceDetails> = {
  'cloud-solutions': {
    title: 'Cloud Solutions & Digital Transformation',
    technologies: ['n8n', 'Microsoft Azure', 'Amazon Web Service', 'Google Cloud Platform'],
    products: ['Automation and AI Agent', 'Cloud Storage', 'Cloud Computing'],
    process: [
      { step: 'Assessment', description: 'Evaluate infrastructure and migration requirements' },
      { step: 'Strategy', description: 'Create migration plan' },
      { step: 'Migration', description: 'Migrate to cloud' }
    ]
  },
  'custom-development': {
    title: 'Custom Software Development',
    technologies: ['Python', 'Node.JS', 'React', 'Next JS'],
    products: ['Web Development', 'Solutions Discovery', 'Custom Applications & Integrations'],
    process: [
      { step: 'Analysis', description: 'Gathering requirements' },
      { step: 'Design', description: 'Solution exploration and architectural design' },
      { step: 'Development', description: 'Iterative implementation' }
    ]
  },
  'cyber-security': {
    title: 'Cybersecurity Services',
    technologies: ['SIEM', 'EDR', 'IAM', 'Encryption', 'Pen Testing'],
    products: ['Risk Assessment', 'Penetration Testing', 'Incident Response & Forensics', 'Cybersecurity Training'],
    process: [
      { step: 'Assessment', description: 'Security evaluation' },
      { step: 'Strategy', description: 'Security improvement roadmap' },
      { step: 'Implementation', description: 'Deploy security controls' }
    ]
  },
  'data-analytics': {
    title: 'Data Analytics & BI',
    technologies: ['SQL', 'NoSQL', 'Power BI', 'Tableau', 'JQL'],
    products: ['Custom Reports', 'ETL', 'Data Cleaning', 'Data Infrastructure Setup', 'Statistical Analysis & Modeling'],
    process: [
      { step: 'Analysis', description: 'Data source evaluation' },
      { step: 'Pipeline', description: 'Build data infrastructure' },
      { step: 'Insights', description: 'Generate business intelligence' }
    ]
  }
};