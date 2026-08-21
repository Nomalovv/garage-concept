"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE_CINEMA } from "@/components/Reveal";
import { garageInfo } from "@/lib/garageInfo";

const CHIFFRES = [
  { label: "Garantie", value: "12 mois" },
  { label: "Contrôle", value: "100 pts" },
  { label: "Devis", value: "Gratuit" },
];

/** Le titre est coupé pour poser les deux derniers mots en italique. */
function decoupeTagline(tagline: string): [string, string] {
  const mots = tagline.split(" ");
  if (mots.length < 3) return [tagline, ""];
  return [mots.slice(0, -2).join(" "), mots.slice(-2).join(" ")];
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Léger parallaxe du plan principal quand on quitte la scène d'ouverture.
  const contenuY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);
  const contenuOpacite = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, reduceMotion ? 1 : 0.1],
  );

  const [debutTitre, finTitre] = decoupeTagline(garageInfo.tagline);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-papier-100"
    >
      {/* ─────────────────────────────────────────────────────────────────
          EMPLACEMENT VIDÉO DE FOND
          Aucune vidéo n'est disponible pour l'instant : le fond est généré
          en CSS (dégradés animés + grain) juste en dessous.
          Le jour où une vidéo de l'atelier existe, remplacer TOUT le bloc
          `<div aria-hidden ... className="absolute inset-0 -z-10 grain">`
          par exactement ceci, sans rien changer d'autre :

          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/atelier-poster.jpg"
            >
              <source src="/videos/atelier.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-papier-50/70" />
          </div>

          (le voile clair au-dessus garde le texte lisible sur l'image)
      ───────────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 grain">
        <div className="absolute inset-0 bg-linear-to-b from-papier-50 via-papier-100 to-papier-200" />
        <div className="absolute -left-1/4 top-[-30%] h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.22),transparent_65%)] blur-3xl animate-projection" />
        <div className="absolute -right-1/4 bottom-[-35%] h-[80vh] w-[75vw] rounded-full bg-[radial-gradient(circle,rgba(28,59,92,0.20),transparent_65%)] blur-3xl animate-projection-slow" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-papier-100" />
      </div>

      {/* Letterboxing : deux bandes sombres qui encadrent la scène et
          portent les informations façon feuille de tournage. */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between bg-nuit-950 px-4 text-white/60 sm:px-6 lg:px-8">
        <span className="repere-scene text-flamme-500">Scène 00 — Ouverture</span>
        <span className="repere-scene hidden sm:block">
          {garageInfo.address.city} · {garageInfo.address.postalCode} · Toutes marques
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 flex h-9 items-center justify-between bg-nuit-950 px-4 text-white/60 sm:px-6 lg:px-8">
        <span className="repere-scene">Défiler ↓</span>
        <a
          href={`tel:${garageInfo.phone}`}
          className="repere-scene transition-colors hover:text-flamme-500"
        >
          {garageInfo.phoneDisplay}
        </a>
      </div>

      {/* Obturateur d'ouverture (animation CSS, joue dès le premier rendu). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-nuit-950 obturateur"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1/2 bg-nuit-950 obturateur obturateur-bas"
      />

      <motion.div
        style={{ y: contenuY, opacity: contenuOpacite }}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-8 lg:pb-32 lg:pt-32"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE_CINEMA }}
            className="repere-scene text-flamme-600"
          >
            {garageInfo.name} — depuis toujours à {garageInfo.address.city}
          </motion.p>

          <h1 className="titre-scene mt-6 text-[3rem] text-nuit-950 sm:text-7xl lg:text-[5.5rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: EASE_CINEMA }}
            >
              {debutTitre}
            </motion.span>
            {finTitre ? (
              <motion.span
                className="mt-1 block italic text-flamme-600"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.12, ease: EASE_CINEMA }}
              >
                {finTitre}
              </motion.span>
            ) : null}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE_CINEMA }}
            className="mt-8 max-w-xl text-base leading-relaxed text-acier-600 sm:text-lg"
          >
            {garageInfo.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.42, ease: EASE_CINEMA }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/voitures"
              className="group inline-flex items-center gap-3 rounded-full bg-nuit-950 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-flamme-600"
            >
              Découvrir nos occasions
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 border-b border-nuit-900/30 pb-1 text-sm font-semibold text-nuit-900 transition-colors hover:border-flamme-600 hover:text-flamme-600"
            >
              Nos prestations
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6, ease: EASE_CINEMA }}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-nuit-900/15 pt-6"
          >
            {CHIFFRES.map((chiffre) => (
              <div key={chiffre.label}>
                <dt className="repere-scene text-acier-600">{chiffre.label}</dt>
                <dd className="titre-scene mt-2 text-2xl text-nuit-950 sm:text-3xl">
                  {chiffre.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Bloc rendez-vous rapide, redessiné en « feuille de tournage ». */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: EASE_CINEMA }}
          className="relative border border-nuit-900/15 bg-papier-50/80 p-8 backdrop-blur-sm"
        >
          <span
            aria-hidden="true"
            className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-flamme-600"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-flamme-600"
          />

          <p className="repere-scene text-acier-600">Fiche de rendez-vous</p>
          <h2 className="titre-scene mt-4 text-2xl text-nuit-950 sm:text-3xl">
            Besoin d&apos;un rendez-vous rapide ?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-acier-600">
            Appelez-nous ou passez directement à l&apos;atelier : nous
            établissons un diagnostic et un devis gratuits avant toute
            intervention.
          </p>

          <a
            href={`tel:${garageInfo.phone}`}
            className="mt-7 flex items-center justify-center gap-3 bg-flamme-600 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-flamme-700"
          >
            <span aria-hidden="true">☎</span>
            {garageInfo.phoneDisplay}
          </a>

          <ul className="mt-7 space-y-3 text-sm">
            {garageInfo.hours.map((slot) => (
              <li
                key={slot.days}
                className="flex items-baseline justify-between gap-3 border-b border-dotted border-nuit-900/20 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-acier-600">{slot.days}</span>
                <span className="font-semibold text-nuit-950">{slot.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
