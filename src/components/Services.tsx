'use client';

import MaxWidthWrapper from './MaxWidthWrapper';
import Projects from './Projects';

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-12 md:py-32">
      <MaxWidthWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of IT solutions designed to transform your business and drive innovation.
          </p>
        </div>
        <Projects />
      </MaxWidthWrapper>
    </section>
  );
}