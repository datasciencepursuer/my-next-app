'use client';

import Button from './Button';
import MaxWidthWrapper from './MaxWidthWrapper';

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-32">
      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Ready to transform your business? Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
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
                className="w-full text-white px-8 py-3 rounded-lg text-lg font-medium transition-all hover:scale-105"
                href="/#contact"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}