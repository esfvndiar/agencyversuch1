import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

// Define form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<ContactFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-16 tracking-tight">
            <span className="inline-block">Let's </span>
            <span className="text-gradient inline-block">collaborate</span>
            <span className="inline-block"> on your next project</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <ScrollReveal animation="fade-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.name ? 'border-red-500' : 'border-zinc-300'
                  } px-3 py-2 text-zinc-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email ? 'border-red-500' : 'border-zinc-300'
                  } px-3 py-2 text-zinc-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.message ? 'border-red-500' : 'border-zinc-300'
                  } px-3 py-2 text-zinc-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-left">
            <div className="space-y-8 md:pl-10 lg:pl-16 border-l border-zinc-100 h-full hidden lg:block">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-3">Contact Details</h3>
                <div className="space-y-2">
                  <p className="text-zinc-600">hello@alavi.com</p>
                  <p className="text-zinc-600">+1 (234) 567-890</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-3">Office</h3>
                <address className="text-zinc-600 not-italic">
                  123 Design Street<br />
                  Creative District<br />
                  New York, NY 10001
                </address>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-3">Connect</h3>
                <div className="flex space-x-4">
                  {["Twitter", "Instagram", "LinkedIn"].map((social, i) => (
                    <a 
                      key={i}
                      href="#" 
                      className="text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
