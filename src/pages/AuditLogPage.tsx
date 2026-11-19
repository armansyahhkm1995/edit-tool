import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AuditLogFilterBar } from '../components/audit-log/AuditLogFilterBar';
import { AuditLogTable } from '../components/audit-log/AuditLogTable';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchSearch =
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = !categoryFilter || log.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [auditLogs, searchTerm, categoryFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDateFilter('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          100 Log Audit Sistem & Rekam Jejak Keamanan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Pantau rekam jejak keamanan aplikasi secara komprehensif. Mencakup riwayat login, perubahan
          hak akses, penyesuaian parameter AI, dan log galat sistem.
        </p>
      </div>

      {/* Main Table Card (Search & Filters integrated within card) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <AuditLogFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          onClearFilters={handleClearFilters}
        />

        <AuditLogTable logs={filteredLogs} />
      </div>
    </div>
  );
};
