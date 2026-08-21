import { testimonials } from "@/lib/garageInfo";

/**
 * Avis clients — source unique pour la scène « Ils nous font confiance ».
 *
 * ⚠️ Module SERVEUR uniquement : `getReviews()` lit `GOOGLE_PLACES_API_KEY`,
 * une clé qui ne doit jamais atteindre le bundle navigateur. Ne l'importez
 * donc que depuis un Server Component (aujourd'hui `src/app/page.tsx`), jamais
 * depuis un fichier marqué `"use client"`. Les variables sont volontairement
 * SANS préfixe `NEXT_PUBLIC_` : Next.js ne les inline alors nulle part côté
 * client, contrairement à la config Firebase du site.
 *
 * Le site est exporté en statique (`output: "export"`), donc l'appel n'a lieu
 * qu'au build : les avis sont figés dans le HTML généré, et un nouveau build
 * est nécessaire pour en récupérer de plus récents.
 */

/** Avis normalisé, indépendant de la source (Google ou témoignages fictifs). */
export type Review = {
  author: string;
  /** Ville de l'auteur : renseignée par nos témoignages, absente chez Google. */
  location?: string;
  /** Note entière de 1 à 5. */
  rating: number;
  text: string;
};

export type ReviewsResult = {
  reviews: Review[];
  /** Note moyenne arrondie au dixième (ex. 4.7). */
  averageRating: number;
  /** Nombre total d'avis de la fiche (peut dépasser `reviews.length`). */
  totalReviews: number;
  source: "google" | "fallback";
};

/** Forme (partielle) de la réponse « Place Details » de l'API Google Places. */
type GooglePlaceDetailsResponse = {
  status?: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: {
      author_name?: string;
      rating?: number;
      text?: string;
    }[];
  };
};

const PLACE_DETAILS_ENDPOINT =
  "https://maps.googleapis.com/maps/api/place/details/json";

function moyenne(reviews: Review[]): number {
  if (reviews.length === 0) {
    return 0;
  }

  const total = reviews.reduce((somme, review) => somme + review.rating, 0);

  return Math.round((total / reviews.length) * 10) / 10;
}

/**
 * Repli utilisé tant qu'aucune fiche Google n'est branchée (site de démo) et
 * en cas d'échec de l'appel : les témoignages de `garageInfo.ts`.
 */
function reviewsDeSecours(): ReviewsResult {
  const reviews: Review[] = testimonials.map((temoignage) => ({
    author: temoignage.name,
    location: temoignage.city,
    rating: temoignage.rating,
    text: temoignage.text,
  }));

  return {
    reviews,
    averageRating: moyenne(reviews),
    totalReviews: reviews.length,
    source: "fallback",
  };
}

/**
 * Récupère les avis à afficher.
 *
 * - Si `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID` sont tous les deux définis,
 *   interroge l'API Google Places et normalise la réponse.
 * - Sinon (ou si l'appel échoue) retombe sur les témoignages du site, sans
 *   jamais faire échouer le build : un simple `console.warn` signale le repli.
 */
export async function getReviews(): Promise<ReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Cas nominal du site de démo : aucune fiche Google n'est encore reliée.
    return reviewsDeSecours();
  }

  const url = new URL(PLACE_DETAILS_ENDPOINT);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("language", "fr");
  url.searchParams.set("key", apiKey);

  try {
    // `force-cache` : la réponse est résolue une seule fois, à la génération.
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
      console.warn(
        `[avis Google] Réponse HTTP ${response.status} de l'API Places — repli sur les témoignages du site.`,
      );
      return reviewsDeSecours();
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;

    if (data.status !== "OK" || !data.result) {
      console.warn(
        `[avis Google] Statut « ${data.status ?? "inconnu"} » renvoyé par l'API Places — repli sur les témoignages du site.`,
      );
      return reviewsDeSecours();
    }

    const reviews: Review[] = (data.result.reviews ?? []).flatMap((avis) => {
      const author = avis.author_name?.trim();
      const text = avis.text?.trim();

      if (!author || !text) {
        return [];
      }

      // L'API Places ne renvoie pas la ville de l'auteur : `location` reste
      // absent, le composant masque simplement la ligne correspondante.
      return [{ author, text, rating: Math.round(avis.rating ?? 5) }];
    });

    if (reviews.length === 0) {
      console.warn(
        "[avis Google] Aucun avis exploitable dans la réponse — repli sur les témoignages du site.",
      );
      return reviewsDeSecours();
    }

    return {
      reviews,
      averageRating:
        typeof data.result.rating === "number"
          ? Math.round(data.result.rating * 10) / 10
          : moyenne(reviews),
      totalReviews: data.result.user_ratings_total ?? reviews.length,
      source: "google",
    };
  } catch (error) {
    // Réseau coupé, DNS, timeout… : on ne casse jamais le build pour autant.
    console.warn(
      "[avis Google] Appel à l'API Places impossible — repli sur les témoignages du site.",
      error instanceof Error ? error.message : error,
    );
    return reviewsDeSecours();
  }
}
