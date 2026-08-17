import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Option {
  _id: string;
  name: string;
}

export interface MultiSelectProps {
  label?: string;
  options: Option[];
  selectedIds: string[];
  onChange: (id: string) => void;
  error?: string;
  wrapperClassName?: string;
}

export function MultiSelect({
  label,
  options,
  selectedIds,
  onChange,
  error,
  wrapperClassName
}: MultiSelectProps) {
  return (
    <div className={wrapperClassName}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <div className={cn(
        "border rounded-lg max-h-40 overflow-y-auto p-1.5",
        error ? "border-red-300 bg-red-50/30" : "border-gray-200"
      )}>
        {options && options.map(opt => {
          const isSelected = selectedIds.includes(opt._id);
          return (
            <div 
              key={opt._id}
              onClick={() => onChange(opt._id)}
              className={cn(
                "flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors mb-0.5",
                isSelected ? "bg-indigo-50/70" : "hover:bg-gray-50"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                isSelected ? "bg-indigo-600 border-indigo-600" : "border-gray-300"
              )}>
                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium text-gray-700">{opt.name}</span>
            </div>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
