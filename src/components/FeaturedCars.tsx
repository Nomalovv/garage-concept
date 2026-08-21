"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import {
  ConfigNotice,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/StateMessage";
import { fetchFeaturedCars } from "@/lib/cars";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Car } from "@/types";

export default function FeaturedCars({ count = 4 }: { count?: number }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchFeaturedCars(count)
      .then((result) => {
        if (active) setCars(result);
      })
      .catch(() => {
        if (active)
          setError(
            "Impossible de charger les véhicules pour le moment. Merci de réessayer plus tard.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [count]);

  if (!isFirebaseConfigured) return <ConfigNotice />;
  if (loading) return <LoadingState label="Chargement des véhicules…" />;
  if (error) return <ErrorState message={error} />;
  if (cars.length === 0) {
    return (
      <EmptyState
        title="Aucun véhicule en ligne pour l'instant"
        description="Notre sélection d'occasions est en cours de mise à jour. Contactez-nous pour connaître les arrivages."
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/voitures"
          className="inline-flex items-center justify-center rounded-md border border-nuit-200 px-6 py-3 text-sm font-semibold text-nuit-900 transition hover:border-nuit-600 hover:bg-nuit-50"
        >
          Voir toutes nos occasions
        </Link>
      </div>
    </div>
  );
}
