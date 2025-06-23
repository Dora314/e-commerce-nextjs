'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { CartItem } from '@/types/product';

export default function CartPage() {
  const { cart, itemCount, isLoading, updateItemQuantity, removeItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckout = () => {
    // The auth check is handled by the context/API, but we can keep a client-side check for immediate feedback
    if (cart.length === 0) {
        toast({ title: "Your cart is empty", description: "Add items to your cart before checking out.", variant: "destructive" });
        return;
    }
    
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting...",
    });
    router.push('/checkout'); // Navigate to a future checkout page
  };

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-32 mt-2" />
            </div>
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex gap-6">
                            <Skeleton className="w-30 h-30 rounded-lg" />
                            <div className="flex-1">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/4 mb-4" />
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-10 w-24" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-slate-50 rounded-lg p-6 sticky top-8">
                        <Skeleton className="h-8 w-3/4 mb-6" />
                        <div className="space-y-4 mb-6">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
  }

  if (!isLoading && cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-slate-600 mb-8">
            Looks like you haven't added any items to your cart yet.
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

  // Calculate totals on the client-side for immediate feedback
  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
          <p className="text-slate-600 mt-1">You have {itemCount} items in your cart.</p>
        </div>
        <Link href="/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item: CartItem) => (
            <div key={item.id} data-testid="cart-item" className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-32 h-32 flex-shrink-0">
                <Image
                  src={item.product.image || '/placeholder.svg'}
                  alt={item.product.name}
                  width={128}
                  height={128}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div>
                  <Link href={`/products/${item.product.id}`} className="font-semibold text-lg text-slate-900 hover:text-slate-700">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-slate-500">
                    {item.product.category}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-auto">
                  <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="rounded-full h-8 w-8"
                      onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="rounded-full h-8 w-8"
                      onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-lg text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-red-600"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-3 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between text-xl font-bold text-slate-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button 
              data-testid="checkout-button"
              size="lg" 
              className="w-full mt-6 bg-slate-900 hover:bg-slate-800" 
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}