import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TYPING_VARIATIONS = [
  'Digital Excellence',
  'Creative Innovation',
  'Brand Transformation',
  'Web Development',
  'UI/UX Design'
];

const Particle: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
}> = ({ x, y, size, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
    className="absolute bg-primary/10 rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size
    }}
  />
);

const HeroSection: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const fullText = TYPING_VARIATIONS[currentIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        if (currentText === '') {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % TYPING_VARIATIONS.length;
        }
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        if (currentText === fullText) {
          timeout = setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      }

      setDisplayedText(currentText);
      timeout = setTimeout(type, typingSpeed);
    };

    type();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        inViewRef(node);
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-50 to-white"
      style={{ y, opacity }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle
            key={i}
            x={Math.random() * 100}
            y={Math.random() * 100}
            size={Math.random() * 4 + 2}
            delay={Math.random() * 2}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 
            className="text-5xl md:text-7xl font-display font-medium mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600"
            id="hero-title"
            aria-label="Welcome to ALAVI Digital Agency"
          >
            We Create
            <span className="block text-primary relative">
              {displayedText}
              <span className="inline-block w-0.5 h-8 bg-primary animate-pulse ml-1" aria-hidden="true" />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences through innovative design and cutting-edge technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 overflow-hidden"
              role="button"
              aria-label="Get Started"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowRight className="w-5 h-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <a
              href="#services"
              className="group px-8 py-4 text-zinc-900 hover:text-primary transition-colors duration-300 flex items-center gap-2"
              role="button"
              aria-label="Explore Our Services"
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
