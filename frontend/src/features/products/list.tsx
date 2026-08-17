"use client";

import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { Product } from './lib/types';

import ProductList from './components/ProductList';
import ProductListSkeleton from './components/ProductListSkeleton';
import ProductForm from './components/ProductForm';
import Filters from './components/Filters';

import Toast from '@/components/Toast';
import { useDebounce } from '@/hooks/useDebounce';
import { useProducts } from './hooks/useProducts';

export default function ProductListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [limit, setLimit] = useState(5);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  const debouncedSearch = useDebounce(search, 500);

  const {
    products,
    categories,
    loading,
    totalPages,
    fetchProducts,
    updateProduct,
    deleteProduct
  } = useProducts(currentPage, debouncedSearch, selectedCategories, limit);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleDeleteProduct = async (id: string) => {
    const { success } = await deleteProduct(id);
    if (success) {
      showToast('Product deleted successfully', 'success');
      if (products.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchProducts();
      }
    } else {
      showToast('Failed to delete product', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-inner shadow-indigo-400">
              <Package className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inventory Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage your products and categories.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => {
              setProductToEdit(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </header>

        <main className="space-y-6">
          <Filters 
            categories={categories}
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            selectedCategories={selectedCategories}
            onCategoryChange={(val) => {
              setSelectedCategories(val);
              setCurrentPage(1);
            }}
          />

          {loading ? (
            <ProductListSkeleton limit={limit} />
          ) : (
            <ProductList 
              products={products}
              onEdit={(product) => {
                setProductToEdit(product);
                setIsFormOpen(true);
              }} 
              onDelete={handleDeleteProduct}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              limit={limit}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setCurrentPage(1);
              }}
            />
          )}
        </main>
      </div>

      {isFormOpen && (
        <ProductForm 
          categories={categories}
          productToEdit={productToEdit}
          onClose={() => {
            setIsFormOpen(false);
            setProductToEdit(null);
          }}
          onSuccess={() => {
            setIsFormOpen(false);
            showToast(`Product ${productToEdit ? 'updated' : 'added'} successfully!`, 'success');
            setProductToEdit(null);
            fetchProducts();
          }}
        />
      )}

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
}
