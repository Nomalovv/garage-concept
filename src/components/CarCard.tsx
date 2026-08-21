import Image from "next/image";
import Link from "next/link";
import { formatMileage, formatPrice } from "@/lib/format";
import { FUEL_LABELS, TRANSMISSION_LABELS, type Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
  const cover = car.images[0];

  return (
    <Link
      href={`/voitures/detail?id=${encodeURIComponent(car.id)}`}
      className="group flex flex-col border border-nuit-900/12 bg-papier-50 transition-colors hover:border-nuit-900/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-papier-200">
        {cover ? (
          <Image
            src={cover}
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
          <span className="repere-scene absolute left-0 top-4 bg-nuit-950 px-3 py-1.5 text-white">
            Vendue
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-nuit-900/12 p-5">
        <div>
          <h3 className="titre-scene text-xl text-nuit-950">
            {car.brand} {car.model} {car.trim}
          </h3>
          <p className="mt-2 text-sm text-acier-600">
            {car.year} · {formatMileage(car.mileage)} ·{" "}
            {FUEL_LABELS[car.fuel]} · {TRANSMISSION_LABELS[car.transmission]}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-nuit-900/12 pt-4">
          <span
            className={`titre-scene text-2xl ${
              car.sold ? "text-acier-400 line-through" : "text-flamme-600"
            }`}
          >
            {formatPrice(car.price)}
          </span>
          <span className="repere-scene text-acier-600 transition-colors group-hover:text-flamme-600">
            Voir →
          </span>
        </div>
      </div>
    </Link>
  );
}
