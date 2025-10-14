export default function Home() {
  return (
        <div className="flex flex-col items-center text-fontPrimary text-center font-doggie">
            <div id="hero" className="w-full">
                <nav className="flex justify-center h-10">
                    <img className="h-10 rounded-lg p-1 absolute left-0" src="/pettrek_logo.png"></img>

                    <ul className="flex justify-center items-center gap-3">
                        <li className="px-2 hover:outline-[1px] rounded-md"><a href="">About</a></li>
                        <li className="px-2 hover:outline-[1px] rounded-md"><a href="">Product</a></li>
                        <li className="px-2 hover:outline-[1px] rounded-md"><a href="">Login</a></li>
                        <li className="px-2 hover:outline-[1px] rounded-md"><a href="">Imprint</a></li>
                    </ul>
                </nav>
                <div className="py-40">
                    <h1 className="text-6xl">Welcome to Pettrek!</h1>
                    <h2>Your intergalactical Dog Walking Site!</h2>
                </div>
                <button className="m-4 border border-white rounded-md py-2 px-6 text-2xl underline decoration-2 underline-offset-4">Pettrek - Tool</button>
            </div>
        </div>
    );
}
