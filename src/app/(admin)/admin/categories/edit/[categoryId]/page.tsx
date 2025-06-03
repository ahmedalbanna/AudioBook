
"use client";

import { use } from 'react'; // Added use
import { CategoryForm } from "@/components/admin/category-form";
import { getCategoryById } from "@/lib/mock-data";
import { notFound } from 'next/navigation'; // Corrected import

export default function EditCategoryPage({ params }: { params: Promise<{ categoryId: string }> }) { // Updated params type
  const resolvedParams = use(params); // Unwrap params
  const category = getCategoryById(resolvedParams.categoryId); // Use resolvedParams

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto">
      <CategoryForm initialData={category} />
    </div>
  );
}
