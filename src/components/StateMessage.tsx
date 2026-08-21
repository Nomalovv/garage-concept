export function Spinner({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`animate-spin ${className}`}
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoadingState({ label = "Chargement…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 border border-dashed border-nuit-900/20 bg-papier-100 px-6 py-16 text-acier-600">
      <Spinner />
      <span className="repere-scene">{label}</span>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border border-dashed border-nuit-900/20 bg-papier-100 px-6 py-16 text-center">
      <p className="titre-scene text-2xl text-nuit-950">{title}</p>
      {description ? (
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-acier-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="border-l-2 border-flamme-600 bg-flamme-100 px-6 py-5 text-sm leading-relaxed text-flamme-700"
    >
      {message}
    </div>
  );
}

export function ConfigNotice() {
  return (
    <div className="border border-dashed border-nuit-900/20 bg-papier-100 px-6 py-6 text-sm text-acier-600">
      <p className="repere-scene text-flamme-600">
        Firebase n&apos;est pas encore configuré
      </p>
      <p className="mt-3 leading-relaxed">
        Renseignez les variables <code>NEXT_PUBLIC_FIREBASE_*</code> dans un
        fichier <code>.env.local</code> (modèle disponible dans{" "}
        <code>.env.local.example</code>) pour afficher les données réelles du
        garage.
      </p>
    </div>
  );
}
