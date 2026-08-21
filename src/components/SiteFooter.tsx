import Link from "next/link";
import { fullAddress, garageInfo } from "@/lib/garageInfo";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-nuit-800 bg-nuit-950 text-nuit-100">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">{garageInfo.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-nuit-200">
            {garageInfo.tagline}. Vente de véhicules d&apos;occasion, entretien
            et réparation toutes marques à {garageInfo.address.city}.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-flamme-500">
            Coordonnées
          </p>
          <ul className="mt-3 space-y-2 text-sm text-nuit-200">
            <li>{fullAddress}</li>
            <li>
              <a
                className="hover:text-white"
                href={`tel:${garageInfo.phone}`}
              >
                {garageInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="hover:text-white"
                href={`mailto:${garageInfo.email}`}
              >
                {garageInfo.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-flamme-500">
            Horaires
          </p>
          <ul className="mt-3 space-y-2 text-sm text-nuit-200">
            {garageInfo.hours.map((slot) => (
              <li key={slot.days} className="flex justify-between gap-4">
                <span>{slot.days}</span>
                <span className="text-white">{slot.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-nuit-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-acier-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {garageInfo.name} — SIRET{" "}
            {garageInfo.siret}
          </p>
          <Link href="/admin" className="hover:text-nuit-100">
            Espace administrateur
          </Link>
        </div>
      </div>
    </footer>
  );
}
