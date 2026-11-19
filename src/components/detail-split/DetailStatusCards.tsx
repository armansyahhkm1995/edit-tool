import React from 'react';

interface DetailStatusCardsProps {
  similarityScore: number;
  aiDetectionScore: number;
  isAiAnalyzing: boolean;
  bukuGayaCount: number;
  seoCount: number;
}

export const DetailStatusCards: React.FC<DetailStatusCardsProps> = ({
  similarityScore,
  aiDetectionScore,
  isAiAnalyzing,
  bukuGayaCount,
  seoCount,
}) => {
  return (
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
            {similarityScore}%
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
            {isAiAnalyzing ? 'Memeriksa' : 'Aman'}
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">
            {isAiAnalyzing ? '...' : `${aiDetectionScore}%`}
          </div>
          <div className="text-[11px] text-blue-700/90 mt-1">
            {isAiAnalyzing ? 'Sedang menganalisis naskah' : 'Indikasi teks manusiawi dominan'}
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
            {isAiAnalyzing ? 'Memeriksa' : 'Perlu Tinjau'}
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-amber-900 tracking-tight">
            {isAiAnalyzing ? '...' : `${bukuGayaCount} Temuan`}
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
            {isAiAnalyzing ? 'Memeriksa' : 'Optimasi'}
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-purple-900 tracking-tight">
            {isAiAnalyzing ? '...' : `${seoCount} Usulan`}
          </div>
          <div className="text-[11px] text-purple-700/90 mt-1">
            Visibilitas mesin telusur & LLM
          </div>
        </div>
      </div>
    </div>
  );
};
