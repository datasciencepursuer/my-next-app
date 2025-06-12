import { ContactEntity } from '../entities/Contact';
import { EmailService, RecaptchaService } from '../ports/EmailService';
import { ContactFormData } from '@/shared/types';

export class SendContactMessageUseCase {
  constructor(
    private emailService: EmailService,
    private recaptchaService: RecaptchaService,
    private recipientEmail: string = 'contact@gtechnology.ca'
  ) {}

  async execute(contactData: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
      // Create contact entity and validate
      const contact = ContactEntity.fromFormData(contactData);
      const validation = contact.validate();

      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', '),
        };
      }

      // Verify reCAPTCHA if token provided
      if (contact.recaptchaToken) {
        const recaptchaResult = await this.recaptchaService.verifyToken(contact.recaptchaToken);
        if (!recaptchaResult.success) {
          return {
            success: false,
            error: 'reCAPTCHA verification failed',
          };
        }

        // Check score if available (for v3)
        if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5) {
          return {
            success: false,
            error: 'Security verification failed',
          };
        }
      }

      // Send email
      const emailMessage = contact.toEmailMessage(this.recipientEmail);
      const emailResult = await this.emailService.sendEmail(emailMessage);

      return emailResult;
    } catch {
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }
}