import MaxWidthWrapper from './MaxWidthWrapper';
import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-32">
      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto text-center">
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
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}