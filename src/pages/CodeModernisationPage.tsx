import { useState } from 'react';
import { ArrowRight, RefreshCw, Layers, GitBranch, Cpu } from 'lucide-react';
import { modernisationCandidates } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function CodeModernisationPage() {
  const { showToast } = useApp();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const categoryIcon = (cat: string) => {
    if (cat.includes('→')) return <ArrowRight size={16} color="#0176d3" />;
    if (cat === 'Architecture') return <Layers size={16} color="#9050e9" />;
    if (cat === 'Performance') return <Cpu size={16} color="#fe9339" />;
    return <RefreshCw size={16} color="#2e844a" />;
  };

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      'Recommended': { bg: '#e6f7ec', color: '#2e844a' },
      'Under Review': { bg: '#fef4e8', color: '#b86e00' },
      'Planned': { bg: '#e1f0ff', color: '#0176d3' },
    };
    const s = map[status] || { bg: '#f0f0f0', color: '#706e6b' };
    return <span style={{ padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{status}</span>;
  };

  const selected = modernisationCandidates.find(c => c.id === selectedCard);

  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
          <a href="#">SETUP</a><span className="sep">›</span>
          <a href="#">Code Intelligence</a><span className="sep">›</span>
          <span>Code Modernisation</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: '#2e844a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GitBranch size={18} color="white" />
          </div>
          <h1 className="sf-page-title">Code Modernisation</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 20 }}>
        {[
          { label: 'Modernisation Candidates', value: '14', color: '#0176d3' },
          { label: 'Legacy Patterns Detected', value: '8', color: '#fe9339' },
          { label: 'Migration Opportunities', value: '5', color: '#2e844a' },
          { label: 'Architecture Upgrades', value: '3', color: '#9050e9' },
        ].map((card, i) => (
          <div key={i} className="sf-stat-card" style={{ borderTop: `3px solid ${card.color}` }}>
            <span className="stat-label">{card.label}</span>
            <span className="stat-value" style={{ color: card.color }}>{card.value}</span>
          </div>
        ))}
      </div>

      {/* Candidate Cards */}
      <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
        <h3 className="sf-section-title">Modernisation Candidates</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          {modernisationCandidates.map(candidate => (
            <div
              key={candidate.id}
              className="sf-card"
              style={{
                padding: 16,
                cursor: 'pointer',
                border: selectedCard === candidate.id ? '2px solid #0176d3' : '1px solid #e5e5e5',
                transition: 'all 150ms',
              }}
              onClick={() => setSelectedCard(candidate.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {categoryIcon(candidate.category)}
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase' }}>{candidate.category}</span>
                </div>
                {statusBadge(candidate.status)}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#181818', lineHeight: 1.4, marginBottom: 8 }}>{candidate.title}</div>
              <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#706e6b' }}>
                <span><span style={{ fontWeight: 600 }}>Impact:</span> {candidate.impact}</span>
                <span><span style={{ fontWeight: 600 }}>Team:</span> {candidate.team}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#181818' }}>{selected.title}</h3>
            {statusBadge(selected.status)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#706e6b', marginBottom: 8 }}>Current State</h4>
              <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                The existing implementation uses legacy patterns that are harder to maintain, test, and scale. This creates coupling with older platform capabilities and limits the team's ability to modernize adjacent systems.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#706e6b', marginBottom: 8 }}>Recommended Target State</h4>
              <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>
                Migrate to a modern service-backed pattern that aligns with current platform best practices, supports better testing, and reduces architectural coupling with legacy components.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 12, color: '#706e6b' }}>
            <div><span style={{ fontWeight: 600 }}>Category:</span> {selected.category}</div>
            <div><span style={{ fontWeight: 600 }}>Impact:</span> {selected.impact}</div>
            <div><span style={{ fontWeight: 600 }}>Team:</span> {selected.team}</div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button className="sf-btn sf-btn-primary sf-btn-sm" onClick={() => showToast('Added to modernisation plan', 'success')}>Add to Plan</button>
            <button className="sf-btn sf-btn-sm" onClick={() => showToast('Details exported', 'info')}>Export Details</button>
            <button className="sf-btn sf-btn-sm" onClick={() => showToast('Opening related Code Reusability cluster...', 'info')}>View Related Reuse Cluster</button>
          </div>
        </div>
      )}
    </div>
  );
}
