import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Lumen — Turn Attention Into Growth',
    template: '%s · Lumen',
  },
  description:
    'We combine strategy, creative, technology and data to help businesses attract customers, generate leads and grow with confidence.',
  keywords: [
    'digital marketing agency',
    'SEO',
    'Google Ads',
    'Meta Ads',
    'social media marketing',
    'branding',
    'web design',
    'content marketing',
  ],
  authors: [{ name: 'Lumen' }],
  openGraph: {
    title: 'Lumen — Turn Attention Into Growth',
    description:
      'A digital marketing agency combining strategy, creative, technology and data to help businesses grow.',
    type: 'website',
    siteName: 'Lumen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumen — Turn Attention Into Growth',
    description:
      'A digital marketing agency combining strategy, creative, technology and data to help businesses grow.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <div className="bg-fixed-wrapper">
          <div className="bg-overlay" />
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
