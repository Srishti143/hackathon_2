import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Libre_Baskerville, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  variable: "--font-labels",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retro Cafe | Brewing Memories",
  description: "A nostalgic cafe experience with a modern AI twist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${ibmPlexMono.variable} ${libreBaskerville.variable} ${bebasNeue.variable} antialiased custom-cursor`}
      >
        <div className="grain-overlay" />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
