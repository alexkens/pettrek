import Image from "next/image";

export default function Home() {
  return (
        <div className="h-600 w-full bg-[url(/stock_dog.jpg)]">
            <nav>
                <img className="h-10" src="/pettrek_logo.png"></img>
            </nav>
            <h1>Welcome to Pettrek!</h1>
            <h2>Your intergalactical Dog Walking Site!</h2>
            <button>Tool</button>
        </div>
    );
}
