
import Link from 'next/link';
import type { Category } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategoryChipProps {
  category: Category;
  isSelected?: boolean;
}

export function CategoryChip({ category, isSelected }: CategoryChipProps) {
  return (
    <Link href={`/categories/${category.categoryId}`} legacyBehavior>
      <a
        className={cn(
          "inline-block whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          isSelected
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        {category.name}
      </a>
    </Link>
  );
}
