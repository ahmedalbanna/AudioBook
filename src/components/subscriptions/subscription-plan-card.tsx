
import type { SubscriptionPlan } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onSubscribe?: (planId: string) => void;
}

export function SubscriptionPlanCard({ plan, onSubscribe }: SubscriptionPlanCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader className="bg-muted/30 p-6">
        <CardTitle className="font-headline text-2xl text-primary">{plan.name}</CardTitle>
        {plan.description && <CardDescription className="mt-1">{plan.description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="mb-6">
          <span className="text-4xl font-bold">{plan.price.toFixed(2)}</span>
          <span className="text-muted-foreground text-sm ml-1">{plan.currency} / {plan.durationDays === 30 ? 'شهر' : plan.durationDays === 365 ? 'سنة' : `${plan.durationDays} يوم`}</span>
        </div>
        {plan.features && plan.features.length > 0 && (
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button 
          className="w-full text-lg py-3" 
          onClick={() => onSubscribe ? onSubscribe(plan.subscriptionId) : null}
          asChild={!onSubscribe}
        >
          {onSubscribe ? (
            'اشترك الآن'
          ) : (
            <Link href={`/checkout?type=subscription&id=${plan.subscriptionId}`}>
              اشترك الآن
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
