
"use client"; // For client-side interactions like audio player

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getAudiobookById, mockUser } from '@/lib/mock-data'; // Assuming mockUser for auth state
import type { Audiobook as AudiobookType, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, Play, Pause, DollarSign, ShoppingCart, CheckCircle, XCircle, Rewind, FastForward, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider'; // For volume control

// This would typically come from an AuthContext or similar
const currentUser: User | null = mockUser; // Mock: user is logged in and owns/subscribed to some books.

export default function AudiobookDetailsPage({ params }: { params: { audiobookId: string } }) {
  const audiobook = getAudiobookById(params.audiobookId) as AudiobookType | undefined; // Cast for full type
  
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [previewDuration, setPreviewDuration] = useState(180); // 3 minutes
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setPreviewProgress((audio.currentTime / audio.duration) * 100);
    };
    const setDuration = () => {
       if (audio.duration !== Infinity) {
        setPreviewDuration(audio.duration);
      }
    };
    const handleEnded = () => setIsPlayingPreview(false);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, audiobook]);


  if (!audiobook) {
    // In a real app, you'd fetch data here or use Next.js data fetching methods
    // For now, using useEffect to simulate data fetching for a specific audiobook
    // This is not how it would be done in a production app server component but works for mock
    return <div className="container mx-auto py-6 px-4 text-center">جاري تحميل الكتاب...</div>;
  }
  
  const isOwned = currentUser?.purchasedAudiobooksRefs?.includes(audiobook.audiobookId);
  const isSubscribed = !!currentUser?.currentSubscriptionRef && (currentUser.subscriptionEndDate ? new Date(currentUser.subscriptionEndDate) > new Date() : false);


  const togglePreview = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlayingPreview) {
        audio.pause();
      } else {
        audio.play().catch(error => console.error("Error playing audio:", error));
      }
      setIsPlayingPreview(!isPlayingPreview);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (value[0] / 100) * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <audio ref={audioRef} src={audiobook.previewAudioUrl} preload="metadata"></audio>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={audiobook.coverImageUrl || "https://placehold.co/600x900.png"}
            alt={audiobook.title}
            width={600}
            height={900}
            className="rounded-lg shadow-xl aspect-[2/3] w-full object-cover"
            data-ai-hint="book cover"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">{audiobook.title}</h1>
          <p className="text-xl text-muted-foreground mb-1">
            المؤلف: <span className="font-medium text-foreground">{audiobook.author}</span>
          </p>
          {audiobook.narrator && (
            <p className="text-lg text-muted-foreground mb-4">
              الراوي: <span className="font-medium text-foreground">{audiobook.narrator}</span>
            </p>
          )}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">وصف الكتاب</h3>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {audiobook.description}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                المدة الإجمالية: {audiobook.totalDuration}
              </p>
            </CardContent>
          </Card>

          {/* Preview Player */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3">استمع لجزء مجاني (أول 3 دقائق)</h3>
              <div className="flex items-center gap-4">
                <Button onClick={togglePreview} variant="outline" size="icon" aria-label={isPlayingPreview ? "إيقاف مؤقت" : "تشغيل"}>
                  {isPlayingPreview ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="flex-grow">
                  <Slider
                    defaultValue={[0]}
                    value={[previewProgress]}
                    max={100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                    aria-label="شريط التقدم للمعاينة"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(previewDuration)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            {isOwned || isSubscribed ? (
              <Button size="lg" className="w-full" asChild>
                <Link href={`/player/${audiobook.audiobookId}`}>
                  <Headphones className="ml-2 h-5 w-5" /> استمع للكتاب كاملاً
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/checkout?type=audiobook&id=${audiobook.audiobookId}`}>
                    <DollarSign className="ml-2 h-5 w-5" /> شراء الكتاب ({audiobook.price} {audiobook.currency})
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <Link href="/subscriptions">
                    <ShoppingCart className="ml-2 h-5 w-5" /> الاشتراك الشهري
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
