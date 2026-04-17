import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/login', '/register'],
    },
    sitemap: 'https://cloudindustry.co.uk/sitemap.xml',
  };
}
