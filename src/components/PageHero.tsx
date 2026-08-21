import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { garageInfo } from "@/lib/garageInfo";
import type { Photo } from "@/lib/photos";

type PageHeroProps = {
  /** Texte du claquet, affiché à gauche dans la bande sombre. */
  slate: string;
  /** Sur-titre en monospace, au-dessus du grand titre. */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Chiffres clés alignés sous le titre (facultatif). */
  facts?: { label: string; value: string }[];
  /** Plan de l'atelier tiré à côté du titre (facultatif). */
  photo?: Photo;
};

/**
 * Ouverture des pages intérieures : bande de letterboxing façon claquet, fond
 * papier texturé (réglure + vignettage, pas de halo flou), puis grand titre en
 * condensée de signalétique. Quand une `photo` est fournie, elle est tirée à
 * côté du titre comme une épreuve collée sur la feuille, légende comprise.
 * Pendant que `HomeHero` joue la « scène 00 » de l'accueil, chaque page repart
 * ensuite de « Scène 01 » avec `SceneHeading`.
 */
export default function PageHero({
  slate,
  eyebrow,
  title,
  description,
  facts,
  photo,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-nuit-900/10 bg-papier-100">
      <div aria-hidden="true" className="absolute inset-0 -z-10 grain">
        <div className="absolute inset-0 bg-linear-to-b from-papier-50 via-papier-100 to-papier-200" />
        <div className="absolute inset-0 reglure" />
        <div className="absolute inset-0 bg-linear-to-tr from-flamme-700/10 via-transparent to-transparent" />
        <div className="absolute inset-0 vignettage" />
      </div>

      <div className="flex h-9 items-center justify-between bg-nuit-950 px-4 text-white/60 sm:px-6 lg:px-8">
        <span className="repere-scene text-flamme-500">{slate}</span>
        <a
          href={`tel:${garageInfo.phone}`}
          className="repere-scene hidden transition-colors hover:text-flamme-500 sm:block"
        >
          {garageInfo.address.city} · {garageInfo.phoneDisplay}
        </a>
      </div>

      <div
        className={`mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${
          photo
            ? "grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14"
            : ""
        }`}
      >
        <Reveal>
          <p className="repere-scene text-flamme-600">{eyebrow}</p>
          <h1 className="titre-scene mt-5 text-[2.75rem] text-nuit-950 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-acier-600 sm:text-lg">
              {description}
            </p>
          ) : null}
          {facts && facts.length > 0 ? (
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-nuit-900/15 pt-6 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="repere-scene text-acier-600">{fact.label}</dt>
                  <dd className="titre-scene mt-2 text-2xl text-nuit-950">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Reveal>

        {photo ? (
          <Reveal delay={0.12}>
            <figure>
              <div className="relative aspect-3/2 border border-nuit-900/15">
                {/* Coins de repérage, comme sur la fiche de rendez-vous. */}
                <span
                  aria-hidden="true"
                  className="absolute -left-px -top-px z-10 h-4 w-4 border-l-2 border-t-2 border-flamme-600"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px -right-px z-10 h-4 w-4 border-b-2 border-r-2 border-flamme-600"
                />
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className={`object-cover grayscale-[0.25] ${
                    photo.cadrage ?? "object-center"
                  }`}
                />
                <div aria-hidden="true" className="absolute inset-0 vignettage" />
              </div>
              <figcaption className="repere-scene mt-3 text-acier-600">
                {photo.legende}
              </figcaption>
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
