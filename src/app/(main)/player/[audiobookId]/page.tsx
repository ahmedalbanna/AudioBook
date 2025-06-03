
"use client";

import { useState, useRef, useEffect, useCallback, use } from 'react';
import Image from 'next/image';
import { getAudiobookById } from '@/lib/mock-data';
import type { Audiobook as AudiobookType } from '@/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress'; // For buffering
import {
  Play, Pause, Rewind, FastForward, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Maximize2, X, Settings2,
} from 'lucide-react';
import { useRouter, notFound } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AudioPlayerPage({ params }: { params: Promise<{ audiobookId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const audiobook = getAudiobookById(resolvedParams.audiobookId) as AudiobookType | undefined;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState("1"); // string for DropdownMenuRadioItem value
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For initial load
  const [buffered, setBuffered] = useState(0);


  useEffect(() => {
    if (!audiobook) {
      // Delay notFound call to allow client-side checks/redirects if needed
      // However, for a pure Server Component fetch this would be earlier
      // Since this is client-side, this check is fine here.
      const timer = setTimeout(() => notFound(), 100);
      return () => clearTimeout(timer);
    }
  
    const audio = audioRef.current;
    if (audio) {
      audio.src = audiobook.fullAudioUrl; // Make sure this URL is valid
      audio.load(); // Start loading the full audio

      const setAudioData = () => {
        if (audio.duration !== Infinity) {
            setDuration(audio.duration);
        }
        setIsLoading(false);
      };
      const setAudioTime = () => setCurrentTime(audio.currentTime);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false); // Or go to next chapter
      const handleVolumeChange = () => {
        setVolume(audio.volume);
        setIsMuted(audio.muted);
      };
      const handleLoading = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleProgress = () => { // For buffered progress
        if (audio.buffered.length > 0 && audio.duration > 0) { // check audio.duration > 0
          setBuffered((audio.buffered.end(audio.buffered.length - 1) / audio.duration) * 100);
        }
      };


      audio.addEventListener('loadeddata', setAudioData); // Use loadeddata
      audio.addEventListener('durationchange', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('volumechange', handleVolumeChange);
      audio.addEventListener('waiting', handleLoading);
      audio.addEventListener('playing', handleCanPlay);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('progress', handleProgress);


      // Set initial playback rate
      audio.playbackRate = parseFloat(playbackRate);

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('durationchange', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('volumechange', handleVolumeChange);
        audio.removeEventListener('waiting', handleLoading);
        audio.removeEventListener('playing', handleCanPlay);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('progress', handleProgress);
      };
    }
  }, [audiobook, playbackRate]); // Add audiobook and playbackRate as dependencies

  if (!audiobook) {
    return <div className="flex items-center justify-center min-h-screen bg-background text-foreground"><p>الكتاب الصوتي غير موجود.</p></div>;
  }

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => console.error("Error playing audio:", err));
      }
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const seekRelative = (amount: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.max(0, Math.min(duration, audio.currentTime + amount));
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      setIsMuted(false);
      audio.volume = value[0];
      setVolume(value[0]);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handlePlaybackRateChange = (rate: string) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = parseFloat(rate);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };


  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-secondary text-foreground p-4 md:p-6">
      <audio ref={audioRef} preload="auto" />
      <header className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-headline text-xl md:text-2xl font-semibold truncate" title={audiobook.title}>{audiobook.title}</h1>
          <p className="text-sm text-muted-foreground truncate">{audiobook.author}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="إغلاق المشغل">
          <X className="h-6 w-6" />
        </Button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center mb-6">
        <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
          <Image
            src={audiobook.coverImageUrl || "https://placehold.co/600x600.png"}
            alt={audiobook.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-2xl"
            data-ai-hint="book cover"
            priority
          />
           {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto">
        <div className="relative mb-2">
            <Slider
              value={[currentTime]}
              max={duration || 100} // Avoid division by zero if duration is 0
              step={1}
              onValueChange={handleSeek}
              className="w-full [&>span:first-child]:h-2"
              aria-label="شريط التقدم"
            />
             {/* Buffered progress */}
             <Progress value={buffered} className="absolute top-1/2 left-0 transform -translate-y-1/2 h-2 w-full -z-10 opacity-30 pointer-events-none [&>div]:bg-primary/50"/>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-3 px-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => seekRelative(-15)} aria-label="رجوع 15 ثانية">
            <Rewind className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="الفصل السابق">
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="w-16 h-16 rounded-full shadow-lg text-primary-foreground"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            disabled={isLoading}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="الفصل التالي">
            <SkipForward className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => seekRelative(15)} aria-label="تقديم 15 ثانية">
            <FastForward className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2 text-muted-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="سرعة التشغيل">
                <Settings2 className="h-5 w-5 mr-1" /> 
                <span className="text-xs">{playbackRate}x</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup value={playbackRate} onValueChange={handlePlaybackRateChange}>
                {["0.75", "1", "1.25", "1.5", "2"].map(rate => (
                  <DropdownMenuRadioItem key={rate} value={rate}>{rate}x</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center gap-2 flex-grow justify-end">
            <Button variant="ghost" size="icon" onClick={toggleMute} aria-label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}>
              {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.05}
              onValueChange={handleVolumeChange}
              className="w-20 md:w-24"
              aria-label="التحكم في مستوى الصوت"
            />
          </div>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="قائمة الفصول">
            <ListMusic className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

