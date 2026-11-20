import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { StyleGuideVersion } from '../../types';

interface BukuGayaTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleGuide: StyleGuideVersion | null;
  onSetActive?: (id: string) => void;
}

export const BukuGayaTextModal: React.FC<BukuGayaTextModalProps> = ({
  isOpen,
  onClose,
  styleGuide,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'hal60' | 'kaidah'>('all');

  const filteredArticles = useMemo(() => {
    if (!styleGuide) return [];
    return styleGuide.articles.filter((art) => {
      // Tab filter
      if (filterTab === 'hal60') {
        const isHal60 =
          art.chapter.includes('HALAMAN 60') ||
          art.chapter.includes('HAL. 60') ||
          art.chapter.includes('V.6.k') ||
          art.chapter.includes('V.7') ||
          art.chapter.includes('V.8') ||
          art.chapter.includes('V.9') ||
          art.chapter.includes('V.10') ||
          art.chapter.includes('V.11') ||
          art.chapter.includes('V.12') ||
          art.chapter.includes('V.14') ||
          art.chapter.includes('V.15');
        if (!isHal60) return false;
      } else if (filterTab === 'kaidah') {
        if (!art.chapter.includes('V.1 - V.5')) return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        art.chapter.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q)
      );
    });
  }, [styleGuide, searchQuery, filterTab]);

  if (!isOpen || !styleGuide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Center Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fade-in z-10">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-white shrink-0">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              {styleGuide.isActive ? (
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Pedoman Aktif
                </span>
              ) : (
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-200">
                  Arsip / Non-aktif
                </span>
              )}
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {styleGuide.version}
              </span>
              <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                KBRN · RRI.CO.ID
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {styleGuide.filename}
            </h2>

            <p className="text-xs text-slate-500">
              {styleGuide.pageCount} Halaman · {styleGuide.lineCount.toLocaleString('id-ID')} Baris Aturan Terverifikasi · {styleGuide.uploadedBy}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-5 sm:px-6 py-3 bg-slate-50 border-b border-slate-200 shrink-0 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kaidah atau contoh (misal: kutipan, persen, pasca, subjek, AI)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 text-xs">
            <button
              type="button"
              onClick={() => setFilterTab('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                filterTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua Ekstraksi ({styleGuide.articles.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('hal60')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                filterTab === 'hal60'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Mulai Hal. 60 (Peraturan Operasional Inti)
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('kaidah')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                filterTab === 'kaidah'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Bab V.1–V.5 (5 Standar Straight News)
            </button>
          </div>
        </div>

        {/* Modal Body with Chapter Cards */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-[#F8FAFC]">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Tidak ada aturan yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredArticles.map((art, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide uppercase">
                      {art.chapter}
                    </h3>
                  </div>
                  {art.chapter.includes('HALAMAN 60') || art.chapter.includes('HAL. 60') ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                      Hal. 60+
                    </span>
                  ) : null}
                </div>

                <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                  {art.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white shrink-0">
          <p className="text-[11px] text-slate-400">
            Sumber: Buku Gaya Pedoman Penulisan Berita KBRN RRI (Direktorat Program dan Produksi 2026)
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
