import React from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { DraftVersionData } from './types';

interface RiwayatVersionsViewProps {
  selectedHistoryTitle: string;
  versions: DraftVersionData[];
  activeVersionId: string;
  onToggleVersion: (versionId: string) => void;
  onSelectCompare: (version: DraftVersionData) => void;
  onBackToSplit: () => void;
}

export const RiwayatVersionsView: React.FC<RiwayatVersionsViewProps> = ({
  selectedHistoryTitle,
  versions,
  activeVersionId,
  onToggleVersion,
  onSelectCompare,
  onBackToSplit,
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
      {/* Back Link & Header */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBackToSplit}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors py-1 px-1 rounded-md hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Detail Riwayat Pemeriksaan</span>
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">
            {selectedHistoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
            <strong className="text-slate-800 font-semibold">
              Sudut Pandang Jurnalistik (Angle):
            </strong>{' '}
            Peluncuran wahana komunikasi antariksa nasional Satelit Nusantara Tiga dari kompleks Biak Numfor Papua untuk pemerataan konektivitas internet pita lebar 5G bagi fasilitas publik di kawasan 3T Indonesia Timur.
          </p>
        </div>
      </div>

      {/* Versions Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Daftar Riwayat Versi Pemeriksaan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Bandingkan versi draft berita terdahulu dengan versi terkini secara berdampingan.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1866EF]">
            {versions.length} Versi Tersimpan
          </span>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[960px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50/80">
                  <th className="py-3 px-4 font-semibold">Versi Draft Berita</th>
                  <th className="py-3 px-4 font-semibold">Dibuat Oleh</th>
                  <th className="py-3 px-4 font-semibold">Deteksi AI</th>
                  <th className="py-3 px-4 font-semibold">Kemiripan</th>
                  <th className="py-3 px-4 font-semibold">Buku Gaya</th>
                  <th className="py-3 px-4 font-semibold">SEO & AI-Search</th>
                  <th className="py-3 px-4 font-semibold">Ringkasan Perubahan</th>
                  <th className="py-3 px-4 font-semibold text-center w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {versions.map((v) => {
                  const isActive = v.id === activeVersionId;
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Status Toggle Switch: Aktifkan Versi Ini */}
                          <button
                            type="button"
                            onClick={() => onToggleVersion(v.id)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-hidden cursor-pointer shrink-0 ${
                              isActive ? 'bg-[#1866EF]' : 'bg-slate-300'
                            }`}
                            title={isActive ? 'Versi ini sedang aktif' : 'Klik untuk aktifkan versi ini'}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                isActive ? 'translate-x-4.5' : 'translate-x-1'
                              }`}
                            />
                          </button>

                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm">{v.version}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                                Aktif
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span
                            className={`font-semibold ${
                              v.isAI ? 'text-[#1866EF]' : 'text-slate-900'
                            }`}
                          >
                            {v.createdBy}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                            {v.createdAt}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            v.aiDetection.includes('Aman')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : v.aiDetection.includes('Sedang') || v.aiDetection.includes('Perlu')
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {v.aiDetection}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            v.similarityScore.includes('Rendah') || v.similarityScore.includes('Aman')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : v.similarityScore.includes('Sedang')
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {v.similarityScore}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            v.styleGuideScore.includes('Aman') || v.styleGuideScore.includes('Sesuai')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : v.styleGuideScore.includes('Sedang')
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {v.styleGuideScore}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            v.seoAiScore.includes('Optimal') || v.seoAiScore.includes('Aman')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : v.seoAiScore.includes('Cukup') || v.seoAiScore.includes('Perlu')
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {v.seoAiScore}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 max-w-xs">{v.changeSummary}</td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onSelectCompare(v)}
                          className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-blue-100 border border-[#BFDBFE] text-[#1866EF] font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                          title="Bandingkan dengan Versi Terbaru"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Bandingkan</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
