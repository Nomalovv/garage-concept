export type Fuel = "essence" | "diesel" | "hybride" | "electrique";

export type Transmission = "manuelle" | "automatique";

export type BodyType =
  | "citadine"
  | "berline"
  | "break"
  | "suv"
  | "monospace"
  | "coupe"
  | "cabriolet"
  | "utilitaire";

export type EuroNorm = "euro3" | "euro4" | "euro5" | "euro6" | "euro6d";

export interface Car {
  id: string;
  brand: string;
  model: string;
  trim: string;
  engine: string;
  powerKw: number;
  co2: number;
  bodyType: BodyType;
  doors: number;
  seats: number;
  color: string;
  firstRegistration: string;
  euroNorm: EuroNorm | "";
  year: number;
  price: number;
  mileage: number;
  fuel: Fuel;
  transmission: Transmission;
  description: string;
  images: string[];
  sold: boolean;
  createdAt: number | null;
}

export type CarInput = Omit<Car, "id" | "images" | "createdAt">;

export type ServiceIconName =
  | "vidange"
  | "revision"
  | "pneus"
  | "controle"
  | "diagnostic"
  | "freins"
  | "climatisation"
  | "batterie"
  | "embrayage"
  | "suspension"
  | "carrosserie"
  | "vitrage"
  | "antivol"
  | "nettoyage"
  | "depannage";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: ServiceIconName;
  order: number;
}

export type ServiceInput = Omit<Service, "id">;

export const FUEL_LABELS: Record<Fuel, string> = {
  essence: "Essence",
  diesel: "Diesel",
  hybride: "Hybride",
  electrique: "Électrique",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  manuelle: "Manuelle",
  automatique: "Automatique",
};

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  citadine: "Citadine",
  berline: "Berline",
  break: "Break",
  suv: "SUV",
  monospace: "Monospace",
  coupe: "Coupé",
  cabriolet: "Cabriolet",
  utilitaire: "Utilitaire",
};

export const EURO_NORM_LABELS: Record<EuroNorm, string> = {
  euro3: "Euro 3",
  euro4: "Euro 4",
  euro5: "Euro 5",
  euro6: "Euro 6",
  euro6d: "Euro 6d",
};

export const SERVICE_ICON_LABELS: Record<ServiceIconName, string> = {
  vidange: "Bidon d'huile",
  revision: "Clé à molette",
  pneus: "Pneu",
  controle: "Contrôle technique",
  diagnostic: "Diagnostic électronique",
  freins: "Freins",
  climatisation: "Climatisation",
  batterie: "Batterie",
  embrayage: "Embrayage",
  suspension: "Suspension",
  carrosserie: "Carrosserie",
  vitrage: "Pare-brise / vitrage",
  antivol: "Antivol / alarme",
  nettoyage: "Nettoyage / detailing",
  depannage: "Dépannage / remorquage",
};
