'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const isProductInWishlist = isInWishlist(product.id);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "The product link has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Failed to copy link",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      });
    });
  };

  const handleSendEmail = () => {
    const email = 'bekhicute1001@gmail.com';
    const subject = `Inquiry about ${product.name}`;
    const body = `Hello, I'm interested in the product "${product.name}" (ID: ${product.id}).\n\nProduct page: ${window.location.href}\n\n[Your message here]`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to add products to cart",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock",
        variant: "destructive",
      });
      return;
    }

    addToCart({
        productId: product.id,
        quantity: quantity,
        name: product.name,
        stock: product.stock,
    });

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
      variant: "default",
    });
  };

  const handleWishlistToggle = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to add products to wishlist",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
        variant: "default",
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
        variant: "default",
      });
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto py-12 px-4" data-testid="product-details-main">
      {/* Product Images */}
      <div className="grid gap-4">
        <div className="aspect-square rounded-lg overflow-hidden border">
          <Image
            src={product.images[selectedImage] || product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-slate-900' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <Badge className="mb-3">{product.category}</Badge>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-slate-600">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-2xl text-slate-500 line-through">${product.originalPrice}</span>
                <Badge variant="destructive">Save {discountPercentage}%</Badge>
              </>
            )}
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            {product.description}
          </p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={product.stock > 0 ? 'text-green-700' : 'text-red-700'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              data-testid="add-to-cart-button"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button size="lg" variant="outline" className="w-16" onClick={handleWishlistToggle}>
              <Heart className={`h-5 w-5 ${isProductInWishlist ? 'fill-current' : ''}`} />
            </Button>
            
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="lg" onClick={handleSendEmail} className="border-purple-300 text-purple-700">
              <Mail className="h-5 w-5 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center">
            <Truck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Free Shipping</p>
            <p className="text-xs text-slate-600">On orders over $100</p>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Quality Guarantee</p>
            <p className="text-xs text-slate-600">Premium products</p>
          </div>
          <div className="text-center">
            <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Easy Returns</p>
            <p className="text-xs text-slate-600">30-day policy</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                This premium product combines exceptional quality with innovative design. 
                Crafted with attention to detail and built to last, it represents the perfect 
                balance of functionality and style.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Category:</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">SKU:</dt>
                    <dd className="font-medium">{product.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Stock:</dt>
                    <dd className="font-medium">{product.stock} units</dd>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-slate-600">Tags:</dt>
                      <dd className="font-medium">{product.tags.join(', ')}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div className="flex justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">{product.reviews} reviews</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">John D.</span>
                    <span className="text-slate-500 text-sm">2 days ago</span>
                  </div>
                  <p className="text-slate-600">
                    Excellent product! The quality exceeds expectations and delivery was super fast.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}