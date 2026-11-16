import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export const KonfigurasiProviderPage: React.FC = () => {
  const { aiConfig, updateAIConfig } = useApp();
  const { showToast } = useToast();

  const [threshold, setThreshold] = useState(aiConfig.similarityThreshold);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAIConfig({
      similarityThreshold: threshold,
    });
    showToast('Konfigurasi parameter kemiripan berhasil disimpan', 'success');
  };

  const handleReset = () => {
    setThreshold(aiConfig.similarityThreshold);
    showToast('Konfigurasi dikembalikan ke pengaturan awal', 'info');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          Konfigurasi Kemiripan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Kelola parameter ambang batas (threshold) analisis deteksi kemiripan naskah berita.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Main Card Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
          {/* PARAMETER AMBANG BATAS (THRESHOLD) */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Parameter Ambang Batas (Threshold)
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                Tentukan batas toleransi persentase kemiripan draf berita. Jika skor kemiripan naskah
                melebihi batas ini, sistem akan otomatis membunyikan peringatan waspada (kuning/merah)
                bagi Editor sebelum diizinkan terbit.
              </p>
            </div>

            {/* Horizontal row without card and without draggable slider (Matching Figma Frame 427318703) */}
            <div className="flex items-center gap-4 pt-1">
              <label className="text-sm font-bold text-slate-900 whitespace-nowrap">
                Batas Toleransi Skor Kemiripan:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  placeholder="20"
                  className="w-24 h-11 px-3 text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons (Matching Figma Frame 427318690) */}
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Batal / Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1866EF] rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            Simpan Konfigurasi
          </button>
        </div>
      </form>
    </div>
  );
};
