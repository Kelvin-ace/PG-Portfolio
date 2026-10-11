import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.promisegeorge.online'),
  alternates: { canonical: '/' },
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
    siteName: site.name,
    images: [{ url: '/images/promise-george-social-preview.png', width: 1200, height: 630, alt: 'Promise George, entrepreneur and brand builder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [{ url: '/images/promise-george-social-preview.png', alt: 'Promise George, entrepreneur and brand builder' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
