import React from 'react';
import { X } from 'lucide-react';
import { StyleGuideVersion } from '../../types';

interface BukuGayaTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleGuide: StyleGuideVersion | null;
  onSetActive?: (id: string) => void;
}

export const BukuGayaTextModal: React.FC<BukuGayaTextModalProps> = ({
  isOpen,
  onClose,
  styleGuide,
}) => {
  if (!isOpen || !styleGuide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Center Modal Dialog (Replacing right drawer per user instruction) */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-fade-in z-10">
        {/* Header matching media_1794277916913_fd5adb84.jpg */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-white">
          <div className="space-y-1">
            {styleGuide.isActive ? (
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Aktif
              </span>
            ) : (
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-200">
                Non-aktif
              </span>
            )}

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {styleGuide.filename}
            </h2>

            <p className="text-xs text-slate-400">
              {styleGuide.pageCount} Halaman · {styleGuide.lineCount.toLocaleString('id-ID')} Baris
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Chapter Cards matching Figma */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8FAFC]">
          {styleGuide.articles.map((art, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-2.5"
            >
              <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
                {art.chapter}
              </h3>
              <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                {art.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
