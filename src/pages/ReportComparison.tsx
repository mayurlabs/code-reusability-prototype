import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Plus, Minus, CheckCircle2, AlertTriangle } from 'lucide-react';
import { scoreHistory } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  onBack: () => void;
}

export default function ReportComparison({ onBack }: Props) {
  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>SETUP</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Intelligence</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Reusability</a><span className="sep">›</span>
          <span>Compare Reports</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="sf-btn-icon" onClick={onBack}><ArrowLeft size={18} color="#706e6b" /></button>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={18} color="white" />
          </div>
          <h1 className="sf-page-title" style={{ fontSize: 18 }}>Compare Reports</h1>
        </div>
      </div>

      {/* Reports Being Compared */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, marginTop: 20, alignItems: 'center' }}>
        <div className="sf-card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#706e6b', textTransform: 'uppercase', marginBottom: 8 }}>Previous Report</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#444' }}>Mar 2026 Pre-Release Reuse Review</div>
          <div style={{ fontSize: 12, color: '#706e6b', marginTop: 4 }}>Mar 12, 2026 08:44 AM UTC</div>
          <div style={{ fontSize: 42, fontWeight: 700, color: '#706e6b', marginTop: 12 }}>69</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#2e844a' }}>▲</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#2e844a' }}>+9</span>
        </div>
        <div className="sf-card" style={{ padding: 20, textAlign: 'center', borderColor: '#0176d3', borderWidth: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0176d3', textTransform: 'uppercase', marginBottom: 8 }}>Current Report</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#181818' }}>Mar 2026 Code Reuse Report - Northstar Retail Group</div>
          <div style={{ fontSize: 12, color: '#706e6b', marginTop: 4 }}>Mar 26, 2026 09:19 AM UTC</div>
          <div style={{ fontSize: 42, fontWeight: 700, color: '#0176d3', marginTop: 12 }}>78</div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="sf-card" style={{ padding: 20, marginTop: 16 }}>
        <h4 className="sf-section-title">Score Trend Over Time</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={scoreHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#706e6b' }} />
            <YAxis domain={[50, 90]} tick={{ fontSize: 12, fill: '#706e6b' }} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#0176d3" strokeWidth={3} dot={{ r: 5, fill: '#0176d3' }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Changes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <div className="sf-card" style={{ padding: 20 }}>
          <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2e844a' }}>
            <CheckCircle2 size={16} /> What Improved
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {[
              '3 pricing-rule duplicates reduced',
              '2 reusable standards newly identified',
              '4 lower-value variants moved toward retirement',
              'Fewer repeated patterns in Revenue Cloud Platform',
              'Address validation standard now adopted by Core CRM',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#f0faf4', borderRadius: 4, fontSize: 13 }}>
                <Plus size={14} color="#2e844a" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sf-card" style={{ padding: 20 }}>
          <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fe9339' }}>
            <AlertTriangle size={16} /> New Issues Detected
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {[
              'Quote sync REST wrappers remain fragmented',
              'Renewal normalization helpers still duplicated',
              '1 new high-priority cluster in quote services',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#fef4e8', borderRadius: 4, fontSize: 13 }}>
                <Minus size={14} color="#fe9339" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resolved Clusters */}
      <div className="sf-card" style={{ padding: 20, marginTop: 16 }}>
        <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendingUp size={16} color="#2e844a" /> Resolved / Reduced Clusters
        </h4>
        <table className="sf-table">
          <thead>
            <tr>
              <th>Cluster</th>
              <th>Previous State</th>
              <th>Current State</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Pricing Rules Calculator Variants', prev: '5 variants', curr: '3 active (2 marked for retirement)', change: 'Improved' },
              { name: 'Legacy Lead Scoring Utilities', prev: '5 variants', curr: '3 variants', change: 'Reduced' },
              { name: 'Address Validation Service Family', prev: 'No standard defined', curr: 'Standard candidate identified', change: 'Improved' },
              { name: 'Sales Forecast Rollup Utilities', prev: '4 duplicates', curr: '3 duplicates (1 consolidated)', change: 'Reduced' },
            ].map((row, i) => (
              <tr key={i} style={{ cursor: 'default' }}>
                <td style={{ color: '#0176d3', fontWeight: 500 }}>{row.name}</td>
                <td>{row.prev}</td>
                <td>{row.curr}</td>
                <td>
                  <span className="sf-badge sf-badge-complete">{row.change}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="sf-btn" onClick={onBack}><ArrowLeft size={14} /> Back to Report</button>
      </div>
    </div>
  );
}
