'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, User, Heart, LogOut, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from '@/components/SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const { state: authState, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

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
            {authState.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                    {authState.user?.avatar ? (
                      <img
                        src={authState.user.avatar}
                        alt={authState.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{authState.user?.name}</p>
                    <p className="text-xs text-slate-500">{authState.user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {authState.user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

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
                
                {/* Mobile Auth */}
                {authState.isAuthenticated ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    {authState.user?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="text-slate-600 hover:text-slate-900 font-medium py-2 transition-colors flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-600 hover:text-red-700 font-medium py-2 transition-colors flex items-center gap-2 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}