import React from 'react';
import { Search } from 'lucide-react';

interface UsersFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onClearFilters: () => void;
}

export const UsersFilterBar: React.FC<UsersFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onClearFilters,
}) => {
  return (
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
          onClick={onClearFilters}
          className="w-auto shrink-0 px-4 py-2 text-sm font-medium border border-red-200 text-red-500 bg-white hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Bersihkan Filter
        </button>
      </div>
    </div>
  );
};
