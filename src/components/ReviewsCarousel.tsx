import type { ReviewsResult } from "@/lib/googleReviews";

/** Logo « G » Google, décoratif, aux couleurs officielles. */
function LogoGoogle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-5 w-5 shrink-0"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/** Cinq étoiles, remplies jusqu'à la note. */
function Etoiles({ rating }: { rating: number }) {
  const pleines = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      role="img"
      className="text-flamme-600"
      aria-label={`Note de ${pleines} sur 5`}
    >
      <span aria-hidden="true">
        {"★".repeat(pleines)}
        <span className="text-papier-400">{"★".repeat(5 - pleines)}</span>
      </span>
    </div>
  );
}

type CarteAvisProps = {
  author: string;
  location?: string;
  rating: number;
  text: string;
};

function CarteAvis({ author, location, rating, text }: CarteAvisProps) {
  return (
    <figure className="flex h-full w-[19rem] flex-col border-t-2 border-nuit-900/20 bg-papier-100 px-6 pt-6 pb-7 sm:w-[22rem]">
      <span
        aria-hidden="true"
        className="titre-scene text-5xl leading-none text-flamme-600"
      >
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-nuit-900 sm:text-base">
        {text}
      </blockquote>
      <figcaption className="mt-6">
        <Etoiles rating={rating} />
        <p className="titre-scene mt-2 text-lg text-nuit-950">{author}</p>
        {location ? (
          <p className="repere-scene mt-1 text-acier-600">{location}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

type ReviewsCarouselProps = ReviewsResult;

/**
 * Bandeau d'avis qui défile en continu, dans le même esprit que le générique
 * de l'accueil : le contenu est dupliqué dans le JSX et la piste translate de
 * -50 %, ce qui boucle sans coupure. 100 % CSS (aucun `"use client"`), avec
 * pause au survol / au focus pour laisser le temps de lire, et arrêt complet
 * en `prefers-reduced-motion` (voir `.piste-avis` dans `globals.css`).
 *
 * Reçoit ses données du Server Component `src/app/page.tsx` : aucune clé
 * d'API ne transite par ce composant.
 */
export default function ReviewsCarousel({
  reviews,
  averageRating,
  totalReviews,
  source,
}: ReviewsCarouselProps) {
  const note = averageRating.toFixed(1).replace(".", ",");

  return (
    <div>
      {/* Badge « avis vérifiés » — informatif seulement : tant qu'aucune fiche
          Google réelle n'est reliée, on n'ajoute volontairement aucun lien. */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-nuit-900/15 pt-4">
        <span className="flex items-center gap-2">
          <LogoGoogle />
          <span className="repere-scene text-acier-600">
            {source === "google" ? "Avis vérifiés sur Google" : "Avis Google"}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="hidden h-4 w-px bg-nuit-900/15 sm:block"
        />
        <span className="flex items-baseline gap-2">
          <span className="titre-scene text-2xl text-nuit-950">{note}</span>
          <span className="repere-scene text-acier-600">/ 5</span>
        </span>
        <Etoiles rating={averageRating} />
        <span className="repere-scene text-acier-600">
          {totalReviews} avis
        </span>
        {/* Tant qu'aucune fiche réelle n'est reliée, on le dit franchement :
            les avis affichés sont ceux de démonstration du site. */}
        {source === "fallback" ? (
          <span className="repere-scene border border-flamme-600/40 px-2 py-1 text-flamme-600">
            Démonstration
          </span>
        ) : null}
      </div>

      {/* Cadre : masque le débordement et met la piste en pause au survol.
          `getReviews()` garantit une liste non vide (repli sur les
          témoignages du site), inutile de gérer un cas « aucun avis ». */}
      <div className="cadre-avis relative mt-8 overflow-hidden">
        <div className="piste-avis">
          {[0, 1].map((piste) => (
            <div
              key={piste}
              aria-hidden={piste === 1 ? "true" : undefined}
              className={
                piste === 1
                  ? "doublon-avis flex shrink-0 items-stretch"
                  : "flex shrink-0 items-stretch"
              }
            >
              {reviews.map((review) => (
                <div
                  key={`${piste}-${review.author}-${review.text.slice(0, 12)}`}
                  className="shrink-0 pr-6 sm:pr-8"
                >
                  <CarteAvis {...review} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Fondus latéraux : la piste entre et sort du cadre en douceur. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-papier-50 to-transparent sm:w-12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-papier-50 to-transparent sm:w-12"
        />
      </div>
    </div>
  );
}
