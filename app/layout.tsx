import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NamedByAI - AI-Powered Name Generator',
  description: 'Generate meaningful Chinese and English names using advanced AI technology',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}