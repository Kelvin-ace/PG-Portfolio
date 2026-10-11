import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.promisegeorge.online';
  return [{ url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
