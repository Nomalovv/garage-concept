import Image from "next/image";
import Link from "next/link";
import { formatMileage, formatPrice } from "@/lib/format";
import { FUEL_LABELS, TRANSMISSION_LABELS, type Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
  const cover = car.images[0];

  return (
    <Link
      href={`/voitures/detail?id=${encodeURIComponent(car.id)}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-nuit-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-nuit-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-nuit-50">
        {cover ? (
          <Image
            src={cover.url}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-acier-400">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 13h16l-1.5-4.5A2 2 0 0 0 16.6 7H7.4a2 2 0 0 0-1.9 1.5L4 13Z" />
              <path d="M4 13v4h2.5M20 13v4h-2.5" />
              <circle cx="7.5" cy="17" r="1.5" />
              <circle cx="16.5" cy="17" r="1.5" />
            </svg>
          </div>
        )}
        {car.sold ? (
          <span className="absolute left-3 top-3 rounded-full bg-nuit-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Vendue
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-nuit-900">
            {car.brand} {car.model}
          </h3>
          <p className="mt-1 text-sm text-acier-600">
            {car.year} · {formatMileage(car.mileage)} ·{" "}
            {FUEL_LABELS[car.fuel]} · {TRANSMISSION_LABELS[car.transmission]}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <span
            className={`text-xl font-bold ${
              car.sold ? "text-acier-400 line-through" : "text-flamme-600"
            }`}
          >
            {formatPrice(car.price)}
          </span>
          <span className="text-sm font-medium text-nuit-700 group-hover:text-flamme-600">
            Voir la fiche →
          </span>
        </div>
      </div>
    </Link>
  );
}
