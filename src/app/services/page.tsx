import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-nuit-900 sm:text-4xl">
            Nos services d&apos;entretien
          </h1>
          <p className="mt-3 text-base leading-relaxed text-acier-600">
            Toutes marques, avec ou sans rendez-vous. Chaque intervention est
            précédée d&apos;un devis gratuit et détaillé, et vous repartez avec
            la facture complète des pièces posées.
          </p>
        </header>

        <div className="mt-10">
          <ServicesGrid />
        </div>
      </div>

      <section className="border-t border-nuit-100 bg-nuit-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-nuit-900">
            Nos engagements
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-nuit-100 bg-white p-6">
            <p className="text-base font-semibold text-nuit-900">
              Besoin d&apos;un devis ou d&apos;un rendez-vous ?
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${garageInfo.phone}`}
                className="rounded-md bg-flamme-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-flamme-700"
              >
                {garageInfo.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="rounded-md border border-nuit-200 px-5 py-2.5 text-sm font-semibold text-nuit-900 transition hover:bg-nuit-50"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
