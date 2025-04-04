export type ServiceStep = {
  step: string;
  description: string;
};

export type ServiceDetails = {
  title: string;
  technologies: string[];
  methodologies: string[];
  process: ServiceStep[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  adjustments?: string;
};

export const projects: Project[] = [
  {
    id: 'cloud-solutions',
    title: "Cloud Solutions & Digital Transformation",
    description: "Modernize your business with scalable cloud infrastructure and digital transformation solutions that drive innovation and growth.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmTEpv4zfSCPRDuYWvyrF4cotp7a8xf0gkU2X1",
    path: "/our-work/cloud-solutions",
    adjustments:"object-[center_25%]"
  },
  {
    id: 'custom-development',
    title: "Custom Software Development",
    description: "Build tailored software solutions that perfectly align with your business needs and enhance operational efficiency.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmB18LqFYSwM3FWZlGYLbQmJyS1tXhnNoBEur5",
    path: "/our-work/custom-development",
    adjustments:"object-center"
  },
  {
    id: 'cybersecurity',
    title: "Cybersecurity Services",
    description: "Protect your digital assets with comprehensive security solutions and proactive threat management.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmglWmBZUQk4VeBypsFOxH7dPYcWo6mXru9wiE",
    path: "/our-work/cybersecurity", 
    adjustments:"object-center"
  },
  {
    id: 'data-analytics',
    title: "Data Analytics & Business Intelligence",
    description: "Transform your data into actionable insights with advanced analytics and business intelligence solutions.",
    image: "https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmrai6EReJaQvPlRUsw4ZYicMuObIrVHgXepGA",
    path: "/our-work/data-analytics",
    adjustments:"object-center"
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getServiceDetails(id: string): ServiceDetails {
  const services: Record<string, ServiceDetails> = {
    'cloud-solutions': {
      title: 'Cloud Solutions & Digital Transformation',
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform'],
      methodologies: ['Agile Cloud Migration', 'DevOps', 'Infrastructure as Code'],
      process: [
        { step: 'Assessment', description: 'Evaluate infrastructure and migration readiness' },
        { step: 'Strategy', description: 'Create cloud adoption roadmap' },
        { step: 'Migration', description: 'Execute phased cloud transition' }
      ]
    },
    'custom-development': {
      title: 'Custom Software Development',
      technologies: ['React', 'Node.js', 'Python', '.NET', 'Flutter'],
      methodologies: ['Agile', 'TDD', 'Domain-Driven Design'],
      process: [
        { step: 'Analysis', description: 'Gather and analyze requirements' },
        { step: 'Design', description: 'Create technical architecture' },
        { step: 'Development', description: 'Iterative implementation' }
      ]
    },
    'cybersecurity': {
      title: 'Cybersecurity Services',
      technologies: ['SIEM', 'EDR', 'IAM', 'Encryption', 'Pen Testing'],
      methodologies: ['Zero Trust', 'Defense in Depth', 'NIST Framework'],
      process: [
        { step: 'Assessment', description: 'Security posture evaluation' },
        { step: 'Strategy', description: 'Security roadmap development' },
        { step: 'Implementation', description: 'Deploy security controls' }
      ]
    },
    'data-analytics': {
      title: 'Data Analytics & BI',
      technologies: ['Snowflake', 'Spark', 'TensorFlow', 'Power BI', 'Tableau'],
      methodologies: ['Data Lake', 'ETL', 'MLOps'],
      process: [
        { step: 'Analysis', description: 'Data source evaluation' },
        { step: 'Pipeline', description: 'Build data infrastructure' },
        { step: 'Insights', description: 'Generate business intelligence' }
      ]
    }
  };

  return services[id] || services['cloud-solutions'];
}