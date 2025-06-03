
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { mockSubscriptionPlans } from '@/lib/mock-data';
import type { SubscriptionPlan } from '@/types';
import Link from "next/link";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { SubscriptionPlanCard } from "@/components/subscriptions/subscription-plan-card"; // Re-use for display if suitable
import { Badge } from "@/components/ui/badge";

const plansData: SubscriptionPlan[] = mockSubscriptionPlans;

export default function ManageSubscriptionPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="font-headline text-3xl font-semibold">إدارة خطط الاشتراكات</h1>
            <p className="text-muted-foreground">عرّف وعدّل خطط الاشتراكات المتاحة للمستخدمين.</p>
        </div>
        <Button asChild>
          <Link href="/admin/subscriptions/new">
            <PlusCircle className="ml-2 h-5 w-5" /> إضافة خطة جديدة
          </Link>
        </Button>
      </div>

      {plansData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plansData.map((plan) => (
            <Card key={plan.subscriptionId} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-xl">{plan.name}</CardTitle>
                    <Badge variant={plan.isActive ? "default" : "destructive"}>
                        {plan.isActive ? <CheckCircle className="inline-block ml-1 h-3 w-3" /> : <XCircle className="inline-block ml-1 h-3 w-3" />}
                        {plan.isActive ? "نشطة" : "غير نشطة"}
                    </Badge>
                </div>
                {plan.description && <CardDescription className="mt-1 text-sm line-clamp-2">{plan.description}</CardDescription>}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-2xl font-bold mb-1">{plan.price.toFixed(2)} <span className="text-sm text-muted-foreground">{plan.currency}</span></p>
                <p className="text-sm text-muted-foreground">لمدة {plan.durationDays} يومًا</p>
                {plan.features && plan.features.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs">
                    {plan.features.slice(0,3).map((feature, index) => ( // Show limited features
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && <li className="text-muted-foreground text-xs">والمزيد...</li>}
                  </ul>
                )}
              </CardContent>
              <CardFooter className="border-t p-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/admin/subscriptions/edit/${plan.subscriptionId}`}>
                    <Edit className="ml-1 h-3 w-3" /> تعديل
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:text-destructive-foreground hover:bg-destructive">
                  <Trash2 className="ml-1 h-3 w-3" /> حذف
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">لا توجد خطط اشتراك معرّفة حالياً.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
