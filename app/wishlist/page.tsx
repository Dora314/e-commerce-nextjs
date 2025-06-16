'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

export default function WishlistPage() {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const removeFromWishlist = (productId: string) => {
    wishlistDispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const addToCart = (product: any) => {
    cartDispatch({ type: 'ADD_ITEM', payload: product });
  };

  const moveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistState.items.length === 0) {
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
        <p className="text-slate-600 mt-2">{wishlistState.itemCount} {wishlistState.itemCount === 1 ? 'item' : 'items'} saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistState.items.map((product) => (
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
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg text-slate-900 mb-2 hover:text-slate-700 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-xl text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => moveToCart(product)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                  size="sm"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p className={`text-xs mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-slate-50 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Ready to shop?</h3>
            <p className="text-slate-600 text-sm">Move all available items to your cart</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => wishlistDispatch({ type: 'CLEAR_WISHLIST' })}
            >
              Clear Wishlist
            </Button>
            <Button
              onClick={() => {
                wishlistState.items.forEach(product => {
                  if (product.stock > 0) {
                    addToCart(product);
                  }
                });
                wishlistDispatch({ type: 'CLEAR_WISHLIST' });
              }}
              className="bg-slate-900 hover:bg-slate-800"
            >
              Add All to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}