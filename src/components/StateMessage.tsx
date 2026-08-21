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
    <div className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-nuit-200 bg-nuit-50 px-6 py-16 text-acier-600">
      <Spinner />
      <span className="text-sm font-medium">{label}</span>
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
    <div className="rounded-xl border border-dashed border-nuit-200 bg-nuit-50 px-6 py-16 text-center">
      <p className="text-base font-semibold text-nuit-900">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-acier-600">{description}</p>
      ) : null}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-6 py-6 text-center text-sm text-red-700"
    >
      {message}
    </div>
  );
}

export function ConfigNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-6 text-sm text-amber-800">
      <p className="font-semibold">Firebase n&apos;est pas encore configuré.</p>
      <p className="mt-2 leading-relaxed">
        Renseignez les variables <code>NEXT_PUBLIC_FIREBASE_*</code> dans un
        fichier <code>.env.local</code> (modèle disponible dans{" "}
        <code>.env.local.example</code>) pour afficher les données réelles du
        garage.
      </p>
    </div>
  );
}
