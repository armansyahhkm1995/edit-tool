import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Menu, Shield, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  const { currentUser, switchRole, currentPage, setCurrentPage, notifications } = useApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumbTitle = () => {
    switch (currentPage) {
      case 'daftar-draf':
        return 'Daftar Draf Berita';
      case 'detail-draf':
        return 'Peluncuran Satelit Nusantara ...';
      case 'riwayat-pemeriksaan':
        return 'Riwayat & Audit Pemeriksaan AI';
      case 'riwayat-detail':
        return 'Peluncuran Satelit Nusantara ...';
      case 'sumber-pengecualian':
        return 'Daftar Sumber Dikecualikan (Whitelist)';
      case 'buku-gaya':
        return 'Buku Gaya Redaksi';
      case 'manajemen-pengguna':
        return 'Manajemen Pengguna';
      case 'konfigurasi-provider':
        return 'Konfigurasi Layanan';
      case 'audit-log':
        return 'Audit Log & Keamanan';
      case 'notifikasi':
        return 'Notifikasi';
      case 'error-403':
        return 'Error 403';
      case 'error-404':
        return 'Error 404';
      case 'error-429':
        return 'Error 429';
      case 'error-502':
        return 'Error 502';
      case 'error-503':
        return 'Error 503';
      default:
        return 'Daftar Draf Berita';
    }
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shrink-0 select-none">
      {/* Left: Mobile Hamburger & Breadcrumb (Matching Aintelligence layout) */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Buka Menu Navigasi"
          title="Buka Navigasi"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs truncate">
          <span className="hidden sm:inline text-slate-500 font-normal">Portal Pemeriksa Naskah</span>
          <span className="hidden sm:inline text-slate-300 font-light">/</span>
          <span className="font-semibold sm:font-medium text-[#1866EF] truncate">
            {getBreadcrumbTitle()}
          </span>
        </nav>
      </div>

      {/* Right Controls (Matching Aintelligence layout) */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Notification Bell Button (Outlined Box) */}
        <button
          onClick={() => setCurrentPage('notifikasi')}
          className={`p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors relative cursor-pointer ${
            currentPage === 'notifikasi' ? 'bg-blue-50 border-blue-300 text-blue-600' : ''
          }`}
          title="Notifikasi"
        >
          <Bell className="w-4 h-4 text-slate-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Vertical Divider */}
        <div className="h-7 w-px bg-slate-200" />

        {/* User Profile (Text only with role dropdown, matching Aintelligence) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex flex-col text-left leading-tight hover:opacity-80 transition-opacity cursor-pointer select-none"
            title="Klik untuk beralih profil (Admin/Editor)"
          >
            <span className="text-xs font-semibold text-slate-900 truncate max-w-[110px] sm:max-w-none">
              {currentUser.role?.toLowerCase() === 'admin' ? 'Cameron Newton' : (currentUser.name || 'Siti Rahmawati')}
            </span>
            <span className="text-[11px] text-slate-400 font-normal">
              {currentUser.role?.toLowerCase() === 'admin' ? 'Admin' : 'Editor'}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Ganti Peran Akun (Simulasi)
                </p>
              </div>

              <button
                onClick={() => {
                  switchRole('admin');
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                  currentUser.role === 'admin'
                    ? 'text-blue-600 font-semibold bg-blue-50/50'
                    : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-semibold text-xs leading-none">Cameron Newton</p>
                    <p className="text-[11px] text-slate-500">Administrator</p>
                  </div>
                </div>
                {currentUser.role === 'admin' && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                    Aktif
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  switchRole('editor');
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                  currentUser.role === 'editor'
                    ? 'text-blue-600 font-semibold bg-blue-50/50'
                    : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-slate-600" />
                  <div>
                    <p className="font-semibold text-xs leading-none">Siti Rahmawati</p>
                    <p className="text-[11px] text-slate-500">Editor</p>
                  </div>
                </div>
                {currentUser.role === 'editor' && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                    Aktif
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
