'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product } from '@/types/product';
import debounce from 'lodash.debounce';

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

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === '') {
        setState(prev => ({ 
          ...prev, 
          results: [], 
          isSearching: false, 
          showResults: false 
        }));
        return;
      }

      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Search request failed');
        }
        const searchResults = await response.json();
        setState(prev => ({
          ...prev,
          results: searchResults,
          isSearching: false,
          showResults: true
        }));
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setState(prev => ({
          ...prev,
          results: [],
          isSearching: false,
          showResults: true // Show no results found
        }));
      }
    }, 300), // 300ms debounce delay
    []
  );

  const search = (query: string) => {
    setState(prev => ({ ...prev, query, isSearching: true }));
    debouncedSearch(query);
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