
"use client";

import { SubscriptionPlanCard } from '@/components/subscriptions/subscription-plan-card';
import { mockSubscriptionPlans } from '@/lib/mock-data';
import type { SubscriptionPlan } from '@/types';
import { useRouter } from 'next/navigation';

const plans: SubscriptionPlan[] = mockSubscriptionPlans.filter(p => p.isActive);

export default function SubscriptionsPage() {
  const router = useRouter();

  const handleSubscribe = (planId: string) => {
    // In a real app, this would likely involve more complex logic,
    // potentially navigating to a checkout page with the planId.
    console.log("Subscribing to plan:", planId);
    router.push(`/checkout?type=subscription&id=${planId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8">
        خطط الاشتراك في نافذة السمع
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        اختر الخطة التي تناسبك واستمتع بوصول غير محدود إلى مكتبتنا المتنامية من الكتب الصوتية الرائعة.
      </p>
      {plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <SubscriptionPlanCard key={plan.subscriptionId} plan={plan} onSubscribe={handleSubscribe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl">
          لا توجد خطط اشتراك متاحة حالياً. يرجى التحقق مرة أخرى لاحقًا.
        </p>
      )}
    </div>
  );
}
