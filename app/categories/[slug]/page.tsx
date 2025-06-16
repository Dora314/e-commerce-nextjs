'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  let categoryProducts = products.filter(product => 
    product.category.toLowerCase() === category.name.toLowerCase()
  );

  // Apply search filter
  if (searchTerm) {
    categoryProducts = categoryProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply price filter
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    categoryProducts = categoryProducts.filter(product => {
      if (max) {
        return product.price >= min && product.price <= max;
      } else {
        return product.price >= min;
      }
    });
  }

  // Apply sorting
  categoryProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviews - a.reviews;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/categories" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </div>

      {/* Category Header */}
      <div className="relative mb-12 rounded-2xl overflow-hidden">
        <div className="aspect-[3/1] bg-gradient-to-r from-slate-900 to-slate-700">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl text-white/90 mb-6">{category.description}</p>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                {categoryProducts.length} products available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Price Range */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-100">$0 - $100</SelectItem>
              <SelectItem value="100-300">$100 - $300</SelectItem>
              <SelectItem value="300-500">$300 - $500</SelectItem>
              <SelectItem value="500">$500+</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Filter className="h-16 w-16 text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => {
            setSearchTerm('');
            setPriceRange('all');
            setSortBy('newest');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}