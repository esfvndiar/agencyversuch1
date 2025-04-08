import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ArrowRight, ArrowUp } from 'lucide-react';
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
const DEBOUNCE_DELAY = 50;
const SCROLL_UPDATE_THRESHOLD = 5;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navState, setNavState] = useState({
    scrolled: false,
    hidden: false,
    lastScrollY: 0,
    scrollProgress: 0
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastScrollYRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number>();
  const lastUpdateTimeRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);
  const lastScrollDirectionRef = useRef<'up' | 'down'>('up');

  // Calculate scroll progress
  const calculateScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollHeight) * 100;
    setNavState(prev => ({ ...prev, scrollProgress: Math.min(progress, 100) }));
  }, []);

  // Optimized scroll handler with RAF and throttling
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;
    
    const now = performance.now();
    if (now - lastUpdateTimeRef.current < 16) return; // Throttle to ~60fps
    
    isScrollingRef.current = true;
    
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollYRef.current);
      
      if (scrollDiff >= SCROLL_UPDATE_THRESHOLD) {
        const isScrollingUp = currentScrollY < lastScrollYRef.current;
        lastScrollDirectionRef.current = isScrollingUp ? 'up' : 'down';
        
        setNavState(prev => ({
          ...prev,
          scrolled: currentScrollY > SCROLL_THRESHOLD,
          hidden: !isScrollingUp && currentScrollY > SCROLL_THRESHOLD,
          lastScrollY: currentScrollY
        }));

        // Show/hide back to top button
        setShowBackToTop(currentScrollY > window.innerHeight * 0.5);
        
        lastScrollYRef.current = currentScrollY;
        lastUpdateTimeRef.current = now;
      }
      
      isScrollingRef.current = false;
    });
  }, []);

  // Calculate scroll progress on scroll
  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, [calculateScrollProgress]);

  // Touch gesture handling for mobile menu
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current || !isMenuOpen) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    if (diff > 50) { // Swipe left threshold
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  // Cleanup function for scroll timeout
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, DEBOUNCE_DELAY);
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll]);

  // Touch event listeners for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMenuOpen, handleTouchStart, handleTouchMove]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Memoize the contact button styles
  const contactButtonStyles = useCallback((isMobile = false) => {
    const baseStyles = isMobile
      ? 'inline-flex items-center gap-3 text-primary hover:text-primary/80'
      : 'inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300';
    
    return `${baseStyles} focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md`;
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navState.scrolled && lastScrollDirectionRef.current === 'up'
            ? `bg-white/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] border-b border-white/10` 
            : 'bg-transparent'
        } ${navState.hidden ? '-translate-y-full' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Progress bar */}
        <div 
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300"
          style={{ width: `${navState.scrollProgress}%` }}
        />

        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="/" 
            className={`text-2xl font-display font-medium transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md ${
              navState.scrolled ? 'text-zinc-900 hover:text-primary' : 'text-zinc-900 hover:text-primary/80'
            }`}
            aria-label="ALAVI Home"
          >
            ALAVI
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link.title} role="none">
                <a
                  href={link.href}
                  className={`text-sm font-medium relative group focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md ${
                    link.title === 'Contact' 
                      ? contactButtonStyles()
                      : navState.scrolled 
                        ? 'text-zinc-900 hover:text-primary transition-all duration-300'
                        : 'text-zinc-900 hover:text-primary/80 transition-all duration-300'
                  }`}
                  role="menuitem"
                  onClick={handleLinkClick}
                >
                  {link.title}
                  {link.title === 'Contact' && (
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                  {link.title !== 'Contact' && (
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      navState.scrolled ? 'bg-primary' : 'bg-primary'
                    }`} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md ${
              navState.scrolled ? 'text-zinc-900 hover:text-primary' : 'text-zinc-900 hover:text-primary/80'
            }`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`md:hidden fixed inset-0 bg-white z-[100] transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
          style={{ 
            backgroundColor: 'white',
            backdropFilter: 'none'
          }}
          onKeyDown={handleMenuKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="container mx-auto px-6 py-8 h-full flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-900 hover:text-primary transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md"
                aria-label="Close menu"
              >
                <X className="w-8 h-8 transform transition-transform duration-150 group-hover:rotate-90" />
              </button>
            </div>
            
            <ul className="mt-8 space-y-6 flex flex-col items-center" role="menu">
              {NAV_LINKS.map((link, index) => (
                <li 
                  key={link.title}
                  ref={index === 0 ? firstMenuItemRef : undefined}
                  className={`opacity-0 animate-fade-in text-center w-full ${
                    isMenuOpen ? 'animate-slide-up' : ''
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <a
                    href={link.href}
                    className={`block text-2xl font-medium ${
                      link.title === 'Contact' 
                        ? contactButtonStyles(true)
                        : 'text-zinc-900 hover:text-primary transition-all duration-300'
                    }`}
                    role="menuitem"
                    onClick={handleLinkClick}
                  >
                    {link.title}
                    {link.title === 'Contact' && (
                      <ArrowRight className="w-6 h-6 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md text-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default Navbar;
