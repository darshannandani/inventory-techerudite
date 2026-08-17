"use client";

import { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | '';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 p-4 rounded-lg bg-white shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5",
        type === 'error' ? "border-l-4 border-red-500" : "border-l-4 border-green-500"
      )}
    >
      {type === 'error' ? (
        <AlertCircle className="text-red-500 w-5 h-5" />
      ) : (
        <CheckCircle className="text-green-500 w-5 h-5" />
      )}
      <span className="text-sm font-medium text-gray-800">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
