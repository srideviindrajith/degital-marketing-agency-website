import type { MetadataRoute } from 'next';
import { services } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lumen.agency';
  const routes = [
    '',
    '/services',
    '/portfolio',
    '/pricing',
    '/about',
    '/insights',
    '/contact',
    '/login',
    '/privacy',
    '/terms',
  ];
  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  return [...routes, ...serviceRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));
}