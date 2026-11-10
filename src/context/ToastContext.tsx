import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  module?: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, module?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success', module?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastMessage = { id, message, type, module };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast container floating top right */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          let bgClass = 'bg-white border-slate-200 text-slate-800';
          let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;

          if (toast.type === 'success') {
            bgClass = 'bg-emerald-50 border-emerald-200 text-emerald-950';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
          } else if (toast.type === 'error') {
            bgClass = 'bg-red-50 border-red-200 text-red-950';
            icon = <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
          } else if (toast.type === 'warning') {
            bgClass = 'bg-amber-50 border-amber-200 text-amber-950';
            icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
          } else if (toast.type === 'info') {
            bgClass = 'bg-blue-50 border-blue-200 text-blue-950';
            icon = <Info className="w-5 h-5 text-blue-600 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-fade-in ${bgClass}`}
            >
              <div className="mt-0.5">{icon}</div>
              <div className="flex-1 text-sm">
                {toast.module && (
                  <p className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-0.5">
                    {toast.module}
                  </p>
                )}
                <p className="font-medium text-slate-800 leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-xs font-semibold px-2 py-1 rounded hover:bg-black/5 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Tutup
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
