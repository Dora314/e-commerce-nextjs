'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const shippingAddressSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  street: z.string().min(3, { message: 'Street address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  state: z.string().min(2, { message: 'State/Province is required.' }),
  zipCode: z.string().min(4, { message: 'A valid ZIP/Postal code is required.' }),
  country: z.string().min(2, { message: 'Country is required.' }),
  phone: z.string().min(10, { message: 'A valid phone number is required.' }),
});

const checkoutFormSchema = z.object({
  shippingAddress: shippingAddressSchema,
  shippingMethod: z.enum(['Standard', 'Express'], { required_error: 'You need to select a shipping method.' }),
  paymentMethod: z.enum(['CreditCard', 'PayPal'], { required_error: 'You need to select a payment method.' }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

function CheckoutPageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { cart, itemCount, total: cartTotal, clearCart, isLoading: isCartLoading } = useCart();
  const { token, isLoading: isAuthLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingCost, setShippingCost] = useState(10.00);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: {
        fullName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        phone: '',
      },
      shippingMethod: 'Standard',
      paymentMethod: 'CreditCard',
    },
  });

  useEffect(() => {
    if (!isAuthLoading && !token) {
      router.push('/login?redirect=/checkout');
    }
    // Redirect if cart is empty, but not while an order is being submitted
    if (!isCartLoading && itemCount === 0 && !isSubmitting) {
        toast({ title: 'Your cart is empty', description: 'Please add items to your cart before checking out.', variant: 'destructive' });
        router.push('/products');
    }
  }, [token, itemCount, isAuthLoading, isCartLoading, router, toast, isSubmitting]);

  const finalTotal = cartTotal + shippingCost;

  const handleShippingChange = (value: string) => {
    const newCost = value === 'Express' ? 20.00 : 10.00;
    setShippingCost(newCost);
    form.setValue('shippingMethod', value as 'Standard' | 'Express');
  };

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);
    if (!token) {
        toast({ title: 'Authentication Error', description: 'You must be logged in to place an order.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to place order.');
      }

      toast({ title: 'Order Placed!', description: 'Thank you for your purchase. You will be redirected shortly.' });
      clearCart();
      router.push(`/profile`);

    } catch (error: any) {
      toast({ title: 'Checkout Failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthLoading || isCartLoading) {
      return <div className="container mx-auto px-4 py-8 text-center">Loading checkout...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Form {...form}>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="shippingAddress.fullName" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="shippingAddress.street" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="shippingAddress.city" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="New York" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="shippingAddress.state" render={({ field }) => (<FormItem><FormLabel>State / Province</FormLabel><FormControl><Input placeholder="NY" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="shippingAddress.zipCode" render={({ field }) => (<FormItem><FormLabel>ZIP / Postal Code</FormLabel><FormControl><Input placeholder="10001" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="shippingAddress.country" render={({ field }) => (<FormItem><FormLabel>Country</FormLabel><FormControl><Input placeholder="USA" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="shippingAddress.phone" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Shipping Method</CardTitle></CardHeader>
                    <CardContent>
                        <FormField control={form.control} name="shippingMethod" render={({ field }) => (<FormItem className="space-y-3"><FormControl><RadioGroup onValueChange={handleShippingChange} defaultValue={field.value} className="flex flex-col space-y-1">
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Standard" /></FormControl><FormLabel className="font-normal">Standard Shipping (5-7 days) - $10.00</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Express" /></FormControl><FormLabel className="font-normal">Express Shipping (1-2 days) - $20.00</FormLabel></FormItem>
                        </RadioGroup></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
                    <CardContent>
                       <FormField control={form.control} name="paymentMethod" render={({ field }) => (<FormItem className="space-y-3"><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="CreditCard" /></FormControl><FormLabel className="font-normal">Credit Card</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="PayPal" /></FormControl><FormLabel className="font-normal">PayPal</FormLabel></FormItem>
                        </RadioGroup></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between"><p>Subtotal</p><p>${cartTotal.toFixed(2)}</p></div>
                        <div className="flex justify-between"><p>Shipping</p><p>${shippingCost.toFixed(2)}</p></div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg"><p>Total</p><p>${finalTotal.toFixed(2)}</p></div>
                        </CardContent>
                        <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting || isCartLoading || itemCount === 0}>
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </Form>
    </div>
  );
}

// We wrap the page in providers to ensure the hooks have access to the context.
export default function CheckoutPage() {
    return (
        <CheckoutPageContent />
    );
}
