import type { Metadata } from "next";
import { Suspense } from "react";
import CarDetail from "@/components/CarDetail";
import { LoadingState } from "@/components/StateMessage";
import { garageInfo } from "@/lib/garageInfo";

export const metadata: Metadata = {
  title: "Fiche véhicule",
  description:
    "Détail d'un véhicule d'occasion proposé par le Garage Concept : photos, caractéristiques et prix.",
};

export default function CarDetailPage() {
  return (
    <div className="relative isolate overflow-hidden bg-papier-50">
      {/* Même fond éditorial que les autres ouvertures : réglure + vignettage,
          le titre réel du véhicule étant rendu par `CarDetail`. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-96">
        <div className="absolute inset-0 bg-linear-to-b from-papier-100 to-papier-50" />
        <div className="absolute inset-0 reglure" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-papier-50" />
      </div>

      <div className="flex h-9 items-center justify-between bg-nuit-950 px-4 text-white/60 sm:px-6 lg:px-8">
        <span className="repere-scene text-flamme-500">
          Séquence — Fiche véhicule
        </span>
        <a
          href={`tel:${garageInfo.phone}`}
          className="repere-scene hidden transition-colors hover:text-flamme-500 sm:block"
        >
          {garageInfo.address.city} · {garageInfo.phoneDisplay}
        </a>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Suspense fallback={<LoadingState label="Chargement du véhicule…" />}>
          <CarDetail />
        </Suspense>
      </div>
    </div>
  );
}
