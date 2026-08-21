"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { ConfigNotice, LoadingState, Spinner } from "@/components/StateMessage";
import { authErrorMessage, signInAdmin } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin/voitures");
    }
  }, [loading, user, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInAdmin(email.trim(), password);
      router.replace("/admin/voitures");
    } catch (cause) {
      setError(authErrorMessage(cause));
      setSubmitting(false);
    }
  }

  if (loading || user) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-20 sm:px-6">
        <LoadingState label="Chargement de l'espace administrateur…" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-flamme-600">
          Espace administrateur
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-nuit-900">
          Connexion
        </h1>
        <p className="mt-2 text-sm text-acier-600">
          Réservé à l&apos;équipe du garage : gestion des véhicules et des
          prestations.
        </p>
      </header>

      {isFirebaseConfigured ? null : (
        <div className="mt-6">
          <ConfigNotice />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-nuit-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-nuit-900"
          >
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-nuit-200 px-3 py-2 text-sm text-nuit-900 outline-none focus:border-flamme-600 focus:ring-2 focus:ring-flamme-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-nuit-900"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-nuit-200 px-3 py-2 text-sm text-nuit-900 outline-none focus:border-flamme-600 focus:ring-2 focus:ring-flamme-100"
          />
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-flamme-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-flamme-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Spinner className="h-4 w-4" /> : null}
          Se connecter
        </button>
      </form>
    </div>
  );
}
