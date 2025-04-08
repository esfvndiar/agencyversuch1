
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Smooth scroll setup
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Parallax effect for background elements
      document.documentElement.style.setProperty('--scroll', scrollY.toString());
      
      // Intersection Observer for scroll animations
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all elements with the reveal-on-scroll class
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set positions

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-white via-white to-zinc-50 -z-10"></div>
      <div className="fixed inset-0 opacity-20 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      </div>
      
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
