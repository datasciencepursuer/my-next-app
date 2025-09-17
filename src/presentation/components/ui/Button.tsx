'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: ((e: React.MouseEvent) => void | Promise<void>) | ((e: React.FormEvent) => void | Promise<void>) | (() => void | Promise<void>);
  href?: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({ children, onClick, href, className = '', disabled = false }: ButtonProps) {
  const baseStyle = 'px-4 py-2 rounded-lg bg-[#646DD8] text-gray-200 hover:bg-[#5158B0] hover:scale-105 active:scale-95 transition-all duration-200 transform';
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
    <button onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} disabled={disabled} className={finalClassName}>
      {children}
    </button>
  );
}