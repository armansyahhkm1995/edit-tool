import React from 'react';
import { Search } from 'lucide-react';

interface DaftarDrafFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onFilterChange: () => void;
}

export const DaftarDrafFilterBar: React.FC<DaftarDrafFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onFilterChange,
}) => {
  return (
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onFilterChange();
          }}
          placeholder="Cari judul artikel atau nama penulis ..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Status Artikel Dropdown */}
      <div className="w-full sm:w-64">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            onFilterChange();
          }}
          className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="" disabled hidden>
            Status Artikel: Semua Status
          </option>
          <option value="">Status Artikel: Semua Status</option>
          <option value="Publish">Publish</option>
          <option value="Review">Review</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </div>
  );
};
