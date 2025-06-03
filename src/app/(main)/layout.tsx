
import { AppHeader } from '@/components/layout/app-header';
import { BottomNavBar } from '@/components/layout/bottom-nav-bar';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <BottomNavBar />
    </div>
  );
}
