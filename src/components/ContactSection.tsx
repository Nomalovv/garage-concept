import type { ReactNode } from "react";
import { fullAddress, garageInfo, mapsEmbedUrl } from "@/lib/garageInfo";

/** Bloc filaire « feuille de tournage » : repère en mono puis contenu. */
function Fiche({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-nuit-900/15 pt-5">
      <p className="repere-scene text-acier-600">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-8">
        <Fiche label="Nous trouver">
          <address className="titre-scene text-2xl not-italic leading-snug text-nuit-950">
            {garageInfo.address.street}
            <br />
            {garageInfo.address.postalCode} {garageInfo.address.city}
          </address>
          <p className="mt-2 text-sm text-acier-600">
            {garageInfo.name} — {garageInfo.address.country}
          </p>
        </Fiche>

        <Fiche label="Nous joindre">
          <dl className="space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-4 border-b border-dotted border-nuit-900/20 pb-3">
              <dt className="text-acier-600">Téléphone</dt>
              <dd>
                <a
                  href={`tel:${garageInfo.phone}`}
                  className="font-semibold text-flamme-600 transition-colors hover:text-flamme-700"
                >
                  {garageInfo.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-acier-600">E-mail</dt>
              <dd>
                <a
                  href={`mailto:${garageInfo.email}`}
                  className="font-semibold text-flamme-600 transition-colors hover:text-flamme-700"
                >
                  {garageInfo.email}
                </a>
              </dd>
            </div>
          </dl>
        </Fiche>

        <Fiche label="Horaires d'ouverture">
          <dl className="space-y-2 text-sm">
            {garageInfo.hours.map((slot) => (
              <div
                key={slot.days}
                className="flex items-baseline justify-between gap-4 border-b border-dotted border-nuit-900/20 pb-2 last:border-0 last:pb-0"
              >
                <dt className="text-acier-600">{slot.days}</dt>
                <dd className="font-semibold text-nuit-950">{slot.value}</dd>
              </div>
            ))}
          </dl>
        </Fiche>
      </div>

      <div className="border border-nuit-900/15 bg-papier-100 p-2">
        <iframe
          title={`Localisation de ${garageInfo.name} — ${fullAddress}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[380px] w-full border-0 grayscale-[35%]"
        />
      </div>
    </div>
  );
}
