import { MetadataRoute } from 'next';

const locales = ['en', 'fr'];
const BASE_URL = 'https://cloudindustre.co.uk';

const modules = [
  'doctic',
  'mecanicpro',
  'madrassa',
  'wordex',
  'herboferme',
  'biggmag',
  'hospitalia',
  'gymxx'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/ecosystem', '/dashboard', '/solutions'];
  
  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Basic routes
    routes.forEach((route) => {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });

    // Modules
    modules.forEach((module) => {
      entries.push({
        url: `${BASE_URL}/${locale}/ecosystem/${module}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return entries;
}
