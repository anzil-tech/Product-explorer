const FAVORITES_KEY = 'product-explorer-favorites';

export function getFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function toggleFavorite(productId: number): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);
  
  if (index === -1) {
    favorites.push(productId);
  } else {
    favorites.splice(index, 1);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(productId: number): boolean {
  const favorites = getFavorites();
  return favorites.includes(productId);
}

export function filterFavorites(products: any[], favorites: number[]) {
  return products.filter(product => favorites.includes(product.id));
}