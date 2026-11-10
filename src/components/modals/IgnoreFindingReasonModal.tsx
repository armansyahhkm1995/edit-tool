import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { FindingItem } from '../../types';

interface IgnoreFindingReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  finding: FindingItem | null;
}

export const IgnoreFindingReasonModal: React.FC<IgnoreFindingReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  finding,
}) => {
  const [reason, setReason] = useState(
    'Kutipan resmi siaran pers narasumber yang tidak dapat diubah susunannya.'
  );

  if (!isOpen || !finding) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-fade-in z-10">
        <div className="flex items-start justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Abaikan Temuan {finding.code}
              </h2>
              <p className="text-xs text-slate-500">{finding.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Alasan Pengabaian Temuan (Wajib untuk Rekam Jejak Audit)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Kutipan pidato resmi kenegaraan yang sah dan sudah diatribusikan..."
              required
              rows={3}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end items-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
            >
              Simpan Keputusan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
