export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ProductCategory = 
  | "all"
  | "men's clothing"
  | "women's clothing"
  | "jewelery"
  | "electronics";

export interface FilterState {
  searchQuery: string;
  category: ProductCategory;
  showFavorites: boolean;
}