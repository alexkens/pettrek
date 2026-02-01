'use client'

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Planner() {
    const [routeData, setRouteData] = useState(null);

    return (
        <div className="flex gap-1">
            <Sidebar onRouteCreated={setRouteData}></Sidebar>
            <Map routeData={routeData} />
        </div>
    );
}

function Sidebar({ onRouteCreated }) {
    const [formData, setFormData] = useState({
        start: '',
        end: '',
        routeType: 'one-way',
        mode: 'walking',
        time: '20',
        distance: '1'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!formData.start) {
            setMessage('Start address is required');
            setLoading(false);
            return;
        }

        if (formData.routeType === 'one-way' && !formData.end) {
            setMessage('End address is required for one-way routes');
            setLoading(false);
            return;
        }

        if (formData.routeType === 'round-trip' && !formData.time) {
            setMessage('Time is required for round-trip routes');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/routes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    start: formData.start,
                    end: formData.routeType === 'one-way' ? formData.end : null,
                    routeType: formData.routeType,
                    mode: formData.mode,
                    time: formData.routeType === 'round-trip' ? parseInt(formData.time) : 0,
                    distance: formData.routeType === 'one-way' ? parseInt(formData.distance) : 0
                })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`Route saved! Found ${data.dogParks.length} dog parks nearby.`);
                onRouteCreated({
                    start: data.coordinates?.start,
                    end: data.coordinates?.end,
                    dogParks: data.dogParks,
                    distance: data.calculatedDistance,
                    duration: data.duration,
                    routeType: data.routeType,
                    mode: data.mode,
                    routeCoordinates: data.routeCoordinates
                });
            } else {
                setMessage(data.error || 'Error saving route');
            }
        } catch (error) {
            setMessage('Error saving route: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className='w-[38.2%] flex flex-col items-center gap-4 my-6'>
            <search>
                <form className='flex'>
                    <label></label>
                    <input 
                        className='border' 
                        type="search" 
                        placeholder='start'
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                    ></input>
                    <button className='w-10' type="button"><img className='w-10' src='down-arrow-5-svgrepo-com.svg'></img></button>
                </form>
            </search>


            <search>
                <form className='flex'>
                    <label></label>
                    <input 
                        className='border' 
                        type="search" 
                        placeholder='end'
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        disabled={formData.routeType === 'round-trip'}
                        required={formData.routeType === 'one-way'}
                    ></input>
                    <button className='w-10' type="button"><img className='w-6 ml-2' src='circle-dashed-svgrepo-com.svg'></img></button>
                </form>
            </search>

            <form>
                <label htmlFor="routeType">Route Type: </label>
                <select 
                    name="routeType" 
                    id="routeType"
                    value={formData.routeType}
                    onChange={handleChange}
                >
                    <option value="one-way">One-Way</option>
                    <option value="round-trip">Round-Trip</option>
                </select>
            </form>

            <form>
                <label htmlFor="mode">Mode: </label>
                <select 
                    name="mode" 
                    id="mode"
                    value={formData.mode}
                    onChange={handleChange}
                >
                    <option value="walking">Walking</option>
                    <option value="biking">Biking</option>
                </select>
            </form>

            <search>
                <form className='flex'>
                    <label htmlFor="time">Time: </label>
                    <input 
                        className='border w-15' 
                        id="time" 
                        name="time"
                        type="number"
                        value={formData.time}
                        onChange={handleChange}
                        required={formData.routeType === 'round-trip'}
                    ></input>
                    <label htmlFor="time">min</label>
                </form>
            </search>

            {formData.routeType === 'one-way' && (
                <search>
                    <form className='flex'>
                        <label htmlFor="distance">Distance: </label>
                        <input 
                            className='border w-15' 
                            id="distance" 
                            name="distance"
                            type="number"
                            value={formData.distance}
                            onChange={handleChange}
                        ></input>
                        <label htmlFor="distance">km</label>
                    </form>
                </search>
            )}

            <button 
                onClick={handleSubmit} 
                disabled={loading}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
            >
                {loading ? 'Saving...' : 'Save Route'}
            </button>

            {message && (
                <div className={`text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </div>
            )}

            <div id='stats'>
                <h1 className='text-center'>stats</h1>
                <hr></hr>
                <div className='flex gap-4'>
                    <div id='time'>
                        <img></img>
                        <div id='value'>0 min</div>
                    </div>
                    <div id='distance'>
                        <img></img>
                        <div id='value'>0 m</div>
                    </div>
                    <div id='high'>
                        <img></img>
                        <div id='value'>0 m</div>
                    </div>
                    <div id='low'>
                        <img></img>
                        <div id='value'>0 m</div>
                    </div>
                </div>
                <hr></hr>
            </div>
        </aside>
    );
}

function Map({ routeData }) {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const [dogParks, setDogParks] = useState([]);

    // Load dog parks data on component mount
    useEffect(() => {
        fetch('/data/berlinDogParks.json')
            .then(res => res.json())
            .then(data => setDogParks(data))
            .catch(err => console.error('Failed to load dog parks:', err));
    }, []);

    useEffect(() => {
        var location = [13.404954, 52.520008];
        if ("geolocation" in window.navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                location = [position.coords.longitude, position.coords.latitude];
            });
        }

        if (!mapContainer.current) return;

        const tilesURL = 'https://tiles.openfreemap.org/styles/liberty';

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            style: tilesURL,
            center: location,
            zoom: 8,
            maplibreLogo: true,
        });

        let popup = new maplibregl.Popup({closeOnClick: true})
            .setText("Home")
            .setLngLat(location)
            .addTo(mapRef.current);

        let marker = new maplibregl.Marker({
            color: "#facdfb",
            draggable: true,
        })
            .setLngLat(location)
            .addTo(mapRef.current);

        return () => mapRef.current?.remove();
    }, []);

    // Display all dog parks from the start
    useEffect(() => {
        if (!mapRef.current || dogParks.length === 0) return;

        const map = mapRef.current;

        const addDogParksLayer = () => {
            if (map.getSource('all-dog-parks')) {
                if (map.getLayer('all-dog-parks')) {
                    map.removeLayer('all-dog-parks');
                }
                map.removeSource('all-dog-parks');
            }

            map.addSource('all-dog-parks', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: dogParks.map(park => ({
                        type: 'Feature',
                        properties: { name: park.name },
                        geometry: {
                            type: 'Point',
                            coordinates: [park.longitude, park.latitude]
                        }
                    }))
                }
            });

            map.addLayer({
                id: 'all-dog-parks',
                type: 'circle',
                source: 'all-dog-parks',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#f59e0b',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            map.on('click', 'all-dog-parks', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name;

                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<strong>${name}</strong>`)
                    .addTo(map);
            });

            map.on('mouseenter', 'all-dog-parks', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'all-dog-parks', () => {
                map.getCanvas().style.cursor = '';
            });
        };

        if (map.isStyleLoaded()) {
            addDogParksLayer();
        } else {
            map.on('load', addDogParksLayer);
        }

        return () => {
            if (map.off) {
                map.off('load', addDogParksLayer);
            }
        };

    }, [dogParks]);

    // Display route when routeData changes
    useEffect(() => {
        if (!mapRef.current || !routeData) return;

        const map = mapRef.current;

        if (map.getSource('route-line')) {
            map.removeLayer('route-line');
            map.removeSource('route-line');
        }
        if (map.getSource('start-point')) {
            map.removeLayer('start-point');
            map.removeSource('start-point');
        }
        if (map.getSource('end-point')) {
            map.removeLayer('end-point');
            map.removeSource('end-point');
        }
        if (map.getSource('dog-parks')) {
            map.removeLayer('dog-parks');
            map.removeSource('dog-parks');
        }

        const { start, end, dogParks: routeDogParks, routeCoordinates } = routeData;

        if (!start) return;

        const lineCoordinates = routeCoordinates && routeCoordinates.length > 0
            ? routeCoordinates
            : (start && end ? [[start.lon, start.lat], [end.lon, end.lat]] : null);

        if (lineCoordinates) {
            map.addSource('route-line', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: lineCoordinates
                    }
                }
            });

            map.addLayer({
                id: 'route-line',
                type: 'line',
                source: 'route-line',
                paint: {
                    'line-color': '#3b82f6',
                    'line-width': 3
                }
            });
        }

        map.addSource('start-point', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [start.lon, start.lat]
                }
            }
        });

        map.addLayer({
            id: 'start-point',
            type: 'circle',
            source: 'start-point',
            paint: {
                'circle-radius': 8,
                'circle-color': '#10b981',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });

        if (end) {
            map.addSource('end-point', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [end.lon, end.lat]
                    }
                }
            });

            map.addLayer({
                id: 'end-point',
                type: 'circle',
                source: 'end-point',
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#ef4444',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

            const bounds = [
                [Math.min(start.lon, end.lon), Math.min(start.lat, end.lat)],
                [Math.max(start.lon, end.lon), Math.max(start.lat, end.lat)]
            ];
            map.fitBounds(bounds, { padding: 50 });
        } else {
            // For round-trip, just center on start
            map.flyTo({ center: [start.lon, start.lat], zoom: 12 });
        }

        // Add dog parks markers (specific to this route) - highlighted in red
        if (routeDogParks && routeDogParks.length > 0) {
            map.addSource('dog-parks', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: routeDogParks.map(park => ({
                        type: 'Feature',
                        properties: { name: park.name },
                        geometry: {
                            type: 'Point',
                            coordinates: [park.longitude, park.latitude]
                        }
                    }))
                }
            });

            map.addLayer({
                id: 'dog-parks',
                type: 'circle',
                source: 'dog-parks',
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#ef0000',
                    'circle-stroke-width': 3,
                    'circle-stroke-color': '#ffffff'
                }
            }, 'all-dog-parks'); // Add on top of all-dog-parks

            // Show popups on click
            map.on('mouseenter', 'dog-parks', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'dog-parks', () => {
                map.getCanvas().style.cursor = '';
            });

            map.on('click', 'dog-parks', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const name = e.features[0].properties.name;

                new maplibregl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<strong>${name}</strong> (on this route)`)
                    .addTo(map);
            });
        }

    }, [routeData]);

    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '80vh' }}
        />
    );
}
