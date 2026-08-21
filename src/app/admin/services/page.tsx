"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ServiceForm from "@/components/admin/ServiceForm";
import ServiceIcon from "@/components/ServiceIcon";
import {
  ConfigNotice,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/StateMessage";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  deleteService,
  fetchServices,
  seedDefaultServices,
} from "@/lib/services";
import type { Service } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Service | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let active = true;
    fetchServices()
      .then((result) => {
        if (!active) return;
        setServices(result);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Le chargement des prestations a échoué.");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadToken]);

  function reload() {
    setError(null);
    setLoading(true);
    setReloadToken((token) => token + 1);
  }

  async function removeService(service: Service) {
    const confirmed = window.confirm(
      `Supprimer définitivement la prestation « ${service.name} » ?`,
    );
    if (!confirmed) return;
    setBusyId(service.id);
    setError(null);
    try {
      await deleteService(service.id);
      reload();
    } catch {
      setError("La suppression de la prestation a échoué.");
    } finally {
      setBusyId(null);
    }
  }

  async function seed() {
    const confirmed = window.confirm(
      "Ajouter les 7 prestations par défaut (vidange, révision, pneus, contrôle technique, diagnostic, freins, climatisation) ?",
    );
    if (!confirmed) return;
    setSeeding(true);
    setError(null);
    try {
      await seedDefaultServices();
      reload();
    } catch {
      setError("L'import des prestations par défaut a échoué.");
    } finally {
      setSeeding(false);
    }
  }

  function handleSaved() {
    setMode("list");
    setEditing(null);
    reload();
  }

  const nextOrder =
    services.reduce((max, service) => Math.max(max, service.order), 0) + 1;

  return (
    <AdminShell
      title="Gestion des prestations"
      description="Les prestations affichées sur la page Services. Tant qu'aucune prestation n'est enregistrée, le site affiche le catalogue par défaut."
    >
      {!isFirebaseConfigured ? (
        <ConfigNotice />
      ) : mode !== "list" ? (
        <ServiceForm
          service={mode === "edit" ? editing : null}
          nextOrder={nextOrder}
          onCancel={() => {
            setMode("list");
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-acier-600">
              {services.length} prestation{services.length > 1 ? "s" : ""}{" "}
              enregistrée{services.length > 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-3">
              {services.length === 0 && !loading ? (
                <button
                  type="button"
                  disabled={seeding}
                  onClick={() => void seed()}
                  className="rounded-md border border-nuit-200 px-5 py-2.5 text-sm font-semibold text-nuit-900 transition hover:bg-nuit-50 disabled:opacity-60"
                >
                  Importer les prestations par défaut
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setMode("create");
                }}
                className="rounded-md bg-flamme-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-flamme-700"
              >
                + Ajouter une prestation
              </button>
            </div>
          </div>

          {error ? <ErrorState message={error} /> : null}

          {loading ? (
            <LoadingState label="Chargement des prestations…" />
          ) : services.length === 0 ? (
            <EmptyState
              title="Aucune prestation enregistrée"
              description="Le site affiche pour l'instant le catalogue par défaut. Importez-le en base pour pouvoir le modifier."
            />
          ) : (
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="flex flex-col gap-4 rounded-xl border border-nuit-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-flamme-100 text-flamme-700">
                    <ServiceIcon name={service.icon} className="h-6 w-6" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-nuit-900">
                      {service.order}. {service.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-acier-600">
                      {service.description}
                    </p>
                    {service.price ? (
                      <p className="mt-1 text-sm font-semibold text-flamme-600">
                        {service.price}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(service);
                        setMode("edit");
                      }}
                      className="rounded-md border border-nuit-200 px-3 py-2 text-sm font-medium text-nuit-900 hover:bg-nuit-50"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      disabled={busyId === service.id}
                      onClick={() => void removeService(service)}
                      className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </AdminShell>
  );
}
