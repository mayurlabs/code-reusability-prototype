import { ArrowLeft, Download, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  onBack: () => void;
}

export default function PdfPreview({ onBack }: Props) {
  const { showToast } = useApp();

  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>SETUP</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Intelligence</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Reusability</a><span className="sep">›</span>
          <span>PDF Report Preview</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="sf-btn-icon" onClick={onBack}><ArrowLeft size={18} color="#706e6b" /></button>
            <h1 className="sf-page-title" style={{ fontSize: 18 }}>PDF Report Preview</h1>
          </div>
          <button className="sf-btn sf-btn-primary" onClick={() => showToast('PDF download started', 'success')}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* PDF Preview Container */}
      <div style={{ maxWidth: 720, margin: '20px auto', background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', borderRadius: 8, overflow: 'hidden' }}>
        {/* Cover Page */}
        <div style={{ padding: '60px 48px', background: 'linear-gradient(135deg, #0176d3 0%, #014486 100%)', color: 'white', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <BarChart3 size={28} color="white" />
          </div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.8, marginBottom: 8 }}>ApexGuru Code Reusability</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Code Reuse Report</h1>
          <div style={{ fontSize: 16, opacity: 0.9 }}>Northstar Retail Group</div>
          <div style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>March 2026</div>
        </div>

        {/* Content */}
        <div style={{ padding: '40px 48px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: '2px solid #0176d3', paddingBottom: 8, marginBottom: 20 }}>Executive Summary</h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#444', marginBottom: 16 }}>
            This report presents the results of a Code Reuse scan conducted for Northstar Retail Group's production Salesforce org. The scan analyzed Apex classes and methods, trigger handlers, LWC JavaScript/TypeScript utilities, and SOQL patterns to identify duplicate and near-duplicate code implementations.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#444', marginBottom: 24 }}>
            The overall Code Reuse Health Score improved to <strong>78</strong> (+9 from the previous scan), reflecting successful consolidation of pricing rule variants, adoption of the address validation standard, and identification of new reusable candidate patterns.
          </p>

          <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: '2px solid #0176d3', paddingBottom: 8, marginBottom: 20, marginTop: 32 }}>Score &amp; Trend</h2>
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <div style={{ textAlign: 'center', padding: 20, background: '#f4f6f9', borderRadius: 8 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: '#0176d3' }}>78</div>
              <div style={{ fontSize: 12, color: '#706e6b', fontWeight: 600 }}>Current Score</div>
            </div>
            <div style={{ textAlign: 'center', padding: 20, background: '#f0faf4', borderRadius: 8 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#2e844a' }}>+9</div>
              <div style={{ fontSize: 12, color: '#706e6b', fontWeight: 600 }}>vs Previous</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: 20 }}>
              {['Jan: 62', 'Feb: 65', 'Mar 12: 69', 'Mar 26: 78'].map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: '#444', display: 'flex', justifyContent: 'space-between', maxWidth: 120 }}>
                  <span>{item.split(':')[0]}</span>
                  <span style={{ fontWeight: 700 }}>{item.split(':')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: '2px solid #0176d3', paddingBottom: 8, marginBottom: 20, marginTop: 32 }}>Top Reuse Opportunities</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
                <th style={{ textAlign: 'left', padding: 8, color: '#706e6b' }}>Cluster</th>
                <th style={{ textAlign: 'left', padding: 8, color: '#706e6b' }}>Type</th>
                <th style={{ textAlign: 'left', padding: 8, color: '#706e6b' }}>Priority</th>
                <th style={{ textAlign: 'left', padding: 8, color: '#706e6b' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pricing Rules Calculator Variants', 'Near Duplicate', 'High', 'Standardize'],
                ['Address Validation Service Family', 'Pattern Family', 'Medium', 'Standardize'],
                ['Quote Sync REST Wrapper Patterns', 'Near Duplicate', 'High', 'Review'],
                ['Discount Approval Threshold Evaluators', 'Near Duplicate', 'High', 'Standardize'],
                ['Legacy Lead Scoring Utilities', 'Exact Duplicate', 'Low', 'Retire Variant'],
              ].map(([name, type, pri, rec], i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 8, color: '#0176d3', fontWeight: 500 }}>{name}</td>
                  <td style={{ padding: 8 }}>{type}</td>
                  <td style={{ padding: 8 }}>{pri}</td>
                  <td style={{ padding: 8, fontWeight: 600 }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: '2px solid #0176d3', paddingBottom: 8, marginBottom: 20, marginTop: 32 }}>Audit Metadata</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
            {[
              ['Report Name', 'Mar 2026 Code Reuse Report - Northstar Retail Group'],
              ['Requested By', 'Priya Raman'],
              ['Generated', 'Mar 26, 2026 09:19 AM UTC'],
              ['Environment', 'Production'],
              ['Org ID', '00D8A00000NRG42UAG'],
              ['Report Version', 'v1.4'],
            ].map(([label, value], i) => (
              <div key={i} style={{ padding: '4px 0' }}>
                <span style={{ color: '#706e6b', fontWeight: 600 }}>{label}:</span>{' '}
                <span style={{ color: '#181818' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
