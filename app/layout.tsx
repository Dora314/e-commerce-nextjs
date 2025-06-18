'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { SearchProvider } from '@/contexts/SearchContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SearchProvider>
            <WishlistProvider>
              <CartProvider>
                <div className="min-h-screen flex flex-col">
                  {!isAdminPage && <Header />}
                  <main className="flex-1">
                    {children}
                  </main>
                  {!isAdminPage && <Footer />}
                </div>
              </CartProvider>
            </WishlistProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}