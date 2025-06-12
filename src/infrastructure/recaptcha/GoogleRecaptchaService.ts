import { RecaptchaService } from '@/core/ports/EmailService';

export class GoogleRecaptchaService implements RecaptchaService {
  constructor(private secretKey: string) {}

  async verifyToken(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${this.secretKey}&response=${token}`,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: 'Failed to verify reCAPTCHA',
        };
      }

      return {
        success: data.success,
        score: data.score,
        error: data.success ? undefined : 'reCAPTCHA verification failed',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}