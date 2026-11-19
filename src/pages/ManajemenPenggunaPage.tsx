import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import { Plus } from 'lucide-react';
import { UsersKpiCards } from '../components/users/UsersKpiCards';
import { UsersFilterBar } from '../components/users/UsersFilterBar';
import { UsersTable } from '../components/users/UsersTable';
import { AddEditUserModal } from '../components/modals/AddEditUserModal';
import { DeleteUserModal } from '../components/modals/DeleteUserModal';

export const ManajemenPenggunaPage: React.FC = () => {
  const { users, currentUser, addUser, updateUser, deleteUser, toggleUserStatus } = useApp();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

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
            Pengaturan hak akses pengguna dan pemantauan status akun aktif.
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

      {/* KPI Cards (2 Cards) */}
      <UsersKpiCards
        totalCount={totalCount}
        adminCount={adminCount}
        editorCount={editorCount}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
      />

      {/* Main Table Card (Search & Filters integrated within card) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <UsersFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClearFilters={handleClearFilters}
        />

        <UsersTable
          users={filteredUsers}
          currentUser={currentUser}
          onToggleStatus={toggleUserStatus}
          onEditUser={(user) => {
            setEditingUser(user);
            setIsAddEditOpen(true);
          }}
          onDeleteUser={(user) => setDeletingUser(user)}
        />
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

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        onConfirm={() => {
          if (deletingUser) {
            deleteUser(deletingUser.id);
          }
        }}
        user={deletingUser}
      />
    </div>
  );
};
