'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const duration = 1000; // 1 second duration
    const start = window.scrollY;
    const targetPosition = 0;
    const distance = targetPosition - start;
    let startTime: number | null = null;

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

    // Update URL without triggering navigation
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#646DD8] hover:bg-[#5158B0] transition-all hover:scale-105 opacity-80 hover:opacity-100 active:scale-95 z-50 rounded-full p-3 cursor-pointer" // Added cursor-pointer
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  );
}