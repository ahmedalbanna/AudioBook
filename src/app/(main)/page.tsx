
import { AudiobookCard } from '@/components/audiobooks/audiobook-card';
import { CategoryChip } from '@/components/categories/category-chip';
import { mockAudiobooks, mockCategories } from '@/lib/mock-data';
import type { Audiobook, Category } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Convert mock data to proper types
const audiobooksData: Audiobook[] = mockAudiobooks.map(ab => ({
  ...ab,
  releaseDate: new Date(ab.releaseDate),
  createdAt: new Date(ab.createdAt),
}));
const categoriesData: Category[] = mockCategories;

const featuredAudiobooks = audiobooksData.filter(ab => ab.isFeatured).slice(0, 5);
const newAudiobooks = audiobooksData.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime()).slice(0, 4);
const popularCategories = categoriesData.slice(0, 5);

export default function HomePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Popular Categories Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline text-2xl font-semibold">التصنيفات الشائعة</h2>
          <Button variant="link" asChild className="text-primary">
            <Link href="/categories">
              عرض الكل <ChevronLeft className="mr-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {popularCategories.map((category) => (
            <CategoryChip key={category.categoryId} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Audiobooks Section */}
      <section className="mb-8">
        <h2 className="font-headline text-2xl font-semibold mb-4">كتب مميزة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredAudiobooks.map((audiobook) => (
            <AudiobookCard key={audiobook.audiobookId} audiobook={audiobook} />
          ))}
        </div>
      </section>

      {/* New Releases Section */}
      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">جديدنا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {newAudiobooks.map((audiobook) => (
            <AudiobookCard key={audiobook.audiobookId} audiobook={audiobook} />
          ))}
        </div>
      </section>
    </div>
  );
}
