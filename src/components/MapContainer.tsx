import { forwardRef } from 'react';

export const MapContainer = forwardRef<HTMLDivElement>((_, ref) => (
  <div 
    ref={ref} 
    style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden' 
    }} 
  />
));