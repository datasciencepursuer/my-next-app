'use client';

import { useEffect, useState } from 'react';

export const useActiveSection = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const sectionElements = sections.map(id => 
        id === 'home' ? document.documentElement : document.getElementById(id)
      );

      let currentSection = 'home';
      
      // Check if we're at the top for home section
      if (window.scrollY < 100) {
        currentSection = 'home';
      } else {
        // Check other sections
        sectionElements.forEach((element, index) => {
          if (!element) return;
          
          const rect = element.getBoundingClientRect();
          // Responsive header offset: 0 for desktop, 50 for mobile
          const headerOffset = window.innerWidth >= 768 ? 0 : 50;
          if (rect.top <= headerOffset) {
            currentSection = sections[index];
          }
        });
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Initial check
    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return activeSection;
};