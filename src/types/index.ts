export type UserRole = 'admin' | 'editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nip?: string;
  twoFactorEnabled: boolean;
  status: 'active' | 'inactive';
}

export type CMSStatus = 'Menunggu Review' | 'Draf' | 'Terbit';
export type CheckStatus = 'Belum Diperiksa' | 'Aman' | 'Pelanggaran';
export type FindingSeverity = 'Tinggi' | 'Sedang' | 'Rendah';
export type FindingStatus = 'Belum Ditandai' | 'Diterima' | 'Diabaikan' | 'Telah Diperbaiki';
export type FindingCategory = 'kemiripan' | 'buku_gaya' | 'seo';

export interface FindingItem {
  id: string;
  code: string; // e.g. "Temuan #KMP-01"
  category: FindingCategory;
  severity: FindingSeverity;
  status: FindingStatus;
  title: string;
  matchedSnippet: string;
  similarityPercent?: number;
  matchedSource?: string;
  aiIndication?: string;
  ruleViolated?: string;
  recommendation: string;
  ignoreReason?: string;
  decisionNote?: string;
  paragraphIndex?: number;
}

export interface CMSDraft {
  id: string;
  artCode: string; // e.g. "ART-8942"
  title: string;
  journalist: string;
  cmsStatus: CMSStatus;
  checkStatus: CheckStatus;
  violationCount?: number;
  updatedAt: string;
  wordCount: number;
  paragraphCount: number;
  contentParagraphs: Array<{
    id: number;
    text: string;
    matchedFindingId?: string;
    similarityPercent?: number;
    matchedSource?: string;
  }>;
  similarityScore: number;
  similarityLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  aiDetectionScore: number;
  aiDetectionLevel: 'Aman' | 'Waspada' | 'Tinggi';
  findings: FindingItem[];
}

export interface CheckHistoryItem {
  id: string;
  draftId: string;
  draftArtCode: string;
  draftTitle: string;
  version: string;
  time: string;
  triggerBy: string;
  similarityScore: string;
  similarityLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  findingsCount: number;
  fixedCount: number;
  acceptedCount: number;
  ignoredCount: number;
}

export interface WhitelistSource {
  id: string;
  domain: string;
  type: 'Domain' | 'URL';
  addedBy: string;
  addedAt: string;
  reason: string;
  status: 'active' | 'inactive';
}

export interface StyleGuideVersion {
  id: string;
  version: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
  isActive: boolean;
  pageCount: number;
  lineCount: number;
  articles: Array<{
    chapter: string;
    content: string;
  }>;
}

export interface AIProviderConfig {
  activeLlm: 'claude-3-5-sonnet' | 'gemini-3-8-flash' | 'gpt-oss-120b';
  claudeApiKey: string;
  geminiApiKey: string;
  similarityEngine: 'inhouse' | 'external';
  externalApiKey: string;
  similarityThreshold: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  timezone: string;
  userName: string;
  userRole: 'Admin' | 'Administrator' | 'Editor';
  category: 'Login' | 'Buku gaya' | 'Pengecualian sumber' | 'Manajemen akun' | 'Persetujuan provider';
  detail: string;
  ip: string;
}

export interface NotificationItem {
  id: string;
  section: 'Hari Ini' | 'Kemarin';
  title: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  isRead: boolean;
}
