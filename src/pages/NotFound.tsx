import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { logError } from '@/lib/error-logging';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Log error to error tracking service instead of console
    logError({
      type: '404_error',
      message: 'User attempted to access non-existent route',
      data: {
        path: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 py-12 bg-card rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
