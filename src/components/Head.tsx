import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const Head: React.FC<HeadProps> = ({
  title = 'ALAVI - Digital Agency',
  description = 'Crafting exceptional digital experiences that inspire, engage, and deliver results.',
  image = '/og-image.jpg',
  url = 'https://alavi.com',
  type = 'website'
}) => {
  const siteTitle = title.includes('ALAVI') ? title : `${title} | ALAVI`;
  const fullUrl = url.startsWith('http') ? url : `https://alavi.com${url}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#ffffff" />
      
      {/* Additional Meta Tags */}
      <meta name="keywords" content="web design, web development, mobile apps, branding, digital agency" />
      <meta name="author" content="ALAVI" />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default Head; 