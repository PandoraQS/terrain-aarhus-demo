import type { ViewMode } from '../types';

interface Props {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ControlPanel = ({ currentMode, onModeChange }: Props) => (
  <div style={{ display: 'flex', gap: '4px', background: '#eee', padding: '4px', borderRadius: '8px', marginBottom: '20px' }}>
    {(['standard', 'sponge', 'risk'] as ViewMode[]).map((m) => (
      <button 
        key={m} 
        onClick={() => onModeChange(m)} 
        style={{
          flex: 1, padding: '8px 2px', fontSize: '10px', cursor: 'pointer', border: 'none', borderRadius: '6px',
          background: currentMode === m ? '#1a73e8' : 'transparent',
          color: currentMode === m ? 'white' : '#555',
          fontWeight: 'bold', transition: '0.2s'
        }}
      >
        {m.toUpperCase()}
      </button>
    ))}
  </div>
);