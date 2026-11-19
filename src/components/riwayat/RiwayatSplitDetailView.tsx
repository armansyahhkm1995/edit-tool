import React, { useState } from 'react';
import {
  ArrowLeft,
  History,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Bot,
} from 'lucide-react';
import { CMSDraft, FindingCategory } from '../../types';
import { DRAFT_VERSIONS_DATA } from './riwayatData';

interface RiwayatSplitDetailViewProps {
  activeDraft: CMSDraft;
  activeVersionId: string;
  onOpenVersions: () => void;
  onBackToHistory: () => void;
}

export const RiwayatSplitDetailView: React.FC<RiwayatSplitDetailViewProps> = ({
  activeDraft,
  activeVersionId,
  onOpenVersions,
  onBackToHistory,
}) => {
  const [activeTab, setActiveTab] = useState<FindingCategory>('kemiripan');
  const [detailStatusFilter, setDetailStatusFilter] = useState<string>('Semua');
  const [expandedFindingIds, setExpandedFindingIds] = useState<Set<string>>(
    new Set(['f-kmp-1', 'f-bg-1', 'f-seo-1'])
  );
  const [seoSubFilter, setSeoSubFilter] = useState<'Semua' | 'SEO' | 'AI-Search'>('Semua');

  const toggleAccordion = (id: string) => {
    setExpandedFindingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const currentActiveVer =
    DRAFT_VERSIONS_DATA.find((v) => v.id === activeVersionId) || DRAFT_VERSIONS_DATA[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Back navigation */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onBackToHistory}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 px-1 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Riwayat Pemeriksaan</span>
        </button>
      </div>

      {/* Title & Metadata Header Card */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-xl font-bold text-blue-700 leading-snug">
            {activeDraft.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Wartawan: <span className="font-semibold text-slate-700">{activeDraft.journalist}</span>{' '}
            · Waktu Ubah:{' '}
            <span className="font-semibold text-slate-700">{activeDraft.updatedAt} WIB</span> ·
            Status CMS:{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {activeDraft.cmsStatus}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {/* Versioning tertiary button on the left of Buka di CMS */}
          <button
            type="button"
            onClick={onOpenVersions}
            className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex flex-col items-start justify-center text-left shrink-0"
            title="Lihat Riwayat Versi Pemeriksaan"
          >
            <div className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#1866EF]" />
              <span className="text-xs font-bold text-slate-900">{currentActiveVer.version}</span>
              <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">
                Aktif
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal leading-tight">
              {currentActiveVer.isAI
                ? 'Dibuat oleh AI Assistant'
                : `Disunting oleh ${currentActiveVer.createdBy.split(' (')[0]} (${currentActiveVer.createdAt.split(' WIB')[0]})`}
            </span>
          </button>

          <a
            href="https://rri.co.id/cms"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs h-10"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka di CMS</span>
          </a>
        </div>
      </div>

      {/* AI Status Indicators Bar - Large Information Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Card 1: Kemiripan */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
              Kemiripan
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Selesai
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-900 tracking-tight">
              18.4%
            </div>
            <div className="text-[11px] text-emerald-700/90 mt-1">
              Ambang batas &lt; 20% (Aman)
            </div>
          </div>
        </div>

        {/* Card 2: Deteksi AI */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
              Deteksi AI
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
              Aman
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">
              12%
            </div>
            <div className="text-[11px] text-blue-700/90 mt-1">
              Indikasi teks manusiawi dominan
            </div>
          </div>
        </div>

        {/* Card 3: Buku Gaya */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
              Buku Gaya
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              Tinjauan
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-amber-900 tracking-tight">
              3 Temuan
            </div>
            <div className="text-[11px] text-amber-700/90 mt-1">
              Kepatuhan pedoman redaksi RRI
            </div>
          </div>
        </div>

        {/* Card 4: SEO & AI-Search */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
              SEO & AI-Search
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
              Optimasi
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-purple-900 tracking-tight">
              9 Usulan
            </div>
            <div className="text-[11px] text-purple-700/90 mt-1">
              Visibilitas mesin telusur & LLM
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Draft Berita Read-Only dari CMS (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4">
          {/* Header */}
          <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Draft Berita (Read-Only dari CMS)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                428 Kata · 3 Paragraf · 06 Nov 2026, 14:45
              </p>
            </div>

            <a
              href="https://antaranews.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>Lihat Sumber</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-sm text-slate-800 leading-relaxed font-sans">
            <h3 className="text-lg font-semibold text-slate-950 leading-snug">
              Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit
            </h3>

            <p className="text-slate-800 text-justify">
              BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil
              mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu
              Biak Numfor, Papua.
            </p>

            {/* Highlight Box 1 (Fuchsia / Kemiripan 78%) */}
            <div
              onClick={() => {
                setActiveTab('kemiripan');
                if (!expandedFindingIds.has('f-kmp-1')) {
                  toggleAccordion('f-kmp-1');
                }
              }}
              className="cursor-pointer group transition-transform active:scale-[0.99]"
            >
              <div className="bg-[#F5D0FE] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#F5D0FE]">
                <span className="text-xs font-bold text-[#A21CAF]">
                  Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                </span>
              </div>
              <div className="bg-[#FDF4FF] border border-[#F5D0FE] p-3.5 rounded-b-lg">
                <p className="text-sm text-[#A21CAF] leading-relaxed">
                  "Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna
                  menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada
                  ketinggian 35.786 kilometer di atas permukaan laut."
                </p>
              </div>
            </div>

            {/* Highlight Box 2 (Teal / Kemiripan 78%) */}
            <div
              onClick={() => {
                setActiveTab('kemiripan');
                if (!expandedFindingIds.has('f-kmp-2')) {
                  toggleAccordion('f-kmp-2');
                }
              }}
              className="cursor-pointer group transition-transform active:scale-[0.99]"
            >
              <div className="bg-[#99F6E4] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#99F6E4]">
                <span className="text-xs font-bold text-[#0F766E]">
                  Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                </span>
              </div>
              <div className="bg-[#F0FDFA] border border-[#99F6E4] p-3.5 rounded-b-lg">
                <p className="text-sm text-[#0F766E] leading-relaxed">
                  Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit
                  pasca lepas landas. Dalam keterangan pers tertulisnya,
                </p>
              </div>
            </div>

            {/* Highlight Box 3 (Purple / Kemiripan 78%) */}
            <div
              onClick={() => {
                setActiveTab('kemiripan');
                if (!expandedFindingIds.has('f-kmp-3')) {
                  toggleAccordion('f-kmp-3');
                }
              }}
              className="cursor-pointer group transition-transform active:scale-[0.99]"
            >
              <div className="bg-[#E9D5FF] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#E9D5FF]">
                <span className="text-xs font-bold text-[#7E22CE]">
                  Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                </span>
              </div>
              <div className="bg-[#FAF5FF] border border-[#E9D5FF] p-3.5 rounded-b-lg">
                <p className="text-sm text-[#7E22CE] leading-relaxed">
                  "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali
                  peluncuran satelit di pulau terluar tersebut."
                </p>
              </div>
            </div>

            <p className="text-slate-800 text-justify">
              Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk
              seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan, Terluar,
              Tertinggal) di wilayah Indonesia Timur.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Findings Tabs & Accordion Cards (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4 space-y-3.5">
          {/* Tab Navigation */}
          <div className="shrink-0 bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('kemiripan')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'kemiripan'
                  ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Kemiripan</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                  activeTab === 'kemiripan'
                    ? 'bg-[#FFFBEB] text-[#B45309]'
                    : 'bg-[#F8FAFC] text-slate-700 border border-slate-200'
                }`}
              >
                {activeDraft.findings.filter((f) => f.category === 'kemiripan').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('buku_gaya')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'buku_gaya'
                  ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Buku Gaya</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                  activeTab === 'buku_gaya'
                    ? 'bg-[#FFFBEB] text-[#B45309]'
                    : 'bg-[#F8FAFC] text-slate-700 border border-slate-200'
                }`}
              >
                {activeDraft.findings.filter((f) => f.category === 'buku_gaya').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'seo'
                  ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>SEO & AI</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                  activeTab === 'seo'
                    ? 'bg-[#FFFBEB] text-[#B45309]'
                    : 'bg-[#F8FAFC] text-slate-700 border border-slate-200'
                }`}
              >
                {activeDraft.findings.filter((f) => f.category === 'seo').length}
              </span>
            </button>
          </div>

          {/* TAB CONTENT: KEMIRIPAN */}
          {activeTab === 'kemiripan' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              {/* Score Overview Card */}
              <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Skor Kemiripan:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[22px] font-bold text-slate-900 leading-none">
                    18.4%
                  </span>
                  <span className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium px-2.5 py-0.5 rounded-md">
                    Rendah
                  </span>
                </div>
              </div>

              {/* Filter Row */}
              <div className="shrink-0 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900">
                  Daftar Temuan (1 Menunggu Tindakan)
                </span>

                <div className="relative">
                  <select
                    value={detailStatusFilter}
                    onChange={(e) => setDetailStatusFilter(e.target.value)}
                    aria-label="Filter Status Temuan"
                    className="appearance-none bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
                  >
                    <option value="Semua">Status Temuan: Semua</option>
                    <option value="Telah Diperbaiki">Telah Diperbaiki</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Diabaikan">Diabaikan</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Scrollable Container with Accordion Finding Cards */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                {activeDraft.findings
                  .filter((f) => f.category === 'kemiripan')
                  .map((finding) => {
                    const isExpanded = expandedFindingIds.has(finding.id);
                    return (
                      <div
                        key={finding.id}
                        className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                      >
                        {/* Accordion Header */}
                        <div
                          onClick={() => toggleAccordion(finding.id)}
                          className="bg-slate-100/80 px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-slate-200/70 border-b border-slate-200"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="p-0.5 rounded text-slate-700">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-slate-800" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-800" />
                              )}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              Tingkat: {finding.severity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                                finding.status === 'Telah Diperbaiki' || finding.status === 'Diterima'
                                  ? 'bg-[#334155] text-white'
                                  : 'bg-white border border-slate-300 text-slate-700'
                              }`}
                            >
                              {finding.status === 'Belum Ditandai' ? 'Sudah Ditandai' : finding.status}
                            </span>

                            <a
                              href="https://antaranews.com"
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors shrink-0"
                              title="Lihat Sumber"
                            >
                              <span>Lihat Sumber</span>
                              <ExternalLink className="w-3 h-3 text-slate-500" />
                            </a>
                          </div>
                        </div>

                        {/* Accordion Body */}
                        {isExpanded && (
                          <div className="bg-slate-50 p-4 space-y-3 animate-fade-in border-t border-slate-200">
                            <div className="bg-white border border-slate-200 p-3 rounded-md flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">Deteksi AI</span>
                              <span className="text-xs text-slate-700">
                                {finding.aiIndication || 'Indikasi AI: 12% (Aman)'}
                              </span>
                            </div>

                            <div className="bg-white border border-slate-200 p-3 rounded-md">
                              <p className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide">
                                KUTIPAN TEKS COCOK:
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                                "{finding.matchedSnippet}"
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                              <p className="text-xs font-bold text-slate-900 mb-1">
                                Alasan & Rekomendasi AI:
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {finding.recommendation}
                              </p>
                            </div>

                            <div className="bg-[#1866EF] text-white p-3 rounded-lg text-xs font-semibold leading-relaxed">
                              Keputusan Akhir Editor: {finding.status} oleh Agus Setiawan (Editor)
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: BUKU GAYA */}
          {activeTab === 'buku_gaya' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                {activeDraft.findings
                  .filter((f) => f.category === 'buku_gaya')
                  .map((finding) => {
                    const isExpanded = expandedFindingIds.has(finding.id);
                    return (
                      <div
                        key={finding.id}
                        className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                      >
                        {/* Accordion Header */}
                        <div
                          onClick={() => toggleAccordion(finding.id)}
                          className="bg-amber-50/80 px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-amber-100/70 border-b border-amber-200/60"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="p-0.5 rounded text-slate-700">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-amber-900" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-amber-900" />
                              )}
                            </span>
                            <span className="text-xs font-bold text-amber-950">
                              Tingkat: {finding.severity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-amber-200 text-amber-800">
                              {finding.status === 'Belum Ditandai' ? 'Sudah Ditandai' : finding.status}
                            </span>

                            <a
                              href="https://rri.co.id/bukugaya"
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors shrink-0"
                              title="Lihat Sumber"
                            >
                              <span>Lihat Sumber</span>
                              <ExternalLink className="w-3 h-3 text-slate-500" />
                            </a>
                          </div>
                        </div>

                        {/* Accordion Body */}
                        {isExpanded && (
                          <div className="bg-slate-50 p-4 space-y-3 animate-fade-in border-t border-slate-200">
                            <div className="bg-white border border-slate-200 p-3 rounded-md">
                              <p className="text-xs font-bold text-slate-900 mb-1">KUTIPAN TEKS DRAF:</p>
                              <p className="text-xs text-slate-700">
                                "{finding.matchedSnippet}"
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 p-3 rounded-md">
                              <p className="text-xs font-bold text-slate-900 mb-1">
                                Aturan Buku Gaya:
                              </p>
                              <p className="text-xs font-semibold text-red-600">
                                {finding.ruleViolated}
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                              <p className="text-xs font-bold text-slate-900 mb-1">
                                Alasan & Rekomendasi AI:
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {finding.recommendation}
                              </p>
                            </div>

                            <div className="bg-[#1866EF] text-white p-3 rounded-lg text-xs font-semibold">
                              Keputusan Akhir Editor: Telah Diperbaiki oleh Agus Setiawan (Editor)
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: SEO & AI-SEARCH */}
          {activeTab === 'seo' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              {/* Sub-filter pills for SEO vs AI-Search */}
              <div className="shrink-0 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSeoSubFilter('Semua')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      seoSubFilter === 'Semua'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Semua ({activeDraft.findings.filter((f) => f.category === 'seo').length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setSeoSubFilter('SEO')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                      seoSubFilter === 'SEO'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Search className="w-3 h-3" />
                    <span>SEO Mesin Telusur</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSeoSubFilter('AI-Search')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                      seoSubFilter === 'AI-Search'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Bot className="w-3 h-3" />
                    <span>AI-Search Overviews</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Findings */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                {activeDraft.findings
                  .filter((f) => {
                    if (f.category !== 'seo') return false;
                    if (seoSubFilter === 'SEO') return f.code.startsWith('Temuan #SEO');
                    if (seoSubFilter === 'AI-Search') return f.code.startsWith('Temuan #AIS');
                    return true;
                  })
                  .map((finding) => {
                    const isExpanded = expandedFindingIds.has(finding.id);
                    const isAiSearch = finding.code.startsWith('Temuan #AIS');
                    return (
                      <div
                        key={finding.id}
                        className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                      >
                        {/* Accordion Header */}
                        <div
                          onClick={() => toggleAccordion(finding.id)}
                          className={`px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors border-b ${
                            isAiSearch
                              ? 'bg-purple-50/80 hover:bg-purple-100/70 border-purple-200/60'
                              : 'bg-blue-50/80 hover:bg-blue-100/70 border-blue-200/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                            <span className="p-0.5 rounded text-slate-700 shrink-0">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-slate-900" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-900" />
                              )}
                            </span>
                            <div className="flex flex-col min-w-0">
                              <span
                                className={`text-xs font-bold leading-tight ${
                                  isAiSearch ? 'text-purple-950' : 'text-blue-950'
                                }`}
                              >
                                Tingkat: {finding.severity}
                              </span>
                              <span className="text-xs text-slate-500 font-normal leading-tight mt-0.5 truncate">
                                {finding.title}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 whitespace-nowrap">
                              {finding.status === 'Belum Ditandai' ? 'Sudah Ditandai' : finding.status}
                            </span>

                            <a
                              href="https://developers.google.com/search/docs"
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors shrink-0"
                              title="Lihat Sumber"
                            >
                              <span>Lihat Sumber</span>
                              <ExternalLink className="w-3 h-3 text-slate-500" />
                            </a>
                          </div>
                        </div>

                        {/* Accordion Body */}
                        {isExpanded && (
                          <div className="bg-slate-50 p-4 space-y-3 animate-fade-in border-t border-slate-200">
                            <div className="bg-white border border-slate-200 p-3 rounded-md">
                              <p className="text-xs font-bold text-slate-900 mb-1">
                                KUTIPAN DRAFT BERITA / USULAN:
                              </p>
                              <p className="text-xs text-slate-700">
                                "{finding.matchedSnippet}"
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                              <p className="text-xs font-bold text-slate-900 mb-1">
                                Rekomendasi AI:
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {finding.recommendation}
                              </p>
                            </div>

                            <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] p-3 rounded-lg text-xs font-semibold">
                              Keputusan Akhir Editor: Diterima oleh Agus Setiawan (Editor)
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
