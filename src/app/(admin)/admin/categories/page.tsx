
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from '@/lib/mock-data';
import type { Category } from '@/types';
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categoriesData: Category[] = mockCategories;

export default function ManageCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="font-headline text-3xl font-semibold">إدارة التصنيفات</h1>
            <p className="text-muted-foreground">أضف، عدّل، أو احذف التصنيفات من المنصة.</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <PlusCircle className="ml-2 h-5 w-5" /> إضافة تصنيف جديد
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة التصنيفات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">الأيقونة</TableHead>
                <TableHead>اسم التصنيف</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoriesData.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell>
                    {category.iconUrl ? (
                      <Image
                        src={category.iconUrl}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="rounded object-contain"
                        data-ai-hint="category icon"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground">?</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground line-clamp-2">{category.description || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild title="تعديل">
                      <Link href={`/admin/categories/edit/${category.categoryId}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" title="حذف">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {categoriesData.length === 0 && (
        <p className="text-center text-muted-foreground py-4">لا توجد تصنيفات حالياً.</p>
      )}
    </div>
  );
}
