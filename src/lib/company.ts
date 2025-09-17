// Server-side only company configuration
// This file should only be imported in API routes or server components

export interface CompanyConfig {
  name: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export function getCompanyConfig(): CompanyConfig {
  // These environment variables are not exposed to the client
  // since they don't have the NEXT_PUBLIC_ prefix
  return {
    name: process.env.COMPANY_NAME || 'Company Name',
    address: {
      street: process.env.COMPANY_STREET || '',
      city: process.env.COMPANY_CITY || '',
      province: process.env.COMPANY_PROVINCE || '',
      postalCode: process.env.COMPANY_POSTAL_CODE || '',
      country: process.env.COMPANY_COUNTRY || '',
    },
    contact: {
      email: process.env.COMPANY_EMAIL || '',
      phone: process.env.COMPANY_PHONE || '',
      website: process.env.COMPANY_WEBSITE || '',
    },
  };
}