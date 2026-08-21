// Source live : base "Car Labelling" de l'ADEME (data.ademe.fr), mise à jour
// trimestriellement par l'ADEME/UTAC à partir des homologations réelles des
// véhicules commercialisés en France. API publique, gratuite, sans clé,
// CORS ouvert (Access-Control-Allow-Origin: *). C'est la seule source fiable
// trouvée pour le marché français (voir carCatalog.ts pour le repli hors
// ligne utilisé si cette API est indisponible).
import type { BodyType, Fuel } from "@/types";

const BASE_URL =
  "https://data.ademe.fr/data-fair/api/v1/datasets/ademe-car-labelling";

export interface AdemeTrim {
  label: string;
  powerKw: number;
  co2: number;
  fuel: Fuel | null;
  bodyType: BodyType | null;
  transmission: "manuelle" | "automatique" | null;
  doors: number | null;
  seats: number | null;
}

// L'ADEME ne fournit ni portes ni places (base centrée conso/CO2). On propose
// donc une valeur par défaut plausible selon la carrosserie — à corriger par
// l'admin si besoin, pas une donnée officielle comme le reste.
const DOORS_SEATS_BY_BODY_TYPE: Record<BodyType, { doors: number; seats: number }> = {
  citadine: { doors: 5, seats: 5 },
  berline: { doors: 4, seats: 5 },
  break: { doors: 5, seats: 5 },
  suv: { doors: 5, seats: 5 },
  monospace: { doors: 5, seats: 7 },
  coupe: { doors: 2, seats: 4 },
  cabriolet: { doors: 2, seats: 4 },
  utilitaire: { doors: 5, seats: 3 },
};

function estimateDoorsSeats(bodyType: BodyType | null): {
  doors: number | null;
  seats: number | null;
} {
  if (!bodyType) return { doors: null, seats: null };
  return DOORS_SEATS_BY_BODY_TYPE[bodyType];
}

function mapFuel(energie: unknown): Fuel | null {
  if (typeof energie !== "string") return null;
  if (energie === "ELECTRIC") return "electrique";
  if (energie === "GAZOLE") return "diesel";
  if (energie.includes("ELEC")) return "hybride";
  if (energie === "ESSENCE" || energie === "SUPERETHANOL" || energie === "ESS+G.P.L.") {
    return "essence";
  }
  return null;
}

function mapBodyType(carrosserie: unknown): BodyType | null {
  if (typeof carrosserie !== "string") return null;
  switch (carrosserie) {
    case "BERLINE":
      return "berline";
    case "BREAK":
      return "break";
    case "CABRIOLET":
      return "cabriolet";
    case "COUPE":
      return "coupe";
    case "MONOSPACE":
    case "MONOSPACE COMPACT":
    case "MINISPACE":
    case "MINIBUS":
    case "COMBISPACE":
      return "monospace";
    case "TS TERRAINS/CHEMINS":
      return "suv";
    default:
      return null;
  }
}

function mapTransmission(typeBoite: unknown): "manuelle" | "automatique" | null {
  if (typeof typeBoite !== "string") return null;
  return typeBoite === "MECANIQUE" ? "manuelle" : "automatique";
}

function numberField(line: Record<string, unknown>, key: string): number | null {
  const value = line[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function fetchAdemeBrands(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/values/Marque?size=300`);
    if (!response.ok) return [];
    const data = (await response.json()) as unknown[];
    return data
      .filter((name): name is string => typeof name === "string" && name.trim() !== "")
      .sort((a, b) => a.localeCompare(b, "fr"));
  } catch {
    return [];
  }
}

export async function fetchAdemeModels(brand: string): Promise<string[]> {
  const trimmed = brand.trim();
  if (!trimmed) return [];
  try {
    const qs = encodeURIComponent(`Marque:"${trimmed}"`);
    const select = encodeURIComponent("Modèle");
    const response = await fetch(
      `${BASE_URL}/lines?size=2000&select=${select}&qs=${qs}`,
    );
    if (!response.ok) return [];
    const data = (await response.json()) as { results: Record<string, unknown>[] };
    const names = data.results
      .map((line) => line["Modèle"])
      .filter((name): name is string => typeof name === "string" && name.trim() !== "");
    return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b, "fr"));
  } catch {
    return [];
  }
}

export async function fetchAdemeTrims(
  brand: string,
  model: string,
): Promise<AdemeTrim[]> {
  const brandTrimmed = brand.trim();
  const modelTrimmed = model.trim();
  if (!brandTrimmed || !modelTrimmed) return [];
  try {
    const qs = encodeURIComponent(
      `Marque:"${brandTrimmed}" AND Modèle:"${modelTrimmed}"`,
    );
    const select = encodeURIComponent(
      "Description_Commerciale,Puissance_maximale,Energie,Carrosserie,Type_de_boite,CO2_vitesse_mixte_Min,CO2_vitesse_mixte_Max",
    );
    const response = await fetch(
      `${BASE_URL}/lines?size=100&select=${select}&qs=${qs}`,
    );
    if (!response.ok) return [];
    const data = (await response.json()) as { results: Record<string, unknown>[] };
    const seen = new Set<string>();
    const trims: AdemeTrim[] = [];
    for (const line of data.results) {
      const label =
        typeof line["Description_Commerciale"] === "string"
          ? (line["Description_Commerciale"] as string).trim()
          : "";
      if (!label || seen.has(label)) continue;
      seen.add(label);
      const co2Min = numberField(line, "CO2_vitesse_mixte_Min");
      const co2Max = numberField(line, "CO2_vitesse_mixte_Max");
      const co2 = co2Min !== null && co2Max !== null ? Math.round((co2Min + co2Max) / 2) : 0;
      const bodyType = mapBodyType(line["Carrosserie"]);
      trims.push({
        label,
        powerKw: numberField(line, "Puissance_maximale") ?? 0,
        co2,
        fuel: mapFuel(line["Energie"]),
        bodyType,
        transmission: mapTransmission(line["Type_de_boite"]),
        ...estimateDoorsSeats(bodyType),
      });
    }
    return trims;
  } catch {
    return [];
  }
}
