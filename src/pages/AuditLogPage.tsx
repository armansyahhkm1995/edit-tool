import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchSearch =
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = !categoryFilter || log.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [auditLogs, searchTerm, categoryFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDateFilter('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          100 Log Audit Sistem & Rekam Jejak Keamanan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Pantau rekam jejak keamanan aplikasi secara komprehensif. Mencakup riwayat login, perubahan
          hak akses, penyesuaian parameter AI, dan log galat sistem.
        </p>
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
                <option value="Persetujuan provider">Persetujuan provider</option>
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

            {/* Bersihkan Filter Button (HUG CONTENT, pink/red outline) */}
            <button
              onClick={handleClearFilters}
              className="w-auto shrink-0 px-4 py-2 text-sm font-medium border border-red-200 text-red-500 bg-white hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

        {/* Table Content (Exact 4 columns: Waktu, Pengguna & Peran, Kategori, Detail Aktivitas) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4 sm:px-6 font-semibold">Waktu (WIB)</th>
                <th className="py-3 px-4 font-semibold">Pengguna & Peran</th>
                <th className="py-3 px-4 font-semibold">Kategori</th>
                <th className="py-3 px-4 sm:px-6 font-semibold">Detail Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Waktu (WIB) */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <p className="font-semibold text-xs text-slate-900">
                        {log.timestamp}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{log.timezone}</p>
                    </td>

                    {/* Pengguna & Peran */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <p className="font-semibold text-xs text-slate-900">{log.userName}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{log.userRole}</p>
                    </td>

                    {/* Kategori */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-700">
                      {log.category}
                    </td>

                    {/* Detail Aktivitas */}
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-800 leading-relaxed">
                      {log.detail}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-700">Log tidak ditemukan</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci atau filter</p>
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
    </div>
  );
};
