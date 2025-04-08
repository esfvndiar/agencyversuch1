import React, { useEffect, useRef, useState, ReactNode } from 'react';

type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip' | 'slide-up';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  animation?: AnimationType;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  animation = 'fade-up',
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (once && ref.current) {
            observerRef.current?.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, delay, once]);

  const getAnimationClass = (): string => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    const visibilityClasses = isVisible 
      ? 'opacity-100 translate-y-0 translate-x-0 scale-100 rotateY-0' 
      : 'opacity-0';

    const animationClasses = isVisible ? '' : {
      'fade-up': 'translate-y-10',
      'fade-left': '-translate-x-10',
      'fade-right': 'translate-x-10',
      'zoom-in': 'scale-95',
      'flip': 'rotateY-90',
      'slide-up': 'translate-y-20'
    }[animation];

    return `${baseClasses} ${visibilityClasses} ${animationClasses}`;
  };

  return (
    <div 
      ref={ref}
      className={`${className} ${getAnimationClass()}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
