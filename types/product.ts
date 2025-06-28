export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;      // Optional: To mark new products
  reviewCount?: number; // Optional: To store number of reviews
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive' | 'vip' | 'new';
  avatar: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  date: string;
  paymentMethod: string;
  shippingAddress: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unitCost: number;
  totalValue: number;
  supplier: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'inventory' | 'customers' | 'financial';
  lastGenerated: string;
  size: string;
  status: 'ready' | 'generating' | 'error';
}