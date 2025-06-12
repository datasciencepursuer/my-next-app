import { Resend } from 'resend';
import { EmailService } from '@/core/ports/EmailService';
import { EmailMessage } from '@/shared/types';

export class ResendEmailService implements EmailService {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendEmail(message: EmailMessage): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await this.resend.emails.send({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
      });

      if (result.error) {
        return {
          success: false,
          error: result.error.message,
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}