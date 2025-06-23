'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback
} from 'react';
import { CartItem } from '@/types/product';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CART' };

// Helper to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  return { itemCount, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        ...calculateTotals(action.payload),
        loading: false,
      };
    case 'CLEAR_CART':
        return {
            ...state,
            items: [],
            itemCount: 0,
            total: 0,
        };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  total: number;
  isLoading: boolean;
  addItem: (product: { productId: string; quantity: number, stock?: number, name?: string }) => Promise<void>;
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const initialState: CartState = { items: [], total: 0, itemCount: 0, loading: true, error: null };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = useCallback(async () => {
    if (!token) {
      dispatch({ type: 'SET_CART', payload: [] });
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      dispatch({ type: 'SET_CART', payload: data || [] });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (product: { productId: string; quantity: number, stock?: number, name?: string }) => {
    if (!token) {
      toast({ title: "Login Required", description: "Please login to add items to your cart.", variant: "destructive" });
      router.push('/login');
      return;
    }

    if (product.stock === 0) {
        toast({ title: "Out of Stock", description: "This product is currently unavailable.", variant: "destructive" });
        return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productId: product.productId, quantity: product.quantity }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add item to cart');
      }
      
      toast({ title: "Added to Cart", description: `${product.name || 'Product'} has been added to your cart.` });
      await fetchCart();
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
    }
  };

  const updateItemQuantity = async (cartItemId: string, quantity: number) => {
    if (!token) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (!res.ok) throw new Error('Failed to update item');
      toast({ title: "Cart Updated", description: "Item quantity has been updated." });
      await fetchCart();
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  const removeItem = async (cartItemId: string) => {
    if (!token) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ cartItemId }),
      });
      if (!res.ok) throw new Error('Failed to remove item');
      toast({ title: "Item Removed", description: "The item has been removed from your cart." });
      await fetchCart();
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
      toast({ title: "Error", description: (err as Error).message, variant: "destructive" });
    }
  };

  const clearCart = () => {
      dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider value={{ cart: state.items, itemCount: state.itemCount, total: state.total, isLoading: state.loading, addItem, updateItemQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};