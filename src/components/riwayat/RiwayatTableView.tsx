import React from 'react';
import { GitCompare } from 'lucide-react';
import { CheckHistoryItem } from '../../types';

interface RiwayatTableViewProps {
  historyList: CheckHistoryItem[];
  onSelectCompare: (item: CheckHistoryItem) => void;
  onSelectDetail: (item: CheckHistoryItem) => void;
}

export const RiwayatTableView: React.FC<RiwayatTableViewProps> = ({
  historyList,
  onSelectCompare,
  onSelectDetail,
}) => {
  return (
    <>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-semibold">Judul Draft Berita</th>
              <th className="py-3 px-4 font-semibold">Waktu Tinjau</th>
              <th className="py-3 px-4 font-semibold">Peninjau</th>
              <th className="py-3 px-4 font-semibold">Status Artikel</th>
              <th className="py-3 px-4 font-semibold">Skor Kemiripan</th>
              <th className="py-3 px-4 font-semibold">Buku Gaya</th>
              <th className="py-3 px-4 font-semibold">Deteksi AI</th>
              <th className="py-3 px-4 font-semibold">SEO & AI-Search</th>
              <th className="py-3 px-4 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {historyList.length > 0 ? (
              historyList.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectDetail(item)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Judul Draf */}
                  <td className="py-4 px-4 sm:px-6 max-w-sm">
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-[#1866EF] transition-colors text-sm line-clamp-2">
                        {item.draftTitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-normal">
                        {item.editor || 'Ridwan | RRI Biak Numfor'}
                      </p>
                    </div>
                  </td>

                  {/* Waktu Tinjau */}
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600">
                    {item.time}
                  </td>

                  {/* Peninjau */}
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-700 font-medium">
                    {item.triggerBy
                      ? item.triggerBy.replace(/^(Ulasan|Pemicu):\s*/i, '').replace(/\s*[·•]\s*(Manual|AI|Otomatis)/gi, '').trim()
                      : 'Editor'}
                  </td>

                  {/* Status Artikel */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.articleStatus === 'Publish'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.articleStatus === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : item.articleStatus === 'Review'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {item.articleStatus || 'Draft'}
                    </span>
                  </td>

                  {/* Skor Kemiripan */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.similarityLevel === 'Rendah'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.similarityLevel === 'Sedang'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {item.similarityScore}
                    </span>
                  </td>

                  {/* Buku Gaya */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.styleGuideLevel === 'Tinggi' || (item.styleGuideCount ?? 0) > 3
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : item.styleGuideLevel === 'Sedang'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.styleGuideScore || `${item.styleGuideCount ?? 2} Pelanggaran (Aman)`}
                    </span>
                  </td>

                  {/* Deteksi AI */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.aiDetectionLevel === 'Tinggi'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : item.aiDetectionLevel === 'Sedang'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.aiDetectionScore || `${item.aiDetectionCount ? item.aiDetectionCount * 12 : 12}% (Aman)`}
                    </span>
                  </td>

                  {/* SEO & AI-Search */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.seoAiLevel === 'Rendah'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : item.seoAiLevel === 'Cukup'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.seoAiScore || '88 Skor (Optimal)'}
                    </span>
                  </td>

                  {/* Aksi (Button Compare) */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCompare(item);
                      }}
                      className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-blue-100 border border-[#BFDBFE] text-[#1866EF] font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                      title="Bandingkan Draft Berita Rekomendasi AI vs Portal News RRI"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>Bandingkan</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-500">
                  <p className="font-semibold text-slate-700">Riwayat pemeriksaan tidak ditemukan</p>
                  <p className="text-xs mt-1">Coba sesuaikan kata kunci atau filter pencarian</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Menampilkan 1-5 dari 42 data</span>
          <div className="relative">
            <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 cursor-pointer">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer"
          >
            Sebelumnya
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-md bg-[#1866EF] text-white font-semibold text-xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer"
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer"
          >
            10
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </>
  );
};
