import {
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "L'adresse e-mail saisie n'est pas valide.",
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "E-mail ou mot de passe incorrect.",
  "auth/user-not-found": "Aucun compte ne correspond à cette adresse e-mail.",
  "auth/user-disabled": "Ce compte administrateur a été désactivé.",
  "auth/too-many-requests":
    "Trop de tentatives échouées. Réessayez dans quelques minutes.",
  "auth/network-request-failed":
    "Connexion impossible : vérifiez votre accès à Internet.",
  "auth/operation-not-allowed":
    "La connexion par e-mail/mot de passe n'est pas activée dans le projet Firebase.",
};

export function authErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  ) {
    const code = (error as { code: string }).code;
    if (AUTH_ERROR_MESSAGES[code]) return AUTH_ERROR_MESSAGES[code];
  }
  if (error instanceof Error && error.message) return error.message;
  return "Une erreur inattendue est survenue. Merci de réessayer.";
}

export async function signInAdmin(
  email: string,
  password: string,
): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error(
      "Firebase n'est pas configuré : renseignez les variables NEXT_PUBLIC_FIREBASE_* avant de vous connecter.",
    );
  }
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signOutAdmin(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await signOut(auth);
}
