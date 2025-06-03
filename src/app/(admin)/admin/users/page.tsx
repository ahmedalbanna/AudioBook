
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUser, mockAdminUser } from '@/lib/mock-data'; // Example users
import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Edit, Trash2, Search, Eye, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const usersData: User[] = [mockUser, mockAdminUser]; // Add more mock users if needed

export default function ManageUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-semibold">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">عرض، تعديل، أو تعطيل حسابات المستخدمين.</p>
        </div>
        {/* Add New User button might not be applicable if users register themselves */}
        {/* <Button asChild> <Link href="/admin/users/new"> <UserPlus className="ml-2 h-5 w-5" /> إضافة مستخدم جديد </Link> </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
           <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="ابحث عن مستخدم بالاسم أو البريد..." className="max-w-sm" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">الصورة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoUrl || `https://placehold.co/40x40.png?text=${user.displayName?.[0] || user.email[0]}`} alt={user.displayName} data-ai-hint="profile picture" />
                      <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.displayName || 'غير متوفر'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'مسؤول' : 'مستخدم'}
                    </Badge>
                  </TableCell>
                   <TableCell>
                    {user.isActive ? 
                        <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="inline-block ml-1 h-3 w-3" />نشط</Badge> : 
                        <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="inline-block ml-1 h-3 w-3" />معطل</Badge>
                    }
                  </TableCell>
                  <TableCell className="text-right space-x-1 rtl:space-x-reverse">
                    <Button variant="ghost" size="icon" title="عرض التفاصيل">
                      <Eye className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" title="تعديل الدور"> {/* Or a dedicated edit page */}
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title={user.isActive ? "تعطيل الحساب" : "تفعيل الحساب"} className={user.isActive ? "text-destructive hover:text-destructive-foreground hover:bg-destructive" : "text-green-600 hover:text-green-50 hover:bg-green-600"}>
                      {user.isActive ? <Trash2 className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {usersData.length === 0 && (
        <p className="text-center text-muted-foreground py-4">لا يوجد مستخدمون حالياً.</p>
      )}
    </div>
  );
}
