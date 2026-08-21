"use client";

import { useState } from "react";
import ServiceIcon from "@/components/ServiceIcon";
import { Spinner } from "@/components/StateMessage";
import { createService, SERVICE_PRESETS, updateService } from "@/lib/services";
import {
  SERVICE_ICON_LABELS,
  type Service,
  type ServiceIconName,
  type ServiceInput,
} from "@/types";

const fieldClass =
  "mt-1 w-full rounded-md border border-nuit-200 px-3 py-2 text-sm text-nuit-900 outline-none focus:border-flamme-600 focus:ring-2 focus:ring-flamme-100";
const labelClass = "block text-sm font-medium text-nuit-900";

export default function ServiceForm({
  service,
  nextOrder,
  onCancel,
  onSaved,
}: {
  service: Service | null;
  nextOrder: number;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [price, setPrice] = useState(service?.price ?? "");
  const [icon, setIcon] = useState<ServiceIconName>(service?.icon ?? "revision");
  const [order, setOrder] = useState(String(service?.order ?? nextOrder));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function applyPreset(preset: ServiceInput) {
    setName(preset.name);
    setDescription(preset.description);
    setPrice(preset.price);
    setIcon(preset.icon);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const input: ServiceInput = {
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      icon,
      order: Number(order) || 0,
    };

    if (!input.name) {
      setError("Le nom de la prestation est obligatoire.");
      return;
    }

    setSubmitting(true);
    try {
      if (service) {
        await updateService(service.id, input);
      } else {
        await createService(input);
      }
      onSaved();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "L'enregistrement de la prestation a échoué.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-nuit-100 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-nuit-900">
        {service ? `Modifier « ${service.name} »` : "Ajouter une prestation"}
      </h2>

      {!service ? (
        <div>
          <p className={labelClass}>Préréglages (facultatif)</p>
          <p className="mt-1 text-xs text-acier-400">
            Cliquez pour pré-remplir nom, description, tarif et icône —
            modifiable ensuite avant d&apos;enregistrer.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SERVICE_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="rounded-full border border-nuit-200 px-3 py-1.5 text-sm text-nuit-700 transition hover:border-flamme-600 hover:text-flamme-700"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="name">
            Nom de la prestation
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="price">
            Tarif affiché
          </label>
          <input
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="À partir de 69 €"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="order">
            Ordre d&apos;affichage
          </label>
          <input
            id="order"
            type="number"
            min="0"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="icon">
            Icône
          </label>
          <div className="mt-1 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-flamme-100 text-flamme-700">
              <ServiceIcon name={icon} className="h-5 w-5" />
            </span>
            <select
              id="icon"
              value={icon}
              onChange={(event) =>
                setIcon(event.target.value as ServiceIconName)
              }
              className="w-full rounded-md border border-nuit-200 px-3 py-2 text-sm text-nuit-900 outline-none focus:border-flamme-600 focus:ring-2 focus:ring-flamme-100"
            >
              {(
                Object.keys(SERVICE_ICON_LABELS) as ServiceIconName[]
              ).map((value) => (
                <option key={value} value={value}>
                  {SERVICE_ICON_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-md bg-flamme-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-flamme-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Spinner className="h-4 w-4" /> : null}
          {service ? "Enregistrer les modifications" : "Ajouter la prestation"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-md border border-nuit-200 px-5 py-2.5 text-sm font-semibold text-nuit-900 transition hover:bg-nuit-50 disabled:opacity-60"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
