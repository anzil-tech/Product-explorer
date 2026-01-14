'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/app/types';
import { isFavorite, toggleFavorite } from '@/app/lib/favorites';
import { fetchProductById } from '@/app/lib/api';
import LoadingSkeleton from '@/app/components/LoadingSkeleton';
import ErrorDisplay from '@/app/components/ErrorDisplay';
import { formatPrice } from '@/app/utils/helpers';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      setFavorite(isFavorite(product.id));
    }
  }, [product]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product.id);
      setFavorite(!favorite);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !product) {
    return <ErrorDisplay message={error || 'Product not found'} onRetry={loadProduct} />;
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white border border-[#e0e0e0] p-4 md:p-6 lg:p-8 rounded-lg">
        
        <Link
          href="/"
          className="flex items-center gap-2 text-[#2874f0] mb-6 text-sm md:text-base hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
         
          <div className="lg:sticky lg:top-8">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] border border-[#e0e0e0] bg-white rounded-lg overflow-hidden">
              <div className="relative w-full h-full p-4 md:p-8 lg:p-10">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                />
              </div>

              <button
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 bg-white rounded-full p-2 border border-gray-300 hover:shadow-md transition-shadow"
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  size={22}
                  color={favorite ? 'red' : '#999'}
                  fill={favorite ? 'red' : 'none'}
                />
              </button>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="flex-1 bg-[#ff9f00] text-white font-semibold py-3 px-4 rounded hover:bg-[#ff8c00] transition-colors">
                ADD TO CART
              </button>
              <button className="flex-1 bg-[#fb641b] text-white font-semibold py-3 px-4 rounded hover:bg-[#e55a17] transition-colors">
                BUY NOW
              </button>
            </div>
          </div>

          
          <div className="space-y-6">
            
            <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900">
              {product.title}
            </h1>

            
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#388e3c] text-white px-2 py-1 rounded flex items-center gap-1 text-sm">
                {product.rating.rate}
                <Star size={14} fill="#fff" />
              </span>
              <span className="text-sm md:text-base text-gray-600">
                {product.rating.count} Ratings & Reviews
              </span>
            </div>

           
            <div className="mt-4">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {(product.price)}
              </div>
              <div className="text-green-600 text-sm md:text-base mt-1">
                Inclusive of all taxes
              </div>
            </div>

          

            
            <div className="mt-6">
              <strong className="text-gray-900 text-lg">Product Description</strong>
              <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 text-sm md:text-base">
              <div className="space-y-1">
                <div className="text-gray-500">Category</div>
                <div className="font-medium capitalize">{product.category}</div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500">Rating</div>
                <div className="font-medium">{product.rating.rate}/5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}