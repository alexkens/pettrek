'use client'

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Planner() {
    return (
        <div className="flex gap-1">
            <Sidebar></Sidebar>
            <Map />
        </div>
    );
}

function Sidebar() {
    return (
        <aside className='w-[38.2%] flex flex-col items-center gap-4 my-6'>
            <search>
                <form className='flex'>
                    <label></label>
                    <input className='border' type="search" placeholder='start'></input>
                    <button className='w-10' type="submit"><img src='pettrek_logo.png'></img></button>
                </form>
            </search>

            <search>
                <form className='flex'>
                    <label></label>
                    <input className='border' type="search" placeholder='end'></input>
                    <button className='w-10' type="submit"><img src='pettrek_logo.png'></img></button>
                </form>
            </search>

            <div className='flex'>
                <h2>Route Type</h2>
                <select type='radio'></select>
            </div>

            <div className='flex'>
                <h2>Mode</h2>
                <select type='radio'></select>
            </div>

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
