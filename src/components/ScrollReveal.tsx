
import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip' | 'slide-up';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  animation = 'fade-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-10';
        case 'fade-left':
          return 'opacity-0 -translate-x-10';
        case 'fade-right':
          return 'opacity-0 translate-x-10';
        case 'zoom-in':
          return 'opacity-0 scale-95';
        case 'flip':
          return 'opacity-0 rotateY-90';
        case 'slide-up':
          return 'opacity-0 translate-y-20';
        default:
          return 'opacity-0 translate-y-10';
      }
    }
    
    return 'opacity-100 translate-y-0 translate-x-0 scale-100 rotateY-0';
  };

  return (
    <div 
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${getAnimationClass()}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
