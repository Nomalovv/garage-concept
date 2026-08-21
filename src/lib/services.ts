import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { Service, ServiceIconName, ServiceInput } from "@/types";

const COLLECTION = "services";

const ICONS: ServiceIconName[] = [
  "vidange",
  "revision",
  "pneus",
  "controle",
  "diagnostic",
  "freins",
  "climatisation",
  "batterie",
  "embrayage",
  "suspension",
  "carrosserie",
  "vitrage",
  "antivol",
  "nettoyage",
  "depannage",
];

export const DEFAULT_SERVICES: ServiceInput[] = [
  {
    name: "Vidange",
    description:
      "Remplacement de l'huile moteur et du filtre à huile, contrôle des niveaux et remise à zéro de l'indicateur d'entretien.",
    price: "À partir de 69 €",
    icon: "vidange",
    order: 1,
  },
  {
    name: "Révision complète",
    description:
      "Révision constructeur : filtres, bougies, courroies, freins, liquides et contrôle de 100 points sur le véhicule.",
    price: "À partir de 189 €",
    icon: "revision",
    order: 2,
  },
  {
    name: "Changement de pneus",
    description:
      "Montage, équilibrage et valve neuve pour tous types de pneumatiques, avec géométrie contrôlée.",
    price: "À partir de 25 € / pneu",
    icon: "pneus",
    order: 3,
  },
  {
    name: "Contrôle technique",
    description:
      "Préparation au contrôle technique et prise en charge complète du passage au centre agréé partenaire.",
    price: "À partir de 79 €",
    icon: "controle",
    order: 4,
  },
  {
    name: "Diagnostic électronique",
    description:
      "Lecture et effacement des codes défaut sur valise multimarque, avec rapport détaillé et devis de réparation.",
    price: "À partir de 49 €",
    icon: "diagnostic",
    order: 5,
  },
  {
    name: "Réparation freins",
    description:
      "Remplacement des plaquettes, disques et liquide de frein, purge du circuit et contrôle de l'ABS.",
    price: "À partir de 129 €",
    icon: "freins",
    order: 6,
  },
  {
    name: "Climatisation",
    description:
      "Recharge du gaz, remplacement du filtre habitacle, désinfection du circuit et recherche de fuite.",
    price: "À partir de 89 €",
    icon: "climatisation",
    order: 7,
  },
];

// Modèles supplémentaires proposés dans le formulaire admin (bouton
// "Préréglages") pour remplir rapidement une prestation courante au-delà des
// 7 par défaut ci-dessus. Simple aide à la saisie, rien n'est enregistré tant
// que l'admin ne valide pas le formulaire.
export const SERVICE_PRESETS: ServiceInput[] = [
  ...DEFAULT_SERVICES,
  {
    name: "Batterie",
    description:
      "Test et remplacement de la batterie, contrôle de charge et de l'alternateur.",
    price: "À partir de 99 €",
    icon: "batterie",
    order: 8,
  },
  {
    name: "Embrayage",
    description:
      "Remplacement du kit d'embrayage (disque, mécanisme, butée) et du volant moteur si nécessaire.",
    price: "Sur devis",
    icon: "embrayage",
    order: 9,
  },
  {
    name: "Amortisseurs & suspension",
    description:
      "Remplacement des amortisseurs, ressorts et biellettes, avec contrôle de la géométrie.",
    price: "Sur devis",
    icon: "suspension",
    order: 10,
  },
  {
    name: "Carrosserie & peinture",
    description:
      "Réparation de chocs, débosselage et remise en peinture teintée à l'identique.",
    price: "Sur devis",
    icon: "carrosserie",
    order: 11,
  },
  {
    name: "Pare-brise & vitrage",
    description:
      "Réparation d'impact ou remplacement de pare-brise, prise en charge assurance possible.",
    price: "À partir de 39 €",
    icon: "vitrage",
    order: 12,
  },
  {
    name: "Antivol & alarme",
    description:
      "Installation et dépannage de systèmes antivol, alarme et surveillance du véhicule.",
    price: "Sur devis",
    icon: "antivol",
    order: 13,
  },
  {
    name: "Nettoyage intérieur / detailing",
    description:
      "Nettoyage complet intérieur et extérieur, shampouinage sellerie et lustrage carrosserie.",
    price: "À partir de 59 €",
    icon: "nettoyage",
    order: 14,
  },
  {
    name: "Dépannage & remorquage",
    description:
      "Intervention sur place ou remorquage jusqu'à l'atelier en cas de panne.",
    price: "Sur devis",
    icon: "depannage",
    order: 15,
  },
];

export const FALLBACK_SERVICES: Service[] = DEFAULT_SERVICES.map(
  (service, index) => ({ ...service, id: `default-${index + 1}` }),
);

function mapService(id: string, data: DocumentData): Service {
  const icon = data.icon as ServiceIconName;
  return {
    id,
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : "",
    price: typeof data.price === "string" ? data.price : "",
    icon: ICONS.includes(icon) ? icon : "revision",
    order: typeof data.order === "number" ? data.order : 0,
  };
}

export async function fetchServices(): Promise<Service[]> {
  const db = getDb();
  if (!db) return [];
  const snapshot = await getDocs(
    query(collection(db, COLLECTION), orderBy("order", "asc")),
  );
  return snapshot.docs.map((entry) => mapService(entry.id, entry.data()));
}

export async function fetchPublicServices(): Promise<Service[]> {
  const services = await fetchServices();
  return services.length > 0 ? services : FALLBACK_SERVICES;
}

export async function createService(input: ServiceInput): Promise<string> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  const created = await addDoc(collection(db, COLLECTION), { ...input });
  return created.id;
}

export async function updateService(
  id: string,
  input: ServiceInput,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  await updateDoc(doc(db, COLLECTION, id), { ...input });
}

export async function deleteService(id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function seedDefaultServices(): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  const batch = writeBatch(db);
  for (const service of DEFAULT_SERVICES) {
    batch.set(doc(collection(db, COLLECTION)), { ...service });
  }
  await batch.commit();
}
