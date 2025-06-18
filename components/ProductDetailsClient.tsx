'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
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
  
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: authState } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!authState.isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (product.stock === 0) {
      toast({
        title: "Hết hàng",
        description: "Sản phẩm này hiện đã hết hàng",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      cartDispatch({ type: 'ADD_ITEM', payload: product });
    }

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name} đã được thêm vào giỏ hàng`,
      variant: "default",
    });
  };

  const handleWishlistToggle = () => {
    // Check if user is authenticated
    if (!authState.isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: `${product.name} đã được xóa khỏi danh sách yêu thích`,
        variant: "default",
      });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `${product.name} đã được thêm vào danh sách yêu thích`,
        variant: "default",
      });
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
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
                <span className="text-slate-600">({product.reviews} đánh giá)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-slate-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-slate-500 line-through">${product.originalPrice}</span>
                  <Badge variant="destructive">Tiết kiệm {discountPercentage}%</Badge>
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
              {product.stock > 0 ? `${product.stock} còn lại` : 'Hết hàng'}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Số lượng:</label>
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
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWishlistToggle}
                className={isInWishlist ? 'bg-red-50 text-red-600 border-red-200' : ''}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
              
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <Truck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Miễn phí vận chuyển</p>
              <p className="text-xs text-slate-600">Đơn hàng trên $100</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Bảo hành chất lượng</p>
              <p className="text-xs text-slate-600">Sản phẩm cao cấp</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Đổi trả dễ dàng</p>
              <p className="text-xs text-slate-600">Chính sách 30 ngày</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="specifications">Thông số</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description}
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Sản phẩm cao cấp này kết hợp chất lượng đặc biệt với thiết kế sáng tạo. 
                Được chế tác tỉ mỉ và xây dựng để tồn tại lâu dài, nó đại diện cho sự cân bằng hoàn hảo 
                giữa chức năng và phong cách.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Chi tiết sản phẩm</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Danh mục:</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">SKU:</dt>
                    <dd className="font-medium">{product.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Tồn kho:</dt>
                    <dd className="font-medium">{product.stock} sản phẩm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Tags:</dt>
                    <dd className="font-medium">{product.tags.join(', ')}</dd>
                  </div>
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
                  <div className="text-sm text-slate-600">{product.reviews} đánh giá</div>
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
                    <span className="font-medium">Nguyễn Văn A</span>
                    <span className="text-slate-500 text-sm">2 ngày trước</span>
                  </div>
                  <p className="text-slate-600">
                    Sản phẩm tuyệt vời! Chất lượng vượt mong đợi và giao hàng rất nhanh.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Sản phẩm liên quan</h2>
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