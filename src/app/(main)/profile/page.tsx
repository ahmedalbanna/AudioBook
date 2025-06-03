
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockUser } from "@/lib/mock-data";
import type { User } from "@/types";
import { LogOut, ShieldCheck, ShoppingBag, Edit3, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Assume currentUser is fetched or available from context
const currentUser: User | null = mockUser;

export default function ProfilePage() {
  const router = useRouter();

  if (!currentUser) {
    // router.push('/auth'); // Redirect if not logged in
    return <div className="container mx-auto py-6 px-4 text-center">الرجاء تسجيل الدخول لعرض الملف الشخصي.</div>;
  }

  const handleLogout = () => {
    console.log("Logging out...");
    router.push('/auth');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card className="shadow-xl">
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary shadow-md">
            <AvatarImage src={currentUser.photoUrl || "https://placehold.co/100x100.png?text=User"} alt={currentUser.displayName || currentUser.email} data-ai-hint="profile picture" />
            <AvatarFallback>{currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-2xl">{currentUser.displayName || "مستخدم جديد"}</CardTitle>
          <CardDescription>{currentUser.email}</CardDescription>
           {currentUser.role === 'admin' && (
            <Link href="/admin" className="text-sm text-accent hover:underline mt-1">
              لوحة تحكم المسؤول
            </Link>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-base py-6" asChild>
              <Link href="/profile/purchases">
                <ShoppingBag className="ml-3 h-5 w-5 text-primary" /> مشترياتي
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start text-base py-6" asChild>
              <Link href="/profile/subscription">
                <ShieldCheck className="ml-3 h-5 w-5 text-primary" /> اشتراكي
              </Link>
            </Button>
          </div>
          <Separator />
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-base">
              <Edit3 className="ml-3 h-5 w-5 text-muted-foreground" /> تعديل الملف الشخصي
            </Button>
             <Button variant="ghost" className="w-full justify-start text-base">
              <KeyRound className="ml-3 h-5 w-5 text-muted-foreground" /> تغيير كلمة المرور
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive text-base">
              <LogOut className="ml-3 h-5 w-5" /> تسجيل الخروج
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
