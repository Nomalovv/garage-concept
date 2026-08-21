// Catalogue local marques/modèles courants sur le marché français, utilisé en
// repli si l'API live ADEME (src/lib/ademeApi.ts) est indisponible. Couvre
// aussi des modèles plus anciens pertinents pour un site de voitures
// d'occasion, pas seulement le neuf. Liste non exhaustive — les champs
// marque/modèle du formulaire restent de toute façon modifiables librement.
export const CAR_CATALOG: Record<string, string[]> = {
  "Alfa Romeo": [
    "Giulia", "Giulietta", "Stelvio", "Tonale", "MiTo", "147", "156", "159",
  ],
  Alpine: ["A110", "A290"],
  Audi: [
    "A1", "A3", "A4", "A5", "A6", "A7", "A8",
    "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "TT", "e-tron",
  ],
  BMW: [
    "Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 6", "Série 7", "Série 8",
    "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX",
  ],
  Citroën: [
    "C1", "C2", "C3", "C3 Aircross", "C3 Picasso", "C4", "C4 X", "C4 Picasso",
    "C4 Cactus", "C5", "C5 Aircross", "C5 X", "C6", "C8", "Xsara", "Saxo",
    "Berlingo", "SpaceTourer", "Ami",
  ],
  Cupra: ["Formentor", "Leon", "Born", "Ateca"],
  Dacia: ["Sandero", "Sandero Stepway", "Duster", "Jogger", "Spring", "Logan", "Lodgy", "Dokker"],
  "DS Automobiles": ["DS3", "DS4", "DS5", "DS7", "DS9"],
  Ferrari: ["296 GTB", "Roma", "Portofino", "SF90 Stradale", "Purosangue", "488", "F8 Tributo"],
  Fiat: ["500", "500X", "500L", "Panda", "Tipo", "500e", "Punto", "Bravo", "Doblo"],
  Ford: [
    "Fiesta", "Focus", "Puma", "Kuga", "EcoSport", "Mustang", "Mustang Mach-E",
    "Ka+", "Ka", "Mondeo", "S-Max", "Galaxy", "B-Max", "C-Max",
  ],
  Honda: ["Civic", "Jazz", "CR-V", "HR-V", "e", "Accord"],
  Hyundai: ["i10", "i20", "i30", "Kona", "Tucson", "Santa Fe", "IONIQ 5", "IONIQ 6", "Bayon", "ix35"],
  Jeep: ["Renegade", "Compass", "Grand Cherokee", "Wrangler", "Avenger", "Cherokee"],
  Kia: [
    "Picanto", "Rio", "Ceed", "Stonic", "Sportage", "Sorento", "Niro",
    "EV6", "XCeed", "Venga", "Soul",
  ],
  Lamborghini: ["Huracán", "Urus", "Revuelto", "Aventador"],
  "Land Rover": [
    "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar",
    "Discovery", "Discovery Sport", "Defender", "Freelander",
  ],
  Lexus: ["CT", "IS", "ES", "RX", "NX", "UX", "LC", "LS"],
  Maserati: ["Ghibli", "Quattroporte", "Levante", "Grecale", "MC20"],
  Mazda: ["2", "3", "6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5", "MX-30"],
  "Mercedes-Benz": [
    "Classe A", "Classe B", "Classe C", "Classe E", "Classe S", "Classe V",
    "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS",
    "EQA", "EQB", "EQC", "EQE", "EQS", "Sprinter", "Vito", "Citan",
  ],
  MG: ["MG3", "ZS", "HS", "Marvel R", "MG4"],
  Mini: ["Cooper", "Cooper S", "Countryman", "Clubman", "Electric", "Paceman"],
  Mitsubishi: ["Space Star", "ASX", "Eclipse Cross", "Outlander", "L200", "Colt"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "Note", "Pulsar"],
  Opel: ["Corsa", "Astra", "Crossland", "Grandland", "Mokka", "Combo", "Insignia", "Zafira", "Meriva"],
  Peugeot: [
    "108", "206", "207", "208", "2008", "306", "307", "308", "3008",
    "406", "407", "408", "508", "5008", "607", "Rifter", "Partner",
  ],
  Porsche: ["911", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan"],
  Renault: [
    "Twingo", "Clio", "Captur", "Mégane", "Mégane E-Tech", "Austral",
    "Espace", "Kadjar", "Scénic", "Talisman", "Laguna", "Modus", "Wind",
    "Twizy", "Arkana", "Zoe", "Kangoo", "Koleos",
  ],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan", "Wraith"],
  Seat: ["Ibiza", "Arona", "Leon", "Ateca", "Tarraco", "Altea", "Toledo"],
  Skoda: ["Fabia", "Scala", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb", "Enyaq", "Yeti", "Roomster"],
  Smart: ["ForTwo", "ForFour", "#1"],
  Subaru: ["Impreza", "XV", "Forester", "Outback", "Legacy"],
  Suzuki: ["Swift", "Vitara", "S-Cross", "Ignis", "Jimny", "Baleno"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: [
    "Aygo", "Aygo X", "Yaris", "Yaris Cross", "Corolla", "C-HR", "RAV4",
    "Highlander", "Prius", "bZ4X", "Auris", "Avensis", "Verso",
  ],
  Volkswagen: [
    "Up!", "Polo", "Golf", "T-Cross", "T-Roc", "Tiguan", "Touareg",
    "Passat", "Arteon", "ID.3", "ID.4", "ID.5", "Caddy", "Touran", "Sharan",
    "Beetle", "Scirocco", "Bora", "Jetta",
  ],
  Volvo: ["XC40", "XC60", "XC90", "S60", "S90", "V40", "V60", "V70", "V90", "C40"],
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
