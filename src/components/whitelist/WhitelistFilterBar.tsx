import React from 'react';
import { Search } from 'lucide-react';

interface WhitelistFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
}

export const WhitelistFilterBar: React.FC<WhitelistFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari domain, URL, atau alasan..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Filter Tipe Dropdown */}
      <div className="w-full sm:w-64">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Tipe: Semua (Domain & URL)</option>
          <option value="Domain">Domain</option>
          <option value="URL">URL Spesifik</option>
        </select>
      </div>
    </div>
  );
};
