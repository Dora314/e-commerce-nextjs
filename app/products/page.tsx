'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';

export default function ProductsPage() {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { state: searchState } = useSearch();

  // Use search context if available, otherwise use local search
  const searchTerm = searchState.query || localSearchTerm;

  let filteredProducts = products;

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // Apply category filter
  if (categoryFilter !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === categoryFilter
    );
  }

  // Apply price filter
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => {
      if (max) {
        return product.price >= min && product.price <= max;
      } else {
        return product.price >= min;
      }
    });
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Products</h1>
        <p className="text-xl text-slate-600">
          Discover our complete collection of premium products
        </p>
        {searchTerm && (
          <p className="text-slate-600 mt-2">
            Showing results for "<strong>{searchTerm}</strong>"
          </p>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Local Search (only show if not using global search) */}
          {!searchState.query && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
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
              <SelectItem value="name">Name A-Z</SelectItem>
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

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {filteredProducts.length} products found
            </Badge>
            {(categoryFilter !== 'all' || priceRange !== 'all' || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceRange('all');
                  setLocalSearchTerm('');
                }}
                className="text-slate-600 hover:text-slate-900"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your search criteria or browse our categories
          </p>
          <Button onClick={() => {
            setCategoryFilter('all');
            setPriceRange('all');
            setLocalSearchTerm('');
          }}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredProducts.length > 0 && filteredProducts.length >= 20 && (
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  );
}