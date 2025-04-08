import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SEO } from '@/lib/constants';

// Lazy load sections
const HeroSection = React.lazy(() => import('@/components/HeroSection'));
const ServicesSection = React.lazy(() => import('@/components/ServicesSection'));
const AboutSection = React.lazy(() => import('@/components/AboutSection'));
const ContactSection = React.lazy(() => import('@/components/ContactSection'));

// Loading component for sections
const SectionLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading section">
    <div className="animate-pulse text-zinc-400">Loading...</div>
  </div>
);

const Index: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize IntersectionObserver for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-lg"
        >
          Skip to main content
        </a>

        <Navbar />
        
        <main id="main-content" className="relative">
          <React.Suspense fallback={<SectionLoader />}>
            <HeroSection ref={(el) => (sectionRefs.current[0] = el)} />
            <ServicesSection ref={(el) => (sectionRefs.current[1] = el)} />
            <AboutSection ref={(el) => (sectionRefs.current[2] = el)} />
            <ContactSection ref={(el) => (sectionRefs.current[3] = el)} />
          </React.Suspense>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
