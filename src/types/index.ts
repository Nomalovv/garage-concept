export type Fuel = "essence" | "diesel" | "hybride" | "electrique";

export type Transmission = "manuelle" | "automatique";

export interface Car {
  id: string;
  brand: string;
  model: string;
  trim: string;
  engine: string;
  powerKw: number;
  co2: number;
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
  | "climatisation";

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

export const SERVICE_ICON_LABELS: Record<ServiceIconName, string> = {
  vidange: "Bidon d'huile",
  revision: "Clé à molette",
  pneus: "Pneu",
  controle: "Contrôle technique",
  diagnostic: "Diagnostic électronique",
  freins: "Freins",
  climatisation: "Climatisation",
};
