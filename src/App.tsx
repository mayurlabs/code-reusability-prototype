import { useState, useEffect, useRef } from 'react';
import GlobalHeader, { SetupHeader } from './components/GlobalHeader';
import LeftNav from './components/LeftNav';
import GenerateReportModal from './components/GenerateReportModal';
import CodeReusabilityLanding from './pages/CodeReusabilityLanding';
import ReportDashboard from './pages/ReportDashboard';
import ClusterDetail from './pages/ClusterDetail';
import ReportComparison from './pages/ReportComparison';
import PdfPreview from './pages/PdfPreview';
import ApexGuruPage from './pages/ApexGuruPage';
import CodeModernisationPage from './pages/CodeModernisationPage';
import { useApp } from './context/AppContext';

type View =
  | { type: 'landing' }
  | { type: 'report'; reportId: string }
  | { type: 'cluster'; clusterId: string; reportId: string }
  | { type: 'compare'; reportId: string }
  | { type: 'pdf'; reportId: string };

export default function App() {
  const { activePage, showGenerateModal } = useApp();
  const [view, setView] = useState<View>({ type: 'landing' });
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [view, activePage]);

  const renderMainContent = () => {
    if (activePage === 'apexguru') return <ApexGuruPage />;
    if (activePage === 'code-modernisation') return <CodeModernisationPage />;

    if (activePage === 'code-reusability') {
      switch (view.type) {
        case 'landing':
          return (
            <CodeReusabilityLanding
              onViewReport={(reportId) => setView({ type: 'report', reportId })}
            />
          );
        case 'report':
          return (
            <ReportDashboard
              reportId={view.reportId}
              onBack={() => setView({ type: 'landing' })}
              onClusterClick={(clusterId) => setView({ type: 'cluster', clusterId, reportId: view.reportId })}
              onCompare={() => setView({ type: 'compare', reportId: view.reportId })}
              onPdfPreview={() => setView({ type: 'pdf', reportId: view.reportId })}
            />
          );
        case 'cluster':
          return (
            <ClusterDetail
              clusterId={view.clusterId}
              onBack={() => setView({ type: 'report', reportId: view.reportId })}
            />
          );
        case 'compare':
          return (
            <ReportComparison
              onBack={() => setView({ type: 'report', reportId: view.reportId })}
            />
          );
        case 'pdf':
          return (
            <PdfPreview
              onBack={() => setView({ type: 'report', reportId: view.reportId })}
            />
          );
      }
    }

    return (
      <div className="sf-card sf-empty-state" style={{ marginTop: 20 }}>
        <h3>Select a page from the left navigation</h3>
        <p>Navigate to Code Intelligence to get started.</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GlobalHeader />
      <SetupHeader />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LeftNav />
        <main ref={mainRef} style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px 28px',
          background: 'var(--sf-body-bg)',
        }}>
          {renderMainContent()}
        </main>
      </div>
      {showGenerateModal && <GenerateReportModal />}
    </div>
  );
}
