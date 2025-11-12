import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalConfig from './app.config.js'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pettrek",
  description: "A Dog walking Route Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Pettrek" />

        <script src="https://tiles.versatiles.org/assets/lib/maplibre-gl/maplibre-gl.js"></script>
        <link href="https://tiles.versatiles.org/assets/lib/maplibre-gl/maplibre-gl.css" rel="stylesheet" />

        <link rel='stylesheet' href='https://unpkg.com/maplibre-gl@5.9.0/dist/maplibre-gl.css' />
        <script src='https://unpkg.com/maplibre-gl@5.9.0/dist/maplibre-gl.js'></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
    return (
        <div className="w-full gap-5 py-6 text-black font-doggie" style={{
            backgroundColor: GlobalConfig.primary,
        }}>
            <nav>
                <ul className='flex justify-evenly text-xs'>
                    <li><a className="underline hover:text-white hover:underline hover:decoration-white" href="#">Contact</a></li>
                    <li className="no-underline decoration-0">pettrek 2025</li>
                    <li><a className="underline hover:text-white hover:underline hover:decoration-white" href="#">Imprint</a></li>
                    <li><a className="underline hover:text-white hover:underline hover:decoration-white" href="https://github.com/alexkens/pettrek" target="_blank">Source Code</a></li>
                </ul>
            </nav>
        </div>
    );
}