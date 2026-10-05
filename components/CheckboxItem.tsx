import { ReactNode } from 'react';

export function CheckboxItem({
  id,
  label,
  checked,
  onChange,
  className = '',
  children,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors border border-transparent hover:border-slate-600/50 ${className}`}>
      <label 
        className="flex items-start gap-3 cursor-pointer" 
        htmlFor={id}
      >
        <div className="relative flex items-center mt-0.5">
          <input 
            type="checkbox" 
            id={id} 
            checked={checked} 
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <div className="w-5 h-5 bg-slate-900 border border-slate-600 rounded flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors">
            <svg 
              className={`w-3.5 h-3.5 text-white pointer-events-none transition-transform duration-200 ${checked ? 'scale-100' : 'scale-0'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${checked ? 'text-white' : 'text-slate-200'} transition-colors`}>{label}</span>
        </div>
      </label>
      {children && (
        <div className="mt-1 pl-8">
          {children}
        </div>
      )}
    </div>
  );
}
