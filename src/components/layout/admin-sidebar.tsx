
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, BookOpen, Users, ListChecks, CreditCard, Settings, LogOut, ChevronsLeft, ChevronsRight, Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const adminNavItems = [
  { href: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/admin/audiobooks', label: 'إدارة الكتب', icon: BookOpen },
  { href: '/admin/categories', label: 'إدارة التصنيفات', icon: ListChecks },
  { href: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
  { href: '/admin/subscriptions', label: 'إدارة الاشتراكات', icon: CreditCard },
  { href: '/admin/transactions', label: 'تقارير المعاملات', icon: Settings /* Placeholder, maybe BarChart? */ },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const SidebarContent = () => (
    <>
    <div className={cn("flex items-center p-4 border-b", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <Link href="/admin" className="font-headline text-xl font-bold text-primary">
            نافذة السمع
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:inline-flex">
          {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="grid gap-1">
          {adminNavItems.map((item) => {
            const isActive = (item.href === '/admin' && pathname === '/admin') || (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn("w-full justify-start gap-2", isCollapsed && "justify-center aspect-square p-0")}
                  onClick={() => isMobileOpen && setIsMobileOpen(false)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-2 border-t">
        <Button variant="ghost" className={cn("w-full justify-start gap-2", isCollapsed && "justify-center aspect-square p-0")} asChild>
            <Link href="/auth">
                <LogOut className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                {!isCollapsed && <span>تسجيل الخروج</span>}
            </Link>
        </Button>
      </div>
    </>
  );


  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileSidebar}
        className="fixed top-4 right-4 z-50 md:hidden bg-background/80 backdrop-blur"
        aria-label="فتح القائمة"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Sidebar Sheet */}
      {isMobileOpen && (
         <div 
            className="fixed inset-0 z-40 bg-black/50 md:hidden" 
            onClick={() => setIsMobileOpen(false)} 
            aria-hidden="true"
          />
      )}
      <aside className={cn(
          "fixed top-0 right-0 h-full z-50 flex flex-col border-l bg-card text-card-foreground transition-transform duration-300 ease-in-out md:static md:shadow-lg",
          "md:w-64", // Default width for desktop
          isCollapsed && "md:w-20", // Collapsed width for desktop
          isMobileOpen ? "translate-x-0 w-64 shadow-xl" : "translate-x-full w-64 md:translate-x-0" // Mobile animation
      )}>
        <SidebarContent />
      </aside>
    </>
  );
}

// Dummy X icon for mobile close button inside sidebar content
const X = ({ className } : {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
