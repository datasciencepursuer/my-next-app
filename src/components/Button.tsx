'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ children, onClick, href, className = '' }: ButtonProps) {
  const baseStyle = 'px-4 py-2 rounded-lg bg-[#646DD8] text-gray-200 hover:bg-[#5158B0] hover:scale-102 active:scale-98 transition-all duration-200 transform';
  const finalClassName = `${baseStyle} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={`${finalClassName} inline-block`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClassName}>
      {children}
    </button>
  );
}