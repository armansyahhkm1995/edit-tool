import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Newspaper,
  Search,
  Bookmark,
  BookOpen,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';
import rriLogo from '../../assets/rri-logo.svg';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser, currentPage, setCurrentPage, logout } = useApp();

  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    onCloseMobile();
  };

  const navItemClass = (isActive: boolean) =>
    `flex items-center justify-between px-2.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
      isActive
        ? 'bg-[#0066FF] text-white shadow-xs font-semibold'
        : 'text-slate-700 hover:bg-blue-50/70 hover:text-slate-900'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-[260px]">
      {/* Top Header Logo */}
      <div className="pt-5 px-5 pb-3 flex items-start justify-between">
        <div className="flex flex-col">
          <img src={rriLogo} alt="RRI Radio Republik Indonesia" className="h-8 w-auto object-contain object-left" />
          <span className="text-[11px] text-slate-500 font-medium mt-1.5 tracking-tight">
            Portal Pemeriksa Naskah
          </span>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          aria-label="Tutup Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-5">
        {/* Editor Main Menu */}
        <div className="space-y-1">
          <p className="px-2.5 py-1 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            MENU UTAMA EDITOR
          </p>
          <div className="space-y-0.5">
            <button
              onClick={() => handleNav('daftar-draf')}
              className={`w-full ${navItemClass(
                currentPage === 'daftar-draf' || currentPage === 'detail-draf'
              )}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Newspaper className="w-4 h-4 shrink-0" />
                <span className="truncate">Daftar Draf Berita</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 ${
                  currentPage === 'daftar-draf' || currentPage === 'detail-draf'
                    ? 'text-white'
                    : 'text-slate-400'
                }`}
              />
            </button>

            <button
              onClick={() => handleNav('riwayat-pemeriksaan')}
              className={`w-full ${navItemClass(
                currentPage === 'riwayat-pemeriksaan' || currentPage === 'riwayat-detail'
              )}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 shrink-0" />
                <span className="truncate">Riwayat Pemeriksaan</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 ${
                  currentPage === 'riwayat-pemeriksaan' || currentPage === 'riwayat-detail'
                    ? 'text-white'
                    : 'text-slate-400'
                }`}
              />
            </button>

            <button
              onClick={() => handleNav('sumber-pengecualian')}
              className={`w-full ${navItemClass(currentPage === 'sumber-pengecualian')}`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Bookmark className="w-4 h-4 shrink-0" />
                <span className="truncate">Sumber Pengecualian</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 ${
                  currentPage === 'sumber-pengecualian' ? 'text-white' : 'text-slate-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Admin Menu (Only shown when user is Admin) */}
        {currentUser && currentUser.role?.toLowerCase() === 'admin' && (
          <div className="space-y-1">
            <p className="px-2.5 py-1 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              ADMIN
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => handleNav('buku-gaya')}
                className={`w-full ${navItemClass(currentPage === 'buku-gaya')}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span className="truncate">Buku Gaya Redaksi</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    currentPage === 'buku-gaya' ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>

              <button
                onClick={() => handleNav('manajemen-pengguna')}
                className={`w-full ${navItemClass(currentPage === 'manajemen-pengguna')}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <User className="w-4 h-4 shrink-0" />
                  <span className="truncate">Manajemen Pengguna</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    currentPage === 'manajemen-pengguna' ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>

              <button
                onClick={() => handleNav('konfigurasi-provider')}
                className={`w-full ${navItemClass(currentPage === 'konfigurasi-provider')}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Settings className="w-4 h-4 shrink-0" />
                  <span className="truncate">Konfigurasi Layanan</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    currentPage === 'konfigurasi-provider' ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>

              <button
                onClick={() => handleNav('audit-log')}
                className={`w-full ${navItemClass(currentPage === 'audit-log')}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="truncate">Audit Log</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    currentPage === 'audit-log' ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Keluar Button */}
      <div className="p-3.5 mt-auto border-t border-slate-100">
        <button
          onClick={logout}
          className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 shrink-0 text-red-500" />
            <span>Keluar</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-red-500" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex animate-fade-in z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
