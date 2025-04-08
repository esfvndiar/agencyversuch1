import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { 
  Code2, 
  Palette, 
  BarChart3, 
  Globe, 
  Smartphone, 
  Search, 
  Users, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  metrics: {
    clients: number;
    projects: number;
    satisfaction: number;
  };
  features: string[];
  caseStudy?: {
    title: string;
    description: string;
    image: string;
    results: string[];
  };
}

const SERVICES: Service[] = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies and best practices.",
    icon: <Code2 className="w-8 h-8" />,
    category: "Development",
    metrics: {
      clients: 150,
      projects: 200,
      satisfaction: 98
    },
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO Best Practices",
      "Cross-browser Compatibility"
    ],
    caseStudy: {
      title: "E-commerce Platform Redesign",
      description: "Revolutionized online shopping experience with improved performance and user interface.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80",
      results: [
        "40% increase in conversion rate",
        "60% faster page load times",
        "25% higher customer satisfaction"
      ]
    }
  },
  {
    title: "UI/UX Design",
    description: "User-centered design solutions that create engaging and intuitive digital experiences.",
    icon: <Palette className="w-8 h-8" />,
    category: "Design",
    metrics: {
      clients: 120,
      projects: 180,
      satisfaction: 99
    },
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems"
    ],
    caseStudy: {
      title: "Mobile App Redesign",
      description: "Transformed user experience with intuitive navigation and modern design.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      results: [
        "45% increase in user engagement",
        "30% reduction in bounce rate",
        "50% faster task completion"
      ]
    }
  },
  {
    title: "Digital Marketing",
    description: "Strategic marketing solutions that drive growth and increase brand visibility.",
    icon: <BarChart3 className="w-8 h-8" />,
    category: "Marketing",
    metrics: {
      clients: 200,
      projects: 300,
      satisfaction: 97
    },
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Analytics & Reporting"
    ],
    caseStudy: {
      title: "Brand Awareness Campaign",
      description: "Increased brand visibility and engagement through targeted marketing strategies.",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      results: [
        "200% increase in social media followers",
        "150% growth in website traffic",
        "80% higher brand recognition"
      ]
    }
  }
];

const CATEGORIES = ["All", "Development", "Design", "Marketing"];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500"
      style={{
        maxHeight: isExpanded ? '800px' : '400px',
        cursor: 'pointer'
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Service Header */}
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              {service.icon}
            </div>
            <div>
              <h3 className="text-xl font-medium text-zinc-900">{service.title}</h3>
              <span className="text-sm text-zinc-500">{service.category}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-6 h-6 text-zinc-400" />
          </motion.div>
        </div>
        
        <p className="text-zinc-600 mb-4">{service.description}</p>

        {/* Service Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-medium text-primary">{service.metrics.clients}+</div>
            <div className="text-sm text-zinc-500">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-primary">{service.metrics.projects}+</div>
            <div className="text-sm text-zinc-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-primary">{service.metrics.satisfaction}%</div>
            <div className="text-sm text-zinc-500">Satisfaction</div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2 mb-4">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study */}
      <AnimatePresence>
        {isExpanded && service.caseStudy && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-zinc-100"
          >
            <div className="p-6">
              <h4 className="text-lg font-medium text-zinc-900 mb-2">{service.caseStudy.title}</h4>
              <p className="text-zinc-600 mb-4">{service.caseStudy.description}</p>
              
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden group">
                <img
                  src={service.caseStudy.image}
                  alt={service.caseStudy.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="space-y-2">
                {service.caseStudy.results.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 text-zinc-600">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredServices = selectedCategory === "All"
    ? SERVICES
    : SERVICES.filter(service => service.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-gradient-to-b from-zinc-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600">
            Our Services
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs, delivered with expertise and innovation.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
