import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { WhitelistSource } from '../types';
import { Plus } from 'lucide-react';
import { WhitelistFilterBar } from '../components/whitelist/WhitelistFilterBar';
import { WhitelistTable } from '../components/whitelist/WhitelistTable';
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
        <WhitelistFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClearFilters={handleClearFilters}
        />

        <WhitelistTable
          items={filteredWhitelist}
          onEditItem={(item) => {
            setEditingItem(item);
            setIsAddEditOpen(true);
          }}
          onDeleteItem={(item) => setDeletingItem(item)}
        />
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
