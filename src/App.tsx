import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { MapContainer } from './components/MapContainer';
import { Sidebar } from './components/Sidebar';
import { useMap } from './hooks/useMap';
import type { ViewMode } from './types';

const App = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  
  const { featureCount, selectedInfo, updateStyle } = useMap(mapElement);

  useEffect(() => {
    updateStyle(viewMode);
  }, [viewMode, updateStyle]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <MapContainer ref={mapElement} />
      
      <Sidebar 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        selectedInfo={selectedInfo} 
        featureCount={featureCount} 
      />
    </div>
  );
};

export default App;