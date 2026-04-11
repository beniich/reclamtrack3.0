import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/login', '/register'],
    },
    sitemap: 'https://cloudindustre.co.uk/sitemap.xml',
  };
}
