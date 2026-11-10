import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FindingItem, FindingStatus, FindingSeverity } from '../types';
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { IgnoreFindingReasonModal } from '../components/modals/IgnoreFindingReasonModal';
import { BukuGayaTextModal } from '../components/modals/BukuGayaTextModal';

export const DetailSplitViewPage: React.FC = () => {
  const {
    activeDraft,
    activeTab,
    setActiveTab,
    selectedFindingId,
    setSelectedFindingId,
    updateFindingStatus,
    runAiInspection,
    isAiAnalyzing,
    setCurrentPage,
    styleGuides,
  } = useApp();

  // Modals state
  const [ignoringFinding, setIgnoringFinding] = useState<FindingItem | null>(null);
  const [isStyleGuideModalOpen, setIsStyleGuideModalOpen] = useState(false);

  // Filters inside tab
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [severityFilter, setSeverityFilter] = useState<string>('Semua');

  const activeStyleGuide = styleGuides.find((sg) => sg.isActive) || styleGuides[0];

  const handleDecision = (finding: FindingItem, status: FindingStatus) => {
    if (status === 'Diabaikan') {
      setIgnoringFinding(finding);
    } else {
      updateFindingStatus(finding.id, status);
    }
  };

  const currentTabFindings = activeDraft.findings.filter((f) => {
    if (f.category !== activeTab) return false;
    if (statusFilter !== 'Semua' && f.status !== statusFilter) return false;
    if (severityFilter !== 'Semua' && f.severity !== severityFilter) return false;
    return true;
  });

  // Helper for dynamic card styling in Kemiripan
  const getCardHeaderTheme = (finding: FindingItem) => {
    if (finding.status === 'Telah Diperbaiki' || finding.status === 'Diterima') {
      return {
        headerBg: 'bg-[#E2E8F0]',
        bodyBg: 'bg-[#F8FAFC]',
        border: 'border-[#E2E8F0]',
        quoteBoxBg: 'bg-white',
        quoteBoxBorder: 'border-slate-200',
        quoteTextColor: 'text-slate-800',
        deteksiAiBg: 'bg-white',
        deteksiAiBorder: 'border-slate-200',
        deteksiAiText: 'text-slate-800',
        hasThreeButtons: false,
      };
    }

    if (finding.severity === 'Tinggi') {
      return {
        headerBg: 'bg-[#FECACA]',
        bodyBg: 'bg-[#FEF2F2]',
        border: 'border-[#FECACA]',
        quoteBoxBg: 'bg-[#FDF4FF]',
        quoteBoxBorder: 'border-[#F5D0FE]',
        quoteTextColor: 'text-[#A21CAF]',
        deteksiAiBg: 'bg-[#F0FDFA]',
        deteksiAiBorder: 'border-[#CCFBF1]',
        deteksiAiText: 'text-[#0F766E]',
        hasThreeButtons: true,
      };
    }

    if (finding.severity === 'Rendah') {
      return {
        headerBg: 'bg-[#BFDBFE]',
        bodyBg: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        quoteBoxBg: 'bg-[#FDF4FF]',
        quoteBoxBorder: 'border-[#F5D0FE]',
        quoteTextColor: 'text-[#A21CAF]',
        deteksiAiBg: 'bg-[#F0FDFA]',
        deteksiAiBorder: 'border-[#CCFBF1]',
        deteksiAiText: 'text-[#0F766E]',
        hasThreeButtons: true,
      };
    }

    // Default: Sedang
    return {
      headerBg: 'bg-[#FDE68A]',
      bodyBg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A]',
      quoteBoxBg: 'bg-[#FDF4FF]',
      quoteBoxBorder: 'border-[#F5D0FE]',
      quoteTextColor: 'text-[#A21CAF]',
      deteksiAiBg: 'bg-[#F0FDFA]',
      deteksiAiBorder: 'border-[#CCFBF1]',
      deteksiAiText: 'text-[#0F766E]',
      hasThreeButtons: true,
    };
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5">
      {/* Back Button */}
      <div className="flex items-center">
        <button
          onClick={() => setCurrentPage('daftar-draf')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 px-1 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Draf</span>
        </button>
      </div>

      {/* Title & Metadata Top Card */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-xl font-bold text-blue-700 leading-snug">
            {activeDraft.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Wartawan: <span className="font-semibold text-slate-700">{activeDraft.journalist}</span>{' '}
            • Waktu Ubah:{' '}
            <span className="font-semibold text-slate-700">{activeDraft.updatedAt} WIB</span> •
            Status CMS:{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {activeDraft.cmsStatus}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://rri.co.id/cms"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka di CMS</span>
          </a>

          <button
            onClick={() => runAiInspection(activeDraft.id)}
            disabled={isAiAnalyzing}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-60"
          >
            <Sparkles className={`w-4 h-4 ${isAiAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAiAnalyzing ? 'Memeriksa...' : 'Periksa dengan AI'}</span>
          </button>
        </div>
      </div>

      {/* AI Status Indicators Bar (User preferred improvisation - kept!) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-lg text-xs flex items-center justify-between">
          <span className="text-emerald-800 font-medium">Kemiripan:</span>
          <span className="font-bold text-emerald-700">
            Selesai ({activeDraft.similarityScore}%)
          </span>
        </div>

        <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-lg text-xs flex items-center justify-between">
          <span className="text-blue-800 font-medium">Deteksi AI:</span>
          <span className="font-bold text-blue-700">
            {isAiAnalyzing ? 'Memeriksa ...' : `Aman (${activeDraft.aiDetectionScore}%)`}
          </span>
        </div>

        <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-lg text-xs flex items-center justify-between">
          <span className="text-amber-800 font-medium">Buku Gaya:</span>
          <span className="font-bold text-amber-700">
            {isAiAnalyzing ? 'Memeriksa ...' : '1 Pelanggaran'}
          </span>
        </div>

        <div className="bg-purple-50/80 border border-purple-200 p-3 rounded-lg text-xs flex items-center justify-between">
          <span className="text-purple-800 font-medium">SEO & AI-Search:</span>
          <span className="font-bold text-purple-700">
            {isAiAnalyzing ? 'Memeriksa ...' : '2 Usulan Optimasi'}
          </span>
        </div>
      </div>

      {/* Main Split-View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Naskah Berita Read-Only dari CMS (7 Cols) - Height constrained & scrollable */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4">
          {/* Card Header matching Figma Frame 1000008831 (Pinned at top) */}
          <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Naskah Berita (Read-Only dari CMS)
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

          {/* Card Body matching Figma A-Title, Label, and 3 Highlight Boxes (Scrollable if content is long) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-sm text-slate-800 leading-relaxed font-sans">
            {/* Draft Article Subtitle / Heading */}
            <h3 className="text-lg font-semibold text-slate-950 leading-snug">
              Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit
            </h3>

            {/* Paragraph 1 */}
            <p className="text-slate-800 text-justify">
              BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil
              mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu
              Biak Numfor, Papua.
            </p>

            {/* Highlight Box 1 (Fuchsia / Kemiripan 78%) */}
            <div
              onClick={() => {
                setActiveTab('kemiripan');
                setSelectedFindingId('f-kmp-1');
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
                setSelectedFindingId('f-kmp-2');
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
                setSelectedFindingId('f-kmp-3');
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

            {/* Final Paragraph */}
            <p className="text-slate-800 text-justify">
              Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk
              seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan, Terluar,
              Tertinggal) di wilayah Indonesia Timur.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Findings Tabs & Cards (5 Cols) - Scrollable matching left column */}
        <div className="lg:col-span-5 flex flex-col lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4 space-y-3.5">
          {/* Tab Navigation matching Figma tabs-list (Pinned at top) */}
          <div className="shrink-0 bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-2xs">
            <button
              onClick={() => setActiveTab('kemiripan')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
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
                10
              </span>
            </button>

            <button
              onClick={() => setActiveTab('buku_gaya')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
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
                10
              </span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'seo'
                  ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>SEO & AI -Search</span>
            </button>
          </div>

          {/* TAB 1: KEMIRIPAN CONTENT */}
          {activeTab === 'kemiripan' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              {/* Score Overview Card (Matching Figma COMP-ScoreOverviewCard) - Pinned */}
              <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Skor Kemiripan:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[22px] font-bold text-slate-900 leading-none">18.4%</span>
                  <span className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium px-2.5 py-0.5 rounded-md">
                    Rendah
                  </span>
                </div>
              </div>

              {/* Filter Row matching Figma Frame 1000008834 - Pinned */}
              <div className="shrink-0 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900">
                  {currentTabFindings.length} Daftar Temuan
                </span>

                <div className="flex items-center gap-2">
                  {/* Status Temuan dropdown */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      aria-label="Filter Status Temuan"
                      className="appearance-none bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value="Semua">Status Temuan: Semua</option>
                      <option value="Belum Ditandai">Belum Ditandai</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Diabaikan">Diabaikan</option>
                      <option value="Telah Diperbaiki">Telah Diperbaiki</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Tingkat Temuan dropdown */}
                  <div className="relative">
                    <select
                      value={severityFilter}
                      onChange={(e) => setSeverityFilter(e.target.value)}
                      aria-label="Filter Tingkat Temuan"
                      className="appearance-none bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value="Semua">Tingkat Temuan: Semua</option>
                      <option value="Tinggi">Tinggi</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Rendah">Rendah</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Exact 5 Finding Cards matching Figma node 954:16871 - SCROLLABLE CONTAINER */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                {currentTabFindings.map((finding) => {
                  const theme = getCardHeaderTheme(finding);
                  const isSelected = selectedFindingId === finding.id;

                  return (
                    <div
                      key={finding.id}
                      onClick={() => setSelectedFindingId(finding.id)}
                      className={`rounded-xl border transition-all ${theme.border} ${
                        isSelected ? 'ring-2 ring-blue-500/40 shadow-sm' : 'shadow-2xs'
                      }`}
                    >
                      {/* Top Header Strip */}
                      <div
                        className={`${theme.headerBg} px-4 py-2 rounded-t-xl flex items-center justify-between`}
                      >
                        <span className="text-xs font-bold text-slate-900">
                          Tingkat: {finding.severity}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Badge Status */}
                          {finding.status === 'Telah Diperbaiki' ? (
                            <span className="bg-[#334155] text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                              Telah Diperbaiki
                            </span>
                          ) : finding.status === 'Diterima' ? (
                            <span className="bg-[#334155] text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                              Diterima
                            </span>
                          ) : finding.status === 'Diabaikan' ? (
                            <span className="bg-[#334155] text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                              Diabaikan
                            </span>
                          ) : (
                            <span className="bg-[#F8FAFC] border border-slate-200 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
                              Belum Ditandai
                            </span>
                          )}

                          {/* Lihat Sumber Pill */}
                          <a
                            href="https://antaranews.com"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#F8FAFC] border border-slate-200 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors"
                          >
                            <span>Lihat Sumber</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className={`${theme.bodyBg} p-4 rounded-b-xl space-y-3`}>
                        {/* Sub-box 1: Deteksi AI */}
                        <div
                          className={`${theme.deteksiAiBg} border ${theme.deteksiAiBorder} p-3 rounded-md`}
                        >
                          <p className={`text-xs font-bold ${theme.deteksiAiText} mb-0.5`}>
                            Deteksi AI
                          </p>
                          <p className={`text-xs ${theme.deteksiAiText}`}>
                            {finding.aiIndication || 'Indikasi AI: 12% (Aman)'}
                          </p>
                        </div>

                        {/* Sub-box 2: KUTIPAN TEKS COCOK */}
                        <div
                          className={`${theme.quoteBoxBg} border ${theme.quoteBoxBorder} p-3 rounded-md`}
                        >
                          <p
                            className={`text-xs font-bold ${theme.quoteTextColor} mb-1 uppercase tracking-wide`}
                          >
                            KUTIPAN TEKS COCOK (42 KATA SAMA PERSIS):
                          </p>
                          <p className={`text-xs ${theme.quoteTextColor} leading-relaxed`}>
                            "{finding.matchedSnippet}"
                          </p>
                        </div>

                        {/* Sub-box 3: Alasan & Rekomendasi AI */}
                        <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                          <p className="text-xs font-bold text-slate-900 mb-1">
                            Alasan & Rekomendasi AI:
                          </p>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {finding.recommendation}
                          </p>
                        </div>

                        {finding.decisionNote && (
                          <div className="text-[11px] text-blue-700 bg-blue-50/60 p-2 rounded border border-blue-100">
                            {finding.decisionNote}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-1">
                          <p className="text-[11px] font-semibold text-slate-700 mb-2">
                            Tindak Lanjut Keputusan Editor:
                          </p>

                          {theme.hasThreeButtons ? (
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDecision(finding, 'Diterima');
                                }}
                                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                  finding.status === 'Diterima'
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] hover:bg-emerald-100'
                                }`}
                              >
                                Diterima
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDecision(finding, 'Diabaikan');
                                }}
                                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                  finding.status === 'Diabaikan'
                                    ? 'bg-slate-700 text-white shadow-2xs'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                Diabaikan
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDecision(finding, 'Telah Diperbaiki');
                                }}
                                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                  finding.status === 'Telah Diperbaiki'
                                    ? 'bg-[#1866EF] text-white shadow-xs'
                                    : 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
                                }`}
                              >
                                Telah Diperbaiki
                              </button>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDecision(finding, 'Diterima');
                                }}
                                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                  finding.status === 'Diterima'
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] hover:bg-emerald-100'
                                }`}
                              >
                                Diterima
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDecision(finding, 'Diabaikan');
                                }}
                                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                  finding.status === 'Diabaikan'
                                    ? 'bg-slate-700 text-white shadow-2xs'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                Diabaikan
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: BUKU GAYA CONTENT */}
          {activeTab === 'buku_gaya' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Pedoman Aktif:
                  </p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 truncate max-w-[200px]">
                    {activeStyleGuide.filename}
                  </p>
                </div>
                <button
                  onClick={() => setIsStyleGuideModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
                >
                  Lihat Buku Gaya
                </button>
              </div>

              <div className="shrink-0 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  {currentTabFindings.length} Daftar Temuan
                </span>
                <span className="text-[11px] text-slate-400">Status: Belum Ditandai</span>
              </div>

              {/* Scrollable Container untuk Buku Gaya Findings */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                {currentTabFindings.map((finding) => (
                  <div
                    key={finding.id}
                    onClick={() => setSelectedFindingId(finding.id)}
                    className={`bg-white rounded-xl border p-5 shadow-xs space-y-4 transition-all ${
                      selectedFindingId === finding.id
                        ? 'border-blue-400 ring-2 ring-blue-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        Tingkat: {finding.severity}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {finding.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        KUTIPAN TEKS DRAF:
                      </p>
                      <p className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-slate-800">
                        "{finding.matchedSnippet}"
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Buku Gaya yang Dilanggar:
                      </p>
                      <p className="text-xs font-semibold text-red-600">
                        {finding.ruleViolated || 'Penulisan Nomenklatur Lembaga & Singkatan Resmi'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Alasan & Rekomendasi AI:
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {finding.recommendation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-600 mb-2">
                        Tindak Lanjut Keputusan Editor:
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecision(finding, 'Diterima');
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                            finding.status === 'Diterima'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          Diterima
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecision(finding, 'Diabaikan');
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                            finding.status === 'Diabaikan'
                              ? 'bg-slate-700 text-white shadow-2xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          Diabaikan
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecision(finding, 'Telah Diperbaiki');
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                            finding.status === 'Telah Diperbaiki'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
                          }`}
                        >
                          Telah Diperbaiki
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SEO & AI-SEARCH CONTENT */}
          {activeTab === 'seo' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              <div className="shrink-0 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">
                  {currentTabFindings.length} Daftar Temuan Usulan
                </span>
                <span className="text-[11px] text-slate-400">Optimasi Mesin AI Search</span>
              </div>

              {/* Scrollable Container untuk SEO Findings */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                {currentTabFindings.map((finding) => (
                  <div
                    key={finding.id}
                    onClick={() => setSelectedFindingId(finding.id)}
                    className={`bg-white rounded-xl border p-5 shadow-xs space-y-4 transition-all ${
                      selectedFindingId === finding.id
                        ? 'border-blue-400 ring-2 ring-blue-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        Tingkat: {finding.severity}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {finding.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {finding.title}
                      </p>
                      <p className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-slate-800">
                        "{finding.matchedSnippet}"
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Alasan & Rekomendasi AI:
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {finding.recommendation}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-600 mb-2">
                        Tindak Lanjut Keputusan Editor:
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecision(finding, 'Diterima');
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                            finding.status === 'Diterima'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          Diterima
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecision(finding, 'Diabaikan');
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                            finding.status === 'Diabaikan'
                              ? 'bg-slate-700 text-white shadow-2xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          Diabaikan
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecision(finding, 'Telah Diperbaiki');
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                            finding.status === 'Telah Diperbaiki'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
                          }`}
                        >
                          Telah Diperbaiki
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ignore Reason Modal */}
      <IgnoreFindingReasonModal
        isOpen={Boolean(ignoringFinding)}
        onClose={() => setIgnoringFinding(null)}
        onConfirm={(reason) => {
          if (ignoringFinding) {
            updateFindingStatus(ignoringFinding.id, 'Diabaikan', reason);
          }
        }}
        finding={ignoringFinding}
      />

      {/* Style Guide PDF Text Reader Modal */}
      <BukuGayaTextModal
        isOpen={isStyleGuideModalOpen}
        onClose={() => setIsStyleGuideModalOpen(false)}
        styleGuide={activeStyleGuide}
      />
    </div>
  );
};
