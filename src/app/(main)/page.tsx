
"use client";

import { useState, useEffect } from 'react';
import { AudiobookCard } from '@/components/audiobooks/audiobook-card';
import { CategoryChip } from '@/components/categories/category-chip';
import { mockAudiobooks, mockCategories } from '@/lib/mock-data';
import type { Audiobook, Category } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, Search as SearchIcon } from 'lucide-react'; // Renamed Search to SearchIcon to avoid conflict
import { Input } from '@/components/ui/input';

// Convert mock data to proper types
const audiobooksData: Audiobook[] = mockAudiobooks.map(ab => ({
  ...ab,
  releaseDate: new Date(ab.releaseDate),
  createdAt: new Date(ab.createdAt),
}));
const categoriesData: Category[] = mockCategories;

const initialFeaturedAudiobooks = audiobooksData.filter(ab => ab.isFeatured).slice(0, 5);
const initialNewAudiobooks = audiobooksData.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime()).slice(0, 4);
const popularCategories = categoriesData.slice(0, 5);

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeaturedAudiobooks, setFilteredFeaturedAudiobooks] = useState<Audiobook[]>(initialFeaturedAudiobooks);
  const [filteredNewAudiobooks, setFilteredNewAudiobooks] = useState<Audiobook[]>(initialNewAudiobooks);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filterAudiobooks = (books: Audiobook[]) =>
      books.filter(
        (audiobook) =>
          audiobook.title.toLowerCase().includes(lowercasedSearchTerm) ||
          audiobook.author.toLowerCase().includes(lowercasedSearchTerm)
      );

    if (!searchTerm.trim()) {
      setFilteredFeaturedAudiobooks(initialFeaturedAudiobooks);
      setFilteredNewAudiobooks(initialNewAudiobooks);
    } else {
      setFilteredFeaturedAudiobooks(filterAudiobooks(initialFeaturedAudiobooks));
      setFilteredNewAudiobooks(filterAudiobooks(initialNewAudiobooks));
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Search Section */}
      <section className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ابحث عن كتاب بالعنوان أو المؤلف..."
            className="w-full pl-10 rtl:pr-10 pr-4 py-3 rounded-lg border text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search audiobooks"
          />
        </div>
      </section>

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
        {filteredFeaturedAudiobooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredFeaturedAudiobooks.map((audiobook) => (
              <AudiobookCard key={audiobook.audiobookId} audiobook={audiobook} />
            ))}
          </div>
        ) : searchTerm ? (
          <p className="text-center text-muted-foreground py-4">لا توجد كتب مميزة تطابق بحثك.</p>
        ) : (
           <p className="text-center text-muted-foreground py-4">لا توجد كتب مميزة حالياً.</p>
        )}
      </section>

      {/* New Releases Section */}
      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">جديدنا</h2>
        {filteredNewAudiobooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredNewAudiobooks.map((audiobook) => (
              <AudiobookCard key={audiobook.audiobookId} audiobook={audiobook} />
            ))}
          </div>
        ) : searchTerm ? (
          <p className="text-center text-muted-foreground py-4">لا توجد إصدارات جديدة تطابق بحثك.</p>
        ) : (
           <p className="text-center text-muted-foreground py-4">لا توجد إصدارات جديدة حالياً.</p>
        )}
      </section>
    </div>
  );
}
