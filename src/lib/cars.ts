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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getDb, getFirebaseStorage } from "@/lib/firebase";
import type { Car, CarImage, CarInput, Fuel, Transmission } from "@/types";

const COLLECTION = "cars";

const FUELS: Fuel[] = ["essence", "diesel", "hybride", "electrique"];
const TRANSMISSIONS: Transmission[] = ["manuelle", "automatique"];

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toImages(value: unknown): CarImage[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is CarImage =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CarImage).url === "string",
    )
    .map((item) => ({ url: item.url, path: item.path ?? "" }));
}

function mapCar(id: string, data: DocumentData): Car {
  const fuel = data.fuel as Fuel;
  const transmission = data.transmission as Transmission;
  return {
    id,
    brand: typeof data.brand === "string" ? data.brand : "",
    model: typeof data.model === "string" ? data.model : "",
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

function storagePath(carId: string, file: File, index: number): string {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  return `cars/${carId}/${Date.now()}-${index}-${safeName}`;
}

async function uploadImages(
  carId: string,
  files: File[],
): Promise<CarImage[]> {
  if (files.length === 0) return [];
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage n'est pas configuré.");

  return Promise.all(
    files.map(async (file, index) => {
      const path = storagePath(carId, file, index);
      const fileRef = ref(storage, path);
      await uploadBytes(fileRef, file, { contentType: file.type });
      const url = await getDownloadURL(fileRef);
      return { url, path };
    }),
  );
}

async function removeImages(images: CarImage[]): Promise<void> {
  const storage = getFirebaseStorage();
  if (!storage) return;
  await Promise.all(
    images.map(async (image) => {
      if (!image.path) return;
      try {
        await deleteObject(ref(storage, image.path));
      } catch {
        // Le fichier a déjà été supprimé côté Storage : rien à faire.
      }
    }),
  );
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
  files: File[],
): Promise<string> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");

  const created = await addDoc(collection(db, COLLECTION), {
    ...input,
    images: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const images = await uploadImages(created.id, files);
  if (images.length > 0) {
    await updateDoc(created, { images });
  }
  return created.id;
}

export async function updateCar(
  id: string,
  input: CarInput,
  images: { kept: CarImage[]; removed: CarImage[]; added: File[] },
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");

  const uploaded = await uploadImages(id, images.added);
  await updateDoc(doc(db, COLLECTION, id), {
    ...input,
    images: [...images.kept, ...uploaded],
    updatedAt: serverTimestamp(),
  });
  await removeImages(images.removed);
}

export async function setCarSold(id: string, sold: boolean): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  await updateDoc(doc(db, COLLECTION, id), { sold, updatedAt: serverTimestamp() });
}

export async function deleteCar(car: Car): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase n'est pas configuré.");
  await removeImages(car.images);
  await deleteDoc(doc(db, COLLECTION, car.id));
}
