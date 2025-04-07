'use client';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Contact() {
  // State to track if preloading has completed
  const [preloaded, setPreloaded] = useState(false);
  
  useEffect(() => {
    // Set a timeout to give priority to more important page content
    const timer = setTimeout(() => {
      const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11511.558704464115!2d-79.31371799999999!3d43.869142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d4e8f2b5e473%3A0x3b0321b47c5be71c!2sUnionville%2C%20Markham%2C%20ON!5e0!3m2!1sen!2sca!4v1680901234567!5m2!1sen!2sca";
      
      // Create a link preload element
      const linkPreload = document.createElement('link');
      linkPreload.rel = 'preload';
      linkPreload.href = mapUrl;
      linkPreload.as = 'document';
      document.head.appendChild(linkPreload);
      
      setPreloaded(true);
    }, .25 * 1000); // 250ms delay
    
    return () => clearTimeout(timer);
  }, []);  

  return (
    <section id="contact" className="bg-gray-50 py-32">
      <MaxWidthWrapper>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
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
                <span className="text-lg text-gray-700">Based in Unionville, serving the GTA</span>
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            {preloaded ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11511.558704464115!2d-79.31371799999999!3d43.869142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d4e8f2b5e473%3A0x3b0321b47c5be71c!2sUnionville%2C%20Markham%2C%20ON!5e0!3m2!1sen!2sca!4v1680901234567!5m2!1sen!2sca"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Unionville, Markham Location"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-100 h-[450px]">
                <div className="animate-pulse text-gray-400">Loading map...</div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}