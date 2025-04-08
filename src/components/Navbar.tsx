import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { debounce } from '@/lib/utils';

interface NavLink {
  title: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '#services' },
  { title: 'Work', href: '#work' },
  { title: 'Contact', href: '#contact' }
];

const SCROLL_THRESHOLD = 20;
const DEBOUNCE_DELAY = 100;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navState, setNavState] = useState({
    scrolled: false,
    hidden: false,
    lastScrollY: 0
  });

  // Memoize scroll handler for better performance
  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollY = window.scrollY;
      
      setNavState(prev => ({
        scrolled: currentScrollY > SCROLL_THRESHOLD,
        hidden: currentScrollY > prev.lastScrollY && currentScrollY > SCROLL_THRESHOLD,
        lastScrollY: currentScrollY
      }));
    }, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navState.scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''
      } ${navState.hidden ? '-translate-y-full' : ''}`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="text-2xl font-display font-medium text-zinc-900">
          ALAVI
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                className="text-sm text-zinc-600 hover:text-primary transition-colors"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-zinc-900 hover:text-primary transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-8 h-full flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-zinc-900 hover:text-primary transition-colors group"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 transform transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
          
          <ul className="mt-8 space-y-6">
            {NAV_LINKS.map((link, index) => (
              <li 
                key={link.title}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: isMenuOpen ? 'slideIn 0.5s ease forwards' : 'none'
                }}
                className="transform transition-transform duration-300 hover:translate-x-2"
              >
                <a
                  href={link.href}
                  className="text-3xl font-display font-medium text-zinc-900 hover:text-primary transition-all duration-300 relative group"
                  onClick={handleLinkClick}
                >
                  {link.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <a
              href="mailto:hello@alavi.com"
              className="text-sm text-zinc-600 hover:text-primary transition-colors"
            >
              hello@alavi.com
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
