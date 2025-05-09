'use client';

import { useState, FormEvent } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactCard() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    industry: '',
    email: '',
    message: '',
    middleName: '', // Honeypot
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Sending your message...');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(result.message || 'Message sent successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          industry: '',
          email: '',
          message: '',
          middleName: '',
        });
      } else {
        setStatus(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred while sending your message. Please try again.');
      console.error("Fetch error for /api/send:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form
        className="space-y-6 [transform-style:preserve-3d]"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>
        {/* Honeypot Field */}
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          disabled={isLoading}
        />
        <textarea
          name="message"
          rows={4}
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={isLoading}
        />
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-[#646DD8] text-gray-200 hover:bg-[#5158B0] active:scale-95 transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {status || (isLoading ? 'Processing...' : 'Send Message')}
          </button>
        </div>
      </form>
    </div>
  );
}