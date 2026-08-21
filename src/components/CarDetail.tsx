"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ConfigNotice,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/StateMessage";
import { fetchCar } from "@/lib/cars";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatMileage, formatPrice } from "@/lib/format";
import { garageInfo } from "@/lib/garageInfo";
import { FUEL_LABELS, TRANSMISSION_LABELS, type Car } from "@/types";

function BackLink() {
  return (
    <Link
      href="/voitures"
      className="inline-flex items-center gap-2 text-sm font-medium text-acier-600 hover:text-nuit-900"
    >
      ← Retour aux véhicules
    </Link>
  );
}

export default function CarDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!isFirebaseConfigured) {
    return (
      <div className="space-y-6">
        <BackLink />
        <ConfigNotice />
      </div>
    );
  }

  if (!id) {
    return (
      <div className="space-y-6">
        <BackLink />
        <EmptyState
          title="Aucun véhicule sélectionné"
          description="Le lien utilisé ne contient pas d'identifiant de véhicule."
        />
      </div>
    );
  }

  // La clé réinitialise l'état interne (photo active, chargement) à chaque
  // changement de véhicule dans l'URL.
  return <CarView key={id} id={id} />;
}

type ViewState =
  | { status: "loading" }
  | { status: "ready"; car: Car | null }
  | { status: "error" };

function CarView({ id }: { id: string }) {
  const [state, setState] = useState<ViewState>({ status: "loading" });
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let active = true;
    fetchCar(id)
      .then((car) => {
        if (active) setState({ status: "ready", car });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (state.status === "loading") {
    return <LoadingState label="Chargement du véhicule…" />;
  }

  if (state.status === "error") {
    return (
      <div className="space-y-6">
        <BackLink />
        <ErrorState message="Impossible de charger ce véhicule. Merci de réessayer plus tard." />
      </div>
    );
  }

  const car = state.car;

  if (!car) {
    return (
      <div className="space-y-6">
        <BackLink />
        <EmptyState
          title="Véhicule introuvable"
          description="Ce véhicule a peut-être été vendu et retiré du catalogue."
        />
      </div>
    );
  }

  const cover = car.images[activeImage] ?? car.images[0];
  const specs = [
    { label: "Année", value: String(car.year) },
    { label: "Kilométrage", value: formatMileage(car.mileage) },
    { label: "Carburant", value: FUEL_LABELS[car.fuel] },
    { label: "Boîte de vitesses", value: TRANSMISSION_LABELS[car.transmission] },
  ];

  return (
    <div className="space-y-8">
      <BackLink />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-nuit-100 bg-nuit-50">
            {cover ? (
              <Image
                src={cover.url}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-acier-400">
                Aucune photo disponible
              </div>
            )}
            {car.sold ? (
              <span className="absolute left-4 top-4 rounded-full bg-nuit-900/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                Vendue
              </span>
            ) : null}
          </div>

          {car.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {car.images.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Afficher la photo ${index + 1}`}
                  aria-pressed={index === activeImage}
                  className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                    index === activeImage
                      ? "border-flamme-600 ring-2 ring-flamme-100"
                      : "border-nuit-100 hover:border-nuit-200"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-nuit-900">
              {car.brand} {car.model}
            </h1>
            <p className="mt-2 text-sm text-acier-600">
              {car.year} · {formatMileage(car.mileage)} ·{" "}
              {FUEL_LABELS[car.fuel]}
            </p>
            <p
              className={`mt-4 text-4xl font-bold ${
                car.sold ? "text-acier-400 line-through" : "text-flamme-600"
              }`}
            >
              {formatPrice(car.price)}
            </p>
            {car.sold ? (
              <p className="mt-2 text-sm font-medium text-acier-600">
                Ce véhicule a été vendu. Contactez-nous pour connaître les
                arrivages similaires.
              </p>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-nuit-100 bg-nuit-100">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-white p-4">
                <dt className="text-xs uppercase tracking-widest text-acier-400">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-nuit-900">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          {car.description ? (
            <div className="rounded-xl border border-nuit-100 bg-white p-5">
              <h2 className="text-base font-semibold text-nuit-900">
                Description
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-acier-600">
                {car.description}
              </p>
            </div>
          ) : null}

          <div className="rounded-xl border border-nuit-100 bg-nuit-50 p-5">
            <h2 className="text-base font-semibold text-nuit-900">
              Ce véhicule vous intéresse ?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-acier-600">
              Contactez le garage pour organiser un essai ou obtenir une
              estimation de reprise de votre véhicule actuel.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`tel:${garageInfo.phone}`}
                className="rounded-md bg-flamme-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-flamme-700"
              >
                {garageInfo.phoneDisplay}
              </a>
              <a
                href={`mailto:${garageInfo.email}?subject=${encodeURIComponent(
                  `Demande d'information — ${car.brand} ${car.model}`,
                )}`}
                className="rounded-md border border-nuit-200 bg-white px-5 py-2.5 text-sm font-semibold text-nuit-900 transition hover:bg-nuit-100"
              >
                Envoyer un e-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
