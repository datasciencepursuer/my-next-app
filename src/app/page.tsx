import Projects from '@/components/Projects';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import ScrollNavLink from '@/components/ScrollNavLink';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen -mt-18">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmXQ7Ln51Ol0SVZyrj5JsoTuE2GBDW1kHNF9gc"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <MaxWidthWrapper className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Innovative Technology Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transforming businesses through cutting-edge technology and expert consulting
            </p>
            <ScrollNavLink 
              href="/#services"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all hover:scale-105"
            >
              Explore Our Services
            </ScrollNavLink>
          </MaxWidthWrapper>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-32">
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

      {/* About Section */}
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
                    <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
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

      {/* Contact Section */}
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}