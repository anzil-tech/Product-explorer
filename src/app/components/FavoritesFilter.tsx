'use client';

import { Heart } from 'lucide-react';
import React from 'react';

interface FavoritesFilterProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  count: number;
}

export default function FavoritesFilter({
  enabled,
  onChange,
  count,
}: FavoritesFilterProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
        enabled
          ? 'bg-red-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Heart className={`w-5 h-5 ${enabled ? 'fill-current' : ''}`} />
      Favorites ({count})
    </button>
  );
}