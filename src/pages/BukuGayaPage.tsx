import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { StyleGuideVersion } from '../types';
import { Search } from 'lucide-react';
import { BukuGayaUploadZone } from '../components/buku-gaya/BukuGayaUploadZone';
import { BukuGayaTable } from '../components/buku-gaya/BukuGayaTable';
import { BukuGayaTextModal } from '../components/modals/BukuGayaTextModal';

export const BukuGayaPage: React.FC = () => {
  const { styleGuides, setActiveStyleGuide, uploadStyleGuide } = useApp();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideForView, setSelectedGuideForView] = useState<StyleGuideVersion | null>(null);

  const handleToggleGuide = (guide: StyleGuideVersion) => {
    if (guide.isActive) {
      showToast('Harus ada minimal 1 versi buku gaya yang aktif atau pilih yang lain', 'error', 'Buku Gaya Redaksi');
      return;
    }
    setActiveStyleGuide(guide.id);
  };

  const filteredGuides = useMemo(() => {
    return styleGuides.filter(
      (sg) =>
        sg.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sg.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sg.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [styleGuides, searchTerm]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          Pengelolaan Buku Gaya Redaksi & Versi Aturan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Pemeriksaan AI selalu merujuk versi buku gaya yang aktif
        </p>
      </div>

      {/* Main Container Card (Holding Dropzone + Search Bar + Table + Pagination) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
        <BukuGayaUploadZone onUploadFile={uploadStyleGuide} />

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama file, nomor versi, atau nama pengunggah ..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Table Container */}
        <BukuGayaTable
          guides={filteredGuides}
          onToggleGuide={handleToggleGuide}
          onSelectGuideForView={setSelectedGuideForView}
        />
      </div>

      {/* Reader Modal */}
      <BukuGayaTextModal
        isOpen={Boolean(selectedGuideForView)}
        onClose={() => setSelectedGuideForView(null)}
        styleGuide={selectedGuideForView}
        onSetActive={(id) => setActiveStyleGuide(id)}
      />
    </div>
  );
};
