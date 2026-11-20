import React from 'react';
import { FindingCategory, FindingItem } from '../../types';
import { ExternalLink, BookOpen, Search, Bot, Eye } from 'lucide-react';

interface DetailFindingsColumnProps {
  activeTab: FindingCategory;
  currentTabFindings: FindingItem[];
  selectedFindingId: string | null;
  onFindingClick: (finding: FindingItem) => void;
  activeStyleGuideName: string;
  onOpenStyleGuideModal: () => void;
  seoSubFilter: 'Semua' | 'SEO' | 'AI-Search';
  setSeoSubFilter: (filter: 'Semua' | 'SEO' | 'AI-Search') => void;
  totalSeoCount: number;
}

export const DetailFindingsColumn: React.FC<DetailFindingsColumnProps> = ({
  activeTab,
  currentTabFindings,
  selectedFindingId,
  onFindingClick,
  activeStyleGuideName,
  onOpenStyleGuideModal,
  seoSubFilter,
  setSeoSubFilter,
  totalSeoCount,
}) => {
  return (
    <div className="lg:col-span-5 flex flex-col lg:h-[calc(100vh-250px)] lg:max-h-[calc(100vh-250px)] lg:min-h-[560px] lg:sticky lg:top-4 space-y-3.5">
      {/* TAB 1: KEMIRIPAN TEMUAN */}
      {activeTab === 'kemiripan' && (
        <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
          {/* Score Overview Card */}
          <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-900">Skor Kemiripan Draft Berita:</span>
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
                  onClick={() => onFindingClick(finding)}
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
                    <span className="text-blue-600 font-semibold">Lihat ke draft berita →</span>
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
                {activeStyleGuideName}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenStyleGuideModal}
              className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
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
                  onClick={() => onFindingClick(finding)}
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
                    <span className="text-amber-700 font-semibold">Lihat ke draft berita →</span>
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
                Semua ({totalSeoCount})
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
                  onClick={() => onFindingClick(finding)}
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
                      Lihat ke draft berita →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
