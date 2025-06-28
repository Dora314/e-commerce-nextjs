'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { Product } from '@/types/product';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// The API returns the full product object for each wishlist item
type WishlistItem = Product;

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
  loading: boolean;
  error: string | null;
}

type WishlistAction =
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

interface WishlistContextType {
  wishlist: WishlistItem[];
  itemCount: number;
  isLoading: boolean;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.payload,
        itemCount: action.payload.length,
        loading: false,
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const initialState: WishlistState = {
    items: [],
    itemCount: 0,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { token } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const fetchWishlist = useCallback(async () => {
    if (!token) {
      dispatch({ type: 'SET_WISHLIST', payload: [] });
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const data = await response.json();
      // The API returns an object with an `items` property, which is the array
      dispatch({ type: 'SET_WISHLIST', payload: data.items || [] });
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      console.error('Failed to fetch wishlist:', errorMessage);
    }
  }, [token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addItem = async (product: Product) => {
    if (!token) {
      toast({
        title: 'Login required',
        description: 'Please login to add items to your wishlist.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to add ${product.name} to wishlist.`
        );
      }
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
      await fetchWishlist(); // Refetch to get the latest state
    } catch (error) {
        const errorMessage = (error as Error).message;
        toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };

  const removeItem = async (productId: string) => {
    if (!token) {
      toast({
        title: 'Login required',
        description: 'Please login to modify your wishlist.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove item from wishlist.');
      }
      toast({
        title: 'Removed from wishlist',
        description: `Item has been removed from your wishlist.`,
      });
      await fetchWishlist(); // Refetch to get the latest state
    } catch (error) {
        const errorMessage = (error as Error).message;
        toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };

  const isInWishlist = (productId: string) => {
    return state.items.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.items,
        itemCount: state.itemCount,
        isLoading: state.loading,
        addItem,
        removeItem,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};