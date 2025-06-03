
"use client";

import Link from 'next/link';
import { Home, LayoutGrid, Library, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/categories', label: 'التصنيفات', icon: LayoutGrid },
  { href: '/profile/purchases', label: 'مكتبتي', icon: Library },
  { href: '/profile', label: 'المزيد', icon: UserCircle },
];

export function BottomNavBar() {
  const pathname = usePathname();
  const isAdminSection = pathname?.startsWith('/admin');

  if (isAdminSection) {
    return null; // Admin section will not have bottom nav bar
  }
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container mx-auto grid h-16 max-w-md grid-cols-4 items-center">
        {navItems.map((item) => {
          const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-md text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
