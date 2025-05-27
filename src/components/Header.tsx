'use client';

import Image from 'next/image';
import Link from 'next/link';
import MainMenu from './MainMenu';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';
import { useScrollObserver } from '@/hooks/useScrollObserver';

export default function Header() {
  const { handleSectionNavigation } = useScrollNavigation();
  const { isScrolled } = useScrollObserver(10);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-gray-900/60 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <MaxWidthWrapper>
        <div className="flex justify-between items-center h-24 px-4 sm:px-4 lg:px-4">
          {/* Logo container */}
          <div className="relative">
            <Link 
              href="/"
              onClick={(e) => handleSectionNavigation(e, '/')}
              className="relative w-[180px] h-25 block transition-transform hover:scale-105"
            >
              <Image
                src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmIdEfDAlZ7vKmQRMkr3lHeyLDOGX1njxAzVW2"
                alt="GTC Logo"
                fill
                sizes="(max-width: 768px) 80vw, 200px"
                className="object-contain object-left select-none"
                priority
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Link>
          </div>

          {/* Navigation Menu with right padding */}
          <MainMenu />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
