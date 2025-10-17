import Link from 'next/link'
import backgroundImage from "../../public/stock_dog_medium.jpg";
import GlobalConfig from './app.config.js'

export default function Home() {
  return (
        <div className="flex flex-col items-center text-fontPrimary text-center font-doggie">
            
            <Hero />
            <Features />
            <MobileApp />
            <Footer />

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
                <img className="h-10 rounded-lg p-1 absolute left-0" src="/pettrek_logo.png"></img>

                <ul className="flex justify-center items-center gap-3">
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="">About</a></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><Link href="/planner">Planner</Link></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="">Login</a></li>
                    <li className="px-2 hover:outline-[1px] rounded-md"><a href="">Imprint</a></li>
                </ul>
            </nav>

            <div className='bg-primary h-[1px] w-[100%] opacity-80'></div>

            <div className="py-40">
                <h1 className="text-6xl">Welcome to Pettrek!</h1>
                <h2>Your intergalactical Dog Walking Site!</h2>
            </div>

            <div className="m-4 text-2xl underline decoration-2 underline-offset-4">
                <Link className='border border-white rounded-md py-2 px-6' href="/planner">Planner</Link>
            </div>
        </div>
    );
}

function Features() {
    return (
        <div className="py-10 text-black">
            <h1>Features</h1>
        </div>
    );
}

function MobileApp() {
    return (
        <div className="py-10 text-black">
            MobileApp
        </div>
    );
}

function Footer() {
    return (
        <div className="py-10 text-black">
            Footer
        </div>
    );
}