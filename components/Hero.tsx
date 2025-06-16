import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10" />
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-slate-300">
                Trusted by 50,000+ customers
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Quality,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                Exceptional
              </span>{' '}
              Experience
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Discover our carefully curated collection of premium products. 
              From cutting-edge electronics to stylish fashion, we bring you quality that exceeds expectations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/products">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="border-white text-black hover:text-white hover:text-slate-900 px-8">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold">Quality Guaranteed</p>
                  <p className="text-sm text-slate-400">Premium products only</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-slate-400">On orders over $100</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <div>
                  <p className="font-semibold">5-Star Service</p>
                  <p className="text-sm text-slate-400">Customer satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Premium Headphones"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Smart Watch"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fashion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Home Decor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}