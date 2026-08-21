import type { Metadata } from "next";
import CarsBrowser from "@/components/CarsBrowser";

export const metadata: Metadata = {
  title: "Nos voitures d'occasion",
  description:
    "Toutes les voitures d'occasion disponibles au Garage Concept : véhicules contrôlés sur 100 points et garantis 12 mois.",
};

export default function CarsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-nuit-900 sm:text-4xl">
          Nos voitures d&apos;occasion
        </h1>
        <p className="mt-3 text-base leading-relaxed text-acier-600">
          Chaque véhicule est révisé, contrôlé sur 100 points et vendu avec son
          historique d&apos;entretien. Une reprise de votre ancienne voiture est
          possible.
        </p>
      </header>

      <div className="mt-10">
        <CarsBrowser />
      </div>
    </div>
  );
}
