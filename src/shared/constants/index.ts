export const APP_CONFIG = {
  SITE_NAME: 'GTC Technology Consulting',
  SITE_URL: 'https://gtechnology.ca',
  CONTACT_EMAIL: 'contact@gtechnology.ca',
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
} as const;

export const NAVIGATION_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export const ROUTES = {
  HOME: '/',
  SERVICES: {
    CLOUD_SOLUTIONS: '/services/cloud-solutions',
    CUSTOM_DEVELOPMENT: '/services/custom-development',
    CYBER_SECURITY: '/services/cyber-security',
    DATA_ANALYTICS: '/services/data-analytics',
  },
  API: {
    SEND_EMAIL: '/api/send',
    RECAPTCHA_VERIFY: '/api/googsrecaptcha',
  },
} as const;