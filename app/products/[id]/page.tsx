import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import ProductDetailsClient from '@/components/ProductDetailsClient';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailsClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}