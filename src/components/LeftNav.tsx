import { useState } from 'react';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavSection {
  label: string;
  expanded?: boolean;
  children?: { label: string; id: string }[];
}

const navSections: NavSection[] = [
  { label: 'Environments' },
  { label: 'Development' },
  { label: 'Integrations' },
  {
    label: 'Performance',
    expanded: true,
    children: [
      { label: 'Scale Center', id: 'scale-center' },
      { label: 'Scale Insights', id: 'scale-insights' },
      { label: 'Scale Test', id: 'scale-test' },
    ],
  },
  {
    label: 'Code Intelligence',
    expanded: true,
    children: [
      { label: 'ApexGuru', id: 'apexguru' },
      { label: 'Code Reusability', id: 'code-reusability' },
      { label: 'Code Modernisation', id: 'code-modernisation' },
    ],
  },
];

export default function LeftNav() {
  const { activePage, setActivePage } = useApp();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Performance': true,
    'Code Intelligence': true,
  });
  const [searchVal, setSearchVal] = useState('');

  const toggleSection = (label: string) => {
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <nav style={{
      width: 220,
      minWidth: 220,
      background: 'white',
      borderRight: '1px solid #e5e5e5',
      height: '100%',
      overflowY: 'auto',
      padding: '12px 0',
    }}>
      <div style={{ padding: '0 12px 12px', position: 'relative' }}>
        <Search size={14} color="#706e6b" style={{ position: 'absolute', left: 20, top: 8 }} />
        <input
          type="text"
          placeholder="Quick Find"
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 8px 6px 32px',
            border: '1px solid #e5e5e5',
            borderRadius: 4,
            fontSize: 12,
            outline: 'none',
            background: '#f8f8f8',
          }}
        />
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#706e6b', padding: '8px 16px 4px', letterSpacing: 0.8, textTransform: 'uppercase' }}>
        Platform Tools
      </div>
      {navSections.map(section => {
        const isExp = expanded[section.label] ?? false;
        const hasChildren = section.children && section.children.length > 0;

        if (searchVal && !section.label.toLowerCase().includes(searchVal.toLowerCase()) &&
            !(section.children || []).some(c => c.label.toLowerCase().includes(searchVal.toLowerCase()))) {
          return null;
        }

        return (
          <div key={section.label}>
            <div
              onClick={() => hasChildren && toggleSection(section.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '7px 16px',
                cursor: hasChildren ? 'pointer' : 'default',
                fontSize: 13,
                fontWeight: 600,
                color: '#181818',
                transition: 'background 150ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f8f8f8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {hasChildren ? (
                isExp ? <ChevronDown size={14} color="#706e6b" /> : <ChevronRight size={14} color="#706e6b" />
              ) : (
                <ChevronRight size={14} color="#c9c7c5" />
              )}
              {section.label}
            </div>
            {hasChildren && isExp && (
              <div>
                {section.children!.map(child => {
                  const isActive = activePage === child.id;
                  if (searchVal && !child.label.toLowerCase().includes(searchVal.toLowerCase())) return null;
                  return (
                    <div
                      key={child.id}
                      onClick={() => setActivePage(child.id)}
                      style={{
                        padding: '7px 16px 7px 36px',
                        fontSize: 13,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? '#0176d3' : '#444',
                        background: isActive ? '#e1f0ff' : 'transparent',
                        borderLeft: isActive ? '3px solid #0176d3' : '3px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 150ms',
                      }}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = '#f8f8f8'; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      {child.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
