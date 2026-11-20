import React from 'react';
import { WhitelistSource } from '../../types';
import { Globe, Pencil, Trash2, ChevronDown } from 'lucide-react';

interface WhitelistTableProps {
  items: WhitelistSource[];
  onEditItem: (item: WhitelistSource) => void;
  onDeleteItem: (item: WhitelistSource) => void;
}

export const WhitelistTable: React.FC<WhitelistTableProps> = ({
  items,
  onEditItem,
  onDeleteItem,
}) => {
  return (
    <div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-semibold">Domain / URL spesifik</th>
              <th className="py-3 px-4 font-semibold">Ditambahkan Oleh</th>
              <th className="py-3 px-4 font-semibold">Alasan Pengecualian</th>
              <th className="py-3 px-4 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Domain / URL */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-900 text-sm">
                        {item.domain}
                      </span>
                    </div>
                  </td>

                  {/* Ditambahkan Oleh */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <p className="font-semibold text-xs text-slate-900">{item.addedBy}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.addedAt}</p>
                  </td>

                  {/* Alasan */}
                  <td className="py-4 px-4 max-w-md text-xs text-slate-700 leading-relaxed">
                    {item.reason}
                  </td>

                  {/* Aksi: Edit and Delete buttons */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onEditItem(item)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-slate-50 transition-colors cursor-pointer"
                        title="Perbarui Sumber Dikecualikan"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteItem(item)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus Sumber Dikecualikan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  <p className="font-semibold text-slate-700">Tidak ada sumber dikecualikan</p>
                  <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Menampilkan 1-5 dari 42 data</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 rounded-md px-2.5 py-1 pr-6 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer">
            Sebelumnya
          </button>
          <button className="w-8 h-8 rounded-md bg-[#1866EF] text-white font-semibold text-xs transition-colors">
            1
          </button>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors">
            2
          </button>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors">
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors">
            10
          </button>
          <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};
