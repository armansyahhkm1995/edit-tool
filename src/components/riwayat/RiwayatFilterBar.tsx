import React from 'react';
import { Search } from 'lucide-react';

interface RiwayatFilterBarProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  timeRangeFilter: string;
  setTimeRangeFilter: (s: string) => void;
  editorFilter: string;
  setEditorFilter: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  onClearFilters: () => void;
}

export const RiwayatFilterBar: React.FC<RiwayatFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  timeRangeFilter,
  setTimeRangeFilter,
  editorFilter,
  setEditorFilter,
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
          placeholder="Cari draft berita ..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Row 2: Filters and Bersihkan Filter button */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter 1: Rentang Waktu */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={timeRangeFilter}
            onChange={(e) => setTimeRangeFilter(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Waktu: Semua Riwayat</option>
            <option value="hari-ini">Hari Ini</option>
            <option value="7-hari">7 Hari Terakhir</option>
            <option value="30-hari">30 Hari Terakhir</option>
          </select>
        </div>

        {/* Filter 2: Editor */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={editorFilter}
            onChange={(e) => setEditorFilter(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Editor: Semua</option>
            <option value="Ridwan">Ridwan</option>
            <option value="Siti">Siti</option>
            <option value="Budi">Budi</option>
          </select>
        </div>

        {/* Filter 3: Status Artikel */}
        <div className="flex-1 min-w-[200px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">Status Artikel: Semua</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Publish">Publish</option>
            <option value="Review">Review</option>
          </select>
        </div>

        {/* Bersihkan Filter Button */}
        <button
          type="button"
          onClick={onClearFilters}
          className="w-auto shrink-0 px-4 py-2 text-sm font-medium border border-red-200 text-red-500 bg-white hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Bersihkan Filter
        </button>
      </div>
    </div>
  );
};
