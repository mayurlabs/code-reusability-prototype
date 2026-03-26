import { Search, Star, ChevronDown, Plus, HelpCircle, Bell, Settings, Home } from 'lucide-react';

export default function GlobalHeader() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 44,
      padding: '0 16px',
      background: 'white',
      borderBottom: '1px solid #e5e5e5',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
          <path d="M11.7 3.6c.7-1.5 2.2-2.5 4-2.5 1.5 0 2.8.7 3.6 1.8.7-.3 1.4-.5 2.2-.5 3 0 5.4 2.4 5.4 5.4 0 3-2.4 5.4-5.4 5.4-.4 0-.8 0-1.2-.1-.7 1.5-2.2 2.5-4 2.5-1 0-1.9-.3-2.6-.9-.8 1.8-2.6 3-4.7 3-2.4 0-4.4-1.6-5-3.8-.3.1-.7.1-1 .1C1.4 14 0 12.6 0 10.9c0-1.3.8-2.5 2-3-.3-.6-.5-1.3-.5-2C1.5 3.6 3.4 1.7 5.8 1.7c1.4 0 2.6.6 3.4 1.6.7-.4 1.5-.6 2.3-.6l.2.9z" fill="#00A1E0"/>
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, maxWidth: 480, margin: '0 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          background: '#f4f6f9',
          borderRadius: 4,
          padding: '5px 12px',
          gap: 8,
        }}>
          <Search size={14} color="#706e6b" />
          <input
            type="text"
            placeholder="Search Setup..."
            style={{
              border: 'none',
              background: 'transparent',
              flex: 1,
              fontSize: 13,
              outline: 'none',
              color: '#444',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[Star, Plus, Home, HelpCircle, Settings, Bell].map((Icon, i) => (
          <button key={i} className="sf-btn-icon" style={{ padding: 6 }}>
            <Icon size={16} color="#706e6b" />
          </button>
        ))}
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: '#0176d3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 12,
          fontWeight: 700,
          marginLeft: 4,
        }}>PR</div>
      </div>
    </header>
  );
}

export function SetupHeader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 40,
      padding: '0 16px',
      background: 'white',
      borderBottom: '1px solid #e5e5e5',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 4,
          background: '#0176d3', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="8" y="1" width="5" height="5" rx="1"/><rect x="1" y="8" width="5" height="5" rx="1"/><rect x="8" y="8" width="5" height="5" rx="1"/></svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#181818' }}>Setup</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0176d3', borderBottom: '3px solid #0176d3', paddingBottom: 8, paddingTop: 8 }}>Home</span>
        <span style={{ fontSize: 13, color: '#706e6b' }}>Object Manager</span>
        <ChevronDown size={14} color="#706e6b" />
      </div>
    </div>
  );
}
