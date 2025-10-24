import "./../globals.css";
import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

function Navbar() {
    return (
        <nav className="flex justify-center h-10 bg-secondary">
            <a href="/"><img className="h-10 rounded-lg p-1 absolute left-0" src="/pettrek_logo.png"></img></a>

            <ul className="flex justify-center items-center gap-3">
                <li className="px-2 hover:outline-[1px] rounded-md"><a href="">About</a></li>
                <li className="px-2 hover:outline-[1px] rounded-md"><Link href="/planner">Planner</Link></li>
                <li className="px-2 hover:outline-[1px] rounded-md"><a href="/routes">Routes</a></li>
                <li className="px-2 hover:outline-[1px] rounded-md"><a href="/account/routes">MyRoutes</a></li>
                <li className="px-2 hover:outline-[1px] rounded-md"><a href="/account">Login</a></li>
            </ul>
        </nav>
    );
}