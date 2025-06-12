import { EmailMessage } from '@/shared/types';

export interface EmailService {
  sendEmail(message: EmailMessage): Promise<{ success: boolean; error?: string }>;
}

export interface RecaptchaService {
  verifyToken(token: string): Promise<{ success: boolean; score?: number; error?: string }>;
}