
"use client";

import { use } from 'react'; // Added use
import { SubscriptionPlanForm } from "@/components/admin/subscription-plan-form";
import { mockSubscriptionPlans } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

export default function EditSubscriptionPlanPage({ params }: { params: Promise<{ subscriptionId: string }> }) { // Updated params type
  const resolvedParams = use(params); // Unwrap params
  const plan = mockSubscriptionPlans.find(p => p.subscriptionId === resolvedParams.subscriptionId); // Use resolvedParams

  if (!plan) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <SubscriptionPlanForm initialData={plan} />
    </div>
  );
}
