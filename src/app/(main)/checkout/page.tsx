
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAudiobookById, mockSubscriptionPlans } from "@/lib/mock-data";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Audiobook, SubscriptionPlan } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const itemType = searchParams?.get('type');
  const itemId = searchParams?.get('id');

  const [item, setItem] = useState<Audiobook | SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (itemType === 'audiobook' && itemId) {
      const audiobook = getAudiobookById(itemId);
      if (audiobook) setItem(audiobook);
    } else if (itemType === 'subscription' && itemId) {
      const plan = mockSubscriptionPlans.find(p => p.subscriptionId === itemId);
      if (plan) setItem(plan);
    }
  }, [itemType, itemId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    console.log("Processing payment for:", item, "with method:", paymentMethod);
    // Simulate success
    router.push(`/payment-confirmation?status=success&item=${item?.title || item?.name}&amount=${item?.price}`);
  };

  if (!item) {
    return (
      <div className="container mx-auto py-6 px-4 text-center">
        <p className="text-xl">جاري تحميل تفاصيل الطلب...</p>
      </div>
    );
  }

  const isAudiobook = (item: any): item is Audiobook => 'author' in item;

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center">إتمام الدفع</CardTitle>
          <CardDescription className="text-center">
            أنت على وشك شراء "{isAudiobook(item) ? item.title : item.name}".
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">ملخص الطلب</h3>
              <div className="p-4 border rounded-md bg-muted/50">
                <div className="flex justify-between items-center">
                  <span>{isAudiobook(item) ? 'الكتاب الصوتي:' : 'خطة الاشتراك:'}</span>
                  <span className="font-medium">{isAudiobook(item) ? item.title : item.name}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>السعر:</span>
                  <span className="font-bold text-primary">{item.price.toFixed(2)} {item.currency}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">اختر طريقة الدفع</h3>
              <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                <Label
                  htmlFor="card"
                  className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  الدفع بالبطاقة (Visa/MasterCard)
                  <RadioGroupItem value="card" id="card" />
                </Label>
                <Label
                  htmlFor="paypal"
                  className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  الدفع عبر PayPal
                   <RadioGroupItem value="paypal" id="paypal" />
                </Label>
              </RadioGroup>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">تفاصيل البطاقة</h4>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">رقم البطاقة</Label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">تاريخ الانتهاء (MM/YY)</Label>
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" required />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === "paypal" && (
                 <Alert className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>الدفع عبر PayPal</AlertTitle>
                    <AlertDescription>
                        سيتم توجيهك إلى PayPal لإكمال عملية الدفع بأمان.
                    </AlertDescription>
                </Alert>
            )}

          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full">تأكيد الشراء والدفع</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
