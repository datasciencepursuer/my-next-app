'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import ScrollNavLink from '@/components/ScrollNavLink';
import { useActiveSection } from '@/hooks/useActiveSection';

const menuItems = [
  { id: 'home', label: 'Overview', href: '/' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'contact', label: 'Contact', href: '/#contact' }
];

export default function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const sections = menuItems.map(item => item.id);
  const activeSection = useActiveSection(sections);

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {menuItems.map((item) => (
          <ScrollNavLink
            key={item.id}
            href={item.href}
            className={`text-lg text-gray-200 hover:text-white hover:scale-105 transition-colors ${
              activeSection === item.id ? 'font-semibold' : ''
            }`}
          >
            {item.label}
          </ScrollNavLink>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          className="flex items-center justify-center p-3 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Main Menu"
        >
          <Menu className="text-gray-200 h-8 w-8 block" />
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-3 z-[60]">
            {menuItems.map((item) => (
              <ScrollNavLink
                key={item.id}
                href={item.href}
                className={`block w-full text-left px-8 py-4 text-lg transition-colors ${
                  activeSection === item.id ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}
                onClick={handleMenuClick}
              >
                {item.label}
              </ScrollNavLink>
            ))}
          </div>
        )}

        {/* Background Overlay when mobile menu is open */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}