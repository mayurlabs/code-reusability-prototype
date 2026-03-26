import { useState } from 'react';
import { ArrowLeft, BarChart3, Star, CheckCircle2, AlertTriangle, XCircle, Eye, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { clusters } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  clusterId: string;
  onBack: () => void;
}

export default function ClusterDetail({ clusterId, onBack }: Props) {
  const { showToast } = useApp();
  const cluster = clusters.find(c => c.id === clusterId) || clusters[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());
  const [compareLeft, setCompareLeft] = useState<string | null>(null);
  const [compareRight, setCompareRight] = useState<string | null>(null);

  const toggleMemberExpand = (memberId: string) => {
    setExpandedMembers(prev => {
      const next = new Set(prev);
      if (next.has(memberId)) next.delete(memberId);
      else next.add(memberId);
      return next;
    });
  };

  const matchTypeColor = (type: string) => {
    switch (type) {
      case 'identical': return { bg: 'transparent', border: 'transparent', label: '' };
      case 'similar': return { bg: '#e6f7ec', border: '#b8e6c8', label: 'Similar' };
      case 'different': return { bg: '#fef4e8', border: '#f5d9a8', label: 'Different' };
      case 'unique': return { bg: '#e1f0ff', border: '#b3d7f5', label: 'Unique' };
      default: return { bg: 'transparent', border: 'transparent', label: '' };
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'members', label: 'Members' },
    { id: 'compare', label: 'Compare' },
    { id: 'runtime', label: 'Runtime Signals' },
    { id: 'rationale', label: 'Recommendation Rationale' },
    { id: 'related', label: 'Related Insights' },
  ];

  const badgeColor = (badge: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      'Preferred Candidate': { bg: '#e6f7ec', color: '#2e844a' },
      'Consolidate': { bg: '#fef4e8', color: '#b86e00' },
      'Retire Variant': { bg: '#fde8ea', color: '#ea001e' },
      'Review': { bg: '#e1f0ff', color: '#0176d3' },
    };
    return map[badge] || { bg: '#f0f0f0', color: '#706e6b' };
  };

  const recClass = (rec: string) => {
    const map: Record<string, string> = { 'Standardize': 'standardize', 'Review': 'review', 'Consolidate': 'consolidate', 'Retire Variant': 'retire', 'Monitor': 'monitor' };
    return map[rec] || '';
  };

  const usageChartData = cluster.members.map(m => ({
    name: m.name.split('.')[0].replace(/([A-Z])/g, ' $1').trim().substring(0, 20),
    '30d': m.invocations30d,
    '90d': m.invocations90d,
  }));

  return (
    <div>
      <div style={{ marginBottom: 4 }}>
        <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>SETUP</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Intelligence</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Reusability</a><span className="sep">›</span>
          <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Reuse Report</a><span className="sep">›</span>
          <span>{cluster.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="sf-btn-icon" onClick={onBack}><ArrowLeft size={18} color="#706e6b" /></button>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={18} color="white" />
          </div>
          <h1 className="sf-page-title" style={{ fontSize: 18 }}>{cluster.name}</h1>
        </div>
      </div>

      {/* Header Badges */}
      <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
        {[
          { label: 'Cluster Type', value: cluster.type },
          { label: 'Similarity', value: cluster.similarityRange },
          { label: 'Members', value: String(cluster.memberCount) },
          { label: 'Runtime Priority', value: cluster.runtimePriority },
          { label: 'Recommendation', value: cluster.recommendation, badge: true },
        ].map((item, i) => (
          <div key={i} style={{ padding: '8px 14px', background: 'white', border: '1px solid #e5e5e5', borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase', letterSpacing: 0.4 }}>{item.label}</span>
            {item.badge ? (
              <span className={`recommendation-badge ${recClass(item.value)}`} style={{ fontSize: 12 }}>{item.value}</span>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 600, color: '#181818' }}>{item.value}</span>
            )}
          </div>
        ))}
        <div style={{ padding: '8px 14px', background: '#e6f7ec', border: '1px solid #c8e6d5', borderRadius: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#2e844a', textTransform: 'uppercase', letterSpacing: 0.4 }}>Preferred Candidate</span>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#2e844a', fontFamily: 'monospace' }}>{cluster.preferredCandidate}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sf-tab-bar" style={{ marginTop: 20 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`sf-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="sf-card" style={{ padding: 20 }}>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#444' }}>{cluster.sharedIntent}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="sf-card" style={{ padding: 20 }}>
              <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={15} color="#fe9339" /> Why This Matters
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: 13, color: '#444', lineHeight: 1.8 }}>
                {cluster.whyItMatters.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="sf-card" style={{ padding: 20 }}>
              <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={15} color="#0176d3" /> Where It Appears
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: 13, color: '#444', lineHeight: 1.8 }}>
                {cluster.whereItAppears.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="sf-card" style={{ padding: 20 }}>
            <h4 className="sf-section-title">Estimated Rationalization Opportunity</h4>
            <p style={{ fontSize: 14, color: '#181818', fontWeight: 500 }}>{cluster.estimatedReduction}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="sf-btn" onClick={() => setActiveTab('compare')}>Compare Members</button>
            <button className="sf-btn" onClick={() => setActiveTab('runtime')}>View Runtime Signals</button>
            <button className="sf-btn" onClick={() => setActiveTab('rationale')}>View Recommendation Rationale</button>
            <button className="sf-btn" onClick={() => showToast('Cluster summary exported', 'success')}>Export Cluster Summary</button>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cluster.members.map(member => {
            const bc = badgeColor(member.badge);
            return (
              <div key={member.id} className="sf-card" style={{ padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 600, color: '#0176d3' }}>{member.name}</span>
                    <span style={{ padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: bc.bg, color: bc.color }}>{member.badge}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#706e6b' }}>
                    <span><span style={{ fontWeight: 600 }}>Surface:</span> {member.surface}</span>
                    <span><span style={{ fontWeight: 600 }}>Owner:</span> {member.owner}</span>
                    <span><span style={{ fontWeight: 600 }}>Modified:</span> {member.lastModified}</span>
                    <span><span style={{ fontWeight: 600 }}>LOC:</span> {member.loc}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase' }}>Usage</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: member.usageState === 'Active' ? '#2e844a' : member.usageState === 'Low Value' ? '#ea001e' : '#444' }}>{member.usageState}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase' }}>Similarity</div>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{member.similarity}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'compare' && (
        <div>
          <div className="sf-card" style={{ padding: 20, marginBottom: 16 }}>
            <h4 className="sf-section-title">Shared Intent</h4>
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>{cluster.sharedIntent}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="sf-card" style={{ padding: 20 }}>
              <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={15} color="#2e844a" /> Common Logic Blocks
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: 13, color: '#444', lineHeight: 1.8 }}>
                {cluster.commonBlocks.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div className="sf-card" style={{ padding: 20 }}>
              <h4 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <XCircle size={15} color="#ea001e" /> Key Differences
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: 13, color: '#444', lineHeight: 1.8 }}>
                {cluster.differences.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          </div>

          {/* Code Legend */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 11, fontWeight: 600, color: '#706e6b' }}>
            <span>LINE HIGHLIGHTING:</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#e6f7ec', border: '1px solid #b8e6c8' }} /> Similar logic</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#fef4e8', border: '1px solid #f5d9a8' }} /> Different logic</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: '#e1f0ff', border: '1px solid #b3d7f5' }} /> Unique to this implementation</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 12, height: 12, borderRadius: 2, background: 'transparent', border: '1px solid #e5e5e5' }} /> Identical</span>
          </div>

          {/* Implementation Comparison Table with Expandable Code */}
          {cluster.members.length > 0 && (
            <div className="sf-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className="sf-section-title" style={{ margin: 0 }}>Implementation Comparison</h4>
                <span style={{ fontSize: 11, color: '#706e6b' }}>Click any implementation to inspect code</span>
              </div>
              <table className="sf-table" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th style={{ width: 28 }}></th>
                    <th>Implementation</th>
                    <th>Surface</th>
                    <th>LOC</th>
                    <th>Similarity</th>
                    <th>Usage State</th>
                    <th>Dependencies</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cluster.members.map(m => {
                    const bc = badgeColor(m.badge);
                    const isExpanded = expandedMembers.has(m.id);
                    const hasCode = m.codeLines && m.codeLines.length > 0;
                    return (
                      <>
                        <tr key={m.id} onClick={() => hasCode && toggleMemberExpand(m.id)} style={{ cursor: hasCode ? 'pointer' : 'default' }}>
                          <td style={{ textAlign: 'center', fontSize: 12, color: '#706e6b' }}>
                            {hasCode && (isExpanded ? '▼' : '▶')}
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#0176d3' }}>{m.name.split('(')[0]}()</td>
                          <td>{m.surface}</td>
                          <td>{m.loc}</td>
                          <td style={{ fontFamily: 'monospace' }}>{m.similarity}%</td>
                          <td style={{ color: m.usageState === 'Active' ? '#2e844a' : m.usageState === 'Low Value' ? '#ea001e' : '#444', fontWeight: 600 }}>{m.usageState}</td>
                          <td style={{ fontSize: 12 }}>{m.badge === 'Preferred Candidate' ? 'Low fan-out' : m.badge === 'Retire Variant' ? 'High fan-out' : 'Medium fan-out'}</td>
                          <td><span style={{ padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: bc.bg, color: bc.color }}>{m.badge}</span></td>
                        </tr>
                        {isExpanded && hasCode && (
                          <tr key={`${m.id}-code`} style={{ cursor: 'default' }}>
                            <td colSpan={8} style={{ padding: 0, background: '#1e1e1e' }}>
                              <div style={{ padding: '12px 16px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#9cdcfe', fontWeight: 600 }}>{m.name}</span>
                                <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                                  <span style={{ color: '#6a9955' }}>● {m.codeLines!.filter(l => l.matchType === 'identical').length} identical</span>
                                  <span style={{ color: '#4ec9b0' }}>● {m.codeLines!.filter(l => l.matchType === 'similar').length} similar</span>
                                  <span style={{ color: '#ce9178' }}>● {m.codeLines!.filter(l => l.matchType === 'different').length} different</span>
                                  <span style={{ color: '#569cd6' }}>● {m.codeLines!.filter(l => l.matchType === 'unique').length} unique</span>
                                </div>
                              </div>
                              <div style={{ overflowX: 'auto' }}>
                                {m.codeLines!.map(line => {
                                  const mtc = matchTypeColor(line.matchType);
                                  return (
                                    <div
                                      key={line.lineNum}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'stretch',
                                        fontFamily: "'Courier New', Consolas, monospace",
                                        fontSize: 12,
                                        lineHeight: '20px',
                                        background: line.matchType === 'identical' ? 'transparent' :
                                          line.matchType === 'similar' ? 'rgba(78, 201, 176, 0.1)' :
                                          line.matchType === 'different' ? 'rgba(206, 145, 120, 0.15)' :
                                          'rgba(86, 156, 214, 0.1)',
                                        borderLeft: line.matchType === 'identical' ? '3px solid transparent' :
                                          line.matchType === 'similar' ? '3px solid #4ec9b0' :
                                          line.matchType === 'different' ? '3px solid #ce9178' :
                                          '3px solid #569cd6',
                                      }}
                                    >
                                      <span style={{ width: 44, textAlign: 'right', paddingRight: 12, color: '#858585', userSelect: 'none', flexShrink: 0 }}>{line.lineNum}</span>
                                      <span style={{ color: '#d4d4d4', whiteSpace: 'pre', paddingRight: 16, flex: 1 }}>{line.text}</span>
                                      {line.matchType !== 'identical' && (
                                        <span style={{
                                          fontSize: 10,
                                          fontWeight: 600,
                                          padding: '0 8px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          color: line.matchType === 'similar' ? '#4ec9b0' :
                                            line.matchType === 'different' ? '#ce9178' : '#569cd6',
                                          flexShrink: 0,
                                          textTransform: 'uppercase',
                                          letterSpacing: 0.5,
                                        }}>
                                          {mtc.label}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Side-by-Side Comparison */}
          {cluster.members.filter(m => m.codeLines && m.codeLines.length > 0).length >= 2 && (
            <div className="sf-card" style={{ padding: 20, marginTop: 16 }}>
              <h4 className="sf-section-title">Side-by-Side Code Comparison</h4>
              <p style={{ fontSize: 12, color: '#706e6b', marginBottom: 12 }}>Select two implementations to compare their code line by line.</p>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label className="sf-label">Left Implementation</label>
                  <select
                    className="sf-select"
                    style={{ width: '100%' }}
                    value={compareLeft || ''}
                    onChange={e => setCompareLeft(e.target.value || null)}
                  >
                    <option value="">Select implementation...</option>
                    {cluster.members.filter(m => m.codeLines && m.codeLines.length > 0).map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="sf-label">Right Implementation</label>
                  <select
                    className="sf-select"
                    style={{ width: '100%' }}
                    value={compareRight || ''}
                    onChange={e => setCompareRight(e.target.value || null)}
                  >
                    <option value="">Select implementation...</option>
                    {cluster.members.filter(m => m.codeLines && m.codeLines.length > 0).map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {compareLeft && compareRight && (() => {
                const left = cluster.members.find(m => m.id === compareLeft);
                const right = cluster.members.find(m => m.id === compareRight);
                if (!left?.codeLines || !right?.codeLines) return null;
                const maxLines = Math.max(left.codeLines.length, right.codeLines.length);
                const leftBc = badgeColor(left.badge);
                const rightBc = badgeColor(right.badge);
                return (
                  <div style={{ border: '1px solid #e5e5e5', borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      <div style={{ padding: '10px 16px', background: '#fafbfc', borderBottom: '1px solid #e5e5e5', borderRight: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#0176d3' }}>{left.name.split('(')[0]}()</span>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: leftBc.bg, color: leftBc.color }}>{left.badge}</span>
                      </div>
                      <div style={{ padding: '10px 16px', background: '#fafbfc', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#0176d3' }}>{right.name.split('(')[0]}()</span>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: rightBc.bg, color: rightBc.color }}>{right.badge}</span>
                      </div>
                    </div>
                    {Array.from({ length: maxLines }).map((_, i) => {
                      const ll = left.codeLines![i];
                      const rl = right.codeLines![i];
                      const linesMatch = ll && rl && ll.text === rl.text;
                      const linesDiffer = ll && rl && ll.text !== rl.text;
                      return (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #f0f0f0' }}>
                          <div style={{
                            display: 'flex',
                            fontFamily: "'Courier New', Consolas, monospace",
                            fontSize: 11,
                            lineHeight: '20px',
                            borderRight: '1px solid #e5e5e5',
                            background: !ll ? '#f8f8f8' :
                              linesMatch ? 'transparent' :
                              linesDiffer ? '#fef4e8' :
                              ll.matchType === 'unique' ? '#e1f0ff' : 'transparent',
                          }}>
                            {ll && (
                              <>
                                <span style={{ width: 36, textAlign: 'right', paddingRight: 8, color: '#b0b0b0', flexShrink: 0, userSelect: 'none' }}>{ll.lineNum}</span>
                                <span style={{ color: '#333', whiteSpace: 'pre', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ll.text}</span>
                              </>
                            )}
                          </div>
                          <div style={{
                            display: 'flex',
                            fontFamily: "'Courier New', Consolas, monospace",
                            fontSize: 11,
                            lineHeight: '20px',
                            background: !rl ? '#f8f8f8' :
                              linesMatch ? 'transparent' :
                              linesDiffer ? '#fef4e8' :
                              rl.matchType === 'unique' ? '#e1f0ff' : 'transparent',
                          }}>
                            {rl && (
                              <>
                                <span style={{ width: 36, textAlign: 'right', paddingRight: 8, color: '#b0b0b0', flexShrink: 0, userSelect: 'none' }}>{rl.lineNum}</span>
                                <span style={{ color: '#333', whiteSpace: 'pre', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rl.text}</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          <div className="sf-card" style={{ padding: 16, marginTop: 16, background: '#f0faf4', border: '1px solid #c8e6d5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Star size={16} color="#2e844a" fill="#2e844a" />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#2e844a' }}>Recommended Reusable Standard</span>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#181818', marginBottom: 4 }}>{cluster.preferredCandidate}</div>
            <div style={{ fontSize: 12, color: '#444' }}>Highest runtime usage • Cleanest shared policy integration • Lowest duplication overhead</div>
          </div>
        </div>
      )}

      {activeTab === 'runtime' && cluster.members.length > 0 && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cluster.members.map(member => (
              <div key={member.id} className="sf-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: '#0176d3' }}>{member.name}</span>
                  <span style={{
                    padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: member.runtimeConfidence === 'High' ? '#e6f7ec' : member.runtimeConfidence === 'Medium' ? '#fef4e8' : '#fde8ea',
                    color: member.runtimeConfidence === 'High' ? '#2e844a' : member.runtimeConfidence === 'Medium' ? '#b86e00' : '#ea001e',
                  }}>
                    Confidence: {member.runtimeConfidence}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
                  {[
                    { label: 'Invocations (30d)', value: member.invocations30d.toLocaleString() },
                    { label: 'Invocations (90d)', value: member.invocations90d.toLocaleString() },
                    { label: 'Active Paths', value: String(member.activePaths) },
                    { label: 'Last Observed', value: member.lastObserved },
                    { label: 'Runtime State', value: member.usageState },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase', letterSpacing: 0.3 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#181818', marginTop: 2 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="sf-card" style={{ padding: 20, marginTop: 16 }}>
            <h4 className="sf-section-title">Usage Comparison (Invocations)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={usageChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#706e6b' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#706e6b' }} width={120} />
                <Tooltip />
                <Bar dataKey="30d" fill="#0176d3" name="30-day" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'rationale' && (
        <div>
          <div className="sf-card" style={{ padding: 24 }}>
            <h4 className="sf-section-title" style={{ fontSize: 16 }}>
              Why ApexGuru recommends <span style={{ color: '#0176d3', fontFamily: 'monospace' }}>{cluster.preferredCandidate}</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {cluster.rationale.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: '#f0faf4', borderRadius: 6 }}>
                  <CheckCircle2 size={16} color="#2e844a" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: '#181818', lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sf-card" style={{ padding: 24, marginTop: 16 }}>
            <h4 className="sf-section-title">Recommended Next Steps</h4>
            <ol style={{ paddingLeft: 24, fontSize: 13, color: '#444', lineHeight: 2.2 }}>
              {cluster.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button className="sf-btn sf-btn-primary" onClick={() => showToast('Marked as preferred reusable candidate', 'success')}>
              <Star size={14} /> Mark as Preferred Standard
            </button>
            <button className="sf-btn" onClick={() => showToast('Added to cleanup candidate list', 'success')}>
              Consolidate Variants
            </button>
            <button className="sf-btn" style={{ borderColor: '#ea001e', color: '#ea001e' }} onClick={() => showToast('Marked for retirement', 'success')}>
              Retire Lower-Value Variants
            </button>
          </div>
        </div>
      )}

      {activeTab === 'related' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: <TrendingUp size={16} color="#ea001e" />, title: 'ApexGuru: QuotePricingHelper CPU Hotspot', desc: 'This cluster member was flagged as a CPU hotspot in the latest ApexGuru analysis.', type: 'ApexGuru Insight' },
            { icon: <ArrowUpRight size={16} color="#0176d3" />, title: 'Code Modernisation: Replace legacy pricing admin helper', desc: 'LegacyPriceCalcService was identified as a modernisation candidate for migration to shared service pattern.', type: 'Modernisation Candidate' },
            { icon: <TrendingDown size={16} color="#fe9339" />, title: 'Related Cluster: Discount Approval Threshold Evaluators', desc: 'Similar discount and pricing logic pattern detected in a separate cluster.', type: 'Related Cluster' },
          ].map((item, i) => (
            <div key={i} className="sf-card" style={{ padding: 16, display: 'flex', gap: 12, cursor: 'pointer' }} onClick={() => showToast('Navigating to related insight...', 'info')}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f4f6f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0176d3' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#706e6b', marginTop: 2 }}>{item.desc}</div>
                <div style={{ fontSize: 11, color: '#9050e9', marginTop: 4, fontWeight: 600 }}>{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
