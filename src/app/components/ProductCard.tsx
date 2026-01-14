'use client';

import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '../types';
import { isFavorite, toggleFavorite } from '../lib/favorites';
import { formatPrice, truncateText } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-200 hover:border-blue-300"
    >
      
      <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md z-10"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              favorite 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-gray-500 hover:text-red-500 hover:scale-110'
            }`}
          />
        </button>
      </div>
      
   
      <div className="p-4 flex flex-col flex-grow min-h-[180px]">
   
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full mb-3 self-start border border-blue-100">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        
       
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px] text-sm leading-tight">
          {product.title}
        </h3>
        
        
        <p className="text-gray-600 text-xs mb-4 flex-grow line-clamp-3 leading-relaxed">
          {product.description}
        </p>
        
   
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {(product.price)}
            </span>
            {product.price > 50 && (
              <span className="ml-2 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                Free Shipping
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-xs font-medium text-gray-700">
              {product.rating.rate}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}