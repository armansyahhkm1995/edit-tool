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
  ChevronUp,
  History,
  Copy,
  Check,
  Bot,
  GitCompare,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface DraftVersionData {
  id: string;
  version: string;
  createdAt: string;
  createdBy: string;
  isAI: boolean;
  wordCount: number;
  paragraphCount: number;
  // Penilaian 4 Pilar
  aiDetection: string;
  similarityScore: string;
  styleGuideScore: string;
  seoAiScore: string;
  changeSummary: string;
  title: string;
  lead: string;
  sections: Array<{
    heading?: string;
    content: string;
    findingNote?: {
      type: 'kemiripan' | 'buku_gaya' | 'seo';
      title: string;
      description: string;
      status: string;
    };
  }>;
}

const DRAFT_VERSIONS_DATA: DraftVersionData[] = [
  {
    id: 'v2-0',
    version: 'Versi 2.0',
    createdAt: '06 Nov 2026, 14:45 WIB',
    createdBy: 'Cameron Newton (Editor)',
    isAI: false,
    wordCount: 428,
    paragraphCount: 3,
    aiDetection: '12% (Aman)',
    similarityScore: '18.4% (Rendah)',
    styleGuideScore: 'Sesuai Kaidah',
    seoAiScore: 'Optimal (9 Usulan)',
    changeSummary:
      'Parafrase kutipan sindikasi antaranews.com, koreksi nama lembaga BRIN sesuai Buku Gaya Bab 4, dan penyusunan heading H2.',
    title: 'Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit',
    lead: 'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua.',
    sections: [
      {
        heading: 'Spesifikasi Roket dan Orbit Geostasioner',
        content:
          'Peluncuran memanfaatkan kendaraan roket pendorong generasi modern yang dirancang secara mandiri guna menempatkan muatan komunikasi berkecepatan tinggi di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer.',
        findingNote: {
          type: 'kemiripan',
          title: 'Parafrase Selesai Dilakukan',
          description:
            'Teks kutipan telah diubah struktur kalimatnya sehingga skor kemiripan turun dari 32.8% menjadi 18.4%.',
          status: 'Telah Diperbaiki',
        },
      },
      {
        heading: 'Pemeriksaan Telemetri dan Pernyataan Resmi BRIN',
        content:
          'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak 12 menit setelah lepas landas. Dalam taklimat resminya, Kepala Badan Riset dan Inovasi Nasional (BRIN) menegaskan kesiapan infrastruktur stasiun bumi pulau terluar.',
        findingNote: {
          type: 'buku_gaya',
          title: 'Koreksi Nomenklatur Lembaga BRIN',
          description:
            'Frasa "kepala badan riset" telah dibakukan menjadi "Kepala Badan Riset dan Inovasi Nasional (BRIN)" sesuai Buku Gaya Pasal 4.',
          status: 'Telah Diperbaiki',
        },
      },
      {
        heading: 'Pemerataan Internet 5G di Wilayah 3T',
        content:
          'Keberhasilan misi ini diproyeksikan memperluas konektivitas digital pita lebar 5G bagi fasilitas kesehatan puskesmas, pos perbatasan, dan ribuan institusi pendidikan di kawasan Terdepan, Terluar, dan Tertinggal (3T) Indonesia Timur.',
        findingNote: {
          type: 'seo',
          title: 'Struktur Heading & Entitas AI-Search',
          description:
            'Sub-heading H2 telah ditambahkan dan entitas 3T diuraikan dengan format ramah kutipan AI Search Overviews.',
          status: 'Telah Diperbaiki',
        },
      },
    ],
  },
  {
    id: 'v1-1',
    version: 'Versi 1.1',
    createdAt: '06 Nov 2026, 11:20 WIB',
    createdBy: 'Cameron Newton (Editor)',
    isAI: false,
    wordCount: 418,
    paragraphCount: 3,
    aiDetection: '22% (Aman)',
    similarityScore: '24.2% (Sedang)',
    styleGuideScore: '1 Catatan Minor',
    seoAiScore: 'Perlu Sub-heading',
    changeSummary:
      'Perbaikan ejaan pembuka dan penambahan keterangan lokasi pusat peluncuran Biak Numfor.',
    title: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    lead: 'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil meluncur dengan sukses pada Kamis dini hari dari pangkalan antariksa Biak.',
    sections: [
      {
        content:
          'Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.',
        findingNote: {
          type: 'kemiripan',
          title: 'Kemiripan 78% (antaranews.com)',
          description:
            '42 kata sama persis dengan siaran rilis Antara News tanpa parafrase atau atribusi.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas. Dalam keterangan tertulis, menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali...',
        findingNote: {
          type: 'buku_gaya',
          title: 'Pelanggaran Nomenklatur Lembaga',
          description:
            'Penyebutan "kepala badan riset" tidak memenuhi Buku Gaya Pasal 4 tentang Nomenklatur Lembaga Resmi.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T di wilayah Indonesia Timur.',
        findingNote: {
          type: 'seo',
          title: 'Kurang Sub-Heading Terstruktur',
          description:
            'Naskah belum memiliki H2/H3 dan penjelasan detail mengenai target bulan operasional.',
          status: 'Sudah Ditandai',
        },
      },
    ],
  },
  {
    id: 'v1-0',
    version: 'Versi 1.0 (AI Original)',
    createdAt: '06 Nov 2026, 09:15 WIB',
    createdBy: 'AI Assistant (Sinkronisasi CMS)',
    isAI: true,
    wordCount: 410,
    paragraphCount: 3,
    aiDetection: '48% (Tinggi)',
    similarityScore: '32.8% (Tinggi)',
    styleGuideScore: '3 Pelanggaran Format',
    seoAiScore: 'Minim Konteks AI-Search',
    changeSummary:
      'Naskah draf awal hasil sinkronisasi otomatis CMS RRI sebelum dilakukan uji kemiripan dan penyuntingan editor.',
    title: 'Peluncuran Satelit Nusantara Tiga Sukses Meluncur dari Stasiun Antariksa Biak',
    lead: 'BIAK — Satelit Nusantara Tiga sukses meluncur Kamis dini hari dari kompleks peluncuran antariksa Biak Numfor.',
    sections: [
      {
        content:
          'Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.',
        findingNote: {
          type: 'kemiripan',
          title: 'Kemiripan Tinggi dengan Kantor Berita Antara',
          description:
            'Kutipan mentah dari rilis resmi Antara News tersalin tanpa kutipan langsung atau tanda petik.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit.',
        findingNote: {
          type: 'buku_gaya',
          title: 'Nomenklatur Lembaga Informal',
          description: 'Belum menyebut kepanjangan BRIN pada kemunculan pertama naskah.',
          status: 'Sudah Ditandai',
        },
      },
      {
        content:
          'Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik kawasan 3T.',
        findingNote: {
          type: 'seo',
          title: 'Minim Konteks AI-Search',
          description:
            'Tidak terdapat konteks perbandingan satelit terdahulu atau estimasi waktu operasional komersial.',
          status: 'Sudah Ditandai',
        },
      },
    ],
  },
];

export const RiwayatPemeriksaanPage: React.FC = () => {
  const { activeDraft } = useApp();
  const { showToast } = useToast();

  // Selected history item for detail view
  const [selectedHistory, setSelectedHistory] = useState<CheckHistoryItem | null>(null);

  // Detail view mode: 'split' | 'versions' | 'compare'
  const [detailViewMode, setDetailViewMode] = useState<'split' | 'versions' | 'compare'>('split');
  const [activeVersionId, setActiveVersionId] = useState<string>('v2-0');
  const [selectedCompareVersion, setSelectedCompareVersion] = useState<DraftVersionData>(
    DRAFT_VERSIONS_DATA[2] // default to v1.0
  );

  const handleToggleVersion = (versionId: string) => {
    if (activeVersionId === versionId) {
      showToast('Harus ada minimal 1 versi naskah yang aktif atau pilih versi yang lain', 'error', 'Riwayat Versi');
      return;
    }
    setActiveVersionId(versionId);
    const targetVer = DRAFT_VERSIONS_DATA.find((v) => v.id === versionId);
    showToast(`${targetVer?.version || 'Versi naskah'} berhasil diaktifkan sebagai versi naskah utama`, 'success', 'Riwayat Versi');
  };

  const [activeTab, setActiveTab] = useState<FindingCategory>('kemiripan');
  const [seoSubFilter, setSeoSubFilter] = useState<'Semua' | 'SEO' | 'AI-Search'>('Semua');

  // Accordion state: Set of finding IDs that are expanded (default EMPTY = ALL CLOSED)
  const [expandedFindingIds, setExpandedFindingIds] = useState<Set<string>>(new Set());

  const toggleAccordion = (id: string) => {
    setExpandedFindingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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
        item.draftArtCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.editor || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchEditor = !editorFilter || item.triggerBy.toLowerCase().includes(editorFilter.toLowerCase());
      const matchStatus = !statusFilter || item.articleStatus === statusFilter;

      return matchSearch && matchEditor && matchStatus;
    });
  }, [searchTerm, editorFilter, statusFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setTimeRangeFilter('');
    setEditorFilter('');
    setStatusFilter('');
  };

  // =========================================================================
  // DETAIL VIEW OF A HISTORICAL REPORT
  // =========================================================================
  if (selectedHistory) {
    // 1. DETAIL VIEW MODE: VERSIONS TABLE
    if (detailViewMode === 'versions') {
      return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
          {/* Back Link & Header */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setDetailViewMode('split')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors py-1 px-1 rounded-md hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Detail Riwayat Pemeriksaan</span>
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">
                {selectedHistory.draftTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
                <strong className="text-slate-800 font-semibold">
                  Sudut Pandang Jurnalistik (Angle):
                </strong>{' '}
                Peluncuran wahana komunikasi antariksa nasional Satelit Nusantara Tiga dari kompleks Biak Numfor Papua untuk pemerataan konektivitas internet pita lebar 5G bagi fasilitas publik di kawasan 3T Indonesia Timur.
              </p>
            </div>
          </div>

          {/* Versions Table Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  Daftar Riwayat Versi Pemeriksaan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bandingkan versi naskah terdahulu dengan versi terkini secara berdampingan.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1866EF]">
                {DRAFT_VERSIONS_DATA.length} Versi Tersimpan
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[960px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600 bg-slate-50/80">
                      <th className="py-3 px-4 font-semibold">Versi Naskah Berita</th>
                      <th className="py-3 px-4 font-semibold">Dibuat Oleh</th>
                      <th className="py-3 px-4 font-semibold">Deteksi AI</th>
                      <th className="py-3 px-4 font-semibold">Kemiripan</th>
                      <th className="py-3 px-4 font-semibold">Buku Gaya</th>
                      <th className="py-3 px-4 font-semibold">SEO & AI-Search</th>
                      <th className="py-3 px-4 font-semibold">Ringkasan Perubahan</th>
                      <th className="py-3 px-4 font-semibold text-center w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {DRAFT_VERSIONS_DATA.map((v) => {
                      const isActive = v.id === activeVersionId;
                      return (
                        <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {/* Status Toggle Switch: Aktifkan Versi Ini */}
                              <button
                                type="button"
                                onClick={() => handleToggleVersion(v.id)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-hidden cursor-pointer shrink-0 ${
                                  isActive ? 'bg-[#1866EF]' : 'bg-slate-300'
                                }`}
                                title={isActive ? 'Versi ini sedang aktif' : 'Klik untuk aktifkan versi ini'}
                              >
                                <span
                                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                    isActive ? 'translate-x-4.5' : 'translate-x-1'
                                  }`}
                                />
                              </button>

                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900 text-sm">{v.version}</span>
                                {isActive && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                                    Aktif
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span
                                className={`font-semibold ${
                                  v.isAI ? 'text-[#1866EF]' : 'text-slate-900'
                                }`}
                              >
                                {v.createdBy}
                              </span>
                              <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                                {v.createdAt}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold inline-block">
                              {v.aiDetection}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold inline-block">
                              {v.similarityScore}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold inline-block">
                              {v.styleGuideScore}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold inline-block">
                              {v.seoAiScore}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-600 max-w-sm leading-relaxed">
                            {v.changeSummary}
                          </td>
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCompareVersion(v);
                                setDetailViewMode('compare');
                              }}
                              className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-blue-100 border border-[#BFDBFE] text-[#1866EF] font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                              title="Bandingkan dengan Versi Utama"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Bandingkan</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. DETAIL VIEW MODE: COMPARE VIEW (SIDE-BY-SIDE: SIMULASI REKOMENDASI AI VS PORTAL NEWS RRI)
    if (detailViewMode === 'compare') {
      const liveArticleDate = selectedHistory.time || '06 Nov 2026, 14:45';
      const aiSimulatedDate = selectedHistory.time || '06 Nov 2026, 14:15';

      return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
          {/* Back Link & Header */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setSelectedHistory(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer transition-colors py-1 px-1 rounded-md hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Riwayat Pemeriksaan</span>
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">
                Komparasi Naskah: Simulasi Rekomendasi AI vs Artikel Portal News RRI
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
                Membandingkan draf artikel yang disimulasikan telah diperbaiki otomatis oleh AI berdasarkan seluruh temuan matriks (sebelah kiri) dengan artikel yang telah dipublikasikan di Portal News RRI (sebelah kanan).
              </p>
            </div>
          </div>

          {/* Side-by-Side 2 Column Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* COLUMN 1: DRAFT ARTIKEL SIMULASI REKOMENDASI AI (LEFT) */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1866EF] text-xs font-bold w-fit inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulasi Rekomendasi AI</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const fullAiText =
                      'Satelit Nusantara Tiga Resmi Mengorbit di Biak, Siap Akselerasi Internet 5G Wilayah 3T\n\n' +
                      'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua. Misi strategis nasional ini menandai tonggak akselerasi konektivitas digital pita lebar secara merata di Indonesia Timur.\n\n' +
                      'Peluncuran memanfaatkan kendaraan roket pendorong generasi modern yang dirancang secara mandiri guna menempatkan muatan komunikasi berkecepatan tinggi di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.\n\n' +
                      'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak 12 menit pasca lepas landas. Dalam taklimat resminya, Kepala Badan Riset dan Inovasi Nasional (BRIN) mengonfirmasi seluruh subsistem satelit berfungsi prima dalam lintasan orbit nominal.\n\n' +
                      'Keberhasilan misi ini ditargetkan memperluas konektivitas internet 5G untuk ribuan fasilitas publik, puskesmas terluar, pos perbatasan negara, dan sekolah di kawasan Terdepan, Terluar, dan Tertinggal (3T) di penjuru Indonesia Timur.';
                    navigator.clipboard.writeText(fullAiText);
                    showToast('Naskah rekomendasi AI berhasil disalin ke clipboard', 'success');
                  }}
                  className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 self-start"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Naskah</span>
                </button>
              </div>

              {/* Meta: Dibuat pada tanggal */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>
                  Pembuat: <strong className="text-slate-800">AI Editorial Engine (RRI Assistant)</strong>
                </span>
                <span>
                  Dibuat pada tanggal: <strong className="text-slate-800">{aiSimulatedDate} WIB</strong>
                </span>
              </div>

              {/* Judul Naskah AI */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Judul Naskah (Optimasi AI)
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  Satelit Nusantara Tiga Resmi Mengorbit di Biak, Siap Akselerasi Internet 5G Wilayah 3T
                </h2>
                {/* Note Rekomendasi Judul */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-purple-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
                    Catatan Rekomendasi SEO Title Tag:
                  </span>
                  <p className="text-purple-800 text-[11px] leading-relaxed">
                    Judul dipadatkan menjadi 72 karakter dengan menempatkan kata kunci utama "Satelit Nusantara Tiga" dan entitas "Biak", terbukti meningkatkan CTR serta peluang muncul pada cuplikan Google SERP.
                  </p>
                </div>
              </div>

              {/* Lead Paragraf AI */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Lead Paragraf (5W + 1H & AI-Search)
                </div>
                <p className="p-3.5 bg-blue-50/40 border border-blue-100 rounded-lg text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
                  <strong className="text-slate-900 font-semibold">BIAK, PAPUA</strong> — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua. Misi strategis nasional ini menandai tonggak akselerasi konektivitas digital pita lebar secara merata di Indonesia Timur.
                </p>
                {/* Note Rekomendasi Lead */}
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                    Catatan Rekomendasi AI-Search & Answer Engine:
                  </span>
                  <p className="text-indigo-800 text-[11px] leading-relaxed">
                    Struktur kalimat pembuka disempurnakan dengan formula 5W+1H lugas dan penambahan konteks dampak misi pada 50 kata pertama agar mudah diekstraksi mesin pencari berbasis AI (Perplexity, SearchGPT).
                  </p>
                </div>
              </div>

              {/* Batang Tubuh Naskah AI dengan Note Rekomendasi di Bawah Tiap Text */}
              <div className="space-y-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Batang Tubuh Naskah & Catatan Rekomendasi AI
                </div>

                {/* Paragraf 1 Batang Tubuh */}
                <div className="p-4 bg-white border border-blue-100 rounded-xl space-y-3 shadow-2xs">
                  <h3 className="text-xs sm:text-sm font-bold text-[#1866EF]">
                    Spesifikasi Roket Pendorong & Ketinggian Orbit Geostasioner
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
                    Peluncuran memanfaatkan kendaraan roket pendorong generasi modern yang dirancang secara mandiri guna menempatkan muatan komunikasi berkecepatan tinggi di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.
                  </p>
                  {/* Note Kemiripan */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Catatan Rekomendasi Kemiripan (Plagiarisme)
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                          Telah Disimulasikan
                        </span>
                      </div>
                      <p className="text-emerald-800 text-[11px] leading-relaxed">
                        Teks kutipan telah diparafrase dari siaran rilis kompas.com/antaranews.com untuk mencegah duplikasi konten dan menaikkan skor orisinalitas naskah.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paragraf 2 Batang Tubuh */}
                <div className="p-4 bg-white border border-blue-100 rounded-xl space-y-3 shadow-2xs">
                  <h3 className="text-xs sm:text-sm font-bold text-[#1866EF]">
                    Taklimat Resmi Kepala BRIN & Kesiapan Telemetri
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
                    Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak 12 menit pasca lepas landas. Dalam taklimat resminya, Kepala Badan Riset dan Inovasi Nasional (BRIN) mengonfirmasi seluruh subsistem satelit berfungsi prima dalam lintasan orbit nominal.
                  </p>
                  {/* Note Buku Gaya */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                          Catatan Rekomendasi Buku Gaya Redaksional RRI
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-white">
                          Telah Disimulasikan
                        </span>
                      </div>
                      <p className="text-amber-800 text-[11px] leading-relaxed">
                        Frasa 'kepala badan riset' disesuaikan menjadi 'Kepala Badan Riset dan Inovasi Nasional (BRIN)' sesuai kaidah Buku Gaya Redaksi RRI Bab IV Pasal 4 mengenai singkatan resmi lembaga negara.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paragraf 3 Batang Tubuh */}
                <div className="p-4 bg-white border border-blue-100 rounded-xl space-y-3 shadow-2xs">
                  <h3 className="text-xs sm:text-sm font-bold text-[#1866EF]">
                    Pemerataan Internet 5G untuk Fasilitas Publik Kawasan 3T
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed text-justify">
                    Keberhasilan misi ini ditargetkan memperluas konektivitas internet 5G untuk ribuan fasilitas publik, puskesmas terluar, pos perbatasan negara, dan sekolah di kawasan Terdepan, Terluar, dan Tertinggal (3T) di penjuru Indonesia Timur.
                  </p>
                  {/* Note Deteksi AI */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-900 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          Catatan Rekomendasi Deteksi AI & Struktur Jurnalistik
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                          Telah Disimulasikan
                        </span>
                      </div>
                      <p className="text-blue-800 text-[11px] leading-relaxed">
                        Penataan susunan kalimat aktif dengan gaya bahasa jurnalistik mengalir dan penguraian akronim 3T secara terstruktur untuk menekan indikasi deteksi AI di bawah 15%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: ARTIKEL YANG SUDAH DIPUBLISH DI PORTAL NEWS RRI (RIGHT) */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold w-fit inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Portal News RRI (Live)</span>
                </span>

                <a
                  href="https://rri.co.id/teknologi"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 self-start"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Buka di Portal RRI</span>
                </a>
              </div>

              {/* Meta: Diterbitkan */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>
                  Kanal: <strong className="text-slate-800">Portal Berita RRI Digital (Live CMS)</strong>
                </span>
                <span>
                  Diterbitkan: <strong className="text-slate-800">{liveArticleDate} WIB</strong>
                </span>
              </div>

              {/* Judul Naskah Live */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Judul Naskah Terbit
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedHistory.draftTitle || 'Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit'}
                </h2>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  Judul orisinil naskah saat ini yang ditayangkan pada halaman publik portal berita RRI.
                </div>
              </div>

              {/* Lead Paragraf Live */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Lead Paragraf
                </div>
                <p className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                  <strong className="text-slate-900 font-semibold">BIAK, PAPUA</strong> — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua.
                </p>
              </div>

              {/* Batang Tubuh Paragraf Live */}
              <div className="space-y-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Batang Tubuh Naskah Terbit di Portal
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                    Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                    Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas. Dalam keterangan pers tertulisnya, "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit di pulau terluar tersebut."
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                    Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan, Terluar, Tertinggal) di wilayah Indonesia Timur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. DETAIL VIEW MODE: DEFAULT SPLIT VIEW
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
        {/* Back navigation */}
        <div className="flex items-center">
          <button
            onClick={() => setSelectedHistory(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1 px-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Riwayat Pemeriksaan</span>
          </button>
        </div>

        {/* Title & Metadata Header Card (With Tertiary Versioning Button on Left of Buka di CMS) */}
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

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Versioning tertiary button on the left of Buka di CMS */}
            {(() => {
              const currentActiveVer =
                DRAFT_VERSIONS_DATA.find((v) => v.id === activeVersionId) || DRAFT_VERSIONS_DATA[0];
              return (
                <button
                  type="button"
                  onClick={() => setDetailViewMode('versions')}
                  className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex flex-col items-start justify-center text-left shrink-0"
                  title="Lihat Riwayat Versi Pemeriksaan"
                >
                  <div className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#1866EF]" />
                    <span className="text-xs font-bold text-slate-900">{currentActiveVer.version}</span>
                    <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">
                      Aktif
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal leading-tight">
                    {currentActiveVer.isAI
                      ? 'Dibuat oleh AI Assistant'
                      : `Disunting oleh ${currentActiveVer.createdBy.split(' (')[0]} (${currentActiveVer.createdAt.split(' WIB')[0]})`}
                  </span>
                </button>
              );
            })()}

            <a
              href="https://rri.co.id/cms"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs h-10"
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
            <span className="font-bold text-emerald-700">Selesai (18.4%)</span>
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

        {/* Main Split-View Layout */}
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
                mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu
                Biak Numfor, Papua.
              </p>

              {/* Highlight Box 1 (Fuchsia / Kemiripan 78%) */}
              <div
                onClick={() => {
                  setActiveTab('kemiripan');
                  if (!expandedFindingIds.has('f-kmp-1')) {
                    toggleAccordion('f-kmp-1');
                  }
                }}
                className="cursor-pointer group transition-transform active:scale-[0.99]"
              >
                <div className="bg-[#F5D0FE] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#F5D0FE]">
                  <span className="text-xs font-bold text-[#A21CAF]">
                    Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                  </span>
                </div>
                <div className="bg-[#FDF4FF] border border-[#F5D0FE] p-3.5 rounded-b-lg">
                  <p className="text-sm text-[#A21CAF] leading-relaxed">
                    "Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna
                    menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada
                    ketinggian 35.786 kilometer di atas permukaan laut."
                  </p>
                </div>
              </div>

              {/* Highlight Box 2 (Teal / Kemiripan 78%) */}
              <div
                onClick={() => {
                  setActiveTab('kemiripan');
                  if (!expandedFindingIds.has('f-kmp-2')) {
                    toggleAccordion('f-kmp-2');
                  }
                }}
                className="cursor-pointer group transition-transform active:scale-[0.99]"
              >
                <div className="bg-[#99F6E4] px-3.5 py-1.5 rounded-t-lg border-t border-x border-[#99F6E4]">
                  <span className="text-xs font-bold text-[#0F766E]">
                    Sorotan Kemiripan 78% (Cocok dengan antaranews.com)
                  </span>
                </div>
                <div className="bg-[#F0FDFA] border border-[#99F6E4] p-3.5 rounded-b-lg">
                  <p className="text-sm text-[#0F766E] leading-relaxed">
                    Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit
                    pasca lepas landas. Dalam keterangan pers tertulisnya,
                  </p>
                </div>
              </div>

              {/* Highlight Box 3 (Purple / Kemiripan 78%) */}
              <div
                onClick={() => {
                  setActiveTab('kemiripan');
                  if (!expandedFindingIds.has('f-kmp-3')) {
                    toggleAccordion('f-kmp-3');
                  }
                }}
                className="cursor-pointer group transition-transform active:scale-[0.99]"
              >
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
                Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk
                seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan, Terluar,
                Tertinggal) di wilayah Indonesia Timur.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: AI Findings Tabs & Accordion Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col lg:h-[calc(100vh-210px)] lg:max-h-[calc(100vh-210px)] lg:min-h-[560px] lg:sticky lg:top-4 space-y-3.5">
            {/* Tab Navigation */}
            <div className="shrink-0 bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => setActiveTab('kemiripan')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                  {activeDraft.findings.filter((f) => f.category === 'kemiripan').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('buku_gaya')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                  {activeDraft.findings.filter((f) => f.category === 'buku_gaya').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'seo'
                    ? 'bg-[#1866EF] text-[#F8FAFC] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>SEO & AI-Search</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                    activeTab === 'seo'
                      ? 'bg-[#FFFBEB] text-[#B45309]'
                      : 'bg-[#F8FAFC] text-slate-700 border border-slate-200'
                  }`}
                >
                  {activeDraft.findings.filter((f) => f.category === 'seo').length}
                </span>
              </button>
            </div>

            {/* TAB CONTENT: KEMIRIPAN */}
            {activeTab === 'kemiripan' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
                {/* Score Overview Card (Pinned) */}
                <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Skor Kemiripan:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-slate-900 leading-none">
                      18.4%
                    </span>
                    <span className="bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-medium px-2.5 py-0.5 rounded-md">
                      Rendah
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

                {/* Scrollable Container with Accordion Finding Cards */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                  {activeDraft.findings
                    .filter((f) => f.category === 'kemiripan')
                    .map((finding) => {
                      const isExpanded = expandedFindingIds.has(finding.id);
                      return (
                        <div
                          key={finding.id}
                          className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                        >
                          {/* Accordion Header (Default Collapsed) */}
                          <div
                            onClick={() => toggleAccordion(finding.id)}
                            className="bg-slate-100/80 px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-slate-200/70 border-b border-slate-200"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="p-0.5 rounded text-slate-700">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-slate-800" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-800" />
                                )}
                              </span>
                              <span className="text-xs font-bold text-slate-900">
                                Tingkat: {finding.severity}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                                  finding.status === 'Telah Diperbaiki' || finding.status === 'Diterima'
                                    ? 'bg-[#334155] text-white'
                                    : 'bg-white border border-slate-300 text-slate-700'
                                }`}
                              >
                                {finding.status === 'Belum Ditandai' ? 'Sudah Ditandai' : finding.status}
                              </span>

                              <a
                                href="https://antaranews.com"
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors shrink-0"
                                title="Lihat Sumber"
                              >
                                <span>Lihat Sumber</span>
                                <ExternalLink className="w-3 h-3 text-slate-500" />
                              </a>
                            </div>
                          </div>

                          {/* Accordion Body */}
                          {isExpanded && (
                            <div className="bg-slate-50 p-4 space-y-3 animate-fade-in border-t border-slate-200">
                              <div className="bg-white border border-slate-200 p-3 rounded-md flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">Deteksi AI</span>
                                <span className="text-xs text-slate-700">
                                  {finding.aiIndication || 'Indikasi AI: 12% (Aman)'}
                                </span>
                              </div>

                              <div className="bg-white border border-slate-200 p-3 rounded-md">
                                <p className="text-xs font-bold text-slate-900 mb-1 uppercase tracking-wide">
                                  KUTIPAN TEKS COCOK:
                                </p>
                                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                                  "{finding.matchedSnippet}"
                                </p>
                              </div>

                              <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                                <p className="text-xs font-bold text-slate-900 mb-1">
                                  Alasan & Rekomendasi AI:
                                </p>
                                <p className="text-xs text-slate-700 leading-relaxed">
                                  {finding.recommendation}
                                </p>
                              </div>

                              <div className="bg-[#1866EF] text-white p-3 rounded-lg text-xs font-semibold leading-relaxed">
                                Keputusan Akhir Editor: {finding.status} oleh Agus Setiawan (Editor)
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: BUKU GAYA */}
            {activeTab === 'buku_gaya' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                  {activeDraft.findings
                    .filter((f) => f.category === 'buku_gaya')
                    .map((finding) => {
                      const isExpanded = expandedFindingIds.has(finding.id);
                      return (
                        <div
                          key={finding.id}
                          className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                        >
                          {/* Accordion Header */}
                          <div
                            onClick={() => toggleAccordion(finding.id)}
                            className="bg-amber-50/80 px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-amber-100/70 border-b border-amber-200/60"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="p-0.5 rounded text-slate-700">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-amber-900" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-amber-900" />
                                )}
                              </span>
                              <span className="text-xs font-bold text-amber-950">
                                Tingkat: {finding.severity}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-amber-200 text-amber-800">
                                {finding.status === 'Belum Ditandai' ? 'Sudah Ditandai' : finding.status}
                              </span>

                              <a
                                href="https://rri.co.id/bukugaya"
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors shrink-0"
                                title="Lihat Sumber"
                              >
                                <span>Lihat Sumber</span>
                                <ExternalLink className="w-3 h-3 text-slate-500" />
                              </a>
                            </div>
                          </div>

                          {/* Accordion Body */}
                          {isExpanded && (
                            <div className="bg-slate-50 p-4 space-y-3 animate-fade-in border-t border-slate-200">
                              <div className="bg-white border border-slate-200 p-3 rounded-md">
                                <p className="text-xs font-bold text-slate-900 mb-1">KUTIPAN TEKS DRAF:</p>
                                <p className="text-xs text-slate-700">
                                  "{finding.matchedSnippet}"
                                </p>
                              </div>

                              <div className="bg-white border border-slate-200 p-3 rounded-md">
                                <p className="text-xs font-bold text-slate-900 mb-1">
                                  Aturan Buku Gaya:
                                </p>
                                <p className="text-xs font-semibold text-red-600">
                                  {finding.ruleViolated}
                                </p>
                              </div>

                              <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                                <p className="text-xs font-bold text-slate-900 mb-1">
                                  Alasan & Rekomendasi AI:
                                </p>
                                <p className="text-xs text-slate-700 leading-relaxed">
                                  {finding.recommendation}
                                </p>
                              </div>

                              <div className="bg-[#1866EF] text-white p-3 rounded-lg text-xs font-semibold">
                                Keputusan Akhir Editor: Telah Diperbaiki oleh Agus Setiawan (Editor)
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SEO & AI-SEARCH */}
            {activeTab === 'seo' && (
              <div className="flex-1 flex flex-col min-h-0 space-y-3.5 animate-fade-in">
                {/* Sub-filter pills for SEO vs AI-Search */}
                <div className="shrink-0 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSeoSubFilter('Semua')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        seoSubFilter === 'Semua'
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Semua ({activeDraft.findings.filter((f) => f.category === 'seo').length})
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeoSubFilter('SEO')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        seoSubFilter === 'SEO'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Search className="w-3 h-3" />
                      <span>SEO ({activeDraft.findings.filter((f) => f.category === 'seo' && f.code.startsWith('Temuan #SEO')).length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeoSubFilter('AI-Search')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                        seoSubFilter === 'AI-Search'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Bot className="w-3 h-3" />
                      <span>AI-Search ({activeDraft.findings.filter((f) => f.category === 'seo' && f.code.startsWith('Temuan #AIS')).length})</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                    {
                      activeDraft.findings.filter((f) => {
                        if (f.category !== 'seo') return false;
                        if (seoSubFilter === 'SEO') return f.code.startsWith('Temuan #SEO');
                        if (seoSubFilter === 'AI-Search') return f.code.startsWith('Temuan #AIS');
                        return true;
                      }).length
                    }{' '}
                    Usulan
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
                  {activeDraft.findings
                    .filter((f) => {
                      if (f.category !== 'seo') return false;
                      if (seoSubFilter === 'SEO') return f.code.startsWith('Temuan #SEO');
                      if (seoSubFilter === 'AI-Search') return f.code.startsWith('Temuan #AIS');
                      return true;
                    })
                    .map((finding) => {
                      const isExpanded = expandedFindingIds.has(finding.id);
                      const isAiSearch = finding.code.startsWith('Temuan #AIS');
                      return (
                        <div
                          key={finding.id}
                          className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                        >
                          {/* Accordion Header */}
                          <div
                            onClick={() => toggleAccordion(finding.id)}
                            className={`px-4 py-3 flex items-center justify-between cursor-pointer select-none transition-colors border-b ${
                              isAiSearch
                                ? 'bg-purple-50/80 hover:bg-purple-100/70 border-purple-200/60'
                                : 'bg-blue-50/80 hover:bg-blue-100/70 border-blue-200/60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                              <span className="p-0.5 rounded text-slate-700 shrink-0">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-slate-900" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-900" />
                                )}
                              </span>
                              <div className="flex flex-col min-w-0">
                                <span
                                  className={`text-xs font-bold leading-tight ${
                                    isAiSearch ? 'text-purple-950' : 'text-blue-950'
                                  }`}
                                >
                                  Tingkat: {finding.severity}
                                </span>
                                <span className="text-xs text-slate-500 font-normal leading-tight mt-0.5 truncate">
                                  {finding.title}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 whitespace-nowrap">
                                {finding.status === 'Belum Ditandai' ? 'Sudah Ditandai' : finding.status}
                              </span>

                              <a
                                href="https://developers.google.com/search/docs"
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 hover:bg-slate-100 transition-colors shrink-0"
                                title="Lihat Sumber"
                              >
                                <span>Lihat Sumber</span>
                                <ExternalLink className="w-3 h-3 text-slate-500" />
                              </a>
                            </div>
                          </div>

                          {/* Accordion Body */}
                          {isExpanded && (
                            <div className="bg-slate-50 p-4 space-y-3 animate-fade-in border-t border-slate-200">
                              <div className="bg-white border border-slate-200 p-3 rounded-md">
                                <p className="text-xs font-bold text-slate-900 mb-1">
                                  KUTIPAN NASKAH / USULAN:
                                </p>
                                <p className="text-xs text-slate-700">
                                  "{finding.matchedSnippet}"
                                </p>
                              </div>

                              <div className="bg-white border border-slate-200 p-3 rounded-md shadow-2xs">
                                <p className="text-xs font-bold text-slate-900 mb-1">
                                  Rekomendasi AI:
                                </p>
                                <p className="text-xs text-slate-700 leading-relaxed">
                                  {finding.recommendation}
                                </p>
                              </div>

                              <div className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] p-3 rounded-lg text-xs font-semibold">
                                Keputusan Akhir Editor: Diterima oleh Agus Setiawan (Editor)
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN TABLE LIST VIEW (50 Riwayat & Audit Pemeriksaan AI)
  // =========================================================================
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
                <option value="">Waktu: Semua Riwayat</option>
                <option value="hari-ini">Hari Ini</option>
                <option value="7-hari">7 Hari Terakhir</option>
                <option value="30-hari">30 Hari Terakhir</option>
              </select>
            </div>

            {/* Filter 2: Editor */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={editorFilter}
                onChange={(e) => setEditorFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Editor: Semua</option>
                <option value="Ridwan">Ridwan</option>
                <option value="Siti">Siti</option>
                <option value="Budi">Budi</option>
              </select>
            </div>

            {/* Filter 3: Status Artikel */}
            <div className="flex-1 min-w-[200px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Status Artikel: Semua</option>
                <option value="Draft">Draft</option>
                <option value="Pending">Pending</option>
                <option value="Publish">Publish</option>
                <option value="Review">Review</option>
              </select>
            </div>

            {/* Bersihkan Filter Button */}
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
                <th className="py-3 px-4 sm:px-6 font-semibold">Judul Draf Berita</th>
                <th className="py-3 px-4 font-semibold">Waktu Tinjau</th>
                <th className="py-3 px-4 font-semibold">Ulasan</th>
                <th className="py-3 px-4 font-semibold">Status Artikel</th>
                <th className="py-3 px-4 font-semibold">Skor Kemiripan</th>
                <th className="py-3 px-4 font-semibold">Buku Gaya</th>
                <th className="py-3 px-4 font-semibold">Deteksi AI</th>
                <th className="py-3 px-4 font-semibold">SEO & AI-Search</th>
                <th className="py-3 px-4 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Judul Draf */}
                    <td className="py-4 px-4 sm:px-6 max-w-sm">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm line-clamp-2">
                          {item.draftTitle}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-normal">
                          Editor: {item.editor || 'RRI Biak Numfor'}
                        </p>
                      </div>
                    </td>

                    {/* Waktu Tinjau */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600">
                      {item.time}
                    </td>

                    {/* Ulasan */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-700 font-medium">
                      {item.triggerBy
                        ? item.triggerBy.replace(/^Pemicu:\s*/i, 'Ulasan: ').replace(/\s*[·•]\s*(Manual|AI|Otomatis)/gi, '')
                        : 'Ulasan: Editor'}
                    </td>

                    {/* Status Artikel */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.articleStatus === 'Publish'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.articleStatus === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : item.articleStatus === 'Review'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {item.articleStatus || 'Draft'}
                      </span>
                    </td>

                    {/* Skor Kemiripan */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.similarityLevel === 'Rendah'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.similarityLevel === 'Sedang'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {item.similarityScore}
                      </span>
                    </td>

                    {/* Buku Gaya */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {item.styleGuideCount ?? 2} Temuan
                      </span>
                    </td>

                    {/* Deteksi AI */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                        {item.aiDetectionCount ?? 1} Temuan
                      </span>
                    </td>

                    {/* SEO & AI-Search */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                        {item.seoAiCount ?? 2} Temuan
                      </span>
                    </td>

                    {/* Aksi (Button Compare) */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedHistory(item);
                          setDetailViewMode('compare');
                        }}
                        className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-blue-100 border border-[#BFDBFE] text-[#1866EF] font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                        title="Komparasi Rekomendasi AI vs Portal News RRI"
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                        <span>Compare</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-700">Riwayat pemeriksaan tidak ditemukan</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci atau filter pencarian</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Menampilkan 1-5 dari 42 data</span>
            <div className="relative">
              <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 cursor-pointer">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer">
              Sebelumnya
            </button>
            <button className="w-8 h-8 rounded-md bg-[#1866EF] text-white font-semibold text-xs">
              1
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer">
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
