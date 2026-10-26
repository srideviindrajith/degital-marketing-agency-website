import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/forgot-password', '/accept-invitation'],
    },
    sitemap: 'https://lumen.agency/sitemap.xml',
  };
}