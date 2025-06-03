
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/types";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "اسم التصنيف يجب أن يكون حرفين على الأقل." }),
  iconUrl: z.string().url({ message: "الرجاء إدخال رابط أيقونة صحيح." }).optional().or(z.literal('')),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialData?: Partial<Category>;
  onSubmitSuccess?: () => void;
}

export function CategoryForm({ initialData, onSubmitSuccess }: CategoryFormProps) {
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      iconUrl: initialData?.iconUrl || "",
      description: initialData?.description || "",
    },
  });

  function onSubmit(data: CategoryFormValues) {
    console.log("Category form submitted:", data);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.push("/admin/categories");
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">
            {initialData?.categoryId ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>اسم التصنيف</FormLabel>
                    <FormControl><Input placeholder="مثال: تنمية بشرية" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="iconUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>رابط الأيقونة (اختياري)</FormLabel>
                    <FormControl><Input type="url" placeholder="https://example.com/icon.png" {...field} /></FormControl>
                    <FormDescription>سيتم عرض الأيقونة بجانب اسم التصنيف.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>وصف قصير (اختياري)</FormLabel>
                    <FormControl><Textarea placeholder="وصف موجز عن محتوى هذا التصنيف..." {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => router.back()}>إلغاء</Button>
                    <Button type="submit">
                        {initialData?.categoryId ? "حفظ التعديلات" : "إضافة التصنيف"}
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
