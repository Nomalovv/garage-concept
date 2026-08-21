import type { Metadata } from "next";
import Link from "next/link";
import CarsBrowser from "@/components/CarsBrowser";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SceneHeading from "@/components/SceneHeading";
import { garageInfo } from "@/lib/garageInfo";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Nos voitures d'occasion",
  description:
    "Toutes les voitures d'occasion disponibles au Garage Concept : véhicules contrôlés sur 100 points et garantis 12 mois.",
};

export default function CarsPage() {
  return (
    <>
      <PageHero
        slate="Séquence — Catalogue"
        eyebrow={`${garageInfo.name} — occasions contrôlées`}
        title={
          <>
            Nos voitures
            <br />
            <span className="text-flamme-600">d&apos;occasion</span>
          </>
        }
        description="Chaque véhicule est révisé, contrôlé sur 100 points et vendu avec son historique d'entretien. Une reprise de votre ancienne voiture est possible."
        facts={[
          { label: "Garantie", value: "12 mois" },
          { label: "Contrôle", value: "100 pts" },
          { label: "Carnet", value: "Complet" },
        ]}
        photo={photos.pontElevateur}
      />

      {/* Scène 01 — le catalogue complet */}
      <section className="bg-papier-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="01"
            label="Le catalogue"
            title={
              <>
                Toutes les voitures
                <br />
                <span className="text-flamme-600">à l&apos;affiche</span>
              </>
            }
            description="Filtrez par disponibilité ou par carburant, puis triez la sélection selon votre budget ou le kilométrage."
          />
          <Reveal delay={0.1} className="mt-10">
            <CarsBrowser />
          </Reveal>
        </div>
      </section>

      {/* Scène 02 — la reprise (reste dans le registre clair : la scène
          sombre juste avant le footer, lui aussi sombre, fondait les deux
          blocs l'un dans l'autre). */}
      <section className="border-t border-nuit-900/10 bg-papier-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="02"
            label="La reprise"
            title={
              <>
                Votre ancienne voiture,
                <br />
                <span className="text-flamme-600">reprise au juste prix</span>
              </>
            }
            description="Nous estimons votre véhicule actuel gratuitement et déduisons la reprise du prix de votre prochaine voiture. Un essai peut être organisé sur simple appel."
          />

          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-wrap items-center gap-4 border-t border-nuit-900/15 pt-8">
              <a
                href={`tel:${garageInfo.phone}`}
                className="inline-flex items-center gap-3 bg-flamme-600 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-flamme-700"
              >
                <span aria-hidden="true">☎</span>
                {garageInfo.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-b border-nuit-900/30 pb-1 text-sm font-semibold text-nuit-900 transition-colors hover:border-flamme-600 hover:text-flamme-600"
              >
                Demander une estimation
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
