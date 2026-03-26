import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function GenerateReportModal() {
  const { setShowGenerateModal, triggerScan } = useApp();
  const [reportName, setReportName] = useState('Mar 2026 Code Reuse Report - Northstar Retail Group');
  const [env, setEnv] = useState('Production');
  const [scopes, setScopes] = useState({
    apex: true,
    triggers: true,
    lwc: true,
    soql: true,
  });
  const [comparePrev, setComparePrev] = useState(true);
  const [includeRuntime, setIncludeRuntime] = useState(true);
  const [note, setNote] = useState('Focus on pricing, lead scoring, and quote sync related duplication');

  const toggleScope = (key: keyof typeof scopes) => {
    setScopes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="sf-modal-overlay" onClick={() => setShowGenerateModal(false)}>
      <div className="sf-modal" onClick={e => e.stopPropagation()}>
        <div className="sf-modal-header">
          <h2>New Code Reuse Report</h2>
          <button className="sf-btn-icon" onClick={() => setShowGenerateModal(false)}>
            <X size={18} color="#706e6b" />
          </button>
        </div>
        <div className="sf-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="sf-label">Report Name</label>
            <input className="sf-input" value={reportName} onChange={e => setReportName(e.target.value)} />
          </div>
          <div>
            <label className="sf-label">Environment</label>
            <select className="sf-select" style={{ width: '100%' }} value={env} onChange={e => setEnv(e.target.value)}>
              <option>Production</option>
              <option>Full Copy Sandbox</option>
            </select>
          </div>
          <div>
            <label className="sf-label">Analysis Scope</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <label className="sf-checkbox">
                <input type="checkbox" checked={scopes.apex} onChange={() => toggleScope('apex')} />
                Apex classes and methods
              </label>
              <label className="sf-checkbox">
                <input type="checkbox" checked={scopes.triggers} onChange={() => toggleScope('triggers')} />
                Trigger handlers
              </label>
              <label className="sf-checkbox">
                <input type="checkbox" checked={scopes.lwc} onChange={() => toggleScope('lwc')} />
                LWC JS/TS utilities
              </label>
              <label className="sf-checkbox">
                <input type="checkbox" checked={scopes.soql} onChange={() => toggleScope('soql')} />
                SOQL/SOSL query patterns
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="sf-checkbox">
              <input type="checkbox" checked={comparePrev} onChange={() => setComparePrev(!comparePrev)} />
              Compare against previous report
            </label>
            <label className="sf-checkbox">
              <input type="checkbox" checked={includeRuntime} onChange={() => setIncludeRuntime(!includeRuntime)} />
              Include runtime prioritization where available
            </label>
          </div>
          <div>
            <label className="sf-label">Optional Note</label>
            <textarea
              className="sf-input"
              rows={2}
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="sf-info-box" style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ lineHeight: 1.6 }}>
              <div>Scans may take 5–15 minutes depending on org size.</div>
              <div>Up to 1 report can be generated per day and 7 per week.</div>
              <div>Runtime prioritization is available for supported production-backed patterns.</div>
              <div>Last 24 hours of changes may not be fully reflected.</div>
            </div>
          </div>
        </div>
        <div className="sf-modal-footer">
          <button className="sf-btn" onClick={() => setShowGenerateModal(false)}>Cancel</button>
          <button className="sf-btn sf-btn-primary" onClick={triggerScan}>
            Generate Reuse Report
          </button>
        </div>
      </div>
    </div>
  );
}
