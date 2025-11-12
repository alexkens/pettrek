import Link from 'next/link'
import backgroundImage from "../../public/stock_dog_medium.jpg";
import GlobalConfig from './app.config.js'

export default function Home() {
  return (
        <div className="flex flex-col items-center text-fontPrimary text-center font-doggie">
            
            <Hero />
            <Features />
            <MobileApp />
            
        </div>
    );
}

function Hero() {
    return (
        <div id="hero" className="w-full"
        style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundColor: GlobalConfig.primary,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "multiply",
        }}>
            <nav className="flex justify-center h-10">
                <a href='/'><img className="h-10 rounded-lg p-1 absolute left-0" src="/pettrek_logo.png"></img></a>

                <ul className="flex justify-center items-center gap-3">
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="">About</a></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><Link href="/planner" target='_blank'>Planner</Link></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="/routes">Routes</a></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="/account/routes">MyRoutes</a></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="/account">Login</a></li>
                </ul>
            </nav>

            <div className='bg-primary h-[1px] w-[100%] opacity-80'></div>

            <div className="py-40">
                <h1 className="text-6xl">Welcome to Pettrek!</h1>
                <h2>Your intergalactical Dog Walking Site!</h2>
            </div>

            <div className="m-4 text-2xl underline decoration-2 underline-offset-4">
                <Link className='border border-white rounded-md py-2 px-6' href="/planner" target='_blank'>Planner</Link>
            </div>
        </div>
    );
}

function Features() {
    return (
        <div className="py-6 w-full flex flex-col items-center gap-8"
        style={{
            backgroundColor: GlobalConfig.primary,
            color: 'black',
        }}>
            <h1 className='text-4xl text-shadow-md'>Features</h1>
            <div className='grid grid-cols-3 gap-20'>

                <Card title="Route Planner" description="A planner without limits. It got geolocations, a database, routes modes, etc. You are able to just type in a distance or a timeframe and it will automatically find out the best route for you." />

                <Card title="Share and Explore" description="Share your own, carefully administrated routes with the pettrek community. But also explore the sheer immeasurable value of the pettrek community and its many many routes. Easy viewable in the route planner, just click on the 'Share' tab and find out what works best for you and your 4-legged friend." />

                <Card title="Route Types" description="There fundamentally two different route types: one-way routes and two-way routes. But we are conscious that most users will be using a two-way route, since you want mostly to come home." />

            </div>
        </div>
    );
}

function Card({ title, description }) {
    return (
        <div className='flex flex-col w-70 p-6 gap-4 rounded-xl shadow-md' style={{
            backgroundColor: GlobalConfig.secondary,
        }}>
            <h2 className='text-xl font-bold'>{title}</h2>
            <div className='flex justify-center text-justify'>{description}</div>
        </div>
    )
}

function MobileApp() {
    return (
        <div className="w-full py-6 text-black flex flex-col gap-6 items-center" style={{
            backgroundColor: GlobalConfig.secondary,
        }}>
            <h1 className='text-4xl text-shadow-md'>Mobile App</h1>
            <p className='w-160'>Next comming up, the pettrek app! - Accompanying you and your 4-legged friend/s on your daily adventures!</p>
            <a href='#' target='_blank' className='hover:text-white active:outline active:text-black p-2 rounded-full'>Link to App</a>
        </div>
    );
}