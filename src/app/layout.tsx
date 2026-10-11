import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://promisegeorge.com'),
  alternates: { canonical: '/' },
  openGraph: { title: site.title, description: site.description, type: 'website', images: ['/images/promise-george-portrait.png'] },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/images/promise-george-portrait.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
