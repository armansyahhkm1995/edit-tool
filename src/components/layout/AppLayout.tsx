import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LoginPage } from '../../pages/LoginPage';
import { DaftarDrafPage } from '../../pages/DaftarDrafPage';
import { DetailSplitViewPage } from '../../pages/DetailSplitViewPage';
import { RiwayatPemeriksaanPage } from '../../pages/RiwayatPemeriksaanPage';
import { SumberPengecualianPage } from '../../pages/SumberPengecualianPage';
import { BukuGayaPage } from '../../pages/BukuGayaPage';
import { ManajemenPenggunaPage } from '../../pages/ManajemenPenggunaPage';
import { KonfigurasiProviderPage } from '../../pages/KonfigurasiProviderPage';
import { AuditLogPage } from '../../pages/AuditLogPage';
import { NotifikasiPage } from '../../pages/NotifikasiPage';
import { ErrorStatePage } from '../../pages/ErrorStatePage';

export const AppLayout: React.FC = () => {
  const { isAuthenticated, currentPage, currentUser } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If not logged in, show Login flow
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Render current active page with role guards
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'daftar-draf':
        return <DaftarDrafPage />;
      case 'detail-draf':
        return <DetailSplitViewPage />;
      case 'riwayat-pemeriksaan':
      case 'riwayat-detail':
        return <RiwayatPemeriksaanPage />;
      case 'sumber-pengecualian':
        return <SumberPengecualianPage />;

      // Admin Only Pages (with 403 guard if user is Editor)
      case 'buku-gaya':
        return currentUser.role === 'admin' ? (
          <BukuGayaPage />
        ) : (
          <ErrorStatePage code={403} />
        );
      case 'manajemen-pengguna':
        return currentUser.role === 'admin' ? (
          <ManajemenPenggunaPage />
        ) : (
          <ErrorStatePage code={403} />
        );
      case 'konfigurasi-provider':
        return currentUser.role === 'admin' ? (
          <KonfigurasiProviderPage />
        ) : (
          <ErrorStatePage code={403} />
        );
      case 'audit-log':
        return currentUser.role === 'admin' ? (
          <AuditLogPage />
        ) : (
          <ErrorStatePage code={403} />
        );

      // Utility & Feedback
      case 'notifikasi':
        return <NotifikasiPage />;

      // Error States
      case 'error-403':
        return <ErrorStatePage code={403} />;
      case 'error-404':
        return <ErrorStatePage code={404} />;
      case 'error-429':
        return <ErrorStatePage code={429} />;
      case 'error-502':
        return <ErrorStatePage code={502} />;
      case 'error-503':
        return <ErrorStatePage code={503} />;

      default:
        return <DaftarDrafPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      {/* Sidebar (Desktop and Mobile Drawer) */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};
