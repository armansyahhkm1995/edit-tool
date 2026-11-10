import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { WhitelistSource } from '../../types';

interface AddEditWhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (domain: string, reason: string) => void;
  editingItem?: WhitelistSource | null;
}

export const AddEditWhitelistModal: React.FC<AddEditWhitelistModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
}) => {
  const [domain, setDomain] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (editingItem) {
      setDomain(editingItem.domain);
      setReason(editingItem.reason);
    } else {
      setDomain('');
      setReason('');
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !reason.trim()) return;
    onSave(domain.trim(), reason.trim());
    onClose();
  };

  const isEditMode = Boolean(editingItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card matching Figma media_1794276191436_20f3841c.png */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-fade-in z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {isEditMode ? editingItem?.domain : 'Tambah Domain / URL Dikecualikan'}
            </h2>
            {isEditMode && (
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Terakhir Diubah: 06 Nov 2026 14:15
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Domain / URL yang ingin dikecualikan {isEditMode ? '' : '*'}
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="contoh: domain.com atau https://..."
              required
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Alasan Dikecualikan {isEditMode ? '' : '*'}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Jelaskan alasan sumber ini dikecualikan (misal: rilis resmi pemerintah, kanal berita internal, dsb)"
              maxLength={200}
              required
              rows={3}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none transition-colors"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span>Maks 200 karakter</span>
              <span>{reason.length}/200</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#1866EF] hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {isEditMode ? 'Perbarui' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
