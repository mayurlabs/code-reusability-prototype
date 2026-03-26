import { useState } from 'react';
import { BarChart3, AlertTriangle, AlertCircle, Info, Zap, TrendingUp, FileText, ExternalLink } from 'lucide-react';
import { apexGuruInsights } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function ApexGuruPage() {
  const { showToast } = useApp();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const severityIcon = (sev: string) => {
    if (sev === 'Critical') return <AlertTriangle size={16} color="#ea001e" />;
    if (sev === 'Warning') return <AlertCircle size={16} color="#fe9339" />;
    return <Info size={16} color="#0176d3" />;
  };

  const severityBadge = (sev: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      'Critical': { bg: '#fde8ea', color: '#ea001e' },
      'Warning': { bg: '#fef4e8', color: '#b86e00' },
      'Info': { bg: '#e1f0ff', color: '#0176d3' },
    };
    const s = map[sev] || map['Info'];
    return <span style={{ padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{sev}</span>;
  };

  const selected = apexGuruInsights.find(i => i.id === selectedInsight);

  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
          <a href="#">SETUP</a><span className="sep">›</span>
          <a href="#">Code Intelligence</a><span className="sep">›</span>
          <span>ApexGuru</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: '#9050e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="white" />
          </div>
          <h1 className="sf-page-title">ApexGuru</h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 20 }}>
        {[
          { label: 'Active Insights', value: '12', icon: <TrendingUp size={16} color="#0176d3" /> },
          { label: 'Critical Hotspots', value: '3', icon: <AlertTriangle size={16} color="#ea001e" /> },
          { label: 'Recommendations Implemented', value: '18', icon: <BarChart3 size={16} color="#2e844a" /> },
          { label: 'Last Analysis', value: 'Mar 25, 2026', icon: <FileText size={16} color="#706e6b" /> },
        ].map((card, i) => (
          <div key={i} className="sf-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {card.icon}
              <span className="stat-label">{card.label}</span>
            </div>
            <span className="stat-value" style={{ fontSize: 24 }}>{card.value}</span>
          </div>
        ))}
      </div>

      {/* Insights Table */}
      <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
        <h3 className="sf-section-title">Performance Insights</h3>
        <table className="sf-table">
          <thead>
            <tr>
              <th></th>
              <th>Insight</th>
              <th>Severity</th>
              <th>Impact</th>
              <th>Team</th>
              <th>Detected</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {apexGuruInsights.map(insight => (
              <tr key={insight.id} onClick={() => setSelectedInsight(insight.id)}>
                <td>{severityIcon(insight.severity)}</td>
                <td style={{ color: '#0176d3', fontWeight: 500 }}>{insight.title}</td>
                <td>{severityBadge(insight.severity)}</td>
                <td><span className={`priority-dot ${insight.impact.toLowerCase()}`} />{insight.impact}</td>
                <td style={{ fontSize: 12 }}>{insight.team}</td>
                <td style={{ fontSize: 12 }}>{insight.lastDetected}</td>
                <td><ExternalLink size={14} color="#0176d3" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#181818', marginBottom: 8 }}>{selected.title}</h3>
              <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>{selected.description}</p>
            </div>
            {severityBadge(selected.severity)}
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 12, color: '#706e6b' }}>
            <div><span style={{ fontWeight: 600 }}>Team:</span> {selected.team}</div>
            <div><span style={{ fontWeight: 600 }}>Impact:</span> {selected.impact}</div>
            <div><span style={{ fontWeight: 600 }}>Last Detected:</span> {selected.lastDetected}</div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button className="sf-btn sf-btn-primary sf-btn-sm" onClick={() => showToast('Insight acknowledged', 'success')}>Acknowledge</button>
            <button className="sf-btn sf-btn-sm" onClick={() => showToast('Insight suppressed', 'info')}>Suppress</button>
            <button className="sf-btn sf-btn-sm" onClick={() => showToast('Details exported', 'info')}>Export Details</button>
          </div>
        </div>
      )}

      {/* Recommendation Cards */}
      <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
        <h3 className="sf-section-title">Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { title: 'Consolidate repeated pricing threshold evaluation logic', desc: 'Multiple implementations of discount threshold evaluation detected. Consider unifying into a shared utility.', link: 'Related: Code Reusability > Pricing Rules' },
            { title: 'Optimize bulk DML patterns in case escalation batch', desc: 'DML operations in CaseEscalationBatch.execute() can be consolidated to reduce transaction overhead.', link: 'View recommendation details' },
            { title: 'Refactor SOQL queries in OpportunityTriggerHandler', desc: 'Moving SOQL outside the loop will significantly reduce CPU time during bulk updates.', link: 'View recommendation details' },
            { title: 'Implement lazy-loading for AccountMergeService', desc: 'Batch processing approach will prevent heap limit issues during large merge operations.', link: 'View recommendation details' },
          ].map((rec, i) => (
            <div key={i} className="sf-card" style={{ padding: 16, cursor: 'pointer' }} onClick={() => showToast('Opening recommendation details...', 'info')}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0176d3', marginBottom: 4 }}>{rec.title}</div>
              <div style={{ fontSize: 12, color: '#706e6b', lineHeight: 1.5 }}>{rec.desc}</div>
              <div style={{ fontSize: 11, color: '#9050e9', marginTop: 8, fontWeight: 600 }}>{rec.link}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
