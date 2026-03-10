import { ControlPanel } from './ControlPanel';
import { FeatureCard } from './FeatureCard';
import type { ViewMode, FeatureInfo } from '../types';

interface SidebarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedInfo: FeatureInfo | null;
  featureCount: number;
}

export const Sidebar = ({ viewMode, setViewMode, selectedInfo, featureCount }: SidebarProps) => (
  <aside style={{
    position: 'absolute', top: 20, left: 20, zIndex: 10,
    background: 'rgba(255, 255, 255, 0.95)', padding: '24px', borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)', width: '280px', fontFamily: 'sans-serif'
  }}>
    <h2 style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 800 }}>Terrain Engine</h2>
    <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#666' }}>Atomic Refactor</p>

    <ControlPanel currentMode={viewMode} onModeChange={setViewMode} />

    {selectedInfo && <FeatureCard info={selectedInfo} />}

    <div style={{ marginTop: '15px', fontSize: '11px', color: '#aaa', textAlign: 'center' }}>
      <b>{featureCount}</b> assets optimized
    </div>
  </aside>
);