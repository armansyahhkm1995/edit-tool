import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CheckHistoryItem, FindingCategory } from '../types';
import { mockCheckHistory } from '../data/mockData';
import {
  Search,
  Eye,
  ArrowLeft,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export const RiwayatPemeriksaanPage: React.FC = () => {
  const { activeDraft } = useApp();

  // Selected history item for detail split-view
  const [selectedHistory, setSelectedHistory] = useState<CheckHistoryItem | null>(null);
  const [activeVersion, setActiveVersion] = useState<'v2' | 'v1'>('v2');
  const [activeTab, setActiveTab] = useState<FindingCategory>('kemiripan');

  // Filters for main table
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRangeFilter, setTimeRangeFilter] = useState('');
  const [editorFilter, setEditorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter for findings inside detail view
  const [detailStatusFilter, setDetailStatusFilter] = useState('Semua');

  const filteredHistory = useMemo(() => {
    return mockCheckHistory.filter((item) => {
      const matchSearch =
        item.draftTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.draftArtCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchEditor = !editorFilter || item.triggerBy.toLowerCase().includes(editorFilter.toLowerCase());

      return matchSearch && matchEditor;
    });
  }, [searchTerm, editorFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setTimeRangeFilter('');
    setEditorFilter('');
    setStatusFilter('');
  };

  // If viewing detail of a historical report (Split View matching media_1794275981073_1412a752.png)
  if (selectedHistory) {
    const isV2 = activeVersion === 'v2';
    const currentScore = isV2 ? '18.4%' : '24.2%';
    const currentScoreLevel = isV2 ? 'Rendah' : 'Sedang';

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
        {/* Back navigation */}
        <div className="flex items-center">
          <button
            onClick={() => setSelectedHistory(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 px-1 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Riwayat Pemeriksaan</span>
          </button>
        </div>

        {/* Title & Metadata Header Card (Matching Figma - ONLY "Buka di CMS" button) */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-xl font-bold text-blue-700 leading-snug">
              {activeDraft.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Wartawan: <span className="font-semibold text-slate-700">{activeDraft.journalist}</span>{' '}
              · Waktu Ubah:{' '}
              <span className="font-semibold text-slate-700">{activeDraft.updatedAt} WIB</span> ·
              Status CMS:{' '}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                {activeDraft.cmsStatus}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://rri.co.id/cms"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka di CMS</span>
            </a>
          </div>
        </div>

        {/* AI Status Indicators Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-lg text-xs flex items-center justify-between">
            <span className="text-emerald-800 font-medium">Kemiripan:</span>
            <span className="font-bold text-emerald-700">Selesai ({isV2 ? '18.4%' : '24.2%'})</span>
          </div>

          <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-lg text-xs flex items-center justify-between">
            <span className="text-blue-800 font-medium">Deteksi AI:</span>
            <span className="font-bold text-blue-700">Memeriksa ...</span>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-lg text-xs flex items-center justify-between">
            <span className="text-amber-800 font-medium">Buku Gaya:</span>
            <span className="font-bold text-amber-700">Memeriksa ...</span>
          </div>

          <div className="bg-purple-50/80 border border-purple-200 p-3 rounded-lg text-xs flex items-center justify-between">
            <span className="text-purple-800 font-medium">SEO & AI-Search:</span>
            <span className="font-bold text-purple-700">Memeriksa ...</span>
          </div>
        </div>

        {/* Main Split-View Layout (Matching Detail Draf with Scrollable Container) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Naskah Berita Read-Only dari CMS (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4">
            {/* Header (Pinned) */}
            <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Naskah Berita (Read-Only dari CMS)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  428 Kata · 3 Paragraf · 06 Nov 2026, 14:45
                </p>
              </div>

              <a
                href="https://antaranews.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>Lihat Sumber</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-sm text-slate-800 leading-relaxed font-sans">
              <h3 className="text-lg font-semibold text-slate-950 leading-snug">
                Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit
              </h3>

              <p className="text-slate-800 text-justify">
                BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil
                mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa
                terpadu Biak Numfor, Papua.
              </p>

              {/* Highlight Box 1 (Fuchsia) */}
              <div>
                <div className="bg-[#F5D0FE] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#F5D0FE]">
                  <span className="text-xs font-bold text-[#A21CAF]">
                    Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                  </span>
                </div>
                <div className="bg-[#FDF4FF] border border-[#F5D0FE] p-3.5 rounded-b-lg">
                  <p className="text-sm text-[#A21CAF] leading-relaxed">
                    "Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus
                    guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner
                    khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut."
                  </p>
                </div>
              </div>

              {/* Highlight Box 2 (Teal) */}
              <div>
                <div className="bg-[#99F6E4] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#99F6E4]">
                  <span className="text-xs font-bold text-[#0F766E]">
                    Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                  </span>
                </div>
                <div className="bg-[#F0FDFA] border border-[#99F6E4] p-3.5 rounded-b-lg">
                  <p className="text-sm text-[#0F766E] leading-relaxed">
                    Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12
                    menit pasca lepas landas. Dalam keterangan pers tertulisnya,
                  </p>
                </div>
              </div>

              {/* Highlight Box 3 (Purple) */}
              <div>
                <div className="bg-[#E9D5FF] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#E9D5FF]">
                  <span className="text-xs font-bold text-[#7E22CE]">
                    Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                  </span>
                </div>
                <div className="bg-[#FAF5FF] border border-[#E9D5FF] p-3.5 rounded-b-lg">
                  <p className="text-sm text-[#7E22CE] leading-relaxed">
                    "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali
                    peluncuran satelit di pulau terluar tersebut."
                  </p>
                </div>
              </div>

              <p className="text-slate-800 text-justify">
                Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G
                untuk seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan,
                Terluar, Tertinggal) di wilayah Indonesia Timur.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: AI Findings Tabs, Version History Box & Read-Only Decision Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4 space-y-3.5">
            {/* Tab Navigation (Pinned at top) */}
            <div className="shrink-0 bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => setActiveTab('kemiripan')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'kemiripan'
                    ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Kemiripan</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                    activeTab === 'kemiripan'
                      ? 'bg-[#FFFBEB] text-[#B45309]'
                      : 'bg-[#F8FAFC] text-slate-700 border border-slate-200'
                  }`}
                >
                  10
                </span>
              </button>

              <button
                onClick={() => setActiveTab('buku_gaya')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'buku_gaya'
                    ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Buku Gaya</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                    activeTab === 'buku_gaya'
                      ? 'bg-[#FFFBEB] text-[#B45309]'
                      : 'bg-[#F8FAFC] text-slate-700 border border-slate-200'
                  }`}
                >
                  10
                </span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'seo'
                    ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>SEO & AI -Search</span>
              </button>
            </div>

            {/* Riwayat Versi Pemeriksaan Box - APPLIES TO ALL TABS */}
            <div className="shrink-0 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
              <p className="text-xs font-bold text-slate-900">Riwayat Versi Pemeriksaan</p>

              <div className="space-y-2">
                {/* Versi 2 (Saat Ini) */}
                <div
                  onClick={() => setActiveVersion('v2')}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    activeVersion === 'v2'
                      ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        activeVersion === 'v2'
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {activeVersion === 'v2' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Versi 2 (Saat Ini)</p>
                      <p className="text-[11px] text-slate-500">Hari ini, 14:15 WIB</p>
                    </div>
                  </div>

                  <span className="bg-[#D1FAE5] text-[#065F46] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    Aktif
                  </span>
                </div>

                {/* Versi 1 */}
                <div
                  onClick={() => setActiveVersion('v1')}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    activeVersion === 'v1'
                      ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        activeVersion === 'v1'
                          ? 'border-emerald-600 bg-emerald-600'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {activeVersion === 'v1' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-900">Versi 1</p>
                      <p className="text-[11px] text-slate-500">Hari ini, 14:10 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB CONTENT: KEMIRIPAN */}
            {activeTab === 'kemiripan' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
                {/* Score Overview Card (Pinned) */}
                <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Skor Kemiripan:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-slate-900 leading-none">
                      {currentScore}
                    </span>
                    <span className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium px-2.5 py-0.5 rounded-md">
                      {currentScoreLevel}
                    </span>
                  </div>
                </div>

                {/* Filter Row (Pinned) */}
                <div className="shrink-0 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    Daftar Temuan (1 Menunggu Tindakan)
                  </span>

                  <div className="relative">
                    <select
                      value={detailStatusFilter}
                      onChange={(e) => setDetailStatusFilter(e.target.value)}
                      aria-label="Filter Status Temuan"
                      className="appearance-none bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value="Semua">Status Temuan: Semua</option>
                      <option value="Telah Diperbaiki">Telah Diperbaiki</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Diabaikan">Diabaikan</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Scrollable Container with Read-Only Final Decision Cards */}
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                  {/* Card 1: Telah Diperbaiki */}
                  <div className="rounded-xl border border-slate-200 shadow-2xs">
                    <div className="bg-[#E2E8F0] px-4 py-2 rounded-t-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Tingkat: Tinggi
                        </span>
                        <span className="text-[11px] text-slate-500">Temuan #KMP-01</span>
                      </div>
                      <span className="bg-[#334155] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                        Telah Diperbaiki
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-b-xl space-y-3">
                      <div className="bg-white border border-slate-200 p-3 rounded-md flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Deteksi AI</span>
                        <span className="text-xs text-slate-700">Indikasi AI: 12% (Aman)</span>
                      </div>

                      <div className="bg-white border border-slate-200 p-3 rounded-md">
                        <p className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide">
                          KUTIPAN TEKS COCOK (42 KATA SAMA PERSIS):
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">
                          "...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan
                          muatan telekomunikasi pita lebar di orbit geostasioner..."
                        </p>
                      </div>

                      <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                        <p className="text-xs font-bold text-slate-900 mb-1">
                          Alasan & Rekomendasi AI:
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          Kutipan ini identik dengan siaran rilis Antara News. Jika ini kutipan resmi,
                          sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari
                          penalti SEO sindikasi berita.
                        </p>
                      </div>

                      {/* Final Editor Decision Banner (Blue) */}
                      <div className="bg-[#1866EF] text-white p-3 rounded-lg text-xs font-semibold leading-relaxed">
                        Keputusan Akhir Editor: Telah Diperbaiki oleh Agus Setiawan (Editor)
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Diterima */}
                  <div className="rounded-xl border border-slate-200 shadow-2xs">
                    <div className="bg-[#E2E8F0] px-4 py-2 rounded-t-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Tingkat: Tinggi
                        </span>
                        <span className="text-[11px] text-slate-500">Temuan #KMP-01</span>
                      </div>
                      <span className="bg-[#334155] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                        Diterima
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-b-xl space-y-3">
                      <div className="bg-white border border-slate-200 p-3 rounded-md flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Deteksi AI</span>
                        <span className="text-xs text-slate-700">Indikasi AI: 12% (Aman)</span>
                      </div>

                      <div className="bg-white border border-slate-200 p-3 rounded-md">
                        <p className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide">
                          KUTIPAN TEKS COCOK (42 KATA SAMA PERSIS):
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">
                          "...roket pendorong generasi terbaru yang dirancang khusus guna menempatkan
                          muatan telekomunikasi pita lebar di orbit geostasioner..."
                        </p>
                      </div>

                      <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                        <p className="text-xs font-bold text-slate-900 mb-1">
                          Alasan & Rekomendasi AI:
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          Kutipan ini identik dengan siaran rilis Antara News. Jika ini kutipan resmi,
                          sertakan atribusi narasumber atau parafrase kalimat agar terhindar dari
                          penalti SEO sindikasi berita.
                        </p>
                      </div>

                      {/* Final Editor Decision Banner (Green) */}
                      <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] p-3 rounded-lg text-xs font-semibold leading-relaxed">
                        Keputusan Akhir Editor: Diterima oleh Agus Setiawan (Editor)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BUKU GAYA */}
            {activeTab === 'buku_gaya' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
                <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Kepatuhan Buku Gaya:</span>
                  <span className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium px-2.5 py-0.5 rounded-md">
                    Sesuai Kaidah
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                  <div className="rounded-xl border border-slate-200 shadow-2xs">
                    <div className="bg-[#E2E8F0] px-4 py-2 rounded-t-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Tingkat: Sedang</span>
                        <span className="text-[11px] text-slate-500">Temuan #BGY-01</span>
                      </div>
                      <span className="bg-[#334155] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                        Telah Diperbaiki
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-b-xl space-y-3">
                      <div className="bg-white border border-slate-200 p-3 rounded-md">
                        <p className="text-xs font-bold text-slate-900 mb-1">KUTIPAN TEKS DRAF:</p>
                        <p className="text-xs text-slate-700">
                          "...menurut kepala badan riset saat meninjau langsung kesiapan..."
                        </p>
                      </div>

                      <div className="bg-white border border-slate-200 p-3 rounded-md">
                        <p className="text-xs font-bold text-slate-900 mb-1">
                          Alasan & Rekomendasi AI:
                        </p>
                        <p className="text-xs text-slate-700">
                          Ganti dengan nama resmi "Badan Riset dan Inovasi Nasional (BRIN)".
                        </p>
                      </div>

                      <div className="bg-[#1866EF] text-white p-3 rounded-lg text-xs font-semibold">
                        Keputusan Akhir Editor: Telah Diperbaiki oleh Agus Setiawan (Editor)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SEO & AI-SEARCH */}
            {activeTab === 'seo' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
                <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Optimasi AI-Search:</span>
                  <span className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium px-2.5 py-0.5 rounded-md">
                    Optimal
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-0">
                  <div className="rounded-xl border border-slate-200 shadow-2xs">
                    <div className="bg-[#E2E8F0] px-4 py-2 rounded-t-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Tingkat: Rendah</span>
                        <span className="text-[11px] text-slate-500">Temuan #SEO-01</span>
                      </div>
                      <span className="bg-[#334155] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                        Diterima
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-b-xl space-y-3">
                      <div className="bg-white border border-slate-200 p-3 rounded-md">
                        <p className="text-xs font-bold text-slate-900 mb-1">USULAN OPTIMASI:</p>
                        <p className="text-xs text-slate-700">
                          Satelit Nusantara 3 Sukses Meluncur dari Biak Papua
                        </p>
                      </div>

                      <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] p-3 rounded-lg text-xs font-semibold">
                        Keputusan Akhir Editor: Diterima oleh Agus Setiawan (Editor)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MAIN TABLE LIST VIEW (Matching media_1794275971445_926d4e7f.png)
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Heading */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          50 riwayat & Audit Pemeriksaan AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Catatan permanen dari semua aktivitas pemeriksaan AI dan keputusan tindak lanjut editor.
          Laporan lama tetap tersimpan sebagai arsip.
        </p>
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
              placeholder="Cari judul draft ..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Row 2: Filters and Bersihkan Filter button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter 1: Rentang Waktu */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={timeRangeFilter}
                onChange={(e) => setTimeRangeFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Rentang: 30 Hari Terakhir</option>
                <option value="7">Rentang: 7 Hari Terakhir</option>
                <option value="24">Rentang: 24 Jam Terakhir</option>
                <option value="all">Rentang: Semua Waktu</option>
              </select>
            </div>

            {/* Filter 2: Pemeriksa */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={editorFilter}
                onChange={(e) => setEditorFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Pemeriksa: Semua Editor</option>
                <option value="Ridwan">Ridwan</option>
                <option value="Cameron">Cameron Newton</option>
                <option value="Siti">Siti Rahmawati</option>
              </select>
            </div>

            {/* Filter 3: Status Temuan */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Status Temuan: Semua</option>
                <option value="Telah diperbaiki">Telah diperbaiki</option>
                <option value="Diterima">Diterima</option>
                <option value="Diabaikan">Diabaikan</option>
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
                <th className="py-3 px-4 sm:px-6 font-semibold">Waktu Pemeriksaan</th>
                <th className="py-3 px-4 font-semibold">Pemeriksaan Draft</th>
                <th className="py-3 px-4 font-semibold">Kemiripan</th>
                <th className="py-3 px-4 font-semibold">Jumlah Temuan</th>
                <th className="py-3 px-4 font-semibold">Status Temuan</th>
                <th className="py-3 px-4 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedHistory(item)}
                >
                  {/* Waktu Pemeriksaan */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <p className="font-semibold text-slate-900 text-xs">{item.time}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.triggerBy}</p>
                  </td>

                  {/* Pemeriksaan Draft */}
                  <td className="py-4 px-4 max-w-xs">
                    <p className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors text-sm">
                      {item.draftTitle}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                      {item.version}
                    </p>
                  </td>

                  {/* Kemiripan Pill Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        item.similarityLevel === 'Rendah'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : item.similarityLevel === 'Sedang'
                          ? 'bg-amber-50 text-amber-600 border border-amber-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {item.similarityScore}
                    </span>
                  </td>

                  {/* Jumlah Temuan */}
                  <td className="py-4 px-4 whitespace-nowrap text-xs font-normal text-slate-700">
                    {item.findingsCount} temuan
                  </td>

                  {/* Status Temuan: 3 stacked pills matching Figma */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                        {item.fixedCount} Telah diperbaiki
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                        {item.acceptedCount} Diterima
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-600 border border-red-200">
                        {item.ignoredCount} Diabaikan
                      </span>
                    </div>
                  </td>

                  {/* Aksi: Square rounded icon button with eye */}
                  <td
                    className="py-4 px-4 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedHistory(item)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center cursor-pointer"
                      title="Lihat Detail Laporan"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Daftar Draf */}
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
  );
};
