"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import CarForm from "@/components/admin/CarForm";
import {
  ConfigNotice,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/StateMessage";
import { deleteCar, fetchCars, setCarSold } from "@/lib/cars";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatMileage, formatPrice } from "@/lib/format";
import { FUEL_LABELS, type Car } from "@/types";

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Car | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchCars()
      .then((result) => {
        if (!active) return;
        setCars(result);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Le chargement des véhicules a échoué.");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadToken]);

  function reload() {
    setError(null);
    setLoading(true);
    setReloadToken((token) => token + 1);
  }

  async function toggleSold(car: Car) {
    setBusyId(car.id);
    setError(null);
    try {
      await setCarSold(car.id, !car.sold);
      reload();
    } catch {
      setError("La mise à jour du statut a échoué.");
    } finally {
      setBusyId(null);
    }
  }

  async function removeCar(car: Car) {
    const confirmed = window.confirm(
      `Supprimer définitivement ${car.brand} ${car.model} ? Les photos associées seront également effacées.`,
    );
    if (!confirmed) return;
    setBusyId(car.id);
    setError(null);
    try {
      await deleteCar(car);
      reload();
    } catch {
      setError("La suppression du véhicule a échoué.");
    } finally {
      setBusyId(null);
    }
  }

  function handleSaved() {
    setMode("list");
    setEditing(null);
    reload();
  }

  return (
    <AdminShell
      title="Gestion des véhicules"
      description="Ajoutez, modifiez ou retirez les véhicules affichés sur le site. Les photos sont stockées sur Firebase Storage."
    >
      {!isFirebaseConfigured ? (
        <ConfigNotice />
      ) : mode !== "list" ? (
        <CarForm
          car={mode === "edit" ? editing : null}
          onCancel={() => {
            setMode("list");
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-acier-600">
              {cars.length} véhicule{cars.length > 1 ? "s" : ""} enregistré
              {cars.length > 1 ? "s" : ""}
            </p>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setMode("create");
              }}
              className="rounded-md bg-flamme-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-flamme-700"
            >
              + Ajouter un véhicule
            </button>
          </div>

          {error ? <ErrorState message={error} /> : null}

          {loading ? (
            <LoadingState label="Chargement des véhicules…" />
          ) : cars.length === 0 ? (
            <EmptyState
              title="Aucun véhicule enregistré"
              description="Ajoutez votre premier véhicule pour qu'il apparaisse sur le site."
            />
          ) : (
            <ul className="space-y-4">
              {cars.map((car) => (
                <li
                  key={car.id}
                  className="flex flex-col gap-4 rounded-xl border border-nuit-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-nuit-50 sm:w-36">
                    {car.images[0] ? (
                      <Image
                        src={car.images[0].url}
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-acier-400">
                        Sans photo
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-nuit-900">
                        {car.brand} {car.model}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          car.sold
                            ? "bg-nuit-100 text-nuit-700"
                            : "bg-flamme-100 text-flamme-700"
                        }`}
                      >
                        {car.sold ? "Vendue" : "Disponible"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-acier-600">
                      {car.year} · {formatMileage(car.mileage)} ·{" "}
                      {FUEL_LABELS[car.fuel]} · {formatPrice(car.price)} ·{" "}
                      {car.images.length} photo
                      {car.images.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/voitures/detail?id=${encodeURIComponent(car.id)}`}
                      className="rounded-md border border-nuit-200 px-3 py-2 text-sm font-medium text-nuit-900 hover:bg-nuit-50"
                    >
                      Voir
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(car);
                        setMode("edit");
                      }}
                      className="rounded-md border border-nuit-200 px-3 py-2 text-sm font-medium text-nuit-900 hover:bg-nuit-50"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      disabled={busyId === car.id}
                      onClick={() => void toggleSold(car)}
                      className="rounded-md border border-nuit-200 px-3 py-2 text-sm font-medium text-nuit-900 hover:bg-nuit-50 disabled:opacity-60"
                    >
                      {car.sold ? "Remettre en vente" : "Marquer vendue"}
                    </button>
                    <button
                      type="button"
                      disabled={busyId === car.id}
                      onClick={() => void removeCar(car)}
                      className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </AdminShell>
  );
}
