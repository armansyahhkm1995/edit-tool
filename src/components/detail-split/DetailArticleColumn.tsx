import React from 'react';
import { FindingCategory } from '../../types';
import { CheckCircle2 } from 'lucide-react';

interface DetailArticleColumnProps {
  activeTab: FindingCategory;
  selectedFindingId: string | null;
}

export const DetailArticleColumn: React.FC<DetailArticleColumnProps> = ({
  activeTab,
  selectedFindingId,
}) => {
  return (
    <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden lg:h-[calc(100vh-250px)] lg:max-h-[calc(100vh-250px)] lg:min-h-[560px] lg:sticky lg:top-4">
      {/* Card Header */}
      <div className="shrink-0 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white z-10">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Draft Berita (Read-Only dari CMS)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            428 Kata · 3 Paragraf · 06 Nov 2026, 14:45 WIB
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Sumber: Portal RRI CMS</span>
        </span>
      </div>

      {/* Card Body - Natural Editorial Article with Metric-specific Highlighting */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 text-sm text-slate-800 leading-relaxed font-sans">
        {/* Title / Heading */}
        <div
          id="art-p-1"
          className={`p-2.5 rounded-lg transition-all ${
            activeTab === 'seo' && selectedFindingId === 'f-seo-1'
              ? 'bg-purple-100 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
              : 'bg-transparent'
          }`}
        >
          <h3 className="text-lg font-bold text-slate-950 leading-snug">
            Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit
          </h3>
          {activeTab === 'seo' && selectedFindingId === 'f-seo-1' && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-800">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
              <span>Tag SEO: Usulan Judul Artikel Berita (SEO Title Tag)</span>
            </div>
          )}
        </div>

        {/* Paragraph 1 - Lead */}
        <div
          id="art-p-1-lead"
          className={`p-3 rounded-lg transition-all ${
            activeTab === 'seo' &&
            (selectedFindingId === 'f-seo-2' ||
              selectedFindingId === 'f-seo-4' ||
              selectedFindingId === 'f-ais-1')
              ? 'bg-purple-100 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
              : 'bg-transparent'
          }`}
        >
          <p className="text-slate-800 text-justify leading-relaxed">
            <strong className="text-slate-900 font-semibold">BIAK, PAPUA</strong> — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua.
          </p>
          {activeTab === 'seo' &&
            (selectedFindingId === 'f-seo-2' ||
              selectedFindingId === 'f-seo-4' ||
              selectedFindingId === 'f-ais-1') && (
              <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-800">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                <span>
                  {selectedFindingId === 'f-seo-2'
                    ? 'Tag SEO: Usulan Meta Description Ringkas (156 Karakter)'
                    : selectedFindingId === 'f-seo-4'
                    ? 'Tag SEO: Usulan Slug URL Ramah Mesin Pencari'
                    : 'AI-Search: Penataan Struktur Paragraf Pembuka (BLUF)'}
                </span>
              </div>
            )}
        </div>

        {/* Paragraph 2 - Kutipan & Spesifikasi (Kemiripan / Buku Gaya / SEO) */}
        <div
          id="art-p-2"
          className={`p-3.5 rounded-lg transition-all ${
            activeTab === 'kemiripan' &&
            (selectedFindingId === 'f-kmp-1' ||
              selectedFindingId === 'f-kmp-2' ||
              selectedFindingId === 'f-kmp-3' ||
              selectedFindingId === 'f-kmp-4' ||
              selectedFindingId === 'f-kmp-5')
              ? 'bg-emerald-100/80 border-l-4 border-emerald-600 ring-2 ring-emerald-500/30'
              : activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-2'
              ? 'bg-amber-100/80 border-l-4 border-amber-600 ring-2 ring-amber-500/30'
              : activeTab === 'seo' &&
                (selectedFindingId === 'f-seo-3' ||
                  selectedFindingId === 'f-seo-5' ||
                  selectedFindingId === 'f-ais-2')
              ? 'bg-purple-100/80 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
              : 'bg-transparent'
          }`}
        >
          <p className="text-slate-800 text-justify leading-relaxed">
            Peluncuran menggunakan roket pendorong generasi terbaru yang dirancang khusus guna menempatkan muatan telekomunikasi pita lebar di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.
          </p>
          {activeTab === 'kemiripan' &&
            (selectedFindingId === 'f-kmp-1' ||
              selectedFindingId === 'f-kmp-2' ||
              selectedFindingId === 'f-kmp-3' ||
              selectedFindingId === 'f-kmp-4' ||
              selectedFindingId === 'f-kmp-5') && (
              <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                <span>
                  Sorotan Kemiripan: Mirip dengan {selectedFindingId === 'f-kmp-1' ? 'kompas.com' : 'antaranews.com'} (78%)
                </span>
              </div>
            )}
          {activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-2' && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              <span>Kaidah Buku Gaya: Format Satuan Ukuran & Angka Ribuan (Pasal 7)</span>
            </div>
          )}
          {activeTab === 'seo' &&
            (selectedFindingId === 'f-seo-3' ||
              selectedFindingId === 'f-seo-5' ||
              selectedFindingId === 'f-ais-2') && (
              <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-900">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                <span>
                  {selectedFindingId === 'f-seo-3'
                    ? 'Optimasi SEO: Penempatan Keyword Utama & LSI Semantik'
                    : selectedFindingId === 'f-seo-5'
                    ? 'Optimasi SEO: Usulan Sub-heading H2 Terstruktur'
                    : 'AI-Search: Konteks Historis Satelit Sebelumnya'}
                </span>
              </div>
            )}
        </div>

        {/* Paragraph 3 - Telemetri & Nomenklatur Lembaga (Buku Gaya / SEO) */}
        <div
          id="art-p-3"
          className={`p-3.5 rounded-lg transition-all ${
            activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-1'
              ? 'bg-amber-100/80 border-l-4 border-amber-600 ring-2 ring-amber-500/30'
              : activeTab === 'seo' && selectedFindingId === 'f-ais-3'
              ? 'bg-purple-100/80 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
              : 'bg-transparent'
          }`}
        >
          <p className="text-slate-800 text-justify leading-relaxed">
            Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak hanya 12 menit pasca lepas landas. Dalam keterangan pers tertulisnya, "...menurut kepala badan riset saat meninjau langsung kesiapan pusat kendali peluncuran satelit di pulau terluar tersebut."
          </p>
          {activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-1' && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              <span>Kaidah Buku Gaya: Frasa "kepala badan riset" perlu disesuaikan dengan nomenklatur baku BRIN (Pasal 4)</span>
            </div>
          )}
          {activeTab === 'seo' && selectedFindingId === 'f-ais-3' && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-900">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
              <span>Saran Atribusi E-E-A-T: Sebutkan nama narasumber lengkap & rilis pers resmi</span>
            </div>
          )}
        </div>

        {/* Paragraph 4 - Wilayah 3T & Penutup (Buku Gaya / SEO) */}
        <div
          id="art-p-4"
          className={`p-3.5 rounded-lg transition-all ${
            activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-3'
              ? 'bg-amber-100/80 border-l-4 border-amber-600 ring-2 ring-amber-500/30'
              : activeTab === 'seo' && selectedFindingId === 'f-ais-4'
              ? 'bg-purple-100/80 border-l-4 border-purple-600 ring-2 ring-purple-500/30'
              : 'bg-transparent'
          }`}
        >
          <p className="text-slate-800 text-justify leading-relaxed">
            Keberhasilan peluncuran ini diproyeksikan akan memperkuat konektivitas internet 5G untuk seluruh fasilitas publik, puskesmas, dan sekolah di kawasan 3T (Terdepan, Terluar, Tertinggal) di wilayah Indonesia Timur.
          </p>
          {activeTab === 'buku_gaya' && selectedFindingId === 'f-bgy-3' && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
              <span>Kaidah Buku Gaya: Penulisan akronim wilayah 3T dan pembakuan huruf kapital</span>
            </div>
          )}
          {activeTab === 'seo' && selectedFindingId === 'f-ais-4' && (
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-purple-900">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
              <span>Saran Keterbacaan AI: Format poin ringkas spesifikasi teknis kawasan 3T</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
