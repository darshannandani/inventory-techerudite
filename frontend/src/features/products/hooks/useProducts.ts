import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { Product, Category } from '../lib/types';

interface UseProductsResult {
  products: Product[];
  categories: Category[];
  loading: boolean;
  totalPages: number;
  error: string | null;
  fetchProducts: () => Promise<void>;
  updateProduct: (id: string, payload: any) => Promise<{ success: boolean }>;
  deleteProduct: (id: string) => Promise<{ success: boolean }>;
}

export function useProducts(
  currentPage: number,
  debouncedSearch: string,
  selectedCategories: string[],
  limit: number = 5
): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get('/categories');
      // res.data format is { success, message, data }
      setCategories(res.data.data || []);
    } catch (err) {
      setError('Failed to load categories');
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });
      
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (selectedCategories.length > 0) {
        params.append('categories', selectedCategories.join(','));
      }

      const res = await api.get(`/products?${params.toString()}`);
      // res.data is { success, message, data: { data: products, totalPages } }
      const responseData = res.data.data;
      setProducts(responseData?.data || []);
      setTotalPages(responseData?.totalPages || 1);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, selectedCategories, limit]);

  const updateProduct = async (id: string, payload: any) => {
    try {
      await api.put(`/products/${id}`, payload);
      return { success: true };
    } catch (err) {
      setError('Failed to update product');
      return { success: false };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      return { success: true };
    } catch (err) {
      setError('Failed to delete product');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    categories,
    loading,
    totalPages,
    error,
    fetchProducts,
    updateProduct,
    deleteProduct
  };
}
