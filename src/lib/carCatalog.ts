// Catalogue local marques/modèles courants sur le marché français. Remplace
// l'API NHTSA (marché US) qui ne couvre pas les marques européennes usuelles
// (Citroën, Dacia, Seat, Skoda absentes) ni les modèles récents Renault/
// Peugeot (elle ne renvoie que leurs anciens modèles vendus aux USA dans les
// années 80). Liste non exhaustive, à compléter au besoin — les champs
// marque/modèle du formulaire restent de toute façon modifiables librement.
export const CAR_CATALOG: Record<string, string[]> = {
  "Alfa Romeo": ["Giulia", "Giulietta", "Stelvio", "Tonale", "MiTo"],
  Alpine: ["A110", "A290"],
  Audi: [
    "A1", "A3", "A4", "A5", "A6", "A7", "A8",
    "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "TT", "e-tron",
  ],
  BMW: [
    "Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 7", "Série 8",
    "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX",
  ],
  Citroën: [
    "C1", "C3", "C3 Aircross", "C4", "C4 X", "C5 Aircross", "C5 X",
    "Berlingo", "SpaceTourer", "Ami",
  ],
  Cupra: ["Formentor", "Leon", "Born", "Ateca"],
  Dacia: ["Sandero", "Sandero Stepway", "Duster", "Jogger", "Spring", "Logan"],
  "DS Automobiles": ["DS3", "DS4", "DS7", "DS9"],
  Fiat: ["500", "500X", "Panda", "Tipo", "500e", "Punto"],
  Ford: ["Fiesta", "Focus", "Puma", "Kuga", "EcoSport", "Mustang", "Mustang Mach-E", "Ka+"],
  Honda: ["Civic", "Jazz", "CR-V", "HR-V", "e"],
  Hyundai: ["i10", "i20", "i30", "Kona", "Tucson", "Santa Fe", "IONIQ 5", "IONIQ 6", "Bayon"],
  Jeep: ["Renegade", "Compass", "Grand Cherokee", "Wrangler", "Avenger"],
  Kia: ["Picanto", "Rio", "Ceed", "Stonic", "Sportage", "Sorento", "Niro", "EV6", "XCeed"],
  "Land Rover": [
    "Range Rover", "Range Rover Sport", "Range Rover Evoque",
    "Discovery", "Discovery Sport", "Defender",
  ],
  Mazda: ["2", "3", "CX-3", "CX-30", "CX-5", "MX-5", "MX-30"],
  "Mercedes-Benz": [
    "Classe A", "Classe B", "Classe C", "Classe E", "Classe S",
    "CLA", "GLA", "GLB", "GLC", "GLE", "GLS",
    "EQA", "EQB", "EQC", "EQE", "EQS", "Sprinter", "Vito",
  ],
  MG: ["MG3", "ZS", "HS", "Marvel R", "MG4"],
  Mini: ["Cooper", "Cooper S", "Countryman", "Clubman", "Electric"],
  Mitsubishi: ["Space Star", "ASX", "Eclipse Cross", "Outlander", "L200"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya"],
  Opel: ["Corsa", "Astra", "Crossland", "Grandland", "Mokka", "Combo"],
  Peugeot: ["108", "208", "2008", "308", "3008", "408", "508", "5008", "Rifter", "Partner"],
  Porsche: ["911", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan"],
  Renault: [
    "Twingo", "Clio", "Captur", "Mégane", "Mégane E-Tech", "Austral",
    "Espace", "Kadjar", "Scénic", "Talisman", "Arkana", "Zoe", "Kangoo",
  ],
  Seat: ["Ibiza", "Arona", "Leon", "Ateca", "Tarraco"],
  Skoda: ["Fabia", "Scala", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb", "Enyaq"],
  Smart: ["ForTwo", "ForFour", "#1"],
  Subaru: ["Impreza", "XV", "Forester", "Outback"],
  Suzuki: ["Swift", "Vitara", "S-Cross", "Ignis", "Jimny"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["Aygo X", "Yaris", "Yaris Cross", "Corolla", "C-HR", "RAV4", "Highlander", "Prius", "bZ4X"],
  Volkswagen: [
    "Up!", "Polo", "Golf", "T-Cross", "T-Roc", "Tiguan", "Touareg",
    "Passat", "Arteon", "ID.3", "ID.4", "ID.5", "Caddy", "Touran", "Sharan",
  ],
  Volvo: ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90", "C40"],
};

export function carBrands(): string[] {
  return Object.keys(CAR_CATALOG).sort((a, b) => a.localeCompare(b, "fr"));
}

export function carModelsForBrand(brand: string): string[] {
  const match = Object.keys(CAR_CATALOG).find(
    (name) => name.localeCompare(brand.trim(), "fr", { sensitivity: "base" }) === 0,
  );
  return match ? CAR_CATALOG[match] : [];
}
