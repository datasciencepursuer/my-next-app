//header of the page

'use client';

import Link from 'next/link';
import Image from 'next/image';
import MainMenu from '@/presentation/components/MainMenu';
import MaxWidthWrapper from '@/presentation/components/layout/MaxWidthWrapper';
import { useScrollNavigation } from '@/presentation/hooks/useScrollNavigation';
import { useScrollObserver } from '@/presentation/hooks/useScrollObserver';

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
              className="block w-[180px] h-[60px] transition-transform hover:scale-105 relative"
              style={{ 
                WebkitUserSelect: 'none', 
                msUserSelect: 'none', 
                userSelect: 'none'
              }}
              aria-label="GTC Logo"
            >
              <Image
                src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmIdEfDAlZ7vKmQRMkr3lHeyLDOGX1njxAzVW2"
                alt="GTC Logo"
                fill
                className="object-contain object-left select-none pointer-events-none"
                sizes="180px"
                quality={90}
                priority
                draggable={false}
                unselectable="on"
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
