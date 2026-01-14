'use client';

import React from 'react';
import { ProductCategory } from '../types';

interface CategoryFilterProps {
  categories: string[];
  selected: ProductCategory;
  onChange: (category: ProductCategory) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const allCategories: ProductCategory[] = ['all', ...categories] as ProductCategory[];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}