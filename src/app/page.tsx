import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import FeaturedCars from "@/components/FeaturedCars";
import ServicesGrid from "@/components/ServicesGrid";
import { garageInfo, strengths, testimonials } from "@/lib/garageInfo";

export default function HomePage() {
  return (
    <>
      {/* Bannière principale */}
      <section className="relative overflow-hidden bg-nuit-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-nuit-700),transparent_55%)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-flamme-500">
              {garageInfo.address.city} · Toutes marques
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {garageInfo.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-nuit-200">
              {garageInfo.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/voitures"
                className="rounded-md bg-flamme-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-flamme-700"
              >
                Découvrir nos occasions
              </Link>
              <Link
                href="/services"
                className="rounded-md border border-nuit-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-nuit-800"
              >
                Nos prestations
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-nuit-800 pt-6">
              <div>
                <dt className="text-xs uppercase tracking-widest text-acier-400">
                  Garantie
                </dt>
                <dd className="mt-1 text-2xl font-bold">12 mois</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-acier-400">
                  Contrôle
                </dt>
                <dd className="mt-1 text-2xl font-bold">100 pts</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-acier-400">
                  Devis
                </dt>
                <dd className="mt-1 text-2xl font-bold">Gratuit</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-nuit-700 bg-nuit-800/70 p-8 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">
              Besoin d&apos;un rendez-vous rapide ?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-nuit-200">
              Appelez-nous ou passez directement à l&apos;atelier : nous
              établissons un diagnostic et un devis gratuits avant toute
              intervention.
            </p>
            <a
              href={`tel:${garageInfo.phone}`}
              className="mt-6 flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-bold text-nuit-900 transition hover:bg-nuit-100"
            >
              {garageInfo.phoneDisplay}
            </a>
            <ul className="mt-6 space-y-2 text-sm text-nuit-200">
              {garageInfo.hours.map((slot) => (
                <li key={slot.days} className="flex justify-between gap-4">
                  <span>{slot.days}</span>
                  <span className="font-medium text-white">{slot.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Véhicules mis en avant */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-nuit-900">
            Nos véhicules d&apos;occasion
          </h2>
          <p className="mt-3 text-base leading-relaxed text-acier-600">
            Une sélection de voitures révisées, garanties 12 mois et livrées
            avec leur carnet d&apos;entretien complet.
          </p>
        </header>
        <FeaturedCars count={4} />
      </section>

      {/* Prestations */}
      <section className="border-y border-nuit-100 bg-nuit-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-nuit-900">
                L&apos;atelier
              </h2>
              <p className="mt-3 text-base leading-relaxed text-acier-600">
                Entretien courant, mécanique lourde et diagnostic : nos
                mécaniciens interviennent sur toutes les marques.
              </p>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold text-flamme-600 hover:text-flamme-700"
            >
              Toutes les prestations →
            </Link>
          </header>
          <ServicesGrid limit={6} />
        </div>
      </section>

      {/* Points forts */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-nuit-900">
            Pourquoi nous choisir
          </h2>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-nuit-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-nuit-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-acier-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Avis clients */}
      <section className="border-t border-nuit-100 bg-nuit-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <header className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-nuit-900">
              Ils nous font confiance
            </h2>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <figure
                key={review.name}
                className="flex h-full flex-col rounded-xl border border-nuit-100 bg-white p-6 shadow-sm"
              >
                <div
                  className="text-flamme-500"
                  aria-label={`Note de ${review.rating} sur 5`}
                >
                  {"★".repeat(review.rating)}
                  <span className="text-nuit-200">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-acier-600">
                  « {review.text} »
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-nuit-900">
                  {review.name}
                  <span className="font-normal text-acier-400">
                    {" "}
                    — {review.city}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <header className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-nuit-900">
            Nous contacter
          </h2>
          <p className="mt-3 text-base leading-relaxed text-acier-600">
            L&apos;atelier vous accueille du lundi au samedi, avec ou sans
            rendez-vous.
          </p>
        </header>
        <ContactSection />
      </section>
    </>
  );
}
