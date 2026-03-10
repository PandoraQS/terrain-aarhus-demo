import type { FeatureInfo } from '../types';

export const FeatureCard = ({ info }: { info: FeatureInfo }) => (
  <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '10px', border: '1px solid #ddd' }}>
    <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold' }}>SELECTED ASSET</div>
    <div style={{ fontSize: '14px', fontWeight: 'bold', margin: '4px 0' }}>{info.name}</div>
    <div style={{ fontSize: '12px', color: '#444' }}>Type: {info.type}</div>
    <div style={{ fontSize: '12px', color: '#1a73e8', fontWeight: 'bold' }}>Surface: {info.area}</div>
  </div>
);