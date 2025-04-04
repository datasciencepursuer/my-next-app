'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import ScrollNavLink from '@/components/ScrollNavLink';

const menuItems = [
  { id: 'home', label: 'Overview', href: '/' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'contact', label: 'Contact', href: '/#contact' }
];

export default function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      const sectionElements = sections.map(id => 
        id === 'home' ? document.documentElement : document.getElementById(id)
      );

      let currentSection = 'home';
      
      // Check if we're at the top for home section
      if (window.scrollY < 100) {
        currentSection = 'home';
      } else {
        // Check other sections
        sectionElements.forEach((element, index) => {
          if (!element) return;
          
          const rect = element.getBoundingClientRect();
          if (rect.top <= 96) {
            currentSection = sections[index];
          }
        });
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {menuItems.map((item) => (
          <ScrollNavLink
            key={item.id}
            href={item.href}
            className={`text-gray-200 hover:text-white transition-colors ${
              activeSection === item.id ? 'font-medium' : ''
            }`}
          >
            {item.label}
          </ScrollNavLink>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          className="flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Main Menu"
        >
          <Menu className="text-gray-200 h-6 w-6 block" />
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-[60]">
            {menuItems.map((item) => (
              <ScrollNavLink
                key={item.id}
                href={item.href}
                className={`block w-full text-left px-6 py-3 hover:bg-gray-100 transition-colors ${
                  activeSection === item.id ? 'text-blue-600 font-medium' : 'text-gray-700'
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