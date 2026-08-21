import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import type { Car, CarInput, Fuel, Transmission } from "@/types";

const COLLECTION = "cars";

const FUELS: Fuel[] = ["essence", "diesel", "hybride", "electrique"];
const TRANSMISSIONS: Transmission[] = ["manuelle", "automatique"];

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === "string" && item.trim() !== "",
  );
}

function mapCar(id: string, data: DocumentData): Car {
  const fuel = data.fuel as Fuel;
  const transmission = data.transmission as Transmission;
  return {
    id,
    brand: typeof data.brand === "string" ? data.brand : "",
    model: typeof data.model === "string" ? data.model : "",
    trim: typeof data.trim === "string" ? data.trim : "",
    engine: typeof data.engine === "string" ? data.engine : "",
    powerKw: toNumber(data.powerKw),
    co2: toNumber(data.co2),
    year: toNumber(data.year, new Date().getFullYear()),
    price: toNumber(data.price),
    mileage: toNumber(data.mileage),
    fuel: FUELS.includes(fuel) ? fuel : "essence",
    transmission: TRANSMISSIONS.includes(transmission)
      ? transmission
      : "manuelle",
    description: typeof data.description === "string" ? data.description : "",
    images: toImages(data.images),
    sold: data.sold === true,
    createdAt:
      data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : null,
  };
}

export async function fetchCars(): Promise<Car[]> {
  const db = getDb();
  if (!db) return [];
  const snapshot = await getDocs(
    query(collection(db, COLLECTION), orderBy("createdAt", "desc")),
  );
  return snapshot.docs.map((entry) => mapCar(entry.id, entry.data()));
}

export async function fetchAvailableCars(): Promise<Car[]> {
  const cars = await fetchCars();
  return cars.filter((car) => !car.sold);
}

export async function fetchFeaturedCars(count = 4): Promise<Car[]> {
  const cars = await fetchAvailableCars();
  return cars.slice(0, count);
}

export async function fetchCar(id: string): Promise<Car | null> {
  const db = getDb();
  if (!db) return null;
  const snapshot = await getDoc(doc(db, COLLECTION, id));
  return snapshot.exists() ? mapCar(snapshot.id, snapshot.data()) : null;
}

export async function createCar(
  input: CarInput,
  images: string[],
): Promise<string> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");

  const created = await addDoc(collection(db, COLLECTION), {
    ...input,
    images,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export async function updateCar(
  id: string,
  input: CarInput,
  images: string[],
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");

  await updateDoc(doc(db, COLLECTION, id), {
    ...input,
    images,
    updatedAt: serverTimestamp(),
  });
}

export async function setCarSold(id: string, sold: boolean): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  await updateDoc(doc(db, COLLECTION, id), { sold, updatedAt: serverTimestamp() });
}

export async function deleteCar(car: Car): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  await deleteDoc(doc(db, COLLECTION, car.id));
}
