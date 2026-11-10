import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CMSDraft } from '../types';
import {
  Search,
  RotateCw,
  Pencil,
  ChevronDown,
} from 'lucide-react';

export const DaftarDrafPage: React.FC = () => {
  const { drafts, setActiveDraft, setCurrentPage, pullNewDraftsFromCMS } = useApp();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 5;

  // Real-time filtering
  const filteredDrafts = useMemo(() => {
    return drafts.filter((draft) => {
      const matchSearch =
        draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        draft.journalist.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = !statusFilter || draft.cmsStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [drafts, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredDrafts.length / itemsPerPage) || 1;
  const paginatedDrafts = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredDrafts.slice(start, start + itemsPerPage);
  }, [filteredDrafts, currentPageNum, itemsPerPage]);

  const handleOpenDetail = (draft: CMSDraft) => {
    setActiveDraft(draft);
    setCurrentPage('detail-draf');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Page Heading (Matching media_1794274137274_f6fd2fc8.jpg) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-700 tracking-tight">
            50 daftar draft berita CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Daftar antrean draf berita yang tersinkronisasi secara langsung dari CMS RRI. Pantau status
            pemeriksaan dan pilih draf untuk melihat detail analisis AI
          </p>
        </div>

        <button
          onClick={pullNewDraftsFromCMS}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>Tarik Draf Baru dari CMS</span>
        </button>
      </div>

      {/* Main Single Card: Search Bar + Filter + Table (Integrated into ONE card div) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Top Search & Filter Bar (inside table card, matching Figma) */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPageNum(1);
              }}
              placeholder="Cari judul draft ..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Status CMS Dropdown */}
          <div className="w-full sm:w-64">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="" disabled hidden>
                Status CMS: Semua Status
              </option>
              <option value="">Status CMS: Semua Status</option>
              <option value="Menunggu Review">Menunggu Review</option>
              <option value="Draf">Draf</option>
              <option value="Terbit">Terbit</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-y border-slate-200 text-xs font-semibold text-slate-600">
              <tr>
                <th className="py-3 px-4 sm:px-6 font-semibold">Judul Draft</th>
                <th className="py-3 px-4 font-semibold">Status CMS</th>
                <th className="py-3 px-4 font-semibold">Status Pemeriksaan</th>
                <th className="py-3 px-4 font-semibold">Waktu Ubah</th>
                <th className="py-3 px-4 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedDrafts.length > 0 ? (
                paginatedDrafts.map((draft) => (
                  <tr
                    key={draft.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleOpenDetail(draft)}
                  >
                    {/* Judul Draft (Title single-line with ellipsis, and subtitle ONLY "Wartawan: RRI ...") */}
                    <td className="py-4 px-4 sm:px-6 max-w-md">
                      <p className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors text-sm">
                        {draft.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-normal">
                        Wartawan: {draft.journalist}
                      </p>
                    </td>

                    {/* Status CMS (Blue badge, matching Figma) */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {draft.cmsStatus}
                      </span>
                    </td>

                    {/* Status Pemeriksaan (Pill badges) */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {draft.checkStatus === 'Pelanggaran' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          {draft.violationCount || 5} Pelanggaran
                        </span>
                      ) : draft.checkStatus === 'Aman' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Aman
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          Belum Diperiksa
                        </span>
                      )}
                    </td>

                    {/* Waktu Ubah */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500">
                      {draft.updatedAt}
                    </td>

                    {/* Aksi (Only Edit icon, matching Figma) */}
                    <td
                      className="py-4 px-4 text-center whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleOpenDetail(draft)}
                          title="Edit / Periksa Draf"
                          className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-600 transition-colors inline-flex items-center justify-center shadow-2xs"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-700">Tidak ada draf yang cocok</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter status</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Matching Figma media_1794274137274_f6fd2fc8.jpg) */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>
              Menampilkan <span className="font-semibold text-slate-800">1-5</span> dari{' '}
              <span className="font-semibold text-slate-800">42</span> data
            </span>
            <div className="inline-flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-white cursor-pointer text-slate-700">
              <span>10</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
              disabled={currentPageNum === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-700 transition-colors"
            >
              Sebelumnya
            </button>

            <button
              onClick={() => setCurrentPageNum(1)}
              className="w-7 h-7 rounded-lg bg-[#1866EF] text-white font-semibold text-xs flex items-center justify-center"
            >
              1
            </button>
            <button
              onClick={() => setCurrentPageNum(2)}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center"
            >
              2
            </button>
            <button
              onClick={() => setCurrentPageNum(3)}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center"
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => setCurrentPageNum(10)}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center"
            >
              10
            </button>

            <button
              onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
