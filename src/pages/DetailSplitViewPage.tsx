import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FindingItem } from '../types';
import { DetailHeaderNav } from '../components/detail-split/DetailHeaderNav';
import { DetailStatusCards } from '../components/detail-split/DetailStatusCards';
import { DetailTabBar } from '../components/detail-split/DetailTabBar';
import { DetailFindingsColumn } from '../components/detail-split/DetailFindingsColumn';
import { DetailArticleColumn } from '../components/detail-split/DetailArticleColumn';
import { BukuGayaTextModal } from '../components/modals/BukuGayaTextModal';

export const DetailSplitViewPage: React.FC = () => {
  const {
    activeDraft,
    activeTab,
    setActiveTab,
    selectedFindingId,
    setSelectedFindingId,
    runAiInspection,
    isAiAnalyzing,
    setCurrentPage,
    styleGuides,
    aiConfig,
  } = useApp();

  // Modals state
  const [isStyleGuideModalOpen, setIsStyleGuideModalOpen] = useState(false);

  // Sub-filter for SEO vs AI-Search inside SEO tab
  const [seoSubFilter, setSeoSubFilter] = useState<'Semua' | 'SEO' | 'AI-Search'>('Semua');

  const activeStyleGuide = styleGuides.find((sg) => sg.isActive) || styleGuides[0];

  // Reset selected finding on mount and whenever tab changes so NO highlight is shown by default
  useEffect(() => {
    setSelectedFindingId(null);
  }, [activeTab, setSelectedFindingId]);

  // Filter findings for the active tab
  const currentTabFindings = activeDraft.findings.filter((f) => {
    if (f.category !== activeTab) return false;
    if (activeTab === 'seo') {
      if (seoSubFilter === 'SEO') {
        return f.code.startsWith('Temuan #SEO');
      }
      if (seoSubFilter === 'AI-Search') {
        return f.code.startsWith('Temuan #AIS');
      }
    }
    return true;
  });

  // Handle clicking a finding card -> select and smooth-scroll to relevant text in right column
  const handleFindingClick = (finding: FindingItem) => {
    setSelectedFindingId(finding.id);
    let targetId = `art-p-${finding.paragraphIndex ?? 1}`;
    if (finding.id === 'f-seo-1') {
      targetId = 'art-p-1';
    } else if (finding.id === 'f-seo-2' || finding.id === 'f-seo-4' || finding.id === 'f-ais-1') {
      targetId = 'art-p-1-lead';
    }
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const kemiripanCount = activeDraft.findings.filter((f) => f.category === 'kemiripan').length;
  const bukuGayaCount = activeDraft.findings.filter((f) => f.category === 'buku_gaya').length;
  const seoCount = activeDraft.findings.filter((f) => f.category === 'seo').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Top Navigation & Action Header */}
      <DetailHeaderNav
        title={activeDraft.title}
        artCode={activeDraft.artCode}
        journalist={activeDraft.journalist}
        updatedAt={activeDraft.updatedAt}
        isAiAnalyzing={isAiAnalyzing}
        onBack={() => setCurrentPage('daftar-draf')}
        onRunAi={() => runAiInspection(activeDraft.id)}
      />

      {/* AI Status Indicators Bar - Large Information Cards */}
      <DetailStatusCards
        similarityScore={activeDraft.similarityScore}
        aiDetectionScore={activeDraft.aiDetectionScore}
        isAiAnalyzing={isAiAnalyzing}
        bukuGayaCount={bukuGayaCount}
        seoCount={seoCount}
        similarityThreshold={aiConfig.similarityThreshold}
        aiDetectionThreshold={aiConfig.aiDetectionThreshold}
        styleGuideThreshold={aiConfig.styleGuideThreshold}
        seoThreshold={aiConfig.seoThreshold}
      />

      {/* TAB NAVIGATION: MEMBAWAHI ARTIKEL DI KANAN DAN TEMUAN DI KIRI */}
      <DetailTabBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedFindingId(null);
        }}
        kemiripanCount={kemiripanCount}
        bukuGayaCount={bukuGayaCount}
        seoCount={seoCount}
      />

      {/* MAIN SPLIT-VIEW: KIRI = DAFTAR TEMUAN (5 COLS), KANAN = DRAFT BERITA (7 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <DetailFindingsColumn
          activeTab={activeTab}
          currentTabFindings={currentTabFindings}
          selectedFindingId={selectedFindingId}
          onFindingClick={handleFindingClick}
          activeStyleGuideName={activeStyleGuide.filename}
          onOpenStyleGuideModal={() => setIsStyleGuideModalOpen(true)}
          seoSubFilter={seoSubFilter}
          setSeoSubFilter={setSeoSubFilter}
          totalSeoCount={seoCount}
        />

        <DetailArticleColumn
          activeTab={activeTab}
          selectedFindingId={selectedFindingId}
        />
      </div>

      {/* Modal Buku Gaya */}
      <BukuGayaTextModal
        isOpen={isStyleGuideModalOpen}
        onClose={() => setIsStyleGuideModalOpen(false)}
        styleGuide={activeStyleGuide}
      />
    </div>
  );
};
