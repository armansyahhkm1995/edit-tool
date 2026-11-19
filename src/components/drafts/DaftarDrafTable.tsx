import React from 'react';
import { CMSDraft } from '../../types';
import { Pencil, ChevronDown } from 'lucide-react';

interface DaftarDrafTableProps {
  drafts: CMSDraft[];
  totalItems: number;
  currentPageNum: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onOpenDetail: (draft: CMSDraft) => void;
}

export const DaftarDrafTable: React.FC<DaftarDrafTableProps> = ({
  drafts,
  totalItems,
  currentPageNum,
  totalPages,
  onPageChange,
  onOpenDetail,
}) => {
  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-y border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-semibold">Judul Draft Berita</th>
              <th className="py-3 px-4 font-semibold">Status Artikel</th>
              <th className="py-3 px-4 font-semibold">Waktu Dibuat</th>
              <th className="py-3 px-4 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {drafts.length > 0 ? (
              drafts.map((draft) => (
                <tr
                  key={draft.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onOpenDetail(draft)}
                >
                  {/* Judul Draft (Title single-line with ellipsis, and subtitle nama editor | satker) */}
                  <td className="py-4 px-4 sm:px-6 max-w-md">
                    <p className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors text-sm">
                      {draft.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-normal">
                      {draft.journalist}
                    </p>
                  </td>

                  {/* Status Artikel */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        draft.cmsStatus === 'Publish'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : draft.cmsStatus === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : draft.cmsStatus === 'Review'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {draft.cmsStatus || 'Draft'}
                    </span>
                  </td>

                  {/* Waktu Dibuat */}
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500">
                    {draft.updatedAt}
                  </td>

                  {/* Aksi (Only Edit icon, matching Figma) */}
                  <td
                    className="py-4 px-4 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => onOpenDetail(draft)}
                        title="Edit / Periksa Draft Berita"
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-600 transition-colors inline-flex items-center justify-center shadow-2xs"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  <p className="font-semibold text-slate-700">Tidak ada draft berita yang cocok</p>
                  <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter status</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>
            Menampilkan <span className="font-semibold text-slate-800">1-{drafts.length}</span> dari{' '}
            <span className="font-semibold text-slate-800">{totalItems}</span> data
          </span>
          <div className="inline-flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-white cursor-pointer text-slate-700">
            <span>10</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPageNum - 1))}
            disabled={currentPageNum === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-700 transition-colors"
          >
            Sebelumnya
          </button>

          <button
            onClick={() => onPageChange(1)}
            className="w-7 h-7 rounded-lg bg-[#1866EF] text-white font-semibold text-xs flex items-center justify-center"
          >
            1
          </button>
          <button
            onClick={() => onPageChange(2)}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center"
          >
            2
          </button>
          <button
            onClick={() => onPageChange(3)}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center"
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            onClick={() => onPageChange(10)}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center"
          >
            10
          </button>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPageNum + 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};
