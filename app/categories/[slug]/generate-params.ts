import { categories } from '@/lib/data';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}