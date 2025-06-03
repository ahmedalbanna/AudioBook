
import { CategoryChip } from '@/components/categories/category-chip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCategories } from '@/lib/mock-data';
import type { Category } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const categoriesData: Category[] = mockCategories;

// A more detailed card for categories page
function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.categoryId}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary">
        <CardHeader className="p-0 relative aspect-video">
          {category.iconUrl ? (
             <Image src={category.iconUrl} alt={category.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="category icon" />
          ) : (
            <div className="bg-muted flex items-center justify-center h-full">
              <span className="text-4xl text-muted-foreground">{category.name.charAt(0)}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-lg text-center group-hover:text-primary transition-colors">{category.name}</CardTitle>
          {category.description && <p className="text-sm text-muted-foreground text-center mt-1 line-clamp-2">{category.description}</p>}
        </CardContent>
      </Card>
    </Link>
  );
}


export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="font-headline text-3xl font-semibold mb-6 text-center">جميع التصنيفات</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoriesData.map((category) => (
          // Using CategoryCard for a richer display on this page
          <CategoryCard key={category.categoryId} category={category} />
        ))}
      </div>
    </div>
  );
}
