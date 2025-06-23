import { Product, Category } from '@/types/product';
import { mockInventory } from './mockData';

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
  },
  {
    id: '5',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beauty products and health supplements'
  },
  {
    id: '6',
    name: 'Books & Media',
    slug: 'books-media',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Books, movies, music and digital media'
  },
  {
    id: '7',
    name: 'Automotive',
    slug: 'automotive',
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Car parts and accessories'
  },
  {
    id: '8',
    name: 'Toys & Games',
    slug: 'toys-games',
    image: 'https://images.pexels.com/photos/3661237/pexels-photo-3661237.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fun and educational toys and games'
  }
];

export const products: Product[] = mockInventory.map((item, index) => ({
  id: item.id,
  name: item.name,
  description: `This is a high-quality ${item.name}. Perfect for all your needs. It is a mock description.`,
  price: item.unitCost,
  originalPrice: item.unitCost * 1.2,
  image: `https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800&seed=${item.id}`,
  images: [
    `https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800&seed=${item.id}`,
    `https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800&seed=${item.id}`,
  ],
  category: item.category,
  stock: item.currentStock,
  featured: index < 5, // Feature the first 5 products
  rating: 4.5,
  reviews: Math.floor(Math.random() * 100),
  tags: [item.category, 'mock'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// Let's assume getProducts and searchProducts exist and are using mock data
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let productList = products;

  if (categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      productList = productList.filter(p => p.category === category.name);
    } else {
      return []; // No category found, return empty
    }
  }

  return productList;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return categories.find(c => c.slug === slug);
}


export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  if (!query) {
    return [];
  }

  const lowercasedQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercasedQuery) ||
    product.description.toLowerCase().includes(lowercasedQuery) ||
    product.category.toLowerCase().includes(lowercasedQuery)
  );
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return products.find(p => p.id === id);
}