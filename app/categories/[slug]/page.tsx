import { notFound } from 'next/navigation';
import { categories } from '@/lib/data';
import CategoryPageClient from '@/components/CategoryPageClient';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Ensure this function is properly exported and async
export async function generateStaticParams() {
  // Make sure categories is available at build time
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
}