import type { Metadata } from "next";
import { Barlow, IBM_Plex_Mono, Oswald } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { garageInfo } from "@/lib/garageInfo";

// Corps de texte : grotesque dessinée d'après la signalétique routière
// californienne (plaques, panneaux). Très lisible, un peu mécanique, elle
// parle « atelier » plutôt que « interface d'application ».
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

// Titres : condensée de signalétique (famille Alternate Gothic), celle des
// plaques d'immatriculation et des affiches placardées. Posée en capitales,
// elle donne le ton « atelier / affiche » du site.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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
      className={`${barlow.variable} ${plexMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-papier-50 text-nuit-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
