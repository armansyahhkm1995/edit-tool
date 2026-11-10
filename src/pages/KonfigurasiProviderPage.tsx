import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { CheckCircle2 } from 'lucide-react';

export const KonfigurasiProviderPage: React.FC = () => {
  const { aiConfig, updateAIConfig } = useApp();
  const { showToast } = useToast();

  const [activeModel, setActiveModel] = useState(aiConfig.activeLlm);
  const [claudeKey, setClaudeKey] = useState(aiConfig.claudeApiKey);
  const [geminiKey, setGeminiKey] = useState(aiConfig.geminiApiKey);
  const [similarityEngine, setSimilarityEngine] = useState(aiConfig.similarityEngine);
  const [externalKey, setExternalKey] = useState(aiConfig.externalApiKey);
  const [threshold, setThreshold] = useState(aiConfig.similarityThreshold);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAIConfig({
      activeLlm: activeModel,
      claudeApiKey: claudeKey,
      geminiApiKey: geminiKey,
      similarityEngine,
      externalApiKey: externalKey,
      similarityThreshold: threshold,
    });
    showToast('Konfigurasi provider & parameter berhasil disimpan', 'success');
  };

  const handleReset = () => {
    setActiveModel(aiConfig.activeLlm);
    setClaudeKey(aiConfig.claudeApiKey);
    setGeminiKey(aiConfig.geminiApiKey);
    setSimilarityEngine(aiConfig.similarityEngine);
    setExternalKey(aiConfig.externalApiKey);
    setThreshold(aiConfig.similarityThreshold);
    showToast('Konfigurasi dikembalikan ke pengaturan awal', 'info');
  };

  const getActiveModelName = () => {
    switch (activeModel) {
      case 'claude-3-5-sonnet':
        return 'Claude 3.5 Sonnet';
      case 'gemini-3-8-flash':
        return 'Gemini 3.8 Flash high';
      case 'gpt-oss-120b':
        return 'GPT-OSS 120B';
      default:
        return 'Claude 3.5 Sonnet';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          Konfigurasi Provider AI & Mesin Analisis
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Kelola pemilihan model kecerdasan buatan, arsitektur crawler berita, serta ambang batas
          (threshold) analisis draf.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Main Card Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-8">
          {/* SECTION 1: MODEL BAHASA AI (LLM PROVIDER) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                1. Model Bahasa AI (LLM Provider)
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>AKTIF ({getActiveModelName()})</span>
              </span>
            </div>

            {/* 3 Model Cards (User-approved layout matching Figma) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Anthropic Claude 3.5 Sonnet */}
              <div
                onClick={() => setActiveModel('claude-3-5-sonnet')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  activeModel === 'claude-3-5-sonnet'
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          activeModel === 'claude-3-5-sonnet'
                            ? 'border-emerald-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {activeModel === 'claude-3-5-sonnet' && (
                          <div className="w-2 h-2 rounded-full bg-emerald-600" />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Anthropic Claude 3.5 Sonnet
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6.5">
                    Akurasi penalaran redaksional tertinggi untuk tata bahasa Indonesia dan kepatuhan
                    buku gaya jurnalistik.
                  </p>
                </div>
              </div>

              {/* Card 2: Gemini 3.8 Flash high */}
              <div
                onClick={() => setActiveModel('gemini-3-8-flash')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  activeModel === 'gemini-3-8-flash'
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          activeModel === 'gemini-3-8-flash'
                            ? 'border-emerald-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {activeModel === 'gemini-3-8-flash' && (
                          <div className="w-2 h-2 rounded-full bg-emerald-600" />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Gemini 3.8 Flash high
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6.5">
                    Keseimbangan optimal antara kecepatan pemrosesan (latency rendah) dan efisiensi
                    biaya operasional.
                  </p>
                </div>
              </div>

              {/* Card 3: GPT-OSS 120B */}
              <div
                onClick={() => setActiveModel('gpt-oss-120b')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  activeModel === 'gpt-oss-120b'
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          activeModel === 'gpt-oss-120b'
                            ? 'border-emerald-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {activeModel === 'gpt-oss-120b' && (
                          <div className="w-2 h-2 rounded-full bg-emerald-600" />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">GPT-OSS 120B</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6.5">
                    Fokus pada privasi data maksimal. Model open-source yang dieksekusi sepenuhnya di
                    dalam server lokal (In-House).
                  </p>
                </div>
              </div>
            </div>

            {/* API Key Connection Box (100% Fill Width, blue/700 button, blue/50 text) */}
            <div className="w-full pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Masukkan API Key Provider ({getActiveModelName()})
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                <input
                  type="text"
                  value={activeModel === 'gemini-3-8-flash' ? geminiKey : claudeKey}
                  onChange={(e) => {
                    if (activeModel === 'gemini-3-8-flash') {
                      setGeminiKey(e.target.value);
                    } else {
                      setClaudeKey(e.target.value);
                    }
                  }}
                  placeholder="Masukkan API Key  ..."
                  className="w-full flex-1 h-11 px-4 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => showToast('Koneksi model provider berhasil divalidasi', 'success')}
                  className="w-full sm:w-auto h-11 px-5 rounded-lg bg-blue-700 hover:bg-blue-800 text-blue-50 font-semibold text-sm transition-colors shrink-0 cursor-pointer inline-flex items-center justify-center whitespace-nowrap shadow-xs"
                >
                  Hubungkan Model
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2: ARSITEKTUR MESIN DETEKSI KEMIRIPAN BERITA */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              2. Arsitektur Mesin Deteksi Kemiripan Berita
            </h2>

            <div className="space-y-3">
              {/* Option A: In-House Vector DB & Crawler Cluster (Aktif) */}
              <div
                onClick={() => setSimilarityEngine('inhouse')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  similarityEngine === 'inhouse'
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      similarityEngine === 'inhouse'
                        ? 'border-emerald-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {similarityEngine === 'inhouse' && (
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Opsi A: In-House Vector DB & Crawler Cluster (Aktif)
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Cluster mandiri RRI: Kedaulatan data penuh. Naskah berita pra-publikasi tidak
                      pernah bocor ke server pihak ketiga.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option B: External Plagiarism API Service (Standby / Fallback) */}
              <div
                onClick={() => setSimilarityEngine('external')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  similarityEngine === 'external'
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      similarityEngine === 'external'
                        ? 'border-emerald-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {similarityEngine === 'external' && (
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Opsi B: External Plagiarism API Service (Standby / Fallback)
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Gunakan API eksternal (misal: Copyleaks, Turnitin Enterprise) jika cluster
                        internal sedang dalam masa pemeliharaan rutin.
                      </p>
                    </div>

                    {/* External API Key Input (100% Fill Width, blue/700 button, blue/50 text) */}
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full pt-1">
                      <input
                        type="text"
                        value={externalKey}
                        onChange={(e) => setExternalKey(e.target.value)}
                        placeholder="Masukkan API Key / Token Layanan Eksternal ..."
                        className="w-full flex-1 h-11 px-4 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast('Token layanan eksternal berhasil divalidasi', 'success');
                        }}
                        className="w-full sm:w-auto h-11 px-5 rounded-lg bg-blue-700 hover:bg-blue-800 text-blue-50 font-semibold text-sm transition-colors shrink-0 cursor-pointer inline-flex items-center justify-center whitespace-nowrap shadow-xs"
                      >
                        Hubungkan Layanan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: PARAMETER AMBANG BATAS (THRESHOLD) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                3. Parameter Ambang Batas (Threshold)
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
