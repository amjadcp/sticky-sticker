import React from 'react';
import { Category } from '../types/prompt';
import { LayoutGrid, Sparkles, ChevronDown } from 'lucide-react';

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy = 'featured',
  onSortChange,
}) => {
  return (
    <div className="w-full bg-surface rounded-2xl p-3 border border-border-subtle shadow-subtle my-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
      
      {/* Scrollable Horizontal Pill List */}
      <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const isAll = category === 'All';

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none min-h-[40px] flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-ink text-white font-semibold shadow-sm scale-[1.01]'
                  : 'bg-canvas text-ink/80 hover:text-ink hover:bg-softGray border border-border-subtle'
              }`}
              aria-pressed={isSelected}
            >
              {isAll ? (
                <LayoutGrid className="w-3.5 h-3.5" />
              ) : (
                <Sparkles className="w-3 h-3 text-indigo-primary" />
              )}
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {/* Right Side Sort Dropdown */}
      <div className="flex items-center justify-end flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-subtle">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="appearance-none bg-canvas hover:bg-softGray text-ink text-xs font-semibold px-4 py-2 pr-8 rounded-full border border-border-subtle focus:outline-none cursor-pointer min-h-[40px]"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-ink-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

    </div>
  );
};
