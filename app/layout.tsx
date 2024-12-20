import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'AI Name Generator | Create Perfect Chinese & English Names',
  description: 'Discover the perfect name with our AI-powered name generator. Create meaningful Chinese names and stylish English names instantly. Smart, cultural, and personalized name suggestions.',
  keywords: 'name generator, Chinese names, English names, AI names, baby names, business names',
  openGraph: {
    title: 'AI Name Generator | Create Perfect Chinese & English Names',
    description: 'Create meaningful Chinese names and stylish English names with AI. Smart, cultural, and personalized name suggestions.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}