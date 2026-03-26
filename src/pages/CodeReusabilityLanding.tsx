import { ArrowUpRight, Download, RefreshCw, Plus, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2, ExternalLink, FileText, BarChart3, Eye, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { scanReports } from '../data/mockData';

interface Props {
  onViewReport: (reportId: string) => void;
}

export default function CodeReusabilityLanding({ onViewReport }: Props) {
  const { hasCompletedScan, setShowGenerateModal, scanInProgress, showToast } = useApp();

  if (!hasCompletedScan && !scanInProgress) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
              <a href="#">SETUP</a><span className="sep">›</span>
              <a href="#">Code Intelligence</a><span className="sep">›</span>
              <span>Code Reusability</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={18} color="white" />
              </div>
              <h1 className="sf-page-title">Code Reusability</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="sf-btn" disabled><Download size={14} /> Download PDF</button>
            <button className="sf-btn"><RefreshCw size={14} /> Refresh</button>
            <button className="sf-btn sf-btn-primary" onClick={() => setShowGenerateModal(true)}>
              <Plus size={14} /> Generate Reuse Report
            </button>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div className="sf-card sf-empty-state" style={{ padding: '80px 40px' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e1f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <BarChart3 size={32} color="#0176d3" />
            </div>
            <h3>Understand which code should be reused, standardized, or retired</h3>
            <p>Run a Code Reuse scan to detect duplicate and near-duplicate code patterns, surface recommended reusable standards, and track improvement over time.</p>
            <button className="sf-btn sf-btn-primary" style={{ padding: '10px 24px', fontSize: 14 }} onClick={() => setShowGenerateModal(true)}>
              Generate Reuse Report
            </button>
          </div>
          <div className="sf-card" style={{ marginTop: 20, padding: 20 }}>
            <h3 className="sf-section-title">Scan History</h3>
            <div style={{ color: '#706e6b', fontSize: 13, padding: '20px 0', textAlign: 'center' }}>
              No Code Reuse reports generated yet.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (scanInProgress) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
              <a href="#">SETUP</a><span className="sep">›</span>
              <a href="#">Code Intelligence</a><span className="sep">›</span>
              <span>Code Reusability</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={18} color="white" />
              </div>
              <h1 className="sf-page-title">Code Reusability</h1>
            </div>
          </div>
        </div>
        <div className="sf-card" style={{ marginTop: 20, padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #e5e5e5', borderTopColor: '#0176d3', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 16, marginBottom: 8 }}>Analyzing code patterns...</h3>
          <p style={{ color: '#706e6b', fontSize: 13 }}>Scanning Apex, Triggers, LWC JS, and SOQL patterns across Northstar Retail Group</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const latestReport = scanReports[0];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
            <a href="#">SETUP</a><span className="sep">›</span>
            <a href="#">Code Intelligence</a><span className="sep">›</span>
            <span>Code Reusability</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={18} color="white" />
            </div>
            <h1 className="sf-page-title">Code Reusability</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="sf-btn" onClick={() => showToast('PDF download started', 'info')}><Download size={14} /> Download PDF</button>
          <button className="sf-btn" onClick={() => onViewReport(latestReport.id)}><Eye size={14} /> View Full Report</button>
          <button className="sf-btn sf-btn-primary" onClick={() => setShowGenerateModal(true)}>
            <Plus size={14} /> Generate Reuse Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginTop: 20 }}>
        <div className="sf-stat-card" onClick={() => onViewReport(latestReport.id)}>
          <span className="stat-label">Code Reuse Health Score</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="stat-value">78</span>
            <span className="stat-delta positive">▲ +9 vs previous</span>
          </div>
        </div>
        <div className="sf-stat-card" onClick={() => onViewReport(latestReport.id)}>
          <span className="stat-label">High-Priority Reuse Opportunities</span>
          <span className="stat-value">12</span>
        </div>
        <div className="sf-stat-card" onClick={() => onViewReport(latestReport.id)}>
          <span className="stat-label">Recommended Reusable Standards</span>
          <span className="stat-value">7</span>
        </div>
        <div className="sf-stat-card" onClick={() => onViewReport(latestReport.id)}>
          <span className="stat-label">Lower-Value Variants</span>
          <span className="stat-value">19</span>
        </div>
        <div className="sf-stat-card" onClick={() => onViewReport(latestReport.id)}>
          <span className="stat-label">Surfaces Analyzed</span>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#444', marginTop: 4 }}>Apex, Triggers, LWC JS, SOQL</div>
        </div>
      </div>

      {/* Three Insight Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 16 }}>
        <div className="sf-insight-col">
          <div className="col-header">
            <CheckCircle2 size={18} color="#2e844a" />
            <span>What Improved</span>
          </div>
          {[
            { icon: '📉', text: 'Duplicate pricing rule variants reduced', detail: 'Period: Last 4 weeks' },
            { icon: '✓', text: 'Shared address validation standard adopted', detail: 'Period: Last 4 weeks' },
            { icon: '🔗', text: '4 lower-value trigger helpers consolidated', detail: 'Period: Last 4 weeks' },
          ].map((item, i) => (
            <div key={i} className="col-item" onClick={() => onViewReport(latestReport.id)}>
              <div>
                <span className="item-title">{item.text}</span>
                <div style={{ fontSize: 11, color: '#706e6b', marginTop: 2 }}>{item.detail}</div>
              </div>
              <ArrowUpRight size={14} color="#0176d3" style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>
        <div className="sf-insight-col">
          <div className="col-header">
            <AlertTriangle size={18} color="#fe9339" />
            <span>What Needs Attention</span>
          </div>
          {[
            { text: 'Opportunity scoring logic still duplicated across 5 classes', detail: 'Period: Last 4 weeks' },
            { text: 'Quote sync REST wrappers remain fragmented', detail: 'Period: Last 4 weeks' },
            { text: 'No preferred reusable standard for renewal processors', detail: 'Period: Last 4 weeks' },
          ].map((item, i) => (
            <div key={i} className="col-item" onClick={() => onViewReport(latestReport.id)}>
              <div>
                <span className="item-title">{item.text}</span>
                <div style={{ fontSize: 11, color: '#706e6b', marginTop: 2 }}>{item.detail}</div>
              </div>
              <ArrowUpRight size={14} color="#0176d3" style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>
        <div className="sf-insight-col">
          <div className="col-header">
            <Lightbulb size={18} color="#0176d3" />
            <span>Recommended Actions</span>
          </div>
          {[
            { text: 'Review Pricing Rules Calculator Variants', detail: 'High Priority' },
            { text: 'Standardize Address Validation Service Family', detail: 'Medium Priority' },
            { text: 'Retire Legacy Lead Scoring Utils', detail: 'Low Priority' },
          ].map((item, i) => (
            <div key={i} className="col-item" onClick={() => onViewReport(latestReport.id)}>
              <div>
                <span className="item-title">{item.text}</span>
                <div style={{ fontSize: 11, color: '#706e6b', marginTop: 2 }}>{item.detail}</div>
              </div>
              <ArrowUpRight size={14} color="#0176d3" style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Latest Scan Metadata */}
      <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
        <h3 className="sf-section-title">Latest Scan Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontSize: 13 }}>
          {[
            ['Report Name', latestReport.name],
            ['Requested By', latestReport.requestedBy],
            ['Requested Date', latestReport.requestedDate],
            ['Start Time', latestReport.startTime],
            ['End Time', latestReport.endTime],
            ['Environment', latestReport.environment],
            ['Org ID', latestReport.orgId],
            ['Scope', latestReport.scope.join(', ')],
            ['Runtime Enrichment', latestReport.runtimeEnrichment],
            ['Report Version', latestReport.reportVersion],
            ['Status', latestReport.status],
          ].map(([label, value], i) => (
            <div key={i} style={{ padding: '6px 0' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
              <div style={{ color: '#181818', marginTop: 2 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scan History */}
      <div className="sf-card" style={{ marginTop: 16, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 className="sf-section-title" style={{ margin: 0 }}>Scan History</h3>
          <button className="sf-btn sf-btn-primary sf-btn-sm" onClick={() => setShowGenerateModal(true)}>
            <Plus size={12} /> New Report
          </button>
        </div>
        <table className="sf-table">
          <thead>
            <tr>
              <th></th>
              <th>Report Name</th>
              <th>Requestor</th>
              <th>Requested Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Score</th>
              <th>Delta</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scanReports.map(report => (
              <tr key={report.id} onClick={() => report.status === 'Complete' && onViewReport(report.id)}>
                <td><FileText size={14} color="#706e6b" /></td>
                <td style={{ color: '#0176d3', fontWeight: 500, maxWidth: 320 }}>{report.name}</td>
                <td>{report.requestedBy}</td>
                <td style={{ fontSize: 12 }}>{report.requestedDate}</td>
                <td style={{ fontSize: 12 }}>{report.startTime}</td>
                <td style={{ fontSize: 12 }}>{report.endTime}</td>
                <td style={{ fontWeight: 700 }}>{report.score ?? '—'}</td>
                <td>
                  {report.scoreDelta !== null ? (
                    <span className={`stat-delta ${report.scoreDelta > 0 ? 'positive' : 'negative'}`}>
                      {report.scoreDelta > 0 ? '+' : ''}{report.scoreDelta}
                    </span>
                  ) : '—'}
                </td>
                <td>
                  <span className={`sf-badge ${
                    report.status === 'Complete' ? 'sf-badge-complete' :
                    report.status === 'In Progress' ? 'sf-badge-progress' :
                    report.status === 'Failed' ? 'sf-badge-failed' :
                    'sf-badge-draft'
                  }`}>{report.status}</span>
                </td>
                <td onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {report.status === 'Complete' && (
                      <>
                        <button className="sf-btn-icon" title="Open" onClick={() => onViewReport(report.id)}>
                          <ExternalLink size={14} color="#0176d3" />
                        </button>
                        <button className="sf-btn-icon" title="Download PDF" onClick={() => showToast('PDF download started', 'info')}>
                          <Download size={14} color="#706e6b" />
                        </button>
                      </>
                    )}
                    {report.status === 'Failed' && (
                      <button className="sf-btn-icon" title="Re-run" onClick={() => setShowGenerateModal(true)}>
                        <RotateCcw size={14} color="#706e6b" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
