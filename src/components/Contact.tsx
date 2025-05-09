'use client'

import MaxWidthWrapper from './MaxWidthWrapper';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactCard from './ContactCard';

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-12 md:py-32">
      <MaxWidthWrapper>
        {/* Text content wrapper - centered with its own max-width for readability */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Ready to transform your business? Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-[#646DD8]" />
              <a href="mailto:will.gao@gtechnology.ca" className="text-lg text-gray-700 hover:text-blue-600 transition-colors">
                will.gao@gtechnology.ca
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-[#646DD8]" />
              <a href="tel:+16476404186" className="text-lg text-gray-700 hover:text-blue-600 transition-colors">
                1 (647) 640 4186
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-[#646DD8]" />
              <span className="text-lg text-gray-700">Based in Markham, serving the GTA</span>
            </div>
          </div>
        </div>

        {/* Grid for ContactCard and iframe - this will span the full width of MaxWidthWrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full ">
            <ContactCard />
          </div>
          <div className="w-full rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 h-[400px] md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92163.90112851971!2d-79.37549435644034!3d43.87235675435155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d31c27a9fb93%3A0x8b4f7bdba03e4974!2sMarkham%2C%20ON!5e0!3m2!1sen!2sca!4v1680901234567!5m2!1sen!2sca"
              width="100%"

              className="h-full w-full" // Ensures it fills the parent div
              style={{ border: 0, pointerEvents: 'auto' }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Markham Location"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
