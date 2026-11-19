import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface BukuGayaUploadZoneProps {
  onUploadFile: (filename: string) => void;
}

export const BukuGayaUploadZone: React.FC<BukuGayaUploadZoneProps> = ({ onUploadFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file.name);
    }
  };

  return (
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
  );
};
