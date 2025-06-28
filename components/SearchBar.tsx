'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearch } from '@/contexts/SearchContext';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ className, placeholder = "Search products..." }: SearchBarProps) {
  const { state, search, clearSearch, hideResults } = useSearch();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        hideResults();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    search(value);
  };

  const handleClear = () => {
    setInputValue('');
    clearSearch();
  };

  const handleResultClick = () => {
    hideResults();
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <Input
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="pr-10"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-testid="search-input"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        {state.isSearching ? (
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleClear}
            data-testid="clear-search-button"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      {isFocused && (inputValue.length > 2 || state.results.length > 0) && (
        <div
          data-testid="search-results"
          className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border z-10 max-h-96 overflow-y-auto"
        >
          {state.results.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  Found {state.results.length} result{state.results.length !== 1 ? 's' : ''} for "{state.query}"
                </p>
              </div>
              <div className="py-2">
                {state.results.slice(0, 8).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    data-testid="search-result-item"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <span className="font-bold text-slate-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {state.results.length > 8 && (
                  <div className="px-4 py-3 border-t border-gray-100">
                    <Link
                      href={`/products?search=${encodeURIComponent(state.query)}`}
                      onClick={handleResultClick}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all {state.results.length} results →
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : state.query && !state.isSearching ? (
            <div className="p-6 text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No products found for "{state.query}"</p>
              <p className="text-sm text-gray-500">Try different keywords or browse our categories</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}