import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isTyping, setIsTyping] = useState(true);
  const mainText = "Crafting Digital Excellence";
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < mainText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + mainText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="relative font-display text-5xl md:text-7xl font-medium mb-6 inline-block">
            <span className="relative">
              {displayText}
              {isTyping && (
                <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-zinc-900 animate-blink"></span>
              )}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-0 animate-fade-in animation-delay-1000 bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            We transform your vision into exceptional digital experiences that inspire, engage, and deliver results.
          </p>

          <div className="flex justify-center space-x-4 opacity-0 animate-fade-in animation-delay-1500">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"
            >
              Start a Project
            </a>
            <a 
              href="#services" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-zinc-900 border border-zinc-200 rounded-full hover:border-zinc-400 transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#services" className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
    </section>
  );
};

export default HeroSection;
