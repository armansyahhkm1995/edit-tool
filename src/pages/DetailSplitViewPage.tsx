import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FindingItem } from '../types';
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Search,
  Bot,
  Copy,
  BookOpen,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { BukuGayaTextModal } from '../components/modals/BukuGayaTextModal';

export const DetailSplitViewPage: React.FC = () => {
  const {
    activeDraft,
    activeTab,
    setActiveTab,
    selectedFindingId,
    setSelectedFindingId,
    runAiInspection,
    isAiAnalyzing,
    setCurrentPage,
    styleGuides,
  } = useApp();

  // Modals state
  const [isStyleGuideModalOpen, setIsStyleGuideModalOpen] = useState(false);

  // Sub-filter for SEO vs AI-Search inside SEO tab
  const [seoSubFilter, setSeoSubFilter] = useState<'Semua' | 'SEO' | 'AI-Search'>('Semua');

  const activeStyleGuide = styleGuides.find((sg) => sg.isActive) || styleGuides[0];

  // Reset selected finding on mount and whenever tab changes so NO highlight is shown by default
  useEffect(() => {
    setSelectedFindingId(null);
  }, [activeTab, setSelectedFindingId]);

  // Filter findings for the active tab
  const currentTabFindings = activeDraft.findings.filter((f) => {
    if (f.category !== activeTab) return false;
    if (activeTab === 'seo') {
      if (seoSubFilter === 'SEO') {
        return f.code.startsWith('Temuan #SEO');
      }
      if (seoSubFilter === 'AI-Search') {
        return f.code.startsWith('Temuan #AIS');
      }
    }
    return true;
  });

  // Handle clicking a finding card -> select and smooth-scroll to relevant text in right column
  const handleFindingClick = (finding: FindingItem) => {
    setSelectedFindingId(finding.id);
    let targetId = `art-p-${finding.paragraphIndex ?? 1}`;
    if (finding.id === 'f-seo-1') {
      targetId = 'art-p-1';
    } else if (finding.id === 'f-seo-2' || finding.id === 'f-seo-4' || finding.id === 'f-ais-1') {
      targetId = 'art-p-1-lead';
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage('daftar-draf')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer transition-colors py-1 px-1 -ml-1 rounded-md hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Draf Berita</span>
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug">
            {activeDraft.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="font-semibold text-slate-800">{activeDraft.artCode}</span>
            <span>·</span>
            <span>Editor: {activeDraft.journalist}</span>
            <span>·</span>
            <span>Terakhir diperbarui: {activeDraft.updatedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <a
            href="https://rri.co.id/cms"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs h-10"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka di CMS</span>
          </a>

          <button
            onClick={() => runAiInspection(activeDraft.id)}
            disabled={isAiAnalyzing}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-60 h-10 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isAiAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAiAnalyzing ? 'Memeriksa...' : 'Periksa dengan AI'}</span>
          </button>
        </div>
      </div>

      {/* AI Status Indicators Bar */}
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
            {isAiAnalyzing ? 'Memeriksa ...' : '3 Temuan'}
          </span>
        </div>

        <div className="bg-purple-50/80 border border-purple-200 p-3 rounded-lg text-xs flex items-center justify-between">
          <span className="text-purple-800 font-medium">SEO & AI-Search:</span>
          <span className="font-bold text-purple-700">
            {isAiAnalyzing ? 'Memeriksa ...' : '9 Usulan'}
          </span>
        </div>
      </div>

      {/* TAB NAVIGATION: MEMBAWAHI ARTIKEL DI KANAN DAN TEMUAN DI KIRI */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-xs">
        <button
          onClick={() => {
            setActiveTab('kemiripan');
            setSelectedFindingId(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'kemiripan'
              ? 'bg-[#1866EF] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Copy className="w-4 h-4 shrink-0" />
          <span>Kemiripan</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'kemiripan'
                ? 'bg-white/20 text-white'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {activeDraft.findings.filter((f) => f.category === 'kemiripan').length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('buku_gaya');
            setSelectedFindingId(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'buku_gaya'
              ? 'bg-[#1866EF] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Buku Gaya</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'buku_gaya'
                ? 'bg-white/20 text-white'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {activeDraft.findings.filter((f) => f.category === 'buku_gaya').length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('seo');
            setSelectedFindingId(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-[#1866EF] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Search className="w-4 h-4 shrink-0" />
          <span>SEO & AI-Search</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'seo'
                ? 'bg-white/20 text-white'
                : 'bg-purple-50 text-purple-700 border border-purple-200'
            }`}
          >
            {activeDraft.findings.filter((f) => f.category === 'seo').length}
          </span>
        </button>
      </div>

      {/* MAIN SPLIT-VIEW: KIRI = DAFTAR TEMUAN (5 COLS), KANAN = NASKAH ARTIKEL (7 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: DAFTAR TEMUAN SESUAI TAB (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col lg:h-[calc(100vh-250px)] lg:max-h-[calc(100vh-250px)] lg:min-h-[560px] lg:sticky lg:top-4 space-y-3.5">
          {/* TAB 1: KEMIRIPAN TEMUAN */}
          {activeTab === 'kemiripan' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              {/* Score Overview Card */}
              <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Skor Kemiripan Naskah:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-bold text-slate-900 leading-none">18.4%</span>
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                    Rendah (Aman)
                  </span>
                </div>
              </div>

              {/* Subheader info */}
              <div className="shrink-0 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-800">
                  {currentTabFindings.length} Sumber Kemiripan Terdeteksi
                </span>
                <span className="text-[11px] text-slate-400">Klik temuan untuk sorot teks</span>
              </div>

              {/* Finding Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                {currentTabFindings.map((finding) => {
                  const isSelected = selectedFindingId === finding.id;
                  const sourceDomain = finding.matchedSource || 'kompas.com';

                  return (
                    <div
                      key={finding.id}
                      onClick={() => handleFindingClick(finding)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40'
                          : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs'
                      }`}
                    >
                      {/* Header with Direct External Link & Similarity % */}
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <a
                          href={`https://${sourceDomain}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                          title={`Buka situs rujukan ${sourceDomain}`}
                        >
                          <span>Mirip dengan {sourceDomain}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                          {finding.similarityPercent || 78}% Mirip
                        </span>
                      </div>

                      {/* Alasan & Rekomendasi AI */}
                      <div className="mt-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-900 block mb-0.5">
                          Alasan & Rekomendasi AI:
                        </span>
                        {finding.recommendation}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Lokasi: Paragraf {finding.paragraphIndex || 2}</span>
                        <span className="text-blue-600 font-semibold">Lihat ke naskah →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: BUKU GAYA TEMUAN */}
          {activeTab === 'buku_gaya' && (
            <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
              {/* Active Guide Card */}
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
                  type="button"
                  onClick={() => setIsStyleGuideModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors shrink-0 cursor-pointer"
                >
                  Lihat Buku Gaya
                </button>
              </div>

              {/* Subheader info */}
              <div className="shrink-0 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-800">
                  {currentTabFindings.length} Temuan Kaidah Redaksional
                </span>
                <span className="text-[11px] text-slate-400">Klik temuan untuk sorot teks</span>
              </div>

              {/* Finding Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                {currentTabFindings.map((finding) => {
                  const isSelected = selectedFindingId === finding.id;

                  return (
                    <div
                      key={finding.id}
                      onClick={() => handleFindingClick(finding)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/40'
                          : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-xs'
                      }`}
                    >
                      {/* Peraturan yang Dilanggar */}
                      <div className="flex items-start gap-2 pb-2 border-b border-slate-100">
                        <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                            Buku Gaya yang Dilanggar:
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                            {finding.ruleViolated || 'Bab II Pasal 4 - Nomenklatur Lembaga & Singkatan Resmi'}
                          </h4>
                        </div>
                      </div>

                      {/* Alasan & Rekomendasi AI */}
                      <div className="mt-2.5 text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                        <span className="font-semibold text-amber-950 block mb-0.5">
                          Alasan & Rekomendasi AI:
                        </span>
                        {finding.recommendation}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Lokasi: Paragraf {finding.paragraphIndex || 3}</span>
                        <span className="text-amber-700 font-semibold">Lihat ke naskah →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SEO & AI-SEARCH TEMUAN */}
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
                    <span>SEO (5)</span>
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
                    <span>AI-Search (4)</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                  {currentTabFindings.length} Usulan
                </span>
              </div>

              {/* Finding Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                {currentTabFindings.map((finding) => {
                  const isSelected = selectedFindingId === finding.id;
                  const isAiSearch = finding.code.startsWith('Temuan #AIS');

                  return (
                    <div
                      key={finding.id}
                      onClick={() => handleFindingClick(finding)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? isAiSearch
                            ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-50/40'
                            : 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/40'
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs'
                      }`}
                    >
                      {/* Judul Usulan (SEO Title Tag / Headline) */}
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isAiSearch ? 'bg-purple-600' : 'bg-blue-600'
                            }`}
                          />
                          <h4 className="text-xs font-bold text-slate-900">
                            {finding.title || 'Usulan Judul (SEO Title Tag)'}
                          </h4>
                        </div>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isAiSearch
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {isAiSearch ? 'AI-Search' : 'SEO'}
                        </span>
                      </div>

                      {/* Rekomendasi Optimasi */}
                      <div className="mt-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-900 block mb-0.5">
                          Rekomendasi Optimasi {isAiSearch ? 'AI-Search' : 'SEO'}:
                        </span>
                        {finding.recommendation}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Target: Paragraf {finding.paragraphIndex || 1}</span>
                        <span
                          className={`font-semibold ${
                            isAiSearch ? 'text-purple-600' : 'text-blue-600'
                          }`}
                        >
                          Lihat ke naskah →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: NASKAH BERITA (READ-ONLY DARI CMS) DENGAN HIGHLIGHT RAPI (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden lg:h-[calc(100vh-250px)] lg:max-h-[calc(100vh-250px)] lg:min-h-[560px] lg:sticky lg:top-4">
          {/* Card Header */}
          <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Naskah Berita (Read-Only dari CMS)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                428 Kata · 3 Paragraf · 06 Nov 2026, 14:45 WIB
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Sumber: Portal RRI CMS</span>
            </span>
          </div>

          {/* Card Body - Natural Editorial Article with Metric-specific Highlighting */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 text-sm text-slate-800 leading-relaxed font-sans">
            {/* Title / Heading */}
            <div
              id="art-p-1"
              className={`p-2.5 rounded-lg transition-all ${
                activeTab === 'seo' && selectedFindingId === 'f-seo-1'
                  ? 'bg-purple-100 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
                  : 'bg-transparent'
              }`}
            >
              <h3 className="text-lg font-bold text-slate-950 leading-snug">
                Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit
              </h3>
              {activeTab === 'seo' && selectedFindingId === 'f-seo-1' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>Tag SEO: Usulan Judul Artikel Berita (SEO Title Tag)</span>
                </div>
              )}
            </div>

            {/* Paragraph 1 - Lead */}
            <div
              id="art-p-1-lead"
              className={`p-3 rounded-lg transition-all ${
                activeTab === 'seo' &&
                (selectedFindingId === 'f-seo-2' ||
                  selectedFindingId === 'f-seo-4' ||
                  selectedFindingId === 'f-ais-1')
                  ? 'bg-purple-100 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
                  : 'bg-transparent'
              }`}
            >
              <p className="text-slate-800 text-justify leading-relaxed">
                <strong className="text-slate-900 font-semibold">BIAK, PAPUA</strong> — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua.
              </p>
              {activeTab === 'seo' &&
                (selectedFindingId === 'f-seo-2' ||
                  selectedFindingId === 'f-seo-4' ||
                  selectedFindingId === 'f-ais-1') && (
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                    <span>
                      {selectedFindingId === 'f-seo-2'
                        ? 'Tag SEO: Usulan Meta Description Ringkas (156 Karakter)'
                        : selectedFindingId === 'f-seo-4'
                        ? 'Tag SEO: Usulan Slug URL Ramah Mesin Pencari'
                        : 'AI-Search: Penataan Struktur Paragraf Pembuka (BLUF)'}
                    </span>
                  </div>
                )}
            </div>

            {/* Paragraph 2 - Kutipan & Spesifikasi (Kemiripan / Buku Gaya / SEO) */}
            <div
              id="art-p-2"
              className={`p-3.5 rounded-lg transition-all ${
                activeTab === 'kemiripan' &&
                (selectedFindingId === 'f-kmp-1' ||
                  selectedFindingId === 'f-kmp-2' ||
                  selectedFindingId === 'f-kmp-3' ||
                  selectedFindingId === 'f-kmp-4' ||
                  selectedFindingId === 'f-kmp-5')
                  ? 'bg-emerald-100/80 border-l-4 border-emerald-600 ring-2 ring-emerald-500/30'
                  : activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-2'
                  ? 'bg-amber-100/80 border-l-4 border-amber-600 ring-2 ring-amber-500/30'
                  : activeTab === 'seo' &&
                    (selectedFindingId === 'f-seo-3' ||
                      selectedFindingId === 'f-seo-5' ||
                      selectedFindingId === 'f-ais-2')
                  ? 'bg-purple-100/80 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
                  : 'bg-transparent'
              }`}
            >
              <p className="text-slate-800 text-justify leading-relaxed">
                Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.
              </p>
              {activeTab === 'kemiripan' &&
                (selectedFindingId === 'f-kmp-1' ||
                  selectedFindingId === 'f-kmp-2' ||
                  selectedFindingId === 'f-kmp-3' ||
                  selectedFindingId === 'f-kmp-4' ||
                  selectedFindingId === 'f-kmp-5') && (
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    <span>
                      Sorotan Kemiripan: Mirip dengan {selectedFindingId === 'f-kmp-1' ? 'kompas.com' : 'antaranews.com'} (78%)
                    </span>
                  </div>
                )}
              {activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-2' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-amber-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                  <span>Kaidah Buku Gaya: Format Satuan Ukuran & Angka Ribuan (Pasal 7)</span>
                </div>
              )}
              {activeTab === 'seo' &&
                (selectedFindingId === 'f-seo-3' ||
                  selectedFindingId === 'f-seo-5' ||
                  selectedFindingId === 'f-ais-2') && (
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                    <span>
                      {selectedFindingId === 'f-seo-3'
                        ? 'Optimasi SEO: Penempatan Keyword Utama & LSI Semantik'
                        : selectedFindingId === 'f-seo-5'
                        ? 'Optimasi SEO: Usulan Sub-heading H2 Terstruktur'
                        : 'AI-Search: Konteks Historis Satelit Sebelumnya'}
                    </span>
                  </div>
                )}
            </div>

            {/* Paragraph 3 - Telemetri & Nomenklatur Lembaga (Buku Gaya / SEO) */}
            <div
              id="art-p-3"
              className={`p-3.5 rounded-lg transition-all ${
                activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-1'
                  ? 'bg-amber-100/80 border-l-4 border-amber-600 ring-2 ring-amber-500/30'
                  : activeTab === 'seo' && selectedFindingId === 'f-ais-3'
                  ? 'bg-purple-100/80 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
                  : 'bg-transparent'
              }`}
            >
              <p className="text-slate-800 text-justify leading-relaxed">
                Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas. Dalam keterangan pers tertulisnya, "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit di pulau terluar tersebut."
              </p>
              {activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-1' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-amber-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                  <span>Kaidah Buku Gaya: Frasa "kepala badan riset" perlu disesuaikan dengan nomenklatur baku BRIN (Pasal 4)</span>
                </div>
              )}
              {activeTab === 'seo' && selectedFindingId === 'f-ais-3' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>Saran Atribusi E-E-A-T: Sebutkan nama narasumber lengkap & rilis pers resmi</span>
                </div>
              )}
            </div>

            {/* Paragraph 4 - Wilayah 3T & Penutup (Buku Gaya / SEO) */}
            <div
              id="art-p-4"
              className={`p-3.5 rounded-lg transition-all ${
                activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-3'
                  ? 'bg-amber-100/80 border-l-4 border-amber-600 ring-2 ring-amber-500/30'
                  : activeTab === 'seo' && selectedFindingId === 'f-ais-4'
                  ? 'bg-purple-100/80 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
                  : 'bg-transparent'
              }`}
            >
              <p className="text-slate-800 text-justify leading-relaxed">
                Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan, Terluar, Tertinggal) di wilayah Indonesia Timur.
              </p>
              {activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-3' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-amber-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                  <span>Kaidah Buku Gaya: Penulisan akronim wilayah 3T dan pembakuan huruf kapital</span>
                </div>
              )}
              {activeTab === 'seo' && selectedFindingId === 'f-ais-4' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                  <span>Saran Keterbacaan AI: Format poin ringkas spesifikasi teknis kawasan 3T</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Buku Gaya */}
      <BukuGayaTextModal
        isOpen={isStyleGuideModalOpen}
        onClose={() => setIsStyleGuideModalOpen(false)}
        styleGuide={activeStyleGuide}
      />
    </div>
  );
};
