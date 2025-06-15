import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Latest gadgets and electronic devices'
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trendy clothing and accessories'
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Home decor and garden essentials'
  },
  {
    id: '4',
    name: 'Sports',
    slug: 'sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sports equipment and fitness gear'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 50,
    featured: true,
    rating: 4.8,
    reviews: 324,
    tags: ['wireless', 'audio', 'premium'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, and seamless smartphone integration.',
    price: 449.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 30,
    featured: true,
    rating: 4.6,
    reviews: 156,
    tags: ['smartwatch', 'fitness', 'tech'],
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '3',
    name: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern design. Perfect for casual and semi-formal occasions.',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 25,
    featured: false,
    rating: 4.7,
    reviews: 89,
    tags: ['leather', 'designer', 'jacket'],
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: '4',
    name: 'Modern Coffee Table',
    description: 'Sleek modern coffee table perfect for contemporary living rooms. Made from sustainable materials.',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    stock: 15,
    featured: true,
    rating: 4.5,
    reviews: 67,
    tags: ['furniture', 'modern', 'table'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    name: 'Professional Running Shoes',
    description: 'High-performance running shoes with advanced cushioning and breathable design for serious athletes.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sports',
    stock: 40,
    featured: false,
    rating: 4.4,
    reviews: 142,
    tags: ['running', 'shoes', 'athletic'],
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  },
  {
    id: '6',
    name: 'Vintage Camera',
    description: 'Classic vintage-style camera perfect for photography enthusiasts and collectors.',
    price: 599.99,
    image: 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 12,
    featured: true,
    rating: 4.9,
    reviews: 78,
    tags: ['camera', 'vintage', 'photography'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
];