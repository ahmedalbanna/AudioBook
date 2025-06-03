
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { Audiobook, Category } from "@/types";
import { mockCategories } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const audiobookFormSchema = z.object({
  title: z.string().min(3, { message: "العنوان يجب أن يكون 3 أحرف على الأقل." }),
  author: z.string().min(2, { message: "اسم المؤلف مطلوب." }),
  narrator: z.string().optional(),
  description: z.string().min(10, { message: "الوصف يجب أن يكون 10 أحرف على الأقل." }),
  price: z.coerce.number().positive({ message: "السعر يجب أن يكون رقمًا موجبًا." }),
  currency: z.string().default("SAR"),
  categoryRef: z.string({ required_error: "يرجى اختيار تصنيف." }),
  isFeatured: z.boolean().default(false),
  totalDuration: z.string().min(3, {message: "الرجاء إدخال مدة الكتاب."}),
  coverImageUrl: z.string().url({ message: "الرجاء إدخال رابط صورة صحيح." }).optional().or(z.literal('')),
  fullAudioUrl: z.string().url({ message: "الرجاء إدخال رابط ملف صوتي صحيح." }).optional().or(z.literal('')),
  previewAudioUrl: z.string().url({ message: "الرجاء إدخال رابط معاينة صحيح." }).optional().or(z.literal('')),
});

type AudiobookFormValues = z.infer<typeof audiobookFormSchema>;

interface AudiobookFormProps {
  initialData?: Partial<Audiobook>;
  onSubmitSuccess?: () => void;
}

const categoriesData: Category[] = mockCategories;

export function AudiobookForm({ initialData, onSubmitSuccess }: AudiobookFormProps) {
  const router = useRouter();
  const form = useForm<AudiobookFormValues>({
    resolver: zodResolver(audiobookFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      narrator: initialData?.narrator || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      currency: initialData?.currency || "SAR",
      categoryRef: initialData?.categoryRef || "",
      isFeatured: initialData?.isFeatured || false,
      totalDuration: initialData?.totalDuration || "",
      coverImageUrl: initialData?.coverImageUrl || "",
      fullAudioUrl: initialData?.fullAudioUrl || "",
      previewAudioUrl: initialData?.previewAudioUrl || "",
    },
  });

  function onSubmit(data: AudiobookFormValues) {
    console.log("Form submitted:", data);
    // Here you would typically call an API to save the data
    // For mock purposes, we'll just log and redirect or call callback
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.push("/admin/audiobooks"); // Default redirect
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {initialData?.audiobookId ? "تعديل كتاب صوتي" : "إضافة كتاب صوتي جديد"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان الكتاب</FormLabel>
                    <FormControl><Input placeholder="مثال: فن اللامبالاة" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المؤلف</FormLabel>
                    <FormControl><Input placeholder="مثال: مارك مانسون" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="narrator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الراوي (اختياري)</FormLabel>
                  <FormControl><Input placeholder="مثال: أحمد الغندور" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف الكتاب</FormLabel>
                  <FormControl><Textarea placeholder="اكتب وصفًا موجزًا للكتاب..." {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العملة</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="اختر العملة" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="SAR">SAR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="totalDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدة الإجمالية</FormLabel>
                    <FormControl><Input placeholder="مثال: 3 ساعات و 15 دقيقة" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryRef"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التصنيف</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="اختر تصنيف الكتاب" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {categoriesData.map(category => (
                        <SelectItem key={category.categoryId} value={category.categoryId}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coverImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط صورة الغلاف</FormLabel>
                  <FormControl><Input type="url" placeholder="https://example.com/cover.jpg" {...field} /></FormControl>
                  <FormDescription>استخدم رابطًا مباشرًا للصورة. للحقول التجريبية، يمكن تركه فارغًا.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="fullAudioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط الملف الصوتي الكامل</FormLabel>
                  <FormControl><Input type="url" placeholder="https://example.com/full_audio.mp3" {...field} /></FormControl>
                   <FormDescription>للحقول التجريبية، يمكن تركه فارغًا.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previewAudioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط ملف المعاينة الصوتي</FormLabel>
                  <FormControl><Input type="url" placeholder="https://example.com/preview_audio.mp3" {...field} /></FormControl>
                   <FormDescription>للحقول التجريبية، يمكن تركه فارغًا.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                   <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>كتاب مميز؟</FormLabel>
                    <FormDescription>
                      سيظهر هذا الكتاب في قسم "كتب مميزة" بالصفحة الرئيسية.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => router.back()}>إلغاء</Button>
                <Button type="submit">
                    {initialData?.audiobookId ? "حفظ التعديلات" : "إضافة الكتاب"}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

