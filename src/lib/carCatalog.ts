// Catalogue local marques/modèles, utilisé en repli si l'API live ADEME
// (src/lib/ademeApi.ts) est indisponible ou pour les modèles anciens. En
// effet, l'ADEME ne liste que les véhicules ACTUELLEMENT commercialisés à
// neuf : aucune API gratuite trouvée ne couvre l'historique complet du
// marché français nécessaire à un site d'occasion (Wikidata a bien des
// données historiques, mais trop bruitées pour un usage direct : elle mélange
// voitures, trains et matériel militaire sous les mêmes marques). Cette liste
// est donc enrichie à la main avec des générations plus anciennes. Toujours
// non exhaustive — les champs marque/modèle du formulaire restent modifiables
// librement si un modèle manque.
export const CAR_CATALOG: Record<string, string[]> = {
  "Alfa Romeo": [
    "Giulia", "Giulietta", "Stelvio", "Tonale", "MiTo", "147", "156", "159",
    "166", "GT", "Spider", "Brera", "164",
  ],
  Alpine: ["A110", "A290", "A310", "GTA"],
  Audi: [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8",
    "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "TT", "e-tron", "80", "100", "Cabriolet",
  ],
  BMW: [
    "Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 6", "Série 7", "Série 8",
    "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z3", "Z4", "i3", "i4", "iX",
    "Compact", "M3", "M5",
  ],
  Citroën: [
    "C1", "C2", "C3", "C3 Aircross", "C3 Picasso", "C3 Pluriel", "C4", "C4 X",
    "C4 Picasso", "C4 Cactus", "C5", "C5 Aircross", "C5 X", "C6", "C8",
    "Xsara", "Xsara Picasso", "Saxo", "ZX", "Xantia", "AX", "Evasion", "Jumpy",
    "Berlingo", "SpaceTourer", "Ami", "DS3", "DS4", "DS5",
  ],
  Cupra: ["Formentor", "Leon", "Born", "Ateca"],
  Dacia: [
    "Sandero", "Sandero Stepway", "Duster", "Jogger", "Spring", "Logan",
    "Logan MCV", "Lodgy", "Dokker",
  ],
  "DS Automobiles": ["DS3", "DS4", "DS5", "DS7", "DS9"],
  Ferrari: ["296 GTB", "Roma", "Portofino", "SF90 Stradale", "Purosangue", "488", "F8 Tributo", "California", "458"],
  Fiat: [
    "500", "500X", "500L", "Panda", "Tipo", "500e", "Punto", "Bravo",
    "Doblo", "Stilo", "Sedici", "Idea", "Multipla", "Croma", "Ulysse",
  ],
  Ford: [
    "Fiesta", "Focus", "Puma", "Kuga", "EcoSport", "Mustang", "Mustang Mach-E",
    "Ka+", "Ka", "Mondeo", "S-Max", "Galaxy", "B-Max", "C-Max", "Grand C-Max",
    "Fusion", "Cougar", "Sierra", "Scorpio", "Streetka",
  ],
  Honda: ["Civic", "Jazz", "CR-V", "HR-V", "e", "Accord", "Insight", "FR-V", "Stream"],
  Hyundai: [
    "i10", "i20", "i30", "i40", "Kona", "Tucson", "Santa Fe", "IONIQ 5",
    "IONIQ 6", "Bayon", "ix35", "ix20", "Getz", "Atos", "Matrix", "Coupe",
  ],
  Jeep: ["Renegade", "Compass", "Grand Cherokee", "Wrangler", "Avenger", "Cherokee", "Patriot"],
  Kia: [
    "Picanto", "Rio", "Ceed", "Stonic", "Sportage", "Sorento", "Niro",
    "EV6", "XCeed", "Venga", "Soul", "Carens", "Sephia", "Optima", "Carnival",
  ],
  Lamborghini: ["Huracán", "Urus", "Revuelto", "Aventador", "Gallardo", "Murciélago"],
  "Land Rover": [
    "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar",
    "Discovery", "Discovery Sport", "Defender", "Freelander",
  ],
  Lexus: ["CT", "IS", "ES", "RX", "NX", "UX", "LC", "LS", "GS"],
  Maserati: ["Ghibli", "Quattroporte", "Levante", "Grecale", "MC20"],
  Mazda: ["2", "3", "5", "6", "CX-3", "CX-30", "CX-5", "CX-60", "CX-7", "MX-5", "MX-30", "121", "323", "626", "RX-8", "Premacy"],
  "Mercedes-Benz": [
    "Classe A", "Classe B", "Classe C", "Classe E", "Classe S", "Classe V", "Classe M", "Classe R",
    "CLA", "CLS", "CLK", "SLK", "GLA", "GLB", "GLC", "GLE", "GLS",
    "EQA", "EQB", "EQC", "EQE", "EQS", "Sprinter", "Vito", "Citan", "Vaneo",
  ],
  MG: ["MG3", "ZS", "HS", "Marvel R", "MG4", "ZR", "ZT", "TF"],
  Mini: ["Cooper", "Cooper S", "Countryman", "Clubman", "Electric", "Paceman", "One"],
  Mitsubishi: ["Space Star", "ASX", "Eclipse Cross", "Outlander", "L200", "Colt", "Lancer", "Pajero", "Carisma", "Grandis"],
  Nissan: [
    "Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "Note",
    "Pulsar", "Almera", "Primera", "Navara", "Cube", "Murano", "350Z",
  ],
  Opel: [
    "Corsa", "Astra", "Crossland", "Grandland", "Mokka", "Combo",
    "Insignia", "Zafira", "Meriva", "Vectra", "Tigra", "Agila", "Antara", "Signum", "Omega",
  ],
  Peugeot: [
    "106", "107", "108", "205", "206", "207", "208", "2008",
    "301", "306", "307", "308", "3008",
    "405", "406", "407", "408", "508", "5008",
    "605", "607", "806", "807",
    "Rifter", "Partner", "RCZ",
  ],
  Porsche: ["911", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan", "Boxster", "Cayman"],
  Renault: [
    "Twingo", "Clio", "Captur", "Mégane", "Mégane E-Tech", "Austral",
    "Espace", "Kadjar", "Scénic", "Talisman", "Laguna", "Modus", "Wind",
    "Twizy", "Arkana", "Zoe", "Kangoo", "Koleos", "Vel Satis", "Safrane",
    "19", "21", "25", "Fuego", "Avantime",
  ],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan", "Wraith"],
  Seat: ["Ibiza", "Arona", "Leon", "Ateca", "Tarraco", "Altea", "Toledo", "Cordoba", "Alhambra", "Arosa"],
  Skoda: [
    "Fabia", "Scala", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb",
    "Enyaq", "Yeti", "Roomster", "Rapid", "Citigo",
  ],
  Smart: ["ForTwo", "ForFour", "#1", "Roadster"],
  Subaru: ["Impreza", "XV", "Forester", "Outback", "Legacy", "Justy", "Tribeca"],
  Suzuki: ["Swift", "Vitara", "S-Cross", "Ignis", "Jimny", "Baleno", "Alto", "SX4", "Splash"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: [
    "Aygo", "Aygo X", "Yaris", "Yaris Cross", "Corolla", "C-HR", "RAV4",
    "Highlander", "Prius", "bZ4X", "Auris", "Avensis", "Verso", "Celica",
    "MR2", "Land Cruiser", "Picnic", "Previa",
  ],
  Volkswagen: [
    "Up!", "Lupo", "Polo", "Golf", "T-Cross", "T-Roc", "Tiguan", "Touareg",
    "Passat", "Arteon", "ID.3", "ID.4", "ID.5", "Caddy", "Touran", "Sharan",
    "Beetle", "Scirocco", "Bora", "Jetta", "Eos", "Fox", "Corrado",
  ],
  Volvo: ["XC40", "XC60", "XC90", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "C30", "C40", "C70"],
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
