import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  FileQuestion,
  Hourglass,
  ServerOff,
  WifiOff,
  ArrowLeft,
  RotateCw,
} from 'lucide-react';

interface ErrorStatePageProps {
  code: 403 | 404 | 429 | 502 | 503;
}

export const ErrorStatePage: React.FC<ErrorStatePageProps> = ({ code }) => {
  const { setCurrentPage, switchRole } = useApp();

  const getErrorContent = () => {
    switch (code) {
      case 403:
        return {
          icon: <ShieldAlert className="w-12 h-12 text-red-600" />,
          title: 'Akses Ditolak',
          description: 'Halaman ini memerlukan hak akses Administrator.',
          actionLabel: 'Masuk Sebagai Admin',
          actionIcon: <ArrowLeft className="w-4 h-4" />,
          onClick: () => {
            switchRole('admin');
            setCurrentPage('buku-gaya');
          },
        };
      case 404:
        return {
          icon: <FileQuestion className="w-12 h-12 text-amber-600" />,
          title: 'Draf Tidak Ditemukan',
          description:
            'Naskah ini mungkin telah dihapus atau ditarik dari antrean CMS utama.',
          actionLabel: 'Kembali ke Daftar Draft',
          actionIcon: <ArrowLeft className="w-4 h-4" />,
          onClick: () => setCurrentPage('daftar-draf'),
        };
      case 429:
        return {
          icon: <Hourglass className="w-12 h-12 text-amber-600" />,
          title: 'Permintaan Terlalu Sering',
          description:
            'Anda telah melampaui jumlah permintaan maksimum. Harap tunggu sejenak sebelum mencoba lagi.',
          actionLabel: 'Muat Ulang Laman',
          actionIcon: <RotateCw className="w-4 h-4" />,
          onClick: () => window.location.reload(),
        };
      case 502:
        return {
          icon: <ServerOff className="w-12 h-12 text-red-600" />,
          title: 'Gagal Terhubung ke Portal RRI',
          description:
            'Analisis naskah selesai, namun server CMS (rri.co.id) tidak merespons pengiriman data',
          actionLabel: 'Muat Ulang Laman',
          actionIcon: <RotateCw className="w-4 h-4" />,
          onClick: () => window.location.reload(),
        };
      case 503:
      default:
        return {
          icon: <WifiOff className="w-12 h-12 text-red-600" />,
          title: 'Koneksi API LLM Terputus',
          description:
            'Koneksi ke Mesin AI Terputus. Sistem tidak mendapat respons dari LLM. Harap hubungi Admin untuk mengecek status API',
          actionLabel: 'Kembali ke Beranda',
          actionIcon: <ArrowLeft className="w-4 h-4" />,
          onClick: () => setCurrentPage('daftar-draf'),
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm max-w-lg w-full text-center space-y-5">
        <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mx-auto shadow-2xs">
          {content.icon}
        </div>

        <div>
          <span className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
            Kode Galat: {code}
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{content.title}</h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
            {content.description}
          </p>
        </div>

        <div className="pt-3">
          <button
            onClick={content.onClick}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1866EF] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            {content.actionIcon}
            <span>{content.actionLabel}</span>
          </button>
        </div>

        {/* Quick simulator links to test all error states */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
          <span>Pratinjau Status Galat:</span>
          <button
            onClick={() => setCurrentPage('error-403')}
            className="hover:text-blue-600 underline font-mono"
          >
            403
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentPage('error-404')}
            className="hover:text-blue-600 underline font-mono"
          >
            404
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentPage('error-429')}
            className="hover:text-blue-600 underline font-mono"
          >
            429
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentPage('error-502')}
            className="hover:text-blue-600 underline font-mono"
          >
            502
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentPage('error-503')}
            className="hover:text-blue-600 underline font-mono"
          >
            503
          </button>
        </div>
      </div>
    </div>
  );
};
