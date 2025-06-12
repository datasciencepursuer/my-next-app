import { ContactFormData, EmailMessage } from '@/shared/types';

export class ContactEntity {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly message: string,
    public readonly recaptchaToken?: string
  ) {}

  static fromFormData(data: ContactFormData): ContactEntity {
    return new ContactEntity(
      data.name,
      data.email,
      data.message,
      data.recaptchaToken
    );
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.name.trim()) {
      errors.push('Name is required');
    }

    if (!this.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('Email format is invalid');
    }

    if (!this.message.trim()) {
      errors.push('Message is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toEmailMessage(recipient: string): EmailMessage {
    return {
      to: recipient,
      from: 'GTC Technology <leads@gtechnology.ca>',
      subject: `New Contact Form Submission from ${this.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${this.name}</p>
        <p><strong>Email:</strong> ${this.email}</p>
        <p><strong>Message:</strong></p>
        <div style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-left: 4px solid #007bff;">
          ${this.message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This message was sent from the contact form on gtechnology.ca
        </p>
      `,
    };
  }

  toJSON(): ContactFormData {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
      recaptchaToken: this.recaptchaToken,
    };
  }
}