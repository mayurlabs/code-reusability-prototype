import { useState } from 'react';
import { Download, GitCompare, Share2, ArrowLeft, Search, TrendingUp, BarChart3 } from 'lucide-react';
import { clusters, scanReports, scoreHistory, surfaceDistribution, clusterTypeDistribution } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface Props {
  reportId: string;
  onBack: () => void;
  onClusterClick: (clusterId: string) => void;
  onCompare: () => void;
  onPdfPreview: () => void;
}

export default function ReportDashboard({ reportId, onBack, onClusterClick, onCompare, onPdfPreview }: Props) {
  const { showToast } = useApp();
  const report = scanReports.find(r => r.id === reportId) || scanReports[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [surfaceFilter, setSurfaceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredClusters = clusters.filter(c => {
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (surfaceFilter !== 'All' && !c.surface.toLowerCase().includes(surfaceFilter.toLowerCase())) return false;
    if (typeFilter !== 'All' && c.type !== typeFilter) return false;
    if (priorityFilter !== 'All' && c.runtimePriority !== priorityFilter) return false;
    return true;
  });

  const recClass = (rec: string) => {
    const map: Record<string, string> = {
      'Standardize': 'standardize',
      'Review': 'review',
      'Consolidate': 'consolidate',
      'Retire Variant': 'retire',
      'Monitor': 'monitor',
    };
    return map[rec] || '';
  };

  const priClass = (pri: string) => {
    return pri.toLowerCase() === 'n/a' ? 'na' : pri.toLowerCase();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <div className="sf-breadcrumb" style={{ marginBottom: 6 }}>
            <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>SETUP</a><span className="sep">›</span>
            <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Intelligence</a><span className="sep">›</span>
            <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Code Reusability</a><span className="sep">›</span>
            <span style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{report.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="sf-btn-icon" onClick={onBack}><ArrowLeft size={18} color="#706e6b" /></button>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={18} color="white" />
            </div>
            <h1 className="sf-page-title" style={{ fontSize: 18 }}>Reuse Report</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="sf-btn" onClick={onPdfPreview}><Download size={14} /> Download PDF</button>
          <button className="sf-btn" onClick={onCompare}><GitCompare size={14} /> Compare to Previous</button>
          <button className="sf-btn" onClick={() => showToast('Report link copied to clipboard', 'info')}><Share2 size={14} /> Share Summary</button>
        </div>
      </div>

      {/* Report Header Band */}
      <div className="sf-card" style={{ padding: '16px 20px', marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0176d3' }}>{report.score}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#706e6b', textTransform: 'uppercase' }}>Score</div>
          </div>
          <div style={{ width: 1, height: 40, background: '#e5e5e5' }} />
          <div>
            <span className="stat-delta positive" style={{ fontSize: 14 }}>▲ +{report.scoreDelta} vs previous</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#706e6b' }}>
          <div><span style={{ fontWeight: 600 }}>By:</span> {report.requestedBy}</div>
          <div><span style={{ fontWeight: 600 }}>Generated:</span> {report.endTime}</div>
          <div><span style={{ fontWeight: 600 }}>Compared to:</span> Mar 12, 2026 08:44 AM UTC</div>
          <div><span style={{ fontWeight: 600 }}>Runtime:</span> Supported for Apex server-side</div>
        </div>
      </div>

      {/* Score Explanation */}
      <div className="sf-card" style={{ padding: 20, marginTop: 14 }}>
        <h3 className="sf-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={16} color="#2e844a" />
          Why the score improved
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 8 }}>
          {[
            { text: '3 previously repeated pricing logic variants were consolidated', delta: '+3', positive: true },
            { text: '2 preferred reusable candidates were defined', delta: '+2', positive: true },
            { text: '4 low-value variants were marked for retirement', delta: '+1', positive: true },
            { text: '1 new high-priority duplicate cluster detected in quote sync services', delta: '-1', positive: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: item.positive ? '#f0faf4' : '#fef4e8', borderRadius: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: item.positive ? '#2e844a' : '#b86e00', minWidth: 28 }}>{item.delta}</span>
              <span style={{ fontSize: 13, color: '#444' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity Bucket Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 14 }}>
        {[
          { label: 'Exact Duplicates', value: 8, color: '#ea001e' },
          { label: 'Near Duplicates', value: 14, color: '#fe9339' },
          { label: 'Pattern Families', value: 11, color: '#0176d3' },
          { label: 'High Runtime Priority', value: 6, color: '#9050e9' },
          { label: 'Low-Value Variants', value: 19, color: '#706e6b' },
        ].map((b, i) => (
          <div key={i} className="sf-stat-card" style={{ borderTop: `3px solid ${b.color}` }}>
            <span className="stat-label">{b.label}</span>
            <span className="stat-value" style={{ color: b.color }}>{b.value}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="sf-filter-bar" style={{ marginTop: 16 }}>
        <select className="sf-select" value={surfaceFilter} onChange={e => setSurfaceFilter(e.target.value)}>
          <option value="All">All Surfaces</option>
          <option value="Apex">Apex</option>
          <option value="Trigger">Triggers</option>
          <option value="LWC">LWC JS/TS</option>
        </select>
        <select className="sf-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option>Exact Duplicate</option>
          <option>Near Duplicate</option>
          <option>Pattern Family</option>
        </select>
        <select className="sf-select" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <div className="search-input" style={{ position: 'relative' }}>
          <Search size={14} color="#706e6b" style={{ position: 'absolute', left: 10, top: 7 }} />
          <input
            type="text"
            placeholder="Search clusters..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '6px 12px 6px 32px', border: '1px solid #e5e5e5', borderRadius: 4, fontSize: 12 }}
          />
        </div>
      </div>

      {/* Cluster Table */}
      <div className="sf-card" style={{ marginTop: 8 }}>
        <table className="sf-table">
          <thead>
            <tr>
              <th>Cluster Name</th>
              <th>Surface</th>
              <th>Type</th>
              <th>Similarity</th>
              <th>Members</th>
              <th>Runtime Priority</th>
              <th>Recommendation</th>
              <th>Owner</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredClusters.map(cluster => (
              <tr key={cluster.id} onClick={() => onClusterClick(cluster.id)}>
                <td style={{ color: '#0176d3', fontWeight: 500 }}>{cluster.name}</td>
                <td><span className="cluster-type-badge">{cluster.surface}</span></td>
                <td style={{ fontSize: 12 }}>{cluster.type}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{cluster.similarityRange}</td>
                <td style={{ textAlign: 'center' }}>{cluster.memberCount}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`priority-dot ${priClass(cluster.runtimePriority)}`} />
                    {cluster.runtimePriority}
                  </div>
                </td>
                <td><span className={`recommendation-badge ${recClass(cluster.recommendation)}`}>{cluster.recommendation}</span></td>
                <td style={{ fontSize: 12 }}>{cluster.owner}</td>
                <td style={{ fontSize: 12 }}>{cluster.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 16 }}>
        <div className="sf-card" style={{ padding: 20 }}>
          <h4 className="sf-section-title">Score Trend</h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#706e6b' }} />
              <YAxis domain={[50, 90]} tick={{ fontSize: 11, fill: '#706e6b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#0176d3" strokeWidth={2} dot={{ r: 4, fill: '#0176d3' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="sf-card" style={{ padding: 20 }}>
          <h4 className="sf-section-title">Cluster Type Distribution</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={clusterTypeDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {clusterTypeDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="sf-card" style={{ padding: 20 }}>
          <h4 className="sf-section-title">Duplication by Surface</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={surfaceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#706e6b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#706e6b' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#0176d3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="sf-card" style={{ padding: 16, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#9050e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>✦</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Ask Code Intelligence</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            'Which repeated patterns should I standardize first?',
            'Show me low-value variants I can retire',
            'Compare active pricing logic implementations',
            'What changed since the last report?',
          ].map((prompt, i) => (
            <button
              key={i}
              className="sf-btn sf-btn-sm"
              style={{ background: '#f8f0ff', borderColor: '#e0d0f0', color: '#6b3fa0', fontSize: 12 }}
              onClick={() => onClusterClick(clusters[0].id)}
            >
              ✦ {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
