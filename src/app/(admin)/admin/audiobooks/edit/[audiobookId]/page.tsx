
"use client";

import { AudiobookForm } from "@/components/admin/audiobook-form";
import { getAudiobookById } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

export default function EditAudiobookPage({ params }: { params: { audiobookId: string } }) {
  const audiobook = getAudiobookById(params.audiobookId);

  if (!audiobook) {
    notFound();
  }

  // Convert dates to string if needed by form, or handle in form component
  const initialData = {
    ...audiobook,
    // releaseDate: audiobook.releaseDate.toISOString().split('T')[0], // Example if date input is used
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AudiobookForm initialData={initialData} />
    </div>
  );
}
