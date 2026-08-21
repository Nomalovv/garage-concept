import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import FeaturedCars from "@/components/FeaturedCars";
import HomeHero from "@/components/HomeHero";
import PlancheAtelier from "@/components/PlancheAtelier";
import Reveal from "@/components/Reveal";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import SceneHeading from "@/components/SceneHeading";
import ServicesGrid from "@/components/ServicesGrid";
import { garageInfo, strengths } from "@/lib/garageInfo";
import { getReviews } from "@/lib/googleReviews";

/** Bandeau défilant façon générique de film, alimenté par nos points forts. */
function BandeauDefilant() {
  const mentions = strengths.map((item) => item.title);

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-nuit-800 bg-nuit-950 py-4 text-white"
    >
      <div className="piste-defilante">
        {[0, 1].map((piste) => (
          <div key={piste} className="flex shrink-0 items-center">
            {mentions.map((mention) => (
              <span
                key={`${piste}-${mention}`}
                className="flex shrink-0 items-center"
              >
                <span className="repere-scene px-8 text-white/70">
                  {mention}
                </span>
                <span className="text-flamme-500">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  // Résolu à la génération statique : la clé Google reste côté serveur/build.
  const reviews = await getReviews();

  return (
    <>
      {/* Scène 00 — bandeau d'ouverture */}
      <HomeHero />

      <BandeauDefilant />

      {/* Planche contact — quatre plans de l'atelier */}
      <PlancheAtelier />

      {/* Scène 01 — le catalogue */}
      <section className="bg-papier-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="01"
            label="Le catalogue"
            title={
              <>
                Nos véhicules
                <br />
                <span className="text-flamme-600">
                  d&apos;occasion
                </span>
              </>
            }
            description="Une sélection de voitures révisées, garanties 12 mois et livrées avec leur carnet d'entretien complet."
          />
          <Reveal delay={0.1} className="mt-10">
            <FeaturedCars count={4} />
          </Reveal>
        </div>
      </section>

      {/* Scène 02 — l'atelier */}
      <section className="border-y border-nuit-900/10 bg-papier-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="02"
            label="L'atelier"
            title={
              <>
                Toutes marques,
                <br />
                <span className="text-flamme-600">toutes pannes</span>
              </>
            }
            description="Entretien courant, mécanique lourde et diagnostic : nos mécaniciens interviennent sur toutes les marques."
            action={
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 border-b border-nuit-900/30 pb-1 text-sm font-semibold text-nuit-900 transition-colors hover:border-flamme-600 hover:text-flamme-600"
              >
                Toutes les prestations
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            }
          />
          <Reveal delay={0.1} className="mt-10">
            <ServicesGrid limit={6} />
          </Reveal>
        </div>
      </section>

      {/* Scène 03 — les garanties (plan de contraste sombre) */}
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
            number="03"
            label="Les garanties"
            tone="sombre"
            title={
              <>
                Pourquoi
                <br />
                <span className="text-flamme-500">nous choisir</span>
              </>
            }
            description="Six engagements tenus sur chaque véhicule vendu et chaque intervention réalisée à l'atelier."
          />

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Scène 04 — les témoignages */}
      <section id="avis" className="bg-papier-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="04"
            label="Les témoignages"
            title={
              <>
                Ils nous font
                <br />
                <span className="text-flamme-600">confiance</span>
              </>
            }
          />

          <Reveal delay={0.1} className="mt-12">
            <ReviewsCarousel {...reviews} />
          </Reveal>
        </div>
      </section>

      {/* Scène 05 — le rendez-vous */}
      <section
        id="contact"
        className="border-t border-nuit-900/10 bg-papier-100"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SceneHeading
            number="05"
            label="Le rendez-vous"
            title={
              <>
                Nous
                <br />
                <span className="text-flamme-600">contacter</span>
              </>
            }
            description={`L'atelier vous accueille du lundi au samedi, avec ou sans rendez-vous, au ${garageInfo.address.street} à ${garageInfo.address.city}.`}
          />
          <Reveal delay={0.1} className="mt-10">
            <ContactSection />
          </Reveal>
        </div>
      </section>
    </>
  );
}
