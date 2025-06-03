
import Link from 'next/link';
import Image from 'next/image';
import type { Audiobook } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones } from 'lucide-react';

interface AudiobookCardProps {
  audiobook: Audiobook;
  showPrice?: boolean;
  status?: 'owned' | 'subscribed' | null;
}

export function AudiobookCard({ audiobook, showPrice = true, status = null }: AudiobookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full">
      <CardHeader className="p-0">
        <Link href={`/audiobooks/${audiobook.audiobookId}`} className="block">
          <Image
            src={audiobook.coverImageUrl || "https://placehold.co/400x600.png"}
            alt={audiobook.title}
            width={400}
            height={600}
            className="aspect-[2/3] w-full object-cover"
            data-ai-hint="book cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/audiobooks/${audiobook.audiobookId}`}>
          <CardTitle className="font-headline text-lg mb-1 line-clamp-2 hover:text-primary transition-colors">
            {audiobook.title}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">{audiobook.author}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {status === 'owned' ? (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/player/${audiobook.audiobookId}`}>
              <Headphones className="ml-2 h-4 w-4" /> استمع الآن
            </Link>
          </Button>
        ) : status === 'subscribed' ? (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/player/${audiobook.audiobookId}`}>
              <Headphones className="ml-2 h-4 w-4" /> استمع (مشترك)
            </Link>
          </Button>
        ) : showPrice ? (
          <div className="flex items-center justify-between w-full">
             <p className="text-base font-semibold text-primary">
              {audiobook.price.toFixed(2)} {audiobook.currency}
            </p>
            <Button size="sm" asChild>
              <Link href={`/audiobooks/${audiobook.audiobookId}`}>عرض التفاصيل</Link>
            </Button>
          </div>
        ) : (
           <Button className="w-full" asChild>
              <Link href={`/audiobooks/${audiobook.audiobookId}`}>عرض التفاصيل</Link>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
