
"use client";

import Link from 'next/link';
import { Search, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const pathname = usePathname();
  const isAdminSection = pathname?.startsWith('/admin');

  if (isAdminSection) {
    return null; // Admin section will have its own header/sidebar
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold text-primary">
          نافذة السمع
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="بحث">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/profile" passHref>
            <Button variant="ghost" size="icon" aria-label="الملف الشخصي">
              <UserCircle2 className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
