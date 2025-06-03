
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { SubscriptionPlan } from "@/types";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

const subscriptionPlanFormSchema = z.object({
  name: z.string().min(3, { message: "اسم الخطة يجب أن يكون 3 أحرف على الأقل." }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: "السعر يجب أن يكون رقمًا موجبًا." }),
  currency: z.string().default("SAR"),
  durationDays: z.coerce.number().int().positive({ message: "المدة يجب أن تكون رقمًا صحيحًا موجبًا." }),
  features: z.array(z.object({ value: z.string().min(1, {message: "الميزة لا يمكن أن تكون فارغة"}) })).optional(),
  isActive: z.boolean().default(true),
});

type SubscriptionPlanFormValues = z.infer<typeof subscriptionPlanFormSchema>;

interface SubscriptionPlanFormProps {
  initialData?: Partial<SubscriptionPlan>;
  onSubmitSuccess?: () => void;
}

export function SubscriptionPlanForm({ initialData, onSubmitSuccess }: SubscriptionPlanFormProps) {
  const router = useRouter();
  const form = useForm<SubscriptionPlanFormValues>({
    resolver: zodResolver(subscriptionPlanFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      currency: initialData?.currency || "SAR",
      durationDays: initialData?.durationDays || 30,
      features: initialData?.features?.map(f => ({ value: f })) || [{value: ""}],
      isActive: initialData?.isActive === undefined ? true : initialData.isActive,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  function onSubmit(data: SubscriptionPlanFormValues) {
    const processedData = {
      ...data,
      features: data.features?.map(f => f.value).filter(f => f.trim() !== ""),
    };
    console.log("Subscription plan form submitted:", processedData);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.push("/admin/subscriptions");
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">
            {initialData?.subscriptionId ? "تعديل خطة اشتراك" : "إضافة خطة اشتراك جديدة"}
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
                    <FormLabel>اسم الخطة</FormLabel>
                    <FormControl><Input placeholder="مثال: الاشتراك الشهري المميز" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>الوصف (اختياري)</FormLabel>
                    <FormControl><Textarea placeholder="وصف موجز للخطة ومميزاتها الرئيسية..." {...field} /></FormControl>
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
                        <FormControl><Input {...field} /></FormControl> {/* Removed defaultValue="SAR" */}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="durationDays"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>المدة (بالأيام)</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div>
                    <FormLabel>مميزات الخطة</FormLabel>
                    {fields.map((field, index) => (
                        <FormField
                        key={field.id}
                        control={form.control}
                        name={`features.${index}.value`}
                        render={({ field: itemField }) => (
                            <FormItem className="flex items-center gap-2 mt-2">
                            <FormControl><Input placeholder={`ميزة ${index + 1}`} {...itemField} /></FormControl>
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            </FormItem>
                        )}
                        />
                    ))}
                     <Button type="button" variant="outline" size="sm" onClick={() => append({ value: "" })} className="mt-2">
                        <PlusCircle className="ml-2 h-4 w-4" /> إضافة ميزة
                    </Button>
                </div>


                <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>خطة نشطة؟</FormLabel>
                        <FormDescription>
                        هل هذه الخطة متاحة للمستخدمين للاشتراك بها؟
                        </FormDescription>
                    </div>
                    </FormItem>
                )}
                />
                
                <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => router.back()}>إلغاء</Button>
                    <Button type="submit">
                        {initialData?.subscriptionId ? "حفظ التعديلات" : "إضافة الخطة"}
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
