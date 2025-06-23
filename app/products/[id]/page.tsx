import { notFound } from 'next/navigation';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import { Product } from '@/types/product';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Helper function to fetch a single product
async function getProduct(id: string): Promise<Product | null> {
  try {
    // Use the full URL on the server. Default to localhost for development.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/products/${id}`, {
      cache: 'no-store', // Fetch fresh data on each request
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

// Helper function to fetch related products
async function getRelatedProducts(category: string, currentProductId: string): Promise<Product[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/products?category=${category}&limit=5`);
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    // Filter out the current product from the related list and take the first 4
    const related = data.products?.filter((p: Product) => p.id !== currentProductId).slice(0, 4) || [];
    return related;
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    return [];
  }
}

// This is now a server component that fetches data
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <ProductDetailsClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}