import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Copy, BookOpen, Search, Sparkles, Bot, Sliders } from 'lucide-react';

export const KonfigurasiProviderPage: React.FC = () => {
  const { aiConfig, updateAIConfig } = useApp();
  const { showToast } = useToast();

  const [similarityThreshold, setSimilarityThreshold] = useState(aiConfig.similarityThreshold ?? 20);
  const [styleGuideThreshold, setStyleGuideThreshold] = useState(aiConfig.styleGuideThreshold ?? 80);
  const [seoThreshold, setSeoThreshold] = useState(aiConfig.seoThreshold ?? 75);
  const [aiSearchThreshold, setAiSearchThreshold] = useState(aiConfig.aiSearchThreshold ?? 70);
  const [aiDetectionThreshold, setAiDetectionThreshold] = useState(aiConfig.aiDetectionThreshold ?? 30);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAIConfig({
      similarityThreshold,
      styleGuideThreshold,
      seoThreshold,
      aiSearchThreshold,
      aiDetectionThreshold,
    });
    showToast('Konfigurasi ambang batas semua matriks berhasil disimpan', 'success');
  };

  const handleReset = () => {
    setSimilarityThreshold(aiConfig.similarityThreshold ?? 20);
    setStyleGuideThreshold(aiConfig.styleGuideThreshold ?? 80);
    setSeoThreshold(aiConfig.seoThreshold ?? 75);
    setAiSearchThreshold(aiConfig.aiSearchThreshold ?? 70);
    setAiDetectionThreshold(aiConfig.aiDetectionThreshold ?? 30);
    showToast('Konfigurasi ambang batas dikembalikan ke pengaturan awal', 'info');
  };

  const metrics = [
    {
      id: 'similarity',
      name: '1. Deteksi Kemiripan (Plagiarisme)',
      badge: 'Maks. Toleransi',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Copy,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      description:
        'Tentukan batas maksimal toleransi persentase kemiripan naskah terhadap sumber eksternal atau sindikasi berita. Jika skor melebihi batas ini, sistem akan memicu status peringatan bagi editor.',
      label: 'Batas Toleransi Skor Kemiripan:',
      value: similarityThreshold,
      setValue: setSimilarityThreshold,
      unit: '%',
      min: 1,
      max: 100,
      placeholder: '20',
      note: 'Standar: 20%',
    },
    {
      id: 'style_guide',
      name: '2. Kepatuhan Buku Gaya Editorial',
      badge: 'Min. Kepatuhan',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: BookOpen,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      description:
        'Tentukan ambang batas minimal persentase kepatuhan naskah terhadap kaidah jurnalistik, ejaan baku KBBI, serta pedoman buku gaya redaksional RRI.',
      label: 'Ambang Batas Kepatuhan Buku Gaya:',
      value: styleGuideThreshold,
      setValue: setStyleGuideThreshold,
      unit: '%',
      min: 1,
      max: 100,
      placeholder: '80',
      note: 'Standar: 80%',
    },
    {
      id: 'seo',
      name: '3. Search Engine Optimization (SEO)',
      badge: 'Min. Kelayakan',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Search,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      description:
        'Tentukan ambang batas skor minimal optimasi mesin pencari konvensional (struktur judul, kepadatan kata kunci, dan keterbacaan lead naskah).',
      label: 'Ambang Batas Skor Minimal SEO:',
      value: seoThreshold,
      setValue: setSeoThreshold,
      unit: 'Skor',
      min: 1,
      max: 100,
      placeholder: '75',
      note: 'Standar: 75 / 100',
    },
    {
      id: 'ai_search',
      name: '4. AI-Search & Answer Engine Optimization',
      badge: 'Min. Kesiapan',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Sparkles,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      description:
        'Tentukan ambang batas skor minimal kesiapan naskah untuk dikutip dan diindeks oleh mesin pencari AI (seperti Perplexity, SearchGPT, dan Google AI Overview).',
      label: 'Ambang Batas Optimasi AI-Search:',
      value: aiSearchThreshold,
      setValue: setAiSearchThreshold,
      unit: 'Skor',
      min: 1,
      max: 100,
      placeholder: '70',
      note: 'Standar: 70 / 100',
    },
    {
      id: 'ai_detection',
      name: '5. Deteksi Penulisan AI',
      badge: 'Maks. Toleransi',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Bot,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      description:
        'Tentukan batas maksimal toleransi indikasi probabilitas naskah ditulis oleh model AI sebelum diwajibkan tinjau ulang dan verifikasi langsung oleh editor.',
      label: 'Batas Toleransi Deteksi AI:',
      value: aiDetectionThreshold,
      setValue: setAiDetectionThreshold,
      unit: '%',
      min: 1,
      max: 100,
      placeholder: '30',
      note: 'Standar: 30%',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          Konfigurasi Ambang Batas Matriks
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Kelola parameter ambang batas (threshold) analisis deteksi kemiripan naskah, kepatuhan buku gaya, optimasi SEO, AI-Search, dan deteksi AI.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Main Card Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
          {/* Header section of Card */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Parameter Ambang Batas (Threshold) Matriks Redaksional
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Tentukan batas toleransi persentase skor atau ambang batas minimal untuk masing-masing matriks pemeriksaan naskah. Jika skor naskah berada di luar ambang batas yang ditetapkan, sistem akan otomatis memicu peringatan waspada bagi Editor sebelum diizinkan terbit.
            </p>
          </div>

          {/* List of 5 Metrics Thresholds */}
          <div className="space-y-3.5 pt-1">
            {metrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={metric.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start gap-3.5 max-w-2xl">
                    <div
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${metric.iconBg}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900">{metric.name}</h3>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${metric.badgeClass}`}
                        >
                          {metric.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {metric.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:self-center self-end shrink-0 pl-13 sm:pl-0">
                    <div className="text-right hidden md:block">
                      <span className="text-xs font-medium text-slate-400 block">
                        {metric.note}
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min={metric.min}
                        max={metric.max}
                        value={metric.value}
                        onChange={(e) => metric.setValue(Number(e.target.value))}
                        placeholder={metric.placeholder}
                        className="w-28 h-11 pl-3 pr-10 text-sm font-bold text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-center shadow-2xs"
                      />
                      <span className="absolute right-3 text-xs font-semibold text-slate-400 pointer-events-none">
                        {metric.unit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Buttons */}
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
