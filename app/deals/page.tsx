'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Percent, Clock, Flame, TrendingDown } from 'lucide-react';

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('discount');

  // Filter products that have original prices (deals)
  let dealProducts = products.filter(product => product.originalPrice);

  // Apply search filter
  if (searchTerm) {
    dealProducts = dealProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Calculate discount percentage and sort
  const productsWithDiscount = dealProducts.map(product => ({
    ...product,
    discountPercentage: product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0,
    savings: product.originalPrice ? product.originalPrice - product.price : 0
  }));

  // Apply sorting
  productsWithDiscount.sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discountPercentage - a.discountPercentage;
      case 'savings':
        return b.savings - a.savings;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.discountPercentage - a.discountPercentage;
    }
  });

  const totalSavings = productsWithDiscount.reduce((sum, product) => sum + product.savings, 0);
  const averageDiscount = productsWithDiscount.length > 0 
    ? Math.round(productsWithDiscount.reduce((sum, product) => sum + product.discountPercentage, 0) / productsWithDiscount.length)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative px-8 py-16 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="h-8 w-8 text-yellow-400" />
            <h1 className="text-5xl font-bold">Hot Deals</h1>
            <Flame className="h-8 w-8 text-yellow-400" />
          </div>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't miss out on these incredible savings! Limited time offers on premium products.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{productsWithDiscount.length}</div>
              <div className="text-sm text-white/80">Active Deals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{averageDiscount}%</div>
              <div className="text-sm text-white/80">Avg Discount</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">${totalSavings.toFixed(0)}</div>
              <div className="text-sm text-white/80">Total Savings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white text-center">
          <Percent className="h-8 w-8 mx-auto mb-2" />
          <h3 className="font-semibold">Up to 50% Off</h3>
          <p className="text-sm text-red-100">Electronics</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white text-center">
          <Clock className="h-8 w-8 mx-auto mb-2" />
          <h3 className="font-semibold">Flash Sale</h3>
          <p className="text-sm text-blue-100">24 Hours Only</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white text-center">
          <TrendingDown className="h-8 w-8 mx-auto mb-2" />
          <h3 className="font-semibold">Price Drop</h3>
          <p className="text-sm text-green-100">Fashion Items</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white text-center">
          <Flame className="h-8 w-8 mx-auto mb-2" />
          <h3 className="font-semibold">Hot Deals</h3>
          <p className="text-sm text-purple-100">Limited Stock</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Highest Discount</SelectItem>
              <SelectItem value="savings">Biggest Savings</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* Results Count */}
          <div className="flex items-center">
            <Badge variant="outline" className="text-sm">
              {productsWithDiscount.length} deals found
            </Badge>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {productsWithDiscount.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsWithDiscount.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Percent className="h-16 w-16 text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">No deals found</h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your search criteria or check back later for new deals
          </p>
          <Button onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Never Miss a Deal</h2>
        <p className="text-xl text-slate-300 mb-6">
          Subscribe to get notified about flash sales and exclusive offers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}