
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAudiobooks, getCategoryById } from '@/lib/mock-data';
import type { Audiobook } from '@/types';
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
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

const audiobooksData: Audiobook[] = mockAudiobooks.map(ab => ({
  ...ab,
  releaseDate: new Date(ab.releaseDate),
  createdAt: new Date(ab.createdAt),
}));

export default function ManageAudiobooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAudiobooks, setFilteredAudiobooks] = useState<Audiobook[]>(audiobooksData);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = audiobooksData.filter(audiobook =>
      audiobook.title.toLowerCase().includes(lowercasedSearchTerm) ||
      audiobook.author.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredAudiobooks(filtered);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl font-semibold">إدارة الكتب الصوتية</h1>
          <p className="text-muted-foreground">أضف، عدّل، أو احذف الكتب الصوتية من المنصة.</p>
        </div>
        <Button asChild>
          <Link href="/admin/audiobooks/new">
            <PlusCircle className="ml-2 h-5 w-5" /> إضافة كتاب جديد
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الكتب</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="ابحث عن كتاب بالعنوان أو المؤلف..." 
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">الغلاف</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>المؤلف</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead className="text-center">مميز</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudiobooks.map((audiobook) => {
                const category = getCategoryById(audiobook.categoryRef);
                return (
                  <TableRow key={audiobook.audiobookId}>
                    <TableCell>
                      <Image
                        src={audiobook.coverImageUrl || "https://placehold.co/50x75.png"}
                        alt={audiobook.title}
                        width={50}
                        height={75}
                        className="rounded aspect-[2/3] object-cover"
                        data-ai-hint="book cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{audiobook.title}</TableCell>
                    <TableCell>{audiobook.author}</TableCell>
                    <TableCell>{category?.name || 'غير محدد'}</TableCell>
                    <TableCell>{audiobook.price.toFixed(2)} {audiobook.currency}</TableCell>
                    <TableCell className="text-center">
                      {audiobook.isFeatured ? <Badge variant="default">نعم</Badge> : <Badge variant="outline">لا</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild title="تعديل">
                        <Link href={`/admin/audiobooks/edit/${audiobook.audiobookId}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive-foreground hover:bg-destructive" title="حذف">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {filteredAudiobooks.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          {searchTerm ? "لم يتم العثور على كتب تطابق بحثك." : "لا توجد كتب صوتية حالياً."}
        </p>
      )}
    </div>
  );
}
