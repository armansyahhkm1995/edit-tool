import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { StyleGuideVersion } from '../types';
import {
  Upload,
  Search,
  Eye,
  X,
  Check,
  ChevronDown,
} from 'lucide-react';
import { BukuGayaTextModal } from '../components/modals/BukuGayaTextModal';

export const BukuGayaPage: React.FC = () => {
  const { styleGuides, setActiveStyleGuide, uploadStyleGuide } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideForView, setSelectedGuideForView] = useState<StyleGuideVersion | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredGuides = useMemo(() => {
    return styleGuides.filter(
      (sg) =>
        sg.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sg.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sg.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [styleGuides, searchTerm]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadStyleGuide(file.name);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading matching Figma media_1794277909068_5ae8b500.jpg */}
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
        {/* Upload Dropzone Container matching Figma background & styling */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#F0F7FF] rounded-xl border-2 border-dashed border-[#BFDBFE] hover:border-blue-400 p-8 text-center transition-colors cursor-pointer group shadow-2xs"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />

          {/* Upload tray arrow icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-500 group-hover:scale-105 transition-transform">
            <Upload className="w-5 h-5 text-slate-500" />
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            Tarik dan seret file PDF Buku Gaya RRI ke sini, atau klik tombol di bawah
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
            Wajib PDF dengan teks terbaca (Maks. 25 MB). Hasil scan/pindai gambar akan ditolak otomatis
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
          >
            Pilih File PDF dari Komputer
          </button>
        </div>

        {/* Search Bar matching Figma (Integrated within table div) */}
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
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <tr>
                  <th className="py-3 px-4 sm:px-6 font-semibold w-24">Versi</th>
                  <th className="py-3 px-4 font-semibold">Nama File & Penggunggah</th>
                  <th className="py-3 px-4 font-semibold">Status Buku Gaya</th>
                  <th className="py-3 px-4 text-center font-semibold w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredGuides.map((guide) => (
                  <tr key={guide.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Versi */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="font-semibold text-slate-900 text-xs">
                        {guide.version}
                      </span>
                    </td>

                    {/* Nama File & Pengunggah */}
                    <td className="py-4 px-4 max-w-md">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">
                          {guide.filename}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {guide.uploadedBy} · {guide.uploadedAt}
                        </p>
                      </div>
                    </td>

                    {/* Status Toggle Switch + Pill Label (User preference kept!) */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveStyleGuide(guide.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden cursor-pointer ${
                            guide.isActive ? 'bg-[#1866EF]' : 'bg-slate-200 hover:bg-slate-300'
                          }`}
                          title={guide.isActive ? 'Nonaktifkan versi ini' : 'Aktifkan versi ini'}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              guide.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            guide.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-600 border border-red-200'
                          }`}
                        >
                          {guide.isActive ? 'Aktif' : 'Non-aktif'}
                        </span>
                      </div>
                    </td>

                    {/* Aksi: Eye icon button ONLY (per user request) */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => setSelectedGuideForView(guide)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-slate-50 transition-colors cursor-pointer inline-flex items-center justify-center"
                        title="Lihat Isi Dokumen Buku Gaya"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
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
      </div>

      {/* Reader Modal (Dialog tengah layar, BUKAN drawer kanan sesuai instruksi user) */}
      <BukuGayaTextModal
        isOpen={Boolean(selectedGuideForView)}
        onClose={() => setSelectedGuideForView(null)}
        styleGuide={selectedGuideForView}
        onSetActive={(id) => setActiveStyleGuide(id)}
      />
    </div>
  );
};
