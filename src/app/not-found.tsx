import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-flamme-600">
        Erreur 404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-nuit-900 sm:text-4xl">
        Cette page n&apos;existe pas
      </h1>
      <p className="mt-4 text-base leading-relaxed text-acier-600">
        La page recherchée a été déplacée ou le véhicule concerné n&apos;est
        plus en ligne.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-flamme-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-flamme-700"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/voitures"
          className="rounded-md border border-nuit-200 px-6 py-3 text-sm font-semibold text-nuit-900 transition hover:bg-nuit-50"
        >
          Voir nos véhicules
        </Link>
      </div>
    </div>
  );
}
