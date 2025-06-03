
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockUser, mockSubscriptionPlans } from "@/lib/mock-data";
import type { User, SubscriptionPlan } from "@/types";
import { BadgeCheck, CalendarClock, XCircle, RotateCcw, ShieldOff } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

// Assume currentUser is fetched or available from context
const currentUser: User | null = mockUser;

// Find current subscription plan details
let currentPlanDetails: SubscriptionPlan | undefined;
let userSubscriptionStatus: 'active' | 'expired' | 'cancelled' | 'none' = 'none';
let subscriptionEndDate: Date | undefined;

if (currentUser && currentUser.currentSubscriptionRef) {
  // In a real app, currentSubscriptionRef would be an ID to fetch UserSubscription document,
  // then fetch SubscriptionPlan document.
  // For mock: assume currentSubscriptionRef is the ID of the plan directly
  currentPlanDetails = mockSubscriptionPlans.find(p => p.subscriptionId === currentUser.currentSubscriptionRef);
  
  if (currentUser.subscriptionEndDate) {
    subscriptionEndDate = new Date(currentUser.subscriptionEndDate);
    if (subscriptionEndDate > new Date()) {
      userSubscriptionStatus = 'active';
    } else {
      userSubscriptionStatus = 'expired';
    }
  } else if (currentPlanDetails) { // If no end date but has a plan, assume active (example logic)
     userSubscriptionStatus = 'active';
     // Mock an end date if active and not set
     const mockEndDate = new Date();
     mockEndDate.setDate(mockEndDate.getDate() + (currentPlanDetails.durationDays || 30));
     subscriptionEndDate = mockEndDate;
  }
}


export default function MySubscriptionPage() {
  if (!currentUser) {
    return <div className="container mx-auto py-6 px-4 text-center">الرجاء تسجيل الدخول لعرض تفاصيل اشتراكك.</div>;
  }

  const renderStatusBadge = () => {
    switch (userSubscriptionStatus) {
      case 'active':
        return <BadgeCheck className="h-5 w-5 text-green-500" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-orange-500" />;
      case 'cancelled':
        return <ShieldOff className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const statusText = {
    active: "نشط",
    expired: "منتهي الصلاحية",
    cancelled: "ملغى",
    none: "لا يوجد اشتراك حالي"
  };


  return (
    <div className="container mx-auto py-8 px-4 max-w-lg">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">اشتراكي الحالي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentPlanDetails ? (
            <>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-lg font-semibold text-primary">{currentPlanDetails.name}</p>
                  <p className="text-sm text-muted-foreground">
                    الحالة: <span className={`font-medium ${userSubscriptionStatus === 'active' ? 'text-green-500' : 'text-destructive'}`}>{statusText[userSubscriptionStatus]}</span>
                  </p>
                </div>
                {renderStatusBadge()}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <CalendarClock className="ml-2 h-5 w-5 text-muted-foreground" />
                  <span>تاريخ البدء: {currentUser.createdAt ? format(new Date(currentUser.createdAt), "PPP", { locale: arSA }) : "غير محدد"}</span>
                </div>
                {subscriptionEndDate && (
                  <div className="flex items-center">
                    <CalendarClock className="ml-2 h-5 w-5 text-muted-foreground" />
                    <span>تاريخ الانتهاء: {format(subscriptionEndDate, "PPP", { locale: arSA })}</span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground pt-2">{currentPlanDetails.description}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">مميزات الخطة:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                  {currentPlanDetails.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-xl text-muted-foreground">ليس لديك اشتراك نشط حالياً.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t pt-6">
          {userSubscriptionStatus === 'expired' || userSubscriptionStatus === 'none' ? (
            <Button className="w-full" asChild>
              <Link href="/subscriptions">
                <RotateCcw className="ml-2 h-4 w-4" /> تصفح خطط الاشتراك
              </Link>
            </Button>
          ) : userSubscriptionStatus === 'active' ? (
             <Button className="w-full" asChild>
              <Link href="/subscriptions">
                <RotateCcw className="ml-2 h-4 w-4" /> إدارة الاشتراك أو ترقيته
              </Link>
            </Button>
          ) : null}
          {userSubscriptionStatus === 'active' && (
            <Button variant="outline" className="w-full">
              <ShieldOff className="ml-2 h-4 w-4" /> إلغاء الاشتراك
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
