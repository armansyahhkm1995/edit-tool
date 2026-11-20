import React from 'react';

export interface DetailStatusCardsProps {
  similarityScore: number;
  aiDetectionScore: number;
  isAiAnalyzing: boolean;
  bukuGayaCount: number;
  seoCount: number;
  similarityThreshold?: number;
  aiDetectionThreshold?: number;
  styleGuideThreshold?: number;
  seoThreshold?: number;
}

export const DetailStatusCards: React.FC<DetailStatusCardsProps> = ({
  similarityScore,
  aiDetectionScore,
  isAiAnalyzing,
  bukuGayaCount,
  seoCount,
  similarityThreshold = 20,
  aiDetectionThreshold = 30,
  styleGuideThreshold = 3,
  seoThreshold = 75,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {/* Card 1: Kemiripan */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">
            Kemiripan
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-900 tracking-tight">
            {similarityScore}%
          </div>
          <div className="text-[11px] text-emerald-700/90 mt-1">
            Ambang batas &lt; {similarityThreshold}% (Aman)
          </div>
        </div>
      </div>

      {/* Card 2: Deteksi AI */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Deteksi AI
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">
            {isAiAnalyzing ? '...' : `${aiDetectionScore}%`}
          </div>
          <div className="text-[11px] text-blue-700/90 mt-1">
            Ambang batas &lt; {aiDetectionThreshold}% (Aman)
          </div>
        </div>
      </div>

      {/* Card 3: Buku Gaya */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
            Buku Gaya
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-amber-900 tracking-tight">
            {isAiAnalyzing ? '...' : `${bukuGayaCount} Pelanggaran`}
          </div>
          <div className="text-[11px] text-amber-700/90 mt-1">
            Ambang batas ≤ {styleGuideThreshold} Pelanggaran (Aman)
          </div>
        </div>
      </div>

      {/* Card 4: SEO & AI-Search */}
      <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs min-h-[115px] sm:min-h-[125px] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
            SEO & AI-Search
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-purple-900 tracking-tight">
            {isAiAnalyzing ? '...' : `${seoCount} Usulan`}
          </div>
          <div className="text-[11px] text-purple-700/90 mt-1">
            Ambang batas ≥ {seoThreshold} Skor (Optimal)
          </div>
        </div>
      </div>
    </div>
  );
};
