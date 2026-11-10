import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { WhitelistSource } from '../types';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { AddEditWhitelistModal } from '../components/modals/AddEditWhitelistModal';
import { DeleteWhitelistModal } from '../components/modals/DeleteWhitelistModal';

export const SumberPengecualianPage: React.FC = () => {
  const { whitelist, addWhitelist, updateWhitelist, deleteWhitelist } = useApp();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WhitelistSource | null>(null);
  const [deletingItem, setDeletingItem] = useState<WhitelistSource | null>(null);

  const filteredWhitelist = useMemo(() => {
    return whitelist.filter((item) => {
      const matchSearch =
        item.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.addedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = !typeFilter || item.type === typeFilter;
      const matchStatus = !statusFilter || item.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [whitelist, searchTerm, typeFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setStatusFilter('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-700 tracking-tight">
            50 daftar Sumber Dikecualikan (Whitelist)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Kelola daftar URL atau domain (whitelist) yang dikecualikan dari kalkulasi skor
            kemiripan AI. Kutipan dari sumber di daftar ini tidak akan menambah persentase
            plagiarisme draf.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setIsAddEditOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Domain / URL Dikecualikan</span>
        </button>
      </div>

      {/* Main Table Card (Search & Filters integrated within card) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Search and Filter Row inside Table Card */}
        <div className="p-4 sm:p-5 border-b border-slate-200 space-y-3 bg-white">
          {/* Row 1: Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari domain, URL, atau alasan..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Row 2: Filters and Bersihkan Filter button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter 1: Tipe */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Tipe: Semua (Domain & URL)</option>
                <option value="Domain">Domain</option>
                <option value="URL">URL Spesifik</option>
              </select>
            </div>

            {/* Filter 2: Status */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Status: Aktif Saja</option>
                <option value="active">Status: Aktif</option>
                <option value="inactive">Status: Nonaktif</option>
              </select>
            </div>

            {/* Button: Bersihkan Filter (HUG CONTENT, pink/red outline) */}
            <button
              onClick={handleClearFilters}
              className="w-auto shrink-0 px-4 py-2 text-sm font-medium border border-red-200 text-red-500 bg-white hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

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
              {filteredWhitelist.length > 0 ? (
                filteredWhitelist.map((item) => (
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
                          onClick={() => {
                            setEditingItem(item);
                            setIsAddEditOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-slate-50 transition-colors cursor-pointer"
                          title="Perbarui Sumber Dikecualikan"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingItem(item)}
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
                    <p className="font-semibold text-slate-700">Tidak ada sumber pengecualian</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer matching Figma */}
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

      {/* Add / Edit Modal */}
      <AddEditWhitelistModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={(domain, reason) => {
          if (editingItem) {
            updateWhitelist(editingItem.id, domain, reason);
          } else {
            addWhitelist(domain, reason);
          }
        }}
        editingItem={editingItem}
      />

      {/* Delete Confirmation Modal */}
      <DeleteWhitelistModal
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={() => {
          if (deletingItem) {
            deleteWhitelist(deletingItem.id);
          }
        }}
        item={deletingItem}
      />
    </div>
  );
};
