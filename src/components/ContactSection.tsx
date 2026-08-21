import { fullAddress, garageInfo, mapsEmbedUrl } from "@/lib/garageInfo";

export default function ContactSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-xl border border-nuit-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-nuit-900">
            Nous trouver
          </h3>
          <address className="mt-3 not-italic text-sm leading-relaxed text-acier-600">
            {garageInfo.name}
            <br />
            {garageInfo.address.street}
            <br />
            {garageInfo.address.postalCode} {garageInfo.address.city}
            <br />
            {garageInfo.address.country}
          </address>
        </div>

        <div className="rounded-xl border border-nuit-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-nuit-900">Nous joindre</h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-acier-600">Téléphone</dt>
              <dd>
                <a
                  href={`tel:${garageInfo.phone}`}
                  className="font-semibold text-flamme-600 hover:text-flamme-700"
                >
                  {garageInfo.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-acier-600">E-mail</dt>
              <dd>
                <a
                  href={`mailto:${garageInfo.email}`}
                  className="font-semibold text-flamme-600 hover:text-flamme-700"
                >
                  {garageInfo.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-nuit-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-nuit-900">
            Horaires d&apos;ouverture
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            {garageInfo.hours.map((slot) => (
              <div
                key={slot.days}
                className="flex items-center justify-between gap-4 border-b border-nuit-50 pb-2 last:border-0 last:pb-0"
              >
                <dt className="text-acier-600">{slot.days}</dt>
                <dd className="font-medium text-nuit-900">{slot.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-nuit-100 shadow-sm">
        <iframe
          title={`Localisation de ${garageInfo.name} — ${fullAddress}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[380px] w-full border-0"
        />
      </div>
    </div>
  );
}
