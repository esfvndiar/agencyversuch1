// Navigation
export const NAV_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '#services' },
  { title: 'Work', href: '#work' },
  { title: 'Contact', href: '#contact' }
] as const;

// Scroll behavior
export const SCROLL_THRESHOLD = 20;
export const SCROLL_UPDATE_THRESHOLD = 5;
export const DEBOUNCE_DELAY = 25;

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  medium: 250,
  slow: 300,
  verySlow: 400
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

// Colors
export const COLORS = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  muted: 'var(--muted)',
  accent: 'var(--accent)',
  destructive: 'var(--destructive)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  card: 'var(--card)',
  popover: 'var(--popover)'
} as const;

// Z-index layers
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
} as const;

// API endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact',
  services: '/api/services',
  work: '/api/work'
} as const;

// Form validation
export const FORM_VALIDATION = {
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
  },
  name: {
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  },
  message: {
    minLength: 10,
    maxLength: 500,
    message: 'Message must be between 10 and 500 characters'
  }
} as const;

// SEO
export const SEO = {
  title: 'ALAVI - Digital Agency',
  description: 'We create beautiful and functional digital experiences',
  keywords: 'digital agency, web design, web development, branding, UI/UX',
  author: 'ALAVI',
  ogImage: '/og-image.jpg',
  twitterHandle: '@alaviagency'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again later.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  server: 'Server error. Please try again later.'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  contact: 'Thank you for your message. We will get back to you soon.',
  subscription: 'Thank you for subscribing to our newsletter.'
} as const; 