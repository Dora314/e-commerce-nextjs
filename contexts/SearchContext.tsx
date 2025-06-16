'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';
import { products } from '@/lib/data';

interface SearchState {
  query: string;
  results: Product[];
  isSearching: boolean;
  showResults: boolean;
}

interface SearchContextType {
  state: SearchState;
  search: (query: string) => void;
  clearSearch: () => void;
  hideResults: () => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    isSearching: false,
    showResults: false
  });

  const search = (query: string) => {
    setState(prev => ({ ...prev, query, isSearching: true }));

    if (query.trim() === '') {
      setState(prev => ({ 
        ...prev, 
        results: [], 
        isSearching: false, 
        showResults: false 
      }));
      return;
    }

    // Simulate search delay
    setTimeout(() => {
      const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setState(prev => ({
        ...prev,
        results: searchResults,
        isSearching: false,
        showResults: true
      }));
    }, 300);
  };

  const clearSearch = () => {
    setState({
      query: '',
      results: [],
      isSearching: false,
      showResults: false
    });
  };

  const hideResults = () => {
    setState(prev => ({ ...prev, showResults: false }));
  };

  return (
    <SearchContext.Provider value={{ state, search, clearSearch, hideResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};