
import { AudiobookCard } from '@/components/audiobooks/audiobook-card';
import { mockAudiobooks, mockUser } from '@/lib/mock-data';
import type { Audiobook, User } from '@/types';

// Assume currentUser is fetched or available from context
const currentUser: User | null = mockUser;

const allAudiobooks: Audiobook[] = mockAudiobooks.map(ab => ({
  ...ab,
  releaseDate: new Date(ab.releaseDate),
  createdAt: new Date(ab.createdAt),
}));

export default function MyPurchasesPage() {
  if (!currentUser) {
    return <div className="container mx-auto py-6 px-4 text-center">الرجاء تسجيل الدخول لعرض مشترياتك.</div>;
  }

  const purchasedAudiobooks = allAudiobooks.filter(ab => 
    currentUser.purchasedAudiobooksRefs.includes(ab.audiobookId)
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="font-headline text-3xl font-semibold mb-6 text-center">مشترياتي من الكتب الصوتية</h1>
      {purchasedAudiobooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {purchasedAudiobooks.map((audiobook) => (
            <AudiobookCard key={audiobook.audiobookId} audiobook={audiobook} status="owned" showPrice={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground mb-4">لم تقم بشراء أي كتب صوتية بعد.</p>
          <p className="text-muted-foreground">تصفح مكتبتنا الغنية وابدأ رحلتك السمعية!</p>
        </div>
      )}
    </div>
  );
}
