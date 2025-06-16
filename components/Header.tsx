'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import SearchBar from '@/components/SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-slate-800 hover:text-slate-600 transition-colors">
            EliteStore
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/deals" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Deals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                <Heart className="h-5 w-5" />
                {wishlistState.itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {wishlistState.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartState.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <SearchBar placeholder="Search products..." />
              
              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/products" 
                  className="text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/categories" 
                  className="text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/deals" 
                  className="text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <Link 
                  href="/wishlist" 
                  className="text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4" />
                  Wishlist {wishlistState.itemCount > 0 && `(${wishlistState.itemCount})`}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}