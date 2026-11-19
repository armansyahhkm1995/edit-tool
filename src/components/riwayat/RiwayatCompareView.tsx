import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Globe,
  ExternalLink,
  Check,
} from 'lucide-react';
import { CheckHistoryItem } from '../../types';
import { useToast } from '../../context/ToastContext';

interface RiwayatCompareViewProps {
  selectedHistory: CheckHistoryItem;
  onBackToHistory: () => void;
}

export const RiwayatCompareView: React.FC<RiwayatCompareViewProps> = ({
  selectedHistory,
  onBackToHistory,
}) => {
  const { showToast } = useToast();

  const liveArticleDate = selectedHistory.time || '06 Nov 2026, 14:45';
  const aiSimulatedDate = selectedHistory.time || '06 Nov 2026, 14:15';

  const handleCopyAiText = () => {
    const fullAiText =
      'Satelit Nusantara Tiga Resmi Mengorbit di Biak, Siap Akselerasi Internet 5G Wilayah 3T\n\n' +
      'BIAK, PAPUA — Wahana orbit komunikasi nasional Satelit Nusantara Tiga berhasil mengorbit dengan sukses pada Kamis dini hari dari kompleks peluncuran antariksa terpadu Biak Numfor, Papua. Misi strategis nasional ini menandai tonggak akselerasi konektivitas digital pita lebar secara merata di Indonesia Timur.\n\n' +
      'Peluncuran memanfaatkan kendaraan roket pendorong generasi modern yang dirancang secara mandiri guna menempatkan muatan komunikasi berkecepatan tinggi di orbit geostasioner khatulistiwa pada ketinggian 35.786 kilometer di atas permukaan laut.\n\n' +
      'Sinyal telemetri pertama tertangkap stasiun pengendali bumi di Biak 12 menit pasca lepas landas. Dalam taklimat resminya, Kepala Badan Riset dan Inovasi Nasional (BRIN) mengonfirmasi seluruh subsistem satelit berfungsi prima dalam lintasan orbit nominal.\n\n' +
      'Keberhasilan misi ini ditargetkan memperluas konektivitas internet 5G untuk ribuan fasilitas publik, puskesmas terluar, pos perbatasan negara, dan sekolah di kawasan Terdepan, Terluar, dan Tertinggal (3T) di penjuru Indonesia Timur.';
    navigator.clipboard.writeText(fullAiText);
    showToast('Naskah rekomendasi AI berhasil disalin ke clipboard', 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 animate-fade-in">
      {/* Back Link & Header */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBackToHistory}
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
              onClick={handleCopyAiText}
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

          {/* Batang Tubuh Naskah AI */}
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
};
