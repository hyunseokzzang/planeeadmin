
import React from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white mr-3">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white mr-3">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center text-white mr-3">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`
      flex items-center bg-slate-900/95 backdrop-blur-md text-white pl-4 pr-3 py-3 rounded-2xl 
      shadow-2xl border border-white/10
      animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-auto
      max-w-xs group relative
    `}>
      {getIcon()}
      <span className="text-[12px] font-bold tracking-tight pr-6">{message}</span>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-auto w-5 h-5 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
