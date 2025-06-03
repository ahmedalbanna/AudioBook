
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header could go here if needed, or be part of pages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
         {children}
        </div>
      </main>
    </div>
  );
}
