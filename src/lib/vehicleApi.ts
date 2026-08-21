// Suggestions marque/modèle via l'API publique et gratuite NHTSA vPIC
// (https://vpic.nhtsa.dot.gov). Catalogue orienté marché américain : les
// résultats sont une aide à la saisie, pas une liste fermée — le champ reste
// modifiable librement si une marque/un modèle n'y figure pas.

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

interface MakeResult {
  MakeName: string;
}

interface ModelResult {
  Model_Name: string;
}

function dedupeSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}

export async function fetchCarMakes(): Promise<string[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/GetMakesForVehicleType/car?format=json`,
    );
    if (!response.ok) return [];
    const data = (await response.json()) as { Results: MakeResult[] };
    return dedupeSorted(data.Results.map((item) => item.MakeName));
  } catch {
    return [];
  }
}

export async function fetchModelsForMake(make: string): Promise<string[]> {
  const trimmed = make.trim();
  if (!trimmed) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/getmodelsformake/${encodeURIComponent(trimmed)}?format=json`,
    );
    if (!response.ok) return [];
    const data = (await response.json()) as { Results: ModelResult[] };
    return dedupeSorted(data.Results.map((item) => item.Model_Name));
  } catch {
    return [];
  }
}
