import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'View Atlantic Catering\'s portfolio of successful projects across offshore operations, corporate catering, and premium events in Ghana.',
  openGraph: {
    title: 'Our Portfolio | Atlantic Catering & Logistics',
    description: 'View Atlantic Catering\'s portfolio of successful projects across offshore operations, corporate catering, and premium events.',
    images: [{ url: '/images/og-portfolio.jpg', width: 1200, height: 630, alt: 'Atlantic Catering Portfolio' }],
  },
};