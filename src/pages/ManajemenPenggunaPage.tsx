import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import {
  Users,
  ShieldCheck,
  UserCheck,
  Plus,
  Search,
  Pencil,
  X,
  Check,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { AddEditUserModal } from '../components/modals/AddEditUserModal';
import { DeactivateUserModal } from '../components/modals/DeactivateUserModal';

export const ManajemenPenggunaPage: React.FC = () => {
  const { users, currentUser, addUser, updateUser, toggleUserStatus } = useApp();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);

  // Filtered list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRole = !roleFilter || u.role === roleFilter;
      const matchStatus = !statusFilter || u.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setRoleFilter('');
    setStatusFilter('');
  };

  // Metrics
  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const editorCount = users.filter((u) => u.role === 'editor').length;
  const twoFaActiveCount = users.filter((u) => u.twoFactorEnabled).length;
  const twoFaPercent = Math.round((twoFaActiveCount / totalCount) * 100);
  const activeCount = users.filter((u) => u.status === 'active').length;
  const inactiveCount = totalCount - activeCount;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-700 tracking-tight">
            Manajemen Pengguna & Kontrol Hak Akses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Pengaturan hak akses pengguna, pemantauan status akun aktif, dan audit kepatuhan keamanan
            2FA.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setIsAddEditOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      {/* 3 KPI Cards (Matching Figma Node 954:19547) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total Akun Terdaftar
            </p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{totalCount} Pengguna</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {adminCount} Admin • {editorCount} Editor
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Kepatuhan 2FA
            </p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {twoFaActiveCount} Aktif ({twoFaPercent}%)
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalCount - twoFaActiveCount} Akun belum aktivasi 2FA
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Status Akun Aktif
            </p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {activeCount} Aktif / {inactiveCount} Dinonaktifkan
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Log perubahan tersimpan di Audit Log</p>
          </div>
        </div>
      </div>

      {/* Main Table Card (Search & Filters integrated within card) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Search and Filter Row inside Table Card */}
        <div className="p-4 sm:p-5 border-b border-slate-200 space-y-3 bg-white">
          {/* Row 1: Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, atau email pengguna..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Row 2: Filters and Bersihkan Filter button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter 1: Peran */}
            <div className="flex-1 min-w-[220px]">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Peran: Semua (Admin & Editor)</option>
                <option value="admin">Administrator</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            {/* Filter 2: Status */}
            <div className="flex-1 min-w-[180px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Status: Semua</option>
                <option value="active">Aktif</option>
                <option value="inactive">Non-aktif</option>
              </select>
            </div>

            {/* Bersihkan Filter Button (HUG CONTENT, pink/red outline) */}
            <button
              onClick={handleClearFilters}
              className="w-auto shrink-0 px-4 py-2 text-sm font-medium border border-red-200 text-red-500 bg-white hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4 sm:px-6 font-semibold">Nama & Email</th>
                <th className="py-3 px-4 font-semibold">Peran Akses</th>
                <th className="py-3 px-4 font-semibold">Verifikasi 2FA</th>
                <th className="py-3 px-4 font-semibold">Status Akun</th>
                <th className="py-3 px-4 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isCurrentUser = currentUser.email === user.email || currentUser.name === user.name;
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Nama & Email */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">
                              {user.name}
                              {isCurrentUser && (
                                <span className="text-slate-500 font-normal ml-1">(Anda)</span>
                              )}
                            </p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Peran Akses */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {user.role === 'admin' ? 'Administrator' : 'Editor'}
                        </span>
                      </td>

                      {/* Verifikasi 2FA */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {user.twoFactorEnabled ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>2FA Terverifikasi</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Belum diaktifkan</span>
                          </span>
                        )}
                      </td>

                      {/* Status Akun */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {user.status === 'active' ? 'Aktif' : 'Non-aktif'}
                        </span>
                      </td>

                      {/* Aksi (Pencil & X / Check buttons) */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setIsAddEditOpen(true);
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                            title="Edit Pengguna"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {user.status === 'active' ? (
                            <button
                              onClick={() => setDeactivatingUser(user)}
                              className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Nonaktifkan Akun"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeactivatingUser(user)}
                              className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                              title="Aktifkan Akun"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-700">Pengguna tidak ditemukan</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci atau filter pencarian</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Menampilkan 1-5 dari 42 data</span>
            <div className="relative">
              <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 cursor-pointer">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors">
              Sebelumnya
            </button>
            <button className="w-8 h-8 rounded-md bg-[#1866EF] text-white font-semibold text-xs">
              1
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors">
              10
            </button>
            <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      <AddEditUserModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={(name, email, role) => {
          if (editingUser) {
            updateUser(editingUser.id, name, email, role);
          } else {
            addUser(name, email, role);
          }
        }}
        editingUser={editingUser}
      />

      {/* Deactivate / Activate User Modal */}
      <DeactivateUserModal
        isOpen={Boolean(deactivatingUser)}
        onClose={() => setDeactivatingUser(null)}
        onConfirm={() => {
          if (deactivatingUser) {
            toggleUserStatus(deactivatingUser.id);
          }
        }}
        user={deactivatingUser}
      />
    </div>
  );
};
