import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { garageInfo } from "@/lib/garageInfo";

// Grotesque éditoriale (presse américaine) pour le corps de texte : charpentée,
// un peu sèche, elle tient la lecture sans l'aspect « interface » générique.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
});

// Serif de presse pour les grands titres : taille optique variable, vraie
// italique dessinée — l'esprit générique de film / magazine sans le cliché.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Monospace technique façon fiche d'atelier, pour les repères de scène.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${garageInfo.name} — ${garageInfo.tagline}`,
    template: `%s | ${garageInfo.name}`,
  },
  description:
    "Garage automobile à Caen : vente de véhicules d'occasion contrôlés, entretien, révision, pneumatiques, contrôle technique et diagnostic électronique.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-papier-50 text-nuit-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
