'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { smoothScrollTo } from '@/utils/scrollAnimation';

export const useScrollNavigation = () => {
  const pathname = usePathname();

  const scrollToElement = (hash: string) => {
    const headerOffset = 0; // Fixed header height
    
    // Determine target position
    let targetPosition = 0; // Default to top for home/overview
    if (hash && hash !== '#') {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        targetPosition = elementPosition + window.scrollY - headerOffset;
      }
    }

    smoothScrollTo(targetPosition, 1000);
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
    const isHome = pathname === '/';
    const isHashLink = href.startsWith('/#') || href === '/';

    // Only intercept navigation if already on home and using a hash link
    if (isHome && isHashLink) {
      e.preventDefault();
      const hash = href.startsWith('/#') ? href.replace('/', '') : '';
      scrollToElement(hash);

      // Update URL without triggering navigation
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
    // Otherwise, allow default navigation (let Next.js handle it)
  };

  return { handleSectionNavigation };
};