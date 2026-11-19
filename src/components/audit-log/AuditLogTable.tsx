import React from 'react';
import { AuditLogItem } from '../../types';

interface AuditLogTableProps {
  logs: AuditLogItem[];
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs }) => {
  return (
    <div>
      {/* Table Content (Exact 4 columns: Waktu, Pengguna & Peran, Kategori, Detail Aktivitas) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-semibold">Waktu (WIB)</th>
              <th className="py-3 px-4 font-semibold">Pengguna & Peran</th>
              <th className="py-3 px-4 font-semibold">Kategori</th>
              <th className="py-3 px-4 sm:px-6 font-semibold">Detail Aktivitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Waktu (WIB) */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <p className="font-semibold text-xs text-slate-900">
                      {log.timestamp}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{log.timezone}</p>
                  </td>

                  {/* Pengguna & Peran */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <p className="font-semibold text-xs text-slate-900">{log.userName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{log.userRole}</p>
                  </td>

                  {/* Kategori */}
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-700">
                    {log.category}
                  </td>

                  {/* Detail Aktivitas */}
                  <td className="py-4 px-4 sm:px-6 text-xs text-slate-800 leading-relaxed">
                    {log.detail}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  <p className="font-semibold text-slate-700">Log tidak ditemukan</p>
                  <p className="text-xs mt-1">Coba sesuaikan kata kunci atau filter</p>
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
          <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors">
            Sebelumnya
          </button>
          <button className="w-8 h-8 rounded-md bg-[#1866EF] text-white font-semibold text-xs">
            1
          </button>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors">
            2
          </button>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors">
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors">
            10
          </button>
          <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};
