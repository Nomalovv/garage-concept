import type { Metadata } from "next";
import { Suspense } from "react";
import CarDetail from "@/components/CarDetail";
import { LoadingState } from "@/components/StateMessage";

export const metadata: Metadata = {
  title: "Fiche véhicule",
  description:
    "Détail d'un véhicule d'occasion proposé par le Garage Concept : photos, caractéristiques et prix.",
};

export default function CarDetailPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Suspense fallback={<LoadingState label="Chargement du véhicule…" />}>
        <CarDetail />
      </Suspense>
    </div>
  );
}
