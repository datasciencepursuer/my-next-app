'use client';

import { ChevronUp } from 'lucide-react';
import { smoothScrollTo } from '@/shared/utils/scrollAnimation';
import { useScrollObserver } from '@/presentation/hooks/useScrollObserver';

export default function ScrollToTop() {
  const { scrollY } = useScrollObserver(300);
  const isVisible = scrollY > 300;

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    smoothScrollTo(0, 1000, () => {
      // Update URL without triggering navigation
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/');
      }
    });
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