"use client";

import Image from "next/image";
import { useState } from "react";
import { Spinner } from "@/components/StateMessage";
import { carBrands, carModelsForBrand } from "@/lib/carCatalog";
import { createCar, updateCar } from "@/lib/cars";
import { fiscalHorsepower, hpFromKw } from "@/lib/power";
import {
  BODY_TYPE_LABELS,
  EURO_NORM_LABELS,
  FUEL_LABELS,
  TRANSMISSION_LABELS,
  type BodyType,
  type Car,
  type CarInput,
  type EuroNorm,
  type Fuel,
  type Transmission,
} from "@/types";

type FormValues = {
  brand: string;
  model: string;
  trim: string;
  engine: string;
  powerKw: string;
  co2: string;
  bodyType: BodyType;
  doors: string;
  seats: string;
  color: string;
  firstRegistration: string;
  euroNorm: EuroNorm | "";
  year: string;
  price: string;
  mileage: string;
  fuel: Fuel;
  transmission: Transmission;
  description: string;
  sold: boolean;
};

function initialValues(car: Car | null): FormValues {
  return {
    brand: car?.brand ?? "",
    model: car?.model ?? "",
    trim: car?.trim ?? "",
    engine: car?.engine ?? "",
    powerKw: car?.powerKw ? String(car.powerKw) : "",
    co2: car?.co2 ? String(car.co2) : "",
    bodyType: car?.bodyType ?? "berline",
    doors: car?.doors ? String(car.doors) : "5",
    seats: car?.seats ? String(car.seats) : "5",
    color: car?.color ?? "",
    firstRegistration: car?.firstRegistration ?? "",
    euroNorm: car?.euroNorm ?? "",
    year: String(car?.year ?? new Date().getFullYear()),
    price: car ? String(car.price) : "",
    mileage: car ? String(car.mileage) : "",
    fuel: car?.fuel ?? "essence",
    transmission: car?.transmission ?? "manuelle",
    description: car?.description ?? "",
    sold: car?.sold ?? false,
  };
}

const fieldClass =
  "mt-1 w-full rounded-md border border-nuit-200 px-3 py-2 text-sm text-nuit-900 outline-none focus:border-flamme-600 focus:ring-2 focus:ring-flamme-100";
const labelClass = "block text-sm font-medium text-nuit-900";

export default function CarForm({
  car,
  onCancel,
  onSaved,
}: {
  car: Car | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<FormValues>(() => initialValues(car));
  const [images, setImages] = useState<string[]>(car?.images ?? []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const brandOptions = carBrands();
  const modelOptionsForBrand = carModelsForBrand(values.brand);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  const powerKwValue = Number(values.powerKw) || 0;
  const co2Value = Number(values.co2) || 0;
  const computedHp = hpFromKw(powerKwValue);
  const computedFiscalHp = fiscalHorsepower(powerKwValue, co2Value);

  function addImageUrl() {
    const url = newImageUrl.trim();
    if (!url) return;
    setImages((current) => [...current, url]);
    setNewImageUrl("");
  }

  function removeImage(index: number) {
    setImages((current) => current.filter((_, position) => position !== index));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const input: CarInput = {
      brand: values.brand.trim(),
      model: values.model.trim(),
      trim: values.trim.trim(),
      engine: values.engine.trim(),
      powerKw: powerKwValue,
      co2: co2Value,
      bodyType: values.bodyType,
      doors: Number(values.doors) || 0,
      seats: Number(values.seats) || 0,
      color: values.color.trim(),
      firstRegistration: values.firstRegistration,
      euroNorm: values.euroNorm,
      year: Number(values.year) || new Date().getFullYear(),
      price: Number(values.price) || 0,
      mileage: Number(values.mileage) || 0,
      fuel: values.fuel,
      transmission: values.transmission,
      description: values.description.trim(),
      sold: values.sold,
    };

    if (!input.brand || !input.model) {
      setError("La marque et le modèle sont obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      if (car) {
        await updateCar(car.id, input, images);
      } else {
        await createCar(input, images);
      }
      onSaved();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "L'enregistrement du véhicule a échoué.",
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
        {car ? `Modifier ${car.brand} ${car.model}` : "Ajouter un véhicule"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="brand">
            Marque
          </label>
          <input
            id="brand"
            required
            list="brand-options"
            value={values.brand}
            onChange={(event) => update("brand", event.target.value)}
            className={fieldClass}
          />
          <datalist id="brand-options">
            {brandOptions.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
        <div>
          <label className={labelClass} htmlFor="model">
            Modèle
          </label>
          <input
            id="model"
            required
            list="model-options"
            value={values.model}
            onChange={(event) => update("model", event.target.value)}
            className={fieldClass}
          />
          <datalist id="model-options">
            {modelOptionsForBrand.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>
        <div>
          <label className={labelClass} htmlFor="trim">
            Finition / édition
          </label>
          <input
            id="trim"
            value={values.trim}
            onChange={(event) => update("trim", event.target.value)}
            placeholder="GT Line, Allure, Style…"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="engine">
            Motorisation
          </label>
          <input
            id="engine"
            value={values.engine}
            onChange={(event) => update("engine", event.target.value)}
            placeholder="1.6 BlueHDi 120, 1.2 PureTech 130…"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="powerKw">
            Puissance (kW)
          </label>
          <input
            id="powerKw"
            type="number"
            min="0"
            step="1"
            value={values.powerKw}
            onChange={(event) => update("powerKw", event.target.value)}
            placeholder="Voir la carte grise (champ P.2)"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="co2">
            Émissions CO2 (g/km)
          </label>
          <input
            id="co2"
            type="number"
            min="0"
            step="1"
            value={values.co2}
            onChange={(event) => update("co2", event.target.value)}
            placeholder="Voir la carte grise (champ V.7)"
            className={fieldClass}
          />
        </div>
        {computedHp !== null ? (
          <div className="sm:col-span-2 flex flex-wrap gap-4 rounded-md bg-nuit-50 px-3 py-2 text-sm text-nuit-700">
            <span>
              Puissance : <strong>{computedHp} ch</strong>
            </span>
            {computedFiscalHp !== null ? (
              <span>
                Puissance fiscale : <strong>{computedFiscalHp} CV</strong>
              </span>
            ) : null}
          </div>
        ) : null}
        <div>
          <label className={labelClass} htmlFor="bodyType">
            Carrosserie
          </label>
          <select
            id="bodyType"
            value={values.bodyType}
            onChange={(event) =>
              update("bodyType", event.target.value as BodyType)
            }
            className={fieldClass}
          >
            {(Object.keys(BODY_TYPE_LABELS) as BodyType[]).map((value) => (
              <option key={value} value={value}>
                {BODY_TYPE_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="color">
            Couleur
          </label>
          <input
            id="color"
            value={values.color}
            onChange={(event) => update("color", event.target.value)}
            placeholder="Blanc nacré, Gris platinium…"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="doors">
            Portes
          </label>
          <select
            id="doors"
            value={values.doors}
            onChange={(event) => update("doors", event.target.value)}
            className={fieldClass}
          >
            {["2", "3", "4", "5"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="seats">
            Places
          </label>
          <input
            id="seats"
            type="number"
            min="1"
            max="9"
            value={values.seats}
            onChange={(event) => update("seats", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="firstRegistration">
            1ère mise en circulation
          </label>
          <input
            id="firstRegistration"
            type="month"
            value={values.firstRegistration}
            onChange={(event) => update("firstRegistration", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="euroNorm">
            Norme Euro
          </label>
          <select
            id="euroNorm"
            value={values.euroNorm}
            onChange={(event) =>
              update("euroNorm", event.target.value as EuroNorm | "")
            }
            className={fieldClass}
          >
            <option value="">Non renseignée</option>
            {(Object.keys(EURO_NORM_LABELS) as EuroNorm[]).map((value) => (
              <option key={value} value={value}>
                {EURO_NORM_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="year">
            Année
          </label>
          <input
            id="year"
            type="number"
            min="1950"
            max="2100"
            required
            value={values.year}
            onChange={(event) => update("year", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="price">
            Prix (€)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="100"
            required
            value={values.price}
            onChange={(event) => update("price", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="mileage">
            Kilométrage (km)
          </label>
          <input
            id="mileage"
            type="number"
            min="0"
            step="100"
            required
            value={values.mileage}
            onChange={(event) => update("mileage", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fuel">
            Carburant
          </label>
          <select
            id="fuel"
            value={values.fuel}
            onChange={(event) => update("fuel", event.target.value as Fuel)}
            className={fieldClass}
          >
            {(Object.keys(FUEL_LABELS) as Fuel[]).map((value) => (
              <option key={value} value={value}>
                {FUEL_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="transmission">
            Boîte de vitesses
          </label>
          <select
            id="transmission"
            value={values.transmission}
            onChange={(event) =>
              update("transmission", event.target.value as Transmission)
            }
            className={fieldClass}
          >
            {(Object.keys(TRANSMISSION_LABELS) as Transmission[]).map(
              (value) => (
                <option key={value} value={value}>
                  {TRANSMISSION_LABELS[value]}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-medium text-nuit-900">
            <input
              type="checkbox"
              checked={values.sold}
              onChange={(event) => update("sold", event.target.checked)}
              className="h-4 w-4 rounded border-nuit-200"
            />
            Véhicule vendu
          </label>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className={fieldClass}
          placeholder="Équipements, historique d'entretien, points forts du véhicule…"
        />
      </div>

      <div className="space-y-3">
        <label className={labelClass} htmlFor="photo-url">
          Photos (URL)
        </label>
        <div className="flex gap-2">
          <input
            id="photo-url"
            type="url"
            value={newImageUrl}
            onChange={(event) => setNewImageUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addImageUrl();
              }
            }}
            placeholder="https://…"
            className={fieldClass}
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="shrink-0 rounded-md border border-nuit-200 px-4 py-2 text-sm font-semibold text-nuit-900 hover:bg-nuit-50"
          >
            Ajouter
          </button>
        </div>
        <p className="text-xs text-acier-400">
          Collez le lien d&apos;une photo déjà hébergée (Imgur, Cloudinary…).
          La première photo sert de vignette.
        </p>

        {images.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {images.map((url, index) => (
              <div
                key={url}
                className="relative aspect-square overflow-hidden rounded-lg border border-nuit-100"
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label="Retirer cette photo"
                  className="absolute right-1 top-1 rounded-full bg-nuit-900/80 px-2 py-0.5 text-xs font-semibold text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : null}
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
          {car ? "Enregistrer les modifications" : "Ajouter le véhicule"}
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
