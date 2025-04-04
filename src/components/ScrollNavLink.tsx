'use client';

import Link from 'next/link';
import { useScrollNavigation } from '@/hooks/useScrollNavigation';

interface ScrollNavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ScrollNavLink({ href, className, children, onClick }: ScrollNavLinkProps) {
  const { handleSectionNavigation } = useScrollNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleSectionNavigation(e, href);
    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}