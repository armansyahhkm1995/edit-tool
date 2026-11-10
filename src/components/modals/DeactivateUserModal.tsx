import React from 'react';
import { X } from 'lucide-react';
import { User } from '../../types';

interface DeactivateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

export const DeactivateUserModal: React.FC<DeactivateUserModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog (Matching Figma Node 958:29845) */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-fade-in z-10">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {user.status === 'active' ? 'Nonaktifkan Pengguna' : 'Aktifkan Pengguna'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 text-sm text-slate-600 leading-relaxed">
          {user.status === 'active' ? (
            <p>
              Apa Anda yakin ingin menonaktifkan pengguna{' '}
              <span className="font-semibold text-slate-900">{user.name}</span>? Pengguna tidak akan
              bisa mengakses dasbor portal pemeriksa naskah sampai Anda aktifkan kembali akunnya.
            </p>
          ) : (
            <p>
              Apa Anda yakin ingin mengaktifkan kembali akses pengguna{' '}
              <span className="font-semibold text-slate-900">{user.name}</span> ke portal pemeriksa naskah?
            </p>
          )}
        </div>

        <div className="flex justify-end items-center gap-2 mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors shadow-sm ${
              user.status === 'active'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {user.status === 'active' ? 'Ya, Nonaktifkan Pengguna' : 'Ya, Aktifkan Pengguna'}
          </button>
        </div>
      </div>
    </div>
  );
};
