'use client';

import Image from 'next/image';
import MaxWidthWrapper from './MaxWidthWrapper';

export default function About() {
    return (
      <section id="about" className="bg-white py-32">
        <MaxWidthWrapper>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                Gao Technology Consulting is a technology consulting firm originating from Markham, Ontario.
                We combine advanced technical knowledge and innovative solutions to help businesses thrive in the digital and upcoming AI age.
                Our specialty lies in providing unique solutions tailored specifically to your needs at a low upkeep cost. We are committed to educating 
                on the latest technologies and trends to ensure that you are always ahead of the curve. Each solution will be presented with a detailed report, 
                including the pros and cons, to ensure you are fully informed before making any decisions. Post implementation, we will provide supplementary 
                training and knowledge on the solution to ensure you are fully able to master and scale it yourselves.
              </p>
            </div>
            <div className="relative aspect-[10/10] lg:h-[650px] rounded-lg overflow-hidden">
              <Image
                src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmZ7nF6LDkjNoaeX9tbkUu805VLmwGsYF3y2J1"
                alt="About us"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    );
}