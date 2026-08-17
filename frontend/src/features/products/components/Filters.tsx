"use client";

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '../lib/types';

interface FiltersProps {
  categories: Category[];
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategories: string[];
  onCategoryChange: (selected: string[]) => void;
}

export default function Filters({
  categories,
  search,
  onSearchChange,
  selectedCategories,
  onCategoryChange
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleCategory = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelected);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          placeholder="Search products by name..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-[250px] flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
        >
          <span className="truncate">
            {selectedCategories.length === 0 
              ? 'Filter by Categories' 
              : `${selectedCategories.length} category(s) selected`}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {categories && categories.map(category => (
              <div 
                key={category._id} 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleToggleCategory(category._id)}
              >
                <div className="w-4 h-4 flex items-center justify-center border border-gray-300 rounded">
                  {selectedCategories.includes(category._id) && (
                    <Check className="w-3 h-3 text-indigo-600" strokeWidth={3} />
                  )}
                </div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
