// Suggestions de motorisations génériques par marque, utilisées en repli
// quand l'API ADEME ne renvoie aucune version pour le modèle choisi — ce qui
// arrive systématiquement pour les modèles anciens/discontinués (l'ADEME ne
// couvre que les véhicules actuellement commercialisés à neuf, voir
// ademeApi.ts et carCatalog.ts). Ces noms reprennent les appellations
// typiques du constructeur (HDi/BlueHDi chez PSA, dCi chez Renault, TDI/TSI
// chez le groupe VW, etc.) mais ne sont pas liés à des chiffres officiels :
// contrairement aux suggestions ADEME, les sélectionner ne pré-remplit rien,
// c'est une simple aide à la saisie du libellé.
const GROUPS: Record<string, string[]> = {
  PSA: [
    "1.2 PureTech 82", "1.2 PureTech 110", "1.2 PureTech 130",
    "1.6 THP 165", "1.6 HDi 92", "1.6 HDi 115", "1.6 BlueHDi 100",
    "1.6 BlueHDi 120", "2.0 HDi 136", "2.0 BlueHDi 150",
  ],
  Renault: [
    "1.0 SCe 65", "1.2 16V 75", "1.2 TCe 100", "1.3 TCe 130",
    "1.5 dCi 90", "1.5 dCi 110", "1.5 Blue dCi 115", "1.6 16V",
    "1.9 dCi", "2.0 16V",
  ],
  VW: [
    "1.0 TSI 95", "1.2 TSI 105", "1.4 TSI 125", "1.5 TSI 150",
    "1.6 TDI 90", "1.6 TDI 115", "2.0 TDI 150", "1.9 TDI",
    "1.4 16V", "2.0 FSI",
  ],
  Germanique: [
    "1.6i", "2.0i", "2.0 TFSI", "2.0 TDI", "2.2 CDI",
    "3.0 TDI", "2.5 TDI", "1.8 CDTI", "2.0 CDTI",
  ],
  Japonaise: [
    "1.0i", "1.2i", "1.3 VVT-i", "1.5 VVT-i", "1.6 16V",
    "1.6 dCi", "2.0 16V", "1.6 CRDi", "1.7 CRDi",
  ],
  Coreenne: [
    "1.0", "1.2", "1.25", "1.4 CRDi", "1.6 CRDi",
    "1.6 GDI", "1.4 T-GDI",
  ],
  Italienne: [
    "1.2 8V", "1.4 16V", "1.3 Multijet", "1.6 Multijet",
    "1.9 JTD", "2.0 JTDm",
  ],
  Generique: [
    "1.0", "1.2", "1.4", "1.6 essence", "1.6 diesel",
    "1.9 diesel", "2.0 essence", "2.0 diesel",
  ],
};

const BRAND_GROUP: Record<string, keyof typeof GROUPS> = {
  Peugeot: "PSA",
  Citroën: "PSA",
  "DS Automobiles": "PSA",
  Renault: "Renault",
  Dacia: "Renault",
  Alpine: "Renault",
  Volkswagen: "VW",
  Audi: "VW",
  Seat: "VW",
  Cupra: "VW",
  Skoda: "VW",
  BMW: "Germanique",
  "Mercedes-Benz": "Germanique",
  Opel: "Germanique",
  Smart: "Germanique",
  Toyota: "Japonaise",
  Honda: "Japonaise",
  Nissan: "Japonaise",
  Mazda: "Japonaise",
  Mitsubishi: "Japonaise",
  Suzuki: "Japonaise",
  Subaru: "Japonaise",
  Lexus: "Japonaise",
  Kia: "Coreenne",
  Hyundai: "Coreenne",
  MG: "Coreenne",
  Fiat: "Italienne",
  "Alfa Romeo": "Italienne",
  Ford: "Germanique",
  Volvo: "Germanique",
  Mini: "Germanique",
  "Land Rover": "Germanique",
  Jeep: "Germanique",
};

export function engineSuggestionsForBrand(brand: string): string[] {
  const trimmed = brand.trim();
  const groupKey = BRAND_GROUP[trimmed] ?? "Generique";
  return GROUPS[groupKey];
}
