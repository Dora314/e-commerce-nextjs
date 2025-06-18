'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { state: authState } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const updateQuantity = (id: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    toast({
      title: "Đã cập nhật số lượng",
      description: "Số lượng sản phẩm đã được cập nhật",
      variant: "default",
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng",
      variant: "default",
    });
  };

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để tiến hành thanh toán",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    toast({
      title: "Chuyển đến thanh toán",
      description: "Đang chuyển hướng đến trang thanh toán...",
      variant: "default",
    });
    // Here you would redirect to checkout page
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-8" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Giỏ hàng trống</h1>
          <p className="text-slate-600 mb-8">
            Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Tiếp tục mua sắm
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
          Tiếp tục mua sắm
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Giỏ hàng</h1>
        <p className="text-slate-600 mt-2">{state.itemCount} {state.itemCount === 1 ? 'sản phẩm' : 'sản phẩm'} trong giỏ hàng</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {state.items.map((item) => (
            <div key={item.product.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={120}
                    height={120}
                    className="w-30 h-30 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        <Link href={`/products/${item.product.id}`} className="hover:text-slate-700">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-slate-600 text-sm">{item.product.category}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.product.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-600">
                        ${item.product.price.toFixed(2)} mỗi cái
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Tạm tính</span>
                <span className="font-medium">${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Phí vận chuyển</span>
                <span className="font-medium text-emerald-600">
                  {state.total >= 100 ? 'MIỄN PHÍ' : '$9.99'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Thuế</span>
                <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span>${(state.total + (state.total >= 100 ? 0 : 9.99) + (state.total * 0.08)).toFixed(2)}</span>
              </div>
            </div>

            {state.total < 100 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-emerald-800">
                  Thêm ${(100 - state.total).toFixed(2)} để được <strong>MIỄN PHÍ vận chuyển!</strong>
                </p>
              </div>
            )}

            <Button 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white mb-4" 
              size="lg"
              onClick={handleCheckout}
            >
              Tiến hành thanh toán
            </Button>
            
            <Link href="/products">
              <Button variant="outline" className="w-full" size="lg">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}