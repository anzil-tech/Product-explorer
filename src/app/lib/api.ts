import { Product } from "../types";

const API_BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(id: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}