'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistPage() {
  const { wishlist, itemCount, isLoading, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const moveToCart = (product: Product) => {
    addToCart({ 
      productId: product.id, 
      quantity: 1, 
      stock: product.stock, 
      name: product.name 
    });
    removeFromWishlist(product.id);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-32 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <Skeleton className="w-full aspect-square" />
                    <div className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-8 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (!isLoading && wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart className="h-24 w-24 text-slate-300 mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Your wishlist is empty</h1>
          <p className="text-slate-600 mb-8">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
        <p className="text-slate-600 mt-2">{itemCount} {itemCount === 1 ? 'item' : 'items'} saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 flex flex-col h-full">
               <div className="flex-grow">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2 hover:text-slate-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-xl text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <Button
                  onClick={() => moveToCart(product)}
                  className="w-full bg-slate-900 hover:bg-slate-800"
                  disabled={product.stock === 0}
                >
                   {product.stock === 0 ? 'Out of Stock' : (
                     <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Move to Cart
                     </>
                   )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}