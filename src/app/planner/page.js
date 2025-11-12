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
                    <button className='w-10' type="submit"><img className='w-10' src='down-arrow-5-svgrepo-com.svg'></img></button>
                </form>
            </search>


            <search>
                <form className='flex'>
                    <label></label>
                    <input className='border' type="search" placeholder='end'></input>
                    <button className='w-10' type="submit"><img className='w-6 ml-2' src='circle-dashed-svgrepo-com.svg'></img></button>
                </form>
            </search>

            <form action="/action_page.php">
                <label for="route-type">Route Type: </label>
                <select name="route-type" id="route-type">
                    <option value="one-way">One-Way</option>
                    <option value="round-trip">Round-Trip</option>
                </select>
            </form>

            <form action="/action_page.php">
                <label for="mode">Mode: </label>
                <select name="mode" id="mode">
                    <option value="walking">Walking</option>
                    <option value="biking">Biking</option>
                </select>
            </form>

            <search>
                <form className='flex'>
                    <label for="time">Time: </label>
                    <input className='border w-15' id="time" value="20"></input>
                    <label for="time">min</label>
                </form>
            </search>

            <search>
                <form className='flex'>
                    <label for="distance">Distance: </label>
                    <input className='border w-15' id="distance" value="1"></input>
                    <label for="distance">km</label>
                </form>
            </search>

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
    const mapRef = useRef(null);

    useEffect(() => {

        var location = [13.404954, 52.520008];
        if ("geolocation" in window.navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // location = new maplibregl.LngLat(position.coords.longitude, position.coords.latitude);
                location = [position.coords.longitude, position.coords.latitude];
            });
        }

        if (!mapContainer.current) return;

        const tilesURL = 'https://tiles.openfreemap.org/styles/liberty';

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current, // container id
            style: tilesURL, // style URL
            center: location, // starting position [lng, lat]
            zoom: 8, // starting zoom
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



        return () => mapRef.current?.remove(); // cleanup on unmount
    }, []); // dependency array

    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '80vh' }}
        />
    );
}
