import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  CMSDraft,
  FindingStatus,
  WhitelistSource,
  StyleGuideVersion,
  AIProviderConfig,
  AuditLogItem,
  NotificationItem,
} from '../types';
import {
  mockUsers,
  mockDefaultDraft,
  mockDrafts,
  mockWhitelist,
  mockStyleGuideVersions,
  mockAIConfig,
  mockAuditLogs,
  mockNotifications,
} from '../data/mockData';
import { useToast } from './ToastContext';

interface AppContextType {
  currentUser: User;
  isAuthenticated: boolean;
  twoFactorPending: boolean;
  setTwoFactorPending: (pending: boolean) => void;
  currentPage: string;
  drafts: CMSDraft[];
  activeDraft: CMSDraft;
  activeTab: 'kemiripan' | 'buku_gaya' | 'seo';
  selectedFindingId: string | null;
  whitelist: WhitelistSource[];
  styleGuides: StyleGuideVersion[];
  users: User[];
  aiConfig: AIProviderConfig;
  auditLogs: AuditLogItem[];
  notifications: NotificationItem[];
  isAiAnalyzing: boolean;
  setCurrentUser: (user: User) => void;
  switchRole: (role: 'admin' | 'editor') => void;
  setCurrentPage: (page: string) => void;
  setActiveDraft: (draft: CMSDraft) => void;
  setActiveTab: (tab: 'kemiripan' | 'buku_gaya' | 'seo') => void;
  setSelectedFindingId: (id: string | null) => void;
  updateFindingStatus: (findingId: string, status: FindingStatus, ignoreReason?: string) => void;
  runAiInspection: (draftId: string) => void;
  addWhitelist: (domain: string, reason: string) => void;
  updateWhitelist: (id: string, domain: string, reason: string) => void;
  deleteWhitelist: (id: string) => void;
  setActiveStyleGuide: (id: string) => void;
  uploadStyleGuide: (filename: string) => void;
  addUser: (name: string, email: string, role: 'admin' | 'editor') => void;
  updateUser: (id: string, name: string, email: string, role: 'admin' | 'editor') => void;
  toggleUserStatus: (id: string) => void;
  updateAIConfig: (config: Partial<AIProviderConfig>) => void;
  pullNewDraftsFromCMS: () => void;
  login: (email: string) => void;
  verify2FA: (otp: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('rri_editools_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return mockUsers[0]; // Cameron Newton (Admin)
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('rri_editools_auth') === 'true';
  });

  const [twoFactorPending, setTwoFactorPending] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const saved = localStorage.getItem('rri_editools_page');
    return saved || 'daftar-draf';
  });

  const [drafts, setDrafts] = useState<CMSDraft[]>(mockDrafts);
  const [activeDraft, setActiveDraft] = useState<CMSDraft>(mockDefaultDraft);
  const [activeTab, setActiveTab] = useState<'kemiripan' | 'buku_gaya' | 'seo'>('kemiripan');
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>('f-kmp-1');
  const [whitelist, setWhitelist] = useState<WhitelistSource[]>(mockWhitelist);
  const [styleGuides, setStyleGuides] = useState<StyleGuideVersion[]>(mockStyleGuideVersions);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [aiConfig, setAiConfig] = useState<AIProviderConfig>(mockAIConfig);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(mockAuditLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('rri_editools_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rri_editools_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('rri_editools_page', currentPage);
  }, [currentPage]);

  const switchRole = (role: 'admin' | 'editor') => {
    if (role === 'admin') {
      const admin = users.find((u) => u.role === 'admin') || mockUsers[0];
      setCurrentUser(admin);
      showToast(`Beralih ke akun Administrator: ${admin.name}`, 'info', 'Role Switcher');
    } else {
      const editor = users.find((u) => u.role === 'editor') || mockUsers[1];
      setCurrentUser(editor);
      showToast(`Beralih ke akun Editor: ${editor.name}`, 'info', 'Role Switcher');
    }
  };

  const login = (identifier: string) => {
    const clean = identifier.trim().toLowerCase();
    const matched = users.find(
      (u) =>
        u.email.toLowerCase() === clean ||
        (u.nip && u.nip.toLowerCase() === clean) ||
        (clean.includes('admin') && u.role === 'admin') ||
        (clean.includes('editor') && u.role === 'editor') ||
        (clean.includes('user1') && u.role === 'editor')
    );
    if (matched) {
      setCurrentUser(matched);
    } else if (clean.includes('admin')) {
      setCurrentUser(mockUsers[0]);
    } else {
      setCurrentUser(mockUsers[1]);
    }
    setTwoFactorPending(true);
  };

  const verify2FA = (otp: string): boolean => {
    if (otp.length === 6) {
      setIsAuthenticated(true);
      setTwoFactorPending(false);
      setCurrentPage('daftar-draf');
      showToast('Login berhasil. Selamat datang di Editools RRI', 'success', 'Modul Autentikasi');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setTwoFactorPending(false);
    setCurrentPage('daftar-draf');
    showToast('Anda telah berhasil keluar dari sistem.', 'info');
  };

  const updateFindingStatus = (
    findingId: string,
    status: FindingStatus,
    ignoreReason?: string
  ) => {
    setActiveDraft((prev) => {
      const updatedFindings = prev.findings.map((f) => {
        if (f.id === findingId) {
          return {
            ...f,
            status,
            ignoreReason: status === 'Diabaikan' ? ignoreReason : f.ignoreReason,
            decisionNote: `Diputuskan oleh ${currentUser.name} (${currentUser.role === 'admin' ? 'Admin' : 'Editor'})`,
          };
        }
        return f;
      });

      // Recalculate violation count
      const activeViolations = updatedFindings.filter((f) => f.status !== 'Telah Diperbaiki' && f.status !== 'Diabaikan').length;

      return {
        ...prev,
        findings: updatedFindings,
        violationCount: activeViolations,
        checkStatus: activeViolations === 0 ? 'Aman' : 'Pelanggaran',
      };
    });

    // Update in drafts list too
    setDrafts((prev) =>
      prev.map((d) => (d.id === activeDraft.id ? { ...d, checkStatus: 'Aman' } : d))
    );

    showToast('Status temuan berhasil diperbarui', 'success', 'Modul Analisis & Detail Draf');
  };

  const runAiInspection = (draftId: string) => {
    setIsAiAnalyzing(true);
    showToast('Memulai pemeriksaan AI pada naskah berita...', 'info', 'AI Engine');

    setTimeout(() => {
      setIsAiAnalyzing(false);
      setActiveDraft((prev) => ({
        ...prev,
        checkStatus: 'Pelanggaran',
        similarityScore: 18.4,
        similarityLevel: 'Rendah',
        aiDetectionScore: 12,
        aiDetectionLevel: 'Aman',
      }));

      // Add to audit log
      const newLog: AuditLogItem = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        timezone: 'Asia/Jakarta (WIB)',
        userName: currentUser.name,
        userRole: currentUser.role === 'admin' ? 'Administrator' : 'Editor',
        category: 'Persetujuan provider',
        detail: `Menjalankan pemeriksaan AI komprehensif pada ${activeDraft.artCode} - ${activeDraft.title.substring(0, 40)}...`,
        ip: '10.20.4.102',
      };
      setAuditLogs((prev) => [newLog, ...prev]);

      showToast(
        'Analisis selesai. Hasil evaluasi tata bahasa, SEO, dan kemiripan telah dimuat',
        'success',
        'Modul Analisis & Detail Draf'
      );
    }, 1500);
  };

  const pullNewDraftsFromCMS = () => {
    showToast('Menghubungkan ke CMS RRI untuk sinkronisasi draf...', 'info');
    setTimeout(() => {
      showToast('Berhasil menarik 3 draf berita terbaru dari CMS RRI', 'success');
    }, 1200);
  };

  const addWhitelist = (domain: string, reason: string) => {
    const newItem: WhitelistSource = {
      id: `wl-${Date.now()}`,
      domain,
      type: domain.includes('/') ? 'URL' : 'Domain',
      addedBy: currentUser.name,
      addedAt: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      reason,
      status: 'active',
    };
    setWhitelist((prev) => [newItem, ...prev]);
    showToast(
      'Sumber pengecualian baru berhasil ditambahkan ke daftar (Whitelist)',
      'success',
      'Modul Pengecualian Sumber'
    );
  };

  const updateWhitelist = (id: string, domain: string, reason: string) => {
    setWhitelist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, domain, reason } : item))
    );
    showToast('Data sumber pengecualian berhasil diperbarui', 'success', 'Modul Pengecualian Sumber');
  };

  const deleteWhitelist = (id: string) => {
    setWhitelist((prev) => prev.filter((item) => item.id !== id));
    showToast(
      'Sumber pengecualian berhasil dihapus. Domain ini akan kembali dihitung dalam skor kemiripan',
      'success',
      'Modul Pengecualian Sumber'
    );
  };

  const setActiveStyleGuide = (id: string) => {
    setStyleGuides((prev) =>
      prev.map((sg) => ({
        ...sg,
        isActive: sg.id === id,
      }))
    );
    showToast(
      'Buku Gaya versi tersebut berhasil diaktifkan sebagai referensi utama AI',
      'success',
      'Modul Buku Gaya Redaksi'
    );
  };

  const uploadStyleGuide = (filename: string) => {
    const newVersionNum = `v2.${styleGuides.length + 2}`;
    const newSg: StyleGuideVersion = {
      id: `sg-${Date.now()}`,
      version: newVersionNum,
      filename,
      uploadedBy: currentUser.name,
      uploadedAt: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      isActive: false,
      pageCount: 52,
      lineCount: 1540,
      articles: [
        {
          chapter: 'BAB I: PENDAHULUAN & STANDAR KOSAKATA TERKINI',
          content: 'Pedoman revisi tata bahasa dan akronim media publik digital tahun 2026.',
        },
      ],
    };
    setStyleGuides((prev) => [newSg, ...prev]);
    showToast(
      'Dokumen Buku Gaya berhasil diunggah dan teks siap ditinjau',
      'success',
      'Modul Buku Gaya Redaksi'
    );
  };

  const addUser = (name: string, email: string, role: 'admin' | 'editor') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      nip: `19${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
      twoFactorEnabled: true,
      status: 'active',
    };
    setUsers((prev) => [...prev, newUser]);
    showToast('Pengguna baru berhasil ditambahkan ke dalam sistem', 'success', 'Modul Manajemen Pengguna');
  };

  const updateUser = (id: string, name: string, email: string, role: 'admin' | 'editor') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, name, email, role } : u))
    );
    showToast('Peran dan hak akses pengguna berhasil diperbarui', 'success', 'Modul Manajemen Pengguna');
  };

  const toggleUserStatus = (id: string) => {
    if (id === currentUser.id) {
      showToast(
        'Tindakan ditolak: Anda tidak dapat menonaktifkan akun yang sedang digunakan',
        'error',
        'Modul Manajemen Pengguna'
      );
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
    showToast('Status akun pengguna berhasil diperbarui', 'success', 'Modul Manajemen Pengguna');
  };

  const updateAIConfig = (config: Partial<AIProviderConfig>) => {
    setAiConfig((prev) => ({ ...prev, ...config }));
    showToast(
      'Konfigurasi provider AI dan arsitektur mesin berhasil disimpan',
      'success',
      'Modul Konfigurasi Provider'
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        twoFactorPending,
        setTwoFactorPending,
        currentPage,
        drafts,
        activeDraft,
        activeTab,
        selectedFindingId,
        whitelist,
        styleGuides,
        users,
        aiConfig,
        auditLogs,
        notifications,
        isAiAnalyzing,
        setCurrentUser,
        switchRole,
        setCurrentPage,
        setActiveDraft,
        setActiveTab,
        setSelectedFindingId,
        updateFindingStatus,
        runAiInspection,
        addWhitelist,
        updateWhitelist,
        deleteWhitelist,
        setActiveStyleGuide,
        uploadStyleGuide,
        addUser,
        updateUser,
        toggleUserStatus,
        updateAIConfig,
        pullNewDraftsFromCMS,
        login,
        verify2FA,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
