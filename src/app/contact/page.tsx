import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SceneHeading from "@/components/SceneHeading";
import { fullAddress, garageInfo } from "@/lib/garageInfo";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Contact et accès",
  description: `Contacter le Garage Concept — ${fullAddress}. Téléphone, e-mail, horaires d'ouverture et plan d'accès.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        slate="Séquence — Rendez-vous"
        eyebrow={`${garageInfo.name} — ${garageInfo.address.city}`}
        title={
          <>
            Nous
            <br />
            <span className="text-flamme-600">contacter</span>
          </>
        }
        description={`L'atelier vous accueille du lundi au samedi, avec ou sans rendez-vous, au ${garageInfo.address.street} à ${garageInfo.address.city}. Appelez-nous pour un devis ou une estimation de reprise.`}
        facts={[
          { label: "Téléphone", value: garageInfo.phoneDisplay },
          { label: "Du lundi au vendredi", value: "08h — 18h30" },
          { label: "Samedi", value: "09h — 17h" },
        ]}
        photo={photos.etabliOutils}
      />

      {/* Scène 01 — les coordonnées et le plan d'accès */}
      <section className="bg-papier-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="01"
            label="Le plan d'accès"
            title={
              <>
                Coordonnées
                <br />
                <span className="text-flamme-600">et horaires</span>
              </>
            }
            description="Un doute sur l'itinéraire ? Le plan ci-dessous vous mène directement devant les portes de l'atelier."
          />
          <Reveal delay={0.1} className="mt-10">
            <ContactSection />
          </Reveal>
        </div>
      </section>

      {/* Scène 02 — l'appel direct (reste dans le registre clair : la scène
          sombre juste avant le footer, lui aussi sombre, fondait les deux
          blocs l'un dans l'autre). */}
      <section className="border-t border-nuit-900/10 bg-papier-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="02"
            label="L'appel direct"
            title={
              <>
                Le plus rapide,
                <br />
                <span className="text-flamme-600">c&apos;est le téléphone</span>
              </>
            }
            description="Un mécanicien vous répond pendant les heures d'ouverture et vous propose un créneau, souvent dans la journée."
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
              <a
                href={`mailto:${garageInfo.email}`}
                className="group inline-flex items-center gap-2 border-b border-nuit-900/30 pb-1 text-sm font-semibold text-nuit-900 transition-colors hover:border-flamme-600 hover:text-flamme-600"
              >
                {garageInfo.email}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
