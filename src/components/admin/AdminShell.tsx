"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { LoadingState } from "@/components/StateMessage";
import { signOutAdmin } from "@/lib/auth";

const ADMIN_LINKS = [
  { href: "/admin/voitures", label: "Voitures" },
  { href: "/admin/services", label: "Services" },
];

function normalize(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = normalize(usePathname() ?? "");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingState label="Vérification de la session…" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingState label="Redirection vers la connexion…" />
      </div>
    );
  }

  async function handleSignOut() {
    await signOutAdmin();
    router.replace("/admin");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-nuit-100 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-flamme-600">
            Espace administrateur
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-nuit-900">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm text-acier-600">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-acier-600 sm:inline">
            {user.email}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md border border-nuit-200 px-4 py-2 text-sm font-semibold text-nuit-900 transition hover:bg-nuit-50"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2">
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              pathname === link.href
                ? "bg-nuit-900 text-white"
                : "bg-nuit-50 text-nuit-700 hover:bg-nuit-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">{children}</div>
    </div>
  );
}
