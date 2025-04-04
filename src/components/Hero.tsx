'use client';

import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  imagePath: string;
}

export default function Hero({ title, subtitle, imagePath }: HeroProps) {
  return (
    <div className="relative -mt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imagePath}
          alt="Hero Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] pt-16">
        <div className="text-center text-gray-200 px-4 w-full sm:w-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">{title}</h1>
          <p className="text-lg sm:text-xl max-w-[90vw] sm:max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}