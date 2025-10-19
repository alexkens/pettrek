'use client'

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Planner() {
    return (
        <div>
            <div>dumelang my banana pie jizzers!</div>
            <Map />
        </div>
    );
}

function Map() {
    const mapContainer = useRef(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.versatiles.org/assets/styles/colorful/style.json',
            center: [0, 0],
            zoom: 3
        });

        return () => map.remove(); // cleanup on unmount
    }, []);

    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '80vh' }}
        />
    );
}
