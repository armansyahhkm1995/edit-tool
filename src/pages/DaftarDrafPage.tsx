import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CMSDraft } from '../types';
import { RotateCw } from 'lucide-react';
import { DaftarDrafFilterBar } from '../components/drafts/DaftarDrafFilterBar';
import { DaftarDrafTable } from '../components/drafts/DaftarDrafTable';

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
      {/* Top Page Heading */}
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

      {/* Main Single Card: Search Bar + Filter + Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <DaftarDrafFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onFilterChange={() => setCurrentPageNum(1)}
        />

        <DaftarDrafTable
          drafts={paginatedDrafts}
          totalItems={filteredDrafts.length}
          currentPageNum={currentPageNum}
          totalPages={totalPages}
          onPageChange={setCurrentPageNum}
          onOpenDetail={handleOpenDetail}
        />
      </div>
    </div>
  );
};
