import { Style, Fill, Stroke } from 'ol/style';

export const MAP_STYLES = {
  standard: new Style({
    stroke: new Stroke({ color: '#2c3e50', width: 0.5 }),
    fill: new Fill({ color: 'rgba(46, 204, 113, 0.4)' }),
  }),
  sponge: new Style({
    stroke: new Stroke({ color: '#1b5e20', width: 1 }),
    fill: new Fill({ color: 'rgba(39, 174, 96, 0.8)' }),
  }),
  riskHigh: new Style({
    fill: new Fill({ color: 'rgba(231, 76, 60, 0.7)' }),
    stroke: new Stroke({ color: '#fff', width: 0.5 })
  }),
  riskLow: new Style({
    fill: new Fill({ color: 'rgba(52, 152, 219, 0.7)' }),
    stroke: new Stroke({ color: '#fff', width: 0.5 })
  }),
  selection: new Style({
    stroke: new Stroke({
      color: '#00ccff',
      width: 4,
    }),
    fill: new Fill({
      color: 'rgba(0, 204, 255, 0.2)',
    }),
  }),
};