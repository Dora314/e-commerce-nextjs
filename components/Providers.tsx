"use client";

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { SearchProvider } from '@/contexts/SearchContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
