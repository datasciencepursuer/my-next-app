'use client';

import Image from 'next/image';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Check } from 'lucide-react';

export default function About() {
    return (
      <section id="about" className="bg-white py-32">
        <MaxWidthWrapper>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                We combine advanced technical knowledge and innovative solutions to deliver the that help businesses thrive in the digital age.
              </p>
              <div className="space-y-4">
                {[
                  'Strategic Technology Consulting',
                  'Custom Solution Development',
                  'Digital Transformation',
                  'Innovation & Growth'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-6 h-6 text-blue-600 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[650px] rounded-lg overflow-hidden">
              <Image
                src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmZ7nF6LDkjNoaeX9tbkUu805VLmwGsYF3y2J1"
                alt="About us"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    );
  }