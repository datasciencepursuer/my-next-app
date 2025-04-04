interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function MaxWidthWrapper({
  className = '',
  children
}: MaxWidthWrapperProps) {
  return (
    <div 
      className={`
        mx-auto
        w-full
        max-w-screen-2xl
        px-4
        sm:px-6 
        lg:px-8
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}