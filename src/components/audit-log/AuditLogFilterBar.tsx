import React from 'react';
import { Search } from 'lucide-react';

interface AuditLogFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  onClearFilters: () => void;
}

export const AuditLogFilterBar: React.FC<AuditLogFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
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
          placeholder="Cari berdasarkan pengguna..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Row 2: Filters and Bersihkan Filter button */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Filter */}
        <div className="flex-1 min-w-[220px]">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Semua Kategori Aktivitas</option>
            <option value="Login">Login</option>
            <option value="Buku gaya">Buku gaya</option>
            <option value="Pengecualian sumber">Pengecualian sumber</option>
            <option value="Manajemen akun">Manajemen akun</option>
          </select>
        </div>

        {/* Time Filter */}
        <div className="flex-1 min-w-[180px]">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">7 Hari Terakhir</option>
            <option value="30">30 Hari Terakhir</option>
            <option value="all">Semua Waktu</option>
          </select>
        </div>

        {/* Bersihkan Filter Button */}
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
