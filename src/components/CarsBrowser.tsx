"use client";

import { useEffect, useMemo, useState } from "react";
import CarCard from "@/components/CarCard";
import {
  ConfigNotice,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/StateMessage";
import { fetchCars } from "@/lib/cars";
import { isFirebaseConfigured } from "@/lib/firebase";
import { FUEL_LABELS, type Car, type Fuel } from "@/types";

type Availability = "disponible" | "vendue" | "toutes";

const AVAILABILITY_TABS: { value: Availability; label: string }[] = [
  { value: "disponible", label: "Disponibles" },
  { value: "vendue", label: "Vendues" },
  { value: "toutes", label: "Toutes" },
];

const SORTS = [
  { value: "recent", label: "Plus récentes" },
  { value: "prix-croissant", label: "Prix croissant" },
  { value: "prix-decroissant", label: "Prix décroissant" },
  { value: "km-croissant", label: "Kilométrage croissant" },
] as const;

type Sort = (typeof SORTS)[number]["value"];

export default function CarsBrowser() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Availability>("disponible");
  const [fuel, setFuel] = useState<Fuel | "toutes">("toutes");
  const [sort, setSort] = useState<Sort>("recent");

  useEffect(() => {
    let active = true;
    fetchCars()
      .then((result) => {
        if (active) setCars(result);
      })
      .catch(() => {
        if (active)
          setError(
            "Impossible de charger le catalogue pour le moment. Merci de réessayer plus tard.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    const filtered = cars.filter((car) => {
      if (availability === "disponible" && car.sold) return false;
      if (availability === "vendue" && !car.sold) return false;
      if (fuel !== "toutes" && car.fuel !== fuel) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "prix-croissant":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "prix-decroissant":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "km-croissant":
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        sorted.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    }
    return sorted;
  }, [cars, availability, fuel, sort]);

  if (!isFirebaseConfigured) return <ConfigNotice />;
  if (loading) return <LoadingState label="Chargement du catalogue…" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-nuit-100 bg-nuit-50 p-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrer par disponibilité"
        >
          {AVAILABILITY_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setAvailability(tab.value)}
              aria-pressed={availability === tab.value}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                availability === tab.value
                  ? "bg-nuit-900 text-white"
                  : "bg-white text-nuit-700 hover:bg-nuit-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-acier-600">
            Carburant
            <select
              value={fuel}
              onChange={(event) =>
                setFuel(event.target.value as Fuel | "toutes")
              }
              className="rounded-md border border-nuit-200 bg-white px-3 py-2 text-sm text-nuit-900"
            >
              <option value="toutes">Tous</option>
              {(Object.keys(FUEL_LABELS) as Fuel[]).map((value) => (
                <option key={value} value={value}>
                  {FUEL_LABELS[value]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-acier-600">
            Trier par
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="rounded-md border border-nuit-200 bg-white px-3 py-2 text-sm text-nuit-900"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="Aucun véhicule ne correspond à votre recherche"
          description="Modifiez les filtres ou contactez-nous : de nouveaux véhicules arrivent chaque semaine."
        />
      ) : (
        <>
          <p className="text-sm text-acier-600">
            {visible.length} véhicule{visible.length > 1 ? "s" : ""} affiché
            {visible.length > 1 ? "s" : ""}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
