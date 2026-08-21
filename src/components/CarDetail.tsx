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
import { formatMileage, formatMonth, formatPrice } from "@/lib/format";
import { fiscalHorsepower, hpFromKw } from "@/lib/power";
import { garageInfo } from "@/lib/garageInfo";
import {
  BODY_TYPE_LABELS,
  EURO_NORM_LABELS,
  FUEL_LABELS,
  TRANSMISSION_LABELS,
  type Car,
} from "@/types";

function BackLink() {
  return (
    <Link
      href="/voitures"
      className="repere-scene inline-flex items-center gap-2 text-acier-600 transition-colors hover:text-flamme-600"
    >
      ← Retour au catalogue
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
  const hp = hpFromKw(car.powerKw);
  const fiscalHp = fiscalHorsepower(car.powerKw, car.co2);
  const specs = [
    { label: "Année", value: String(car.year) },
    { label: "Kilométrage", value: formatMileage(car.mileage) },
    { label: "Carburant", value: FUEL_LABELS[car.fuel] },
    { label: "Boîte de vitesses", value: TRANSMISSION_LABELS[car.transmission] },
    { label: "Carrosserie", value: BODY_TYPE_LABELS[car.bodyType] },
    ...(car.engine ? [{ label: "Motorisation", value: car.engine }] : []),
    ...(hp !== null ? [{ label: "Puissance", value: `${hp} ch` }] : []),
    ...(fiscalHp !== null
      ? [{ label: "Puissance fiscale", value: `${fiscalHp} CV` }]
      : []),
    ...(car.doors ? [{ label: "Portes", value: String(car.doors) }] : []),
    ...(car.seats ? [{ label: "Places", value: String(car.seats) }] : []),
    ...(car.color ? [{ label: "Couleur", value: car.color }] : []),
    ...(car.firstRegistration
      ? [{ label: "1ère mise en circulation", value: formatMonth(car.firstRegistration) }]
      : []),
    ...(car.euroNorm
      ? [{ label: "Norme Euro", value: EURO_NORM_LABELS[car.euroNorm] }]
      : []),
  ];

  return (
    <div className="space-y-8">
      <BackLink />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-nuit-900/15 bg-papier-200">
            {cover ? (
              <Image
                src={cover}
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
              <span className="repere-scene absolute left-0 top-5 bg-nuit-950 px-4 py-2 text-white">
                Vendue
              </span>
            ) : null}
          </div>

          {car.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {car.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Afficher la photo ${index + 1}`}
                  aria-pressed={index === activeImage}
                  className={`relative aspect-square overflow-hidden border transition-colors ${
                    index === activeImage
                      ? "border-flamme-600"
                      : "border-nuit-900/15 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
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
          <div className="border-t border-nuit-900/15 pt-5">
            <p className="repere-scene text-acier-600">
              {car.year} · {formatMileage(car.mileage)} ·{" "}
              {FUEL_LABELS[car.fuel]}
            </p>
            <h1 className="titre-scene mt-4 text-4xl text-nuit-950 sm:text-5xl">
              {car.brand} {car.model}{" "}
              {car.trim ? (
                <span className="text-flamme-600">{car.trim}</span>
              ) : null}
            </h1>
            <p
              className={`titre-scene mt-5 text-5xl ${
                car.sold ? "text-acier-400 line-through" : "text-flamme-600"
              }`}
            >
              {formatPrice(car.price)}
            </p>
            {car.sold ? (
              <p className="mt-3 text-sm leading-relaxed text-acier-600">
                Ce véhicule a été vendu. Contactez-nous pour connaître les
                arrivages similaires.
              </p>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 border-t border-l border-nuit-900/15">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="border-r border-b border-nuit-900/15 p-4"
              >
                <dt className="repere-scene text-acier-400">{spec.label}</dt>
                <dd className="mt-2 text-sm font-semibold text-nuit-950">
                  {spec.value}
                </dd>
              </div>
            ))}
            {/* Case de remplissage : referme la grille quand le nombre de
                caractéristiques est impair. */}
            {specs.length % 2 === 1 ? (
              <div
                aria-hidden="true"
                className="border-r border-b border-nuit-900/15"
              />
            ) : null}
          </dl>

          {car.description ? (
            <div className="border-t border-nuit-900/15 pt-5">
              <h2 className="repere-scene text-acier-600">Description</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-nuit-900">
                {car.description}
              </p>
            </div>
          ) : null}

          <div className="relative border border-nuit-900/15 bg-papier-100 p-6">
            <span
              aria-hidden="true"
              className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-flamme-600"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-flamme-600"
            />
            <p className="repere-scene text-acier-600">Prendre contact</p>
            <h2 className="titre-scene mt-4 text-2xl text-nuit-950">
              Ce véhicule vous intéresse ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-acier-600">
              Contactez le garage pour organiser un essai ou obtenir une
              estimation de reprise de votre véhicule actuel.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${garageInfo.phone}`}
                className="bg-flamme-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-flamme-700"
              >
                {garageInfo.phoneDisplay}
              </a>
              <a
                href={`mailto:${garageInfo.email}?subject=${encodeURIComponent(
                  `Demande d'information — ${car.brand} ${car.model}`,
                )}`}
                className="group inline-flex items-center gap-2 border-b border-nuit-900/30 pb-1 text-sm font-semibold text-nuit-900 transition-colors hover:border-flamme-600 hover:text-flamme-600"
              >
                Envoyer un e-mail
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
