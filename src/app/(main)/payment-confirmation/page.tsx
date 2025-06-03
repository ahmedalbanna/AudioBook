
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Home, Library } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status');
  const itemName = searchParams?.get('item');
  const amount = searchParams?.get('amount');

  const isSuccess = status === 'success';

  return (
    <div className="container mx-auto py-10 px-4 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          {isSuccess ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
          )}
          <CardTitle className="font-headline text-2xl">
            {isSuccess ? "عملية الدفع تمت بنجاح!" : "فشلت عملية الدفع"}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? `شكراً لك على شرائك ${itemName ? `"${itemName}"` : 'المنتج'}. ${amount ? `لقد تم خصم ${amount}.` : ''}`
              : "حدث خطأ أثناء معالجة دفعتك. يرجى المحاولة مرة أخرى أو الاتصال بالدعم."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess && itemName && (
            <div className="p-4 border rounded-md bg-muted/50 text-sm mb-6">
              <p><strong>المنتج:</strong> {itemName}</p>
              {amount && <p><strong>المبلغ المدفوع:</strong> {amount}</p>}
              <p className="mt-2">يمكنك الآن الوصول إلى مشترياتك من مكتبتك.</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" className="flex-1">
              <Link href="/">
                <Home className="ml-2 h-4 w-4" /> العودة للصفحة الرئيسية
              </Link>
            </Button>
            {isSuccess && (
              <Button asChild variant="outline" className="flex-1">
                <Link href="/profile/purchases">
                  <Library className="ml-2 h-4 w-4" /> الذهاب لمكتبتي
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
