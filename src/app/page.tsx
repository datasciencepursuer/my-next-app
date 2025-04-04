import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Contact />
      <ScrollToTop />
    </div>
  );
}