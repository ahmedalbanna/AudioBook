
import { AudiobookCard } from '@/components/audiobooks/audiobook-card';
import { mockAudiobooks, getCategoryById } from '@/lib/mock-data';
import type { Audiobook } from '@/types';
import { notFound } from 'next/navigation';

// Convert mock data to proper types
const audiobooksData: Audiobook[] = mockAudiobooks.map(ab => ({
  ...ab,
  releaseDate: new Date(ab.releaseDate),
  createdAt: new Date(ab.createdAt),
}));

export default function CategoryDetailsPage({ params }: { params: { categoryId: string } }) {
  const category = getCategoryById(params.categoryId);

  if (!category) {
    notFound();
  }

  const audiobooksInCategory = audiobooksData.filter(
    (audiobook) => audiobook.categoryRef === params.categoryId
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="font-headline text-3xl font-semibold mb-6 text-center">
        كتب في تصنيف: <span className="text-primary">{category.name}</span>
      </h1>
      {audiobooksInCategory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {audiobooksInCategory.map((audiobook) => (
            <AudiobookCard key={audiobook.audiobookId} audiobook={audiobook} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          لا توجد كتب صوتية في هذا التصنيف حالياً.
        </p>
      )}
    </div>
  );
}
