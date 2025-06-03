
import { StatsCard } from '@/components/admin/stats-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAudiobooks, mockCategories, mockSubscriptionPlans, mockUser } from '@/lib/mock-data'; // Using mockUser to get a count
import { Users, BookOpen, ListChecks, CreditCard, BarChart3, ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data counts
const totalUsers = 1; // from mockUser, assuming only one for now, replace with actual count
const totalAudiobooks = mockAudiobooks.length;
const activeSubscriptions = mockSubscriptionPlans.filter(p => p.isActive).length; // This is plans, not user subscriptions
const totalRevenue = "12,500 SAR"; // Mock revenue

const adminNavLinks = [
  { href: '/admin/audiobooks', label: 'إدارة الكتب الصوتية', icon: BookOpen },
  { href: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
  { href: '/admin/categories', label: 'إدارة التصنيفات', icon: ListChecks },
  { href: '/admin/subscriptions', label: 'إدارة الاشتراكات', icon: CreditCard },
  { href: '/admin/transactions', label: 'تقارير المعاملات', icon: BarChart3 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="font-headline text-3xl font-semibold">لوحة تحكم المسؤول</h1>
        <Button variant="outline" asChild>
            <Link href="/">
                <ArrowLeftCircle className="ml-2 h-4 w-4" /> العودة للتطبيق
            </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="إجمالي المستخدمين" value={totalUsers} icon={Users} description="+5 هذا الشهر" />
        <StatsCard title="عدد الكتب الصوتية" value={totalAudiobooks} icon={BookOpen} description="+12 كتاب جديد" />
        <StatsCard title="الاشتراكات النشطة" value={activeSubscriptions} icon={CreditCard} description="تقديرية" />
        <StatsCard title="إجمالي الإيرادات" value={totalRevenue} icon={BarChart3} description="الشهر الحالي" />
      </div>

      {/* Navigation Links */}
      <Card>
        <CardHeader>
          <CardTitle>أدوات الإدارة السريعة</CardTitle>
          <CardDescription>انتقِل بسرعة إلى أقسام الإدارة المختلفة.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminNavLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2 shadow hover:shadow-md transition-shadow">
                <link.icon className="h-8 w-8 text-primary mb-1" />
                <span className="text-base font-medium">{link.label}</span>
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Placeholder for recent activity or other charts */}
      <Card>
        <CardHeader>
          <CardTitle>نشاط حديث</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">سيتم عرض آخر الأنشطة هنا (مثال: تسجيل مستخدمين جدد، كتب مضافة).</p>
        </CardContent>
      </Card>
    </div>
  );
}
