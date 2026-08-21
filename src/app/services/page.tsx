import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SceneHeading from "@/components/SceneHeading";
import ServicesGrid from "@/components/ServicesGrid";
import { garageInfo, strengths } from "@/lib/garageInfo";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Vidange, révision, pneumatiques, contrôle technique, diagnostic électronique, freins et climatisation : toutes les prestations du Garage Concept.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        slate="Séquence — Atelier"
        eyebrow={`${garageInfo.name} — entretien toutes marques`}
        title={
          <>
            Nos services
            <br />
            <span className="text-flamme-600">d&apos;entretien</span>
          </>
        }
        description="Toutes marques, avec ou sans rendez-vous. Chaque intervention est précédée d'un devis gratuit et détaillé, et vous repartez avec la facture complète des pièces posées."
        facts={[
          { label: "Devis", value: "Gratuit" },
          { label: "Marques", value: "Toutes" },
          { label: "Véhicule de prêt", value: "Offert" },
        ]}
      />

      {/* Scène 01 — le catalogue de prestations */}
      <section className="bg-papier-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="01"
            label="Les prestations"
            title={
              <>
                Du simple entretien
                <br />
                <span className="text-flamme-600">
                  à la mécanique lourde
                </span>
              </>
            }
            description="Vidange, freinage, distribution, pneumatiques, climatisation ou diagnostic électronique : l'atelier prend en charge l'ensemble de la vie de votre véhicule."
          />
          <Reveal delay={0.1} className="mt-10">
            <ServicesGrid />
          </Reveal>
        </div>
      </section>

      {/* Scène 02 — les engagements (plan de contraste sombre) */}
      <section className="relative overflow-hidden bg-nuit-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 reglure-sombre opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-flamme-700/35 via-transparent to-transparent"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="02"
            label="Les engagements"
            tone="sombre"
            title={
              <>
                Ce que nous
                <br />
                <span className="text-flamme-500">garantissons</span>
              </>
            }
            description="Six engagements tenus sur chaque véhicule vendu et chaque intervention réalisée à l'atelier."
          />

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="border-t border-white/20 pt-5">
                  <span className="repere-scene text-flamme-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="titre-scene mt-4 text-2xl text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-nuit-200">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scène 03 — le rendez-vous */}
      <section className="border-t border-nuit-900/10 bg-papier-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="03"
            label="Le rendez-vous"
            title={
              <>
                Un devis,
                <br />
                <span className="text-flamme-600">une question ?</span>
              </>
            }
            description={`Appelez l'atelier ou passez directement au ${garageInfo.address.street}, ${garageInfo.address.postalCode} ${garageInfo.address.city}. Le diagnostic est offert.`}
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
                Nous écrire
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
