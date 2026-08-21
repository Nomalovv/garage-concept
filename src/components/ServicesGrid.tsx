"use client";

import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { ErrorState, LoadingState } from "@/components/StateMessage";
import { FALLBACK_SERVICES, fetchPublicServices } from "@/lib/services";
import type { Service } from "@/types";

export default function ServicesGrid({ limit }: { limit?: number }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchPublicServices()
      .then((result) => {
        if (active) setServices(result);
      })
      .catch(() => {
        if (!active) return;
        // En cas d'indisponibilité de Firestore, on affiche le catalogue par défaut.
        setServices(FALLBACK_SERVICES);
        setError(
          "Les prestations n'ont pas pu être chargées depuis la base : le catalogue par défaut est affiché.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <LoadingState label="Chargement des prestations…" />;

  const visible = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="space-y-6">
      {error ? <ErrorState message={error} /> : null}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
