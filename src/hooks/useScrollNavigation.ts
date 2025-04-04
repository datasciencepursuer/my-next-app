'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useScrollNavigation = () => {
  const pathname = usePathname();

  const scrollToElement = (hash: string) => {
    const headerOffset = 0; // Adjust this value if you have a fixed header
    const duration = 1000; // 1 second duration
    const start = window.scrollY;
    let startTime: number | null = null;

    // Determine target position
    let targetPosition = 0; // Default to top for home/overview
    if (hash && hash !== '#') {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        targetPosition = elementPosition + window.scrollY - headerOffset;
      }
    }

    const distance = targetPosition - start;

    // Easing function for smoother animation
    const ease = (t: number) => {
      return t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo({
        top: start + (distance * ease(progress)),
        behavior: 'auto' // We're handling the smooth scroll manually
      });

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (pathname) {
      // Handle initial page load with hash
      const hash = window.location.hash;
      // Handle both cases: with hash and without hash (home)
      setTimeout(() => {
        scrollToElement(hash);
      }, 100);
    }
  }, [pathname]);

  const handleSectionNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Extract hash or use empty string for home
    const hash = href.startsWith('/#') ? href.replace('/', '') : '';
    scrollToElement(hash);
    
    // Update URL without triggering navigation
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', href);
    }
  };

  return { handleSectionNavigation };
};