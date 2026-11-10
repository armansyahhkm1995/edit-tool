import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { User } from '../../types';

interface AddEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, email: string, role: 'admin' | 'editor') => void;
  editingUser?: User | null;
}

export const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingUser,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'editor'>('editor');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
    } else {
      setName('');
      setEmail('');
      setRole('editor');
    }
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSave(name.trim(), email.trim(), role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-fade-in z-10">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            {editingUser ? editingUser.name : 'Tambah Pengguna Baru'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Pengguna
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: pengguna 1"
              required
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Pengguna
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contoh: pengguna1@rri.co.id"
              required
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Peran Akses
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'editor')}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="editor">Editor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="flex justify-end items-center gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#1866EF] rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              {editingUser ? 'Perbarui' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
