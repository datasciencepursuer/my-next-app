// Core domain types
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  adjustments?: string;
  backgroundPosition?: string;
}

export interface ServiceStep {
  step: string;
  description: string;
}

export interface ServiceDetails {
  title: string;
  technologies: string[];
  products: string[];
  process: ServiceStep[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  adjustments?: string;
  backgroundPosition?: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  recaptchaToken?: string;
}

export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  html: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  error?: string;
}