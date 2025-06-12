'use client';

import { useEffect, useState, useCallback } from 'react';

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | null;
}

export const useScrollObserver = (threshold: number = 0) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    scrollDirection: null
  });

  const updateScrollState = useCallback(() => {
    setScrollState(prevState => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > threshold;
      
      let scrollDirection: 'up' | 'down' | null = null;
      if (currentScrollY > prevState.scrollY) {
        scrollDirection = 'down';
      } else if (currentScrollY < prevState.scrollY) {
        scrollDirection = 'up';
      }

      return {
        scrollY: currentScrollY,
        isScrolled,
        scrollDirection
      };
    });
  }, [threshold]);

  useEffect(() => {
    // Initial state
    updateScrollState();

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollState]);

  return scrollState;
};