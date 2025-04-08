
import React from 'react';
import { CheckCircle, Users, Award, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import AnimatedText from './AnimatedText';

const AboutSection: React.FC = () => {
  const stats = [
    { icon: Users, value: '150+', label: 'Clients' },
    { icon: Award, value: '200+', label: 'Projects' },
    { icon: Clock, value: '10+', label: 'Years Experience' }
  ];
  
  return (
    <section id="about" className="py-20 md:py-32 relative bg-gradient-to-b from-midblue to-deepblue">
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-mintgreen/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-cyberblue/10 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-cyberblue to-mintgreen opacity-80 absolute inset-0 z-0" />
                <div className="p-10 md:p-16 relative z-10">
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                    Who We Are
                  </h3>
                  
                  <p className="text-white/90 mb-6">
                    A team of passionate digital experts committed to delivering exceptional results. With over a decade of experience, we combine creativity with technical expertise to build solutions that drive growth.
                  </p>
                  
                  <div className="space-y-3">
                    {['Innovative Solutions', 'Client-Focused Approach', 'Technical Excellence', 'Creative Design'].map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -left-5 w-20 h-20 border-l-4 border-t-4 border-cyberblue opacity-70" />
              <div className="absolute -bottom-5 -right-5 w-20 h-20 border-r-4 border-b-4 border-mintgreen opacity-70" />
            </div>
          </ScrollReveal>
          
          <div className="space-y-8">
            <ScrollReveal delay={200}>
              <div className="mb-4 inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-sm font-medium text-gradient">Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                <span className="text-white">Bringing Your </span>
                <span className="text-gradient">Digital Vision</span>
                <span className="text-white"> To Life</span>
              </h2>
              
              <AnimatedText 
                text="We are a full-service IT agency specializing in creating exceptional digital experiences. Our expertise spans web design, development, mobile applications, marketing, and strategic consulting."
                className="text-lg text-white/70 mb-6"
              />
              
              <p className="text-white/70">
                Our approach combines technical excellence with creative innovation to deliver solutions that not only meet but exceed client expectations. We believe in collaborative partnerships and transparent communication throughout every project.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="grid grid-cols-3 gap-6 mt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-gradient" />
                      <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-white/70">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
