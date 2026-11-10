import React from 'react';
import { X } from 'lucide-react';
import { WhitelistSource } from '../../types';

interface DeleteWhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: WhitelistSource | null;
}

export const DeleteWhitelistModal: React.FC<DeleteWhitelistModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  item,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog matching Figma media_1794276191436_20f3841c.png */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-fade-in z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-[#EF4444]">
            Hapus Sumber Dikecualikan
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Text */}
        <div className="text-sm text-slate-700 leading-relaxed font-sans">
          Apakah Anda yakin ingin menghapus domain{' '}
          <span className="font-semibold text-slate-900">{item.domain}</span>? Tindakan ini akan
          mengembalikan kembali sebagai penilaian kemiripan AI.
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#EF4444] hover:bg-red-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Ya, Hapus Sumber
          </button>
        </div>
      </div>
    </div>
  );
};
