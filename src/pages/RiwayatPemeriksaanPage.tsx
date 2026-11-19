import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CheckHistoryItem } from '../types';
import { mockCheckHistory } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { DRAFT_VERSIONS_DATA } from '../components/riwayat/riwayatData';
import { DraftVersionData } from '../components/riwayat/types';
import { RiwayatFilterBar } from '../components/riwayat/RiwayatFilterBar';
import { RiwayatTableView } from '../components/riwayat/RiwayatTableView';
import { RiwayatVersionsView } from '../components/riwayat/RiwayatVersionsView';
import { RiwayatCompareView } from '../components/riwayat/RiwayatCompareView';
import { RiwayatSplitDetailView } from '../components/riwayat/RiwayatSplitDetailView';

export const RiwayatPemeriksaanPage: React.FC = () => {
  const { activeDraft } = useApp();
  const { showToast } = useToast();

  const [selectedHistory, setSelectedHistory] = useState<CheckHistoryItem | null>(null);
  const [detailViewMode, setDetailViewMode] = useState<'split' | 'versions' | 'compare'>('split');
  const [activeVersionId, setActiveVersionId] = useState<string>('v2-0');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRangeFilter, setTimeRangeFilter] = useState('');
  const [editorFilter, setEditorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Handle version toggle
  const handleToggleVersion = (versionId: string) => {
    if (activeVersionId === versionId) {
      showToast('Harus ada minimal 1 versi draft berita pemeriksaan yang aktif.', 'warning');
      return;
    }
    setActiveVersionId(versionId);
    const target = DRAFT_VERSIONS_DATA.find((v) => v.id === versionId);
    showToast(
      `${target?.version || 'Versi'} berhasil diaktifkan sebagai draft berita pemeriksaan aktif.`,
      'success'
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setTimeRangeFilter('');
    setEditorFilter('');
    setStatusFilter('');
  };

  // Filter check history
  const filteredHistory = useMemo(() => {
    return mockCheckHistory.filter((item) => {
      const matchSearch =
        item.draftTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.draftArtCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.editor || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchEditor = !editorFilter || item.triggerBy.toLowerCase().includes(editorFilter.toLowerCase());
      const matchStatus = !statusFilter || item.articleStatus === statusFilter;

      return matchSearch && matchEditor && matchStatus;
    });
  }, [searchTerm, editorFilter, statusFilter]);

  // =========================================================================
  // DETAIL VIEW OF A HISTORICAL REPORT
  // =========================================================================
  if (selectedHistory) {
    if (detailViewMode === 'versions') {
      return (
        <RiwayatVersionsView
          selectedHistoryTitle={selectedHistory.draftTitle}
          versions={DRAFT_VERSIONS_DATA}
          activeVersionId={activeVersionId}
          onToggleVersion={handleToggleVersion}
          onSelectCompare={(_v: DraftVersionData) => setDetailViewMode('compare')}
          onBackToSplit={() => setDetailViewMode('split')}
        />
      );
    }

    if (detailViewMode === 'compare') {
      return (
        <RiwayatCompareView
          selectedHistory={selectedHistory}
          onBackToHistory={() => setSelectedHistory(null)}
        />
      );
    }

    // Default: 'split'
    return (
      <RiwayatSplitDetailView
        activeDraft={activeDraft}
        activeVersionId={activeVersionId}
        onOpenVersions={() => setDetailViewMode('versions')}
        onBackToHistory={() => setSelectedHistory(null)}
      />
    );
  }

  // =========================================================================
  // MAIN TABLE LIST VIEW (50 Riwayat & Audit Pemeriksaan AI)
  // =========================================================================
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          50 riwayat & Audit Pemeriksaan AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Catatan permanen dari semua aktivitas pemeriksaan AI dan keputusan tindak lanjut editor.
          Laporan lama tetap tersimpan sebagai arsip.
        </p>
      </div>

      {/* Main Table Card (Search & Filters integrated within card) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <RiwayatFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          timeRangeFilter={timeRangeFilter}
          setTimeRangeFilter={setTimeRangeFilter}
          editorFilter={editorFilter}
          setEditorFilter={setEditorFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClearFilters={handleClearFilters}
        />

        <RiwayatTableView
          historyList={filteredHistory}
          onSelectCompare={(item) => {
            setSelectedHistory(item);
            setDetailViewMode('compare');
          }}
          onSelectDetail={(item) => {
            setSelectedHistory(item);
            setDetailViewMode('split');
          }}
        />
      </div>
    </div>
  );
};
