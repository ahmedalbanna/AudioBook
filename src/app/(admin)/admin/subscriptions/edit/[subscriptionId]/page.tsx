
"use client";

import { SubscriptionPlanForm } from "@/components/admin/subscription-plan-form";
import { mockSubscriptionPlans } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

export default function EditSubscriptionPlanPage({ params }: { params: { subscriptionId: string } }) {
  const plan = mockSubscriptionPlans.find(p => p.subscriptionId === params.subscriptionId);

  if (!plan) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <SubscriptionPlanForm initialData={plan} />
    </div>
  );
}
