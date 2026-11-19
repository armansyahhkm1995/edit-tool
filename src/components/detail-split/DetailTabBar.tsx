import React from 'react';
import { FindingCategory } from '../../types';
import { Copy, BookOpen, Search } from 'lucide-react';

interface DetailTabBarProps {
  activeTab: FindingCategory;
  onSelectTab: (tab: FindingCategory) => void;
  kemiripanCount: number;
  bukuGayaCount: number;
  seoCount: number;
}

export const DetailTabBar: React.FC<DetailTabBarProps> = ({
  activeTab,
  onSelectTab,
  kemiripanCount,
  bukuGayaCount,
  seoCount,
}) => {
  return (
    <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-xs">
      <button
        onClick={() => onSelectTab('kemiripan')}
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
          {kemiripanCount}
        </span>
      </button>

      <button
        onClick={() => onSelectTab('buku_gaya')}
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
          {bukuGayaCount}
        </span>
      </button>

      <button
        onClick={() => onSelectTab('seo')}
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
          {seoCount}
        </span>
      </button>
    </div>
  );
};
