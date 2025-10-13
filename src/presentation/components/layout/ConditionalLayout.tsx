'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import GoogleCaptchaWrapper from '@/presentation/components/forms/GoogleCaptchaWrapper';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Exclude header/footer from Sanity Studio and admin routes
  const isStudioRoute = pathname?.startsWith('/studio');
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isStudioRoute || isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        <GoogleCaptchaWrapper>
          {children}
        </GoogleCaptchaWrapper>
      </main>
      <Footer />
    </>
  );
}
