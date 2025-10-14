export default function Home() {
  return (
        <div className="flex flex-col items-center text-fontPrimary text-center font-doggie">
            <div id="hero" className="w-full">
                <nav className="">
                    <img className="h-10 rounded-lg p-1" src="/pettrek_logo.png"></img>

                    <ul className="flex justify-center gap-2">
                        <li><a>Menu Item 1</a></li>
                        <li><a>Menu Item 2</a></li>
                        <li><a>Menu Item 3</a></li>
                        <li><a>Menu Item 4</a></li>
                    </ul>
                </nav>
                <div className="py-40">
                    <h1 className="text-6xl">Welcome to Pettrek!</h1>
                    <h2>Your intergalactical Dog Walking Site!</h2>
                </div>
                <button className="border rounded-md mb-4 py-2 px-6 text-2xl underline decoration-2 underline-offset-4">Pettrek - Tool</button>
            </div>
        </div>
    );
}
