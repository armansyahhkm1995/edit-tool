import React from 'react';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

interface DetailHeaderNavProps {
  title: string;
  artCode?: string;
  journalist: string;
  updatedAt: string;
  isAiAnalyzing: boolean;
  onBack: () => void;
  onRunAi: () => void;
}

export const DetailHeaderNav: React.FC<DetailHeaderNavProps> = ({
  title,
  journalist,
  updatedAt,
  isAiAnalyzing,
  onBack,
  onRunAi,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
      <div className="space-y-1">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer transition-colors py-1 px-1 -ml-1 rounded-md hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Draft Berita</span>
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <span>Penulis: {journalist}</span>
          <span>·</span>
          <span>Terakhir diperbarui: {updatedAt}</span>
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
          onClick={onRunAi}
          disabled={isAiAnalyzing}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-60 h-10 cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 ${isAiAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAiAnalyzing ? 'Memeriksa...' : 'Periksa dengan AI'}</span>
        </button>
      </div>
    </div>
  );
};
