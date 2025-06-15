'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Grid, List, Filter } from 'lucide-react';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Categories</h1>
        <p className="text-xl text-slate-600">
          Explore our diverse range of product categories
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <Badge variant="outline">
            {filteredCategories.length} categories found
          </Badge>
        </div>
      </div>

      {/* Categories */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
        : "space-y-6"
      }>
        {filteredCategories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <div className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
              viewMode === 'list' ? 'flex items-center' : ''
            }`}>
              <div className={`relative overflow-hidden bg-gray-50 ${
                viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-[4/3]'
              }`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                </div>
              </div>

              <div className="p-6 flex-1">
                {viewMode === 'list' && (
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                )}
                <p className="text-slate-600 mb-4">{category.description}</p>
                <Button variant="outline" size="sm">
                  Explore Category
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No categories found matching your search</p>
        </div>
      )}
    </div>
  );
}