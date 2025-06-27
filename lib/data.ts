import { Product, Category } from '@/types/product';
import prisma from './prisma';

// Categories are still static for now, but could be moved to database later
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

// Get products from database
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const whereClause = categorySlug ? {
      category: categories.find(c => c.slug === categorySlug)?.name
    } : {};

    const dbProducts = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return dbProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      image: product.image,
      images: product.images,
      category: product.category,
      stock: product.stock,
      featured: false, // Could be added to DB schema later
      rating: product.rating,
      reviews: product.reviews,
      tags: [product.category],
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return categories.find(c => c.slug === slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    if (!query) {
      return [];
    }

    const lowercasedQuery = query.toLowerCase();
    const dbProducts = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } }
        ]
      }
    });

    return dbProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      image: product.image,
      images: product.images,
      category: product.category,
      stock: product.stock,
      featured: false,
      rating: product.rating,
      reviews: product.reviews,
      tags: [product.category],
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return undefined;
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      image: product.image,
      images: product.images,
      category: product.category,
      stock: product.stock,
      featured: false,
      rating: product.rating,
      reviews: product.reviews,
      tags: [product.category],
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return undefined;
  }
}