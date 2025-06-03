
"use client";

import { CategoryForm } from "@/components/admin/category-form";
import { getCategoryById } from "@/lib/mock-data";
import { notFound } } from 'next/navigation';

export default function EditCategoryPage({ params }: { params: { categoryId: string } }) {
  const category = getCategoryById(params.categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto">
      <CategoryForm initialData={category} />
    </div>
  );
}
