import { useEffect, useRef, useState, useCallback } from 'react';
import { Map, View, Feature } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { getArea } from 'ol/sphere';
import { Geometry } from 'ol/geom';
import { MAP_STYLES } from '../styles/MapStyles';
import type { ViewMode, FeatureInfo } from '../types';

export const useMap = (mapElement: React.RefObject<HTMLDivElement | null>) => {
    const [featureCount, setFeatureCount] = useState(0);
    const [selectedInfo, setSelectedInfo] = useState<FeatureInfo | null>(null);

    const mapRef = useRef<Map | null>(null);
    const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
    const selectionLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

    useEffect(() => {
        if (!mapElement.current) return;

        const vectorSource = new VectorSource({
            url: '/aarhus-data.json',
            format: new GeoJSON(),
            useSpatialIndex: true,
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: MAP_STYLES.standard,
            declutter: true,
        });

        const selectionSource = new VectorSource();
        const selectionLayer = new VectorLayer({
            source: selectionSource,
            style: (MAP_STYLES as any).selection,
            zIndex: 10,
        });

        vectorLayerRef.current = vectorLayer;
        selectionLayerRef.current = selectionLayer;

        const map = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({ source: new OSM(), opacity: 0.5 }),
                vectorLayer,
                selectionLayer
            ],
            view: new View({
                center: fromLonLat([10.2039, 56.1629]),
                zoom: 13
            }),
        });

        mapRef.current = map;

        map.on('pointermove', (evt) => {
            const hit = map.hasFeatureAtPixel(evt.pixel, { hitTolerance: 2 });
            map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });

        vectorSource.on('featuresloadend', () => {
            const features = vectorSource.getFeatures();
            setFeatureCount(features.length);
            features.forEach(f => {
                const geom = f.getGeometry();
                if (geom instanceof Geometry) {
                    f.set('area', getArea(geom));
                    f.setGeometry(geom.simplify(2));
                }
            });
        });

        map.on('singleclick', (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f, { hitTolerance: 3 });
            selectionSource.clear();

            if (feature instanceof Feature) {
                selectionSource.addFeature(feature);

                const area = feature.get('area');
                setSelectedInfo({
                    name: feature.get('name') || 'Unnamed Area',
                    area: area > 10000 ? (area / 10000).toFixed(2) + ' ha' : Math.round(area) + ' m²',
                    type: (feature.get('landuse') || feature.get('leisure') || 'Greenery').toUpperCase()
                });
            } else {
                setSelectedInfo(null);
            }
        });

        return () => map.setTarget(undefined);
    }, [mapElement]);

    const updateStyle = useCallback((viewMode: ViewMode) => {
        if (!vectorLayerRef.current) return;

        if (viewMode === 'risk') {
            vectorLayerRef.current.setStyle((f) =>
                (f.get('area') || 0) < 10000 ? MAP_STYLES.riskHigh : MAP_STYLES.riskLow
            );
        } else {
            vectorLayerRef.current.setStyle(MAP_STYLES[viewMode as 'standard' | 'sponge']);
        }
    }, []);

    return { featureCount, selectedInfo, setSelectedInfo, updateStyle };
};