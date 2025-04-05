'use client';

import Button from './Button';

export default function ContactCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form className="space-y-6 [transform-style:preserve-3d]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <textarea
          rows={4}
          placeholder="Message"
          className="w-full text-gray-600 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button
          className="w-full text-lg font-medium"
          href="/#contact"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}