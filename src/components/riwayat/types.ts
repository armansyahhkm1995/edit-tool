export interface DraftVersionData {
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
