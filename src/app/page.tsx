
'use client';

import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '@/app/lib/api';
import { getFavorites, filterFavorites } from '@/app/lib/favorites';
import { FilterState, Product } from './types';
import ErrorDisplay from './components/ErrorDisplay';
import SearchBar from './components/SearchBar';
import FavoritesFilter from './components/FavoritesFilter';
import CategoryFilter from './components/CategoryFilter';
import LoadingSkeleton from './components/LoadingSkeleton';
import ProductGrid from './components/ProductGrid';


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    showFavorites: false,
  });
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, favorites]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const applyFilters = () => {
    let result = [...products];

    
    if (filters.searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

   
    if (filters.category !== 'all') {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    
    if (filters.showFavorites) {
      result = filterFavorites(result, favorites);
    }

    setFilteredProducts(result);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === 'showFavorites') {
      loadFavorites();
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <ErrorDisplay message={error} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
     <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6 sm:p-8 text-center sm:text-left shadow-sm">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
    Products
  </h2>
  <p className="max-w-xl text-sm sm:text-base text-gray-600">
    Browse through our collection of amazing products crafted just for you.
  </p>
</div>


      
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SearchBar
            value={filters.searchQuery}
            onChange={(value) => updateFilter('searchQuery', value)}
          />
          <FavoritesFilter
            enabled={filters.showFavorites}
            onChange={(enabled) => updateFilter('showFavorites', enabled)}
            count={favorites.length}
          />
        </div>

        <CategoryFilter
          categories={categories}
          selected={filters.category}
          onChange={(category) => updateFilter('category', category)}
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </span>
          {filters.showFavorites && (
            <span className="text-sm font-medium text-red-600">
              {favorites.length} favorites
            </span>
          )}
        </div>
      </div>

      
      {loading ? (
        <LoadingSkeleton />
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}