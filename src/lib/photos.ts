import type { StaticImageData } from "next/image";

import atelierPont from "../../public/images/atelier-pont.jpg";
import changementPneu from "../../public/images/changement-pneu.jpg";
import douillesCle from "../../public/images/douilles-cle.jpg";
import etabliOutils from "../../public/images/etabli-outils.jpg";
import mecanicienMoteur from "../../public/images/mecanicien-moteur.jpg";
import moteurSousCapot from "../../public/images/moteur-sous-capot.jpg";
import pontElevateur from "../../public/images/pont-elevateur.jpg";
import valiseDiagnostic from "../../public/images/valise-diagnostic.jpg";

export type Photo = {
  /** Fichier importé statiquement : Next en déduit largeur, hauteur et flou. */
  src: StaticImageData;
  /** Texte alternatif, décrit la scène pour les lecteurs d'écran. */
  alt: string;
  /** Légende courte façon feuille de tournage, affichée en monospace. */
  legende: string;
  /**
   * Point de recadrage quand la photo est rognée dans un cadre imposé
   * (classe Tailwind `object-*`). Par défaut, centre de l'image.
   */
  cadrage?: string;
};

/**
 * Photothèque du site. Toutes les images viennent de Pexels (licence libre,
 * usage commercial autorisé, sans attribution obligatoire) — la source exacte
 * de chaque fichier est notée dans `public/images/CREDITS.md`.
 *
 * Les fichiers vivent dans `public/images/` pour rester faciles à remplacer
 * par de vraies photos de l'atelier, mais sont importés ici plutôt que
 * référencés par une URL en dur : Next.js récupère ainsi les dimensions
 * (aucun décalage de mise en page) et gère le `basePath` du déploiement
 * GitHub Pages tout seul.
 */
export const photos = {
  atelier: {
    src: atelierPont,
    alt: "Atelier de réparation automobile, une voiture levée sur le pont élévateur",
    legende: "Plan large — l'atelier",
  },
  mecanicienMoteur: {
    src: mecanicienMoteur,
    alt: "Mécanicien penché sur le moteur d'une voiture, capot ouvert",
    legende: "Plan 01 — mécanique",
  },
  pontElevateur: {
    src: pontElevateur,
    alt: "Voiture levée sur un pont élévateur, mécanicien en contrôle dessous",
    legende: "Plan 02 — contrôle",
    // Photo verticale : on remonte le cadrage pour garder la voiture entière.
    cadrage: "object-[50%_35%]",
  },
  etabliOutils: {
    src: etabliOutils,
    alt: "Établi d'atelier et panneau d'outils accrochés au mur",
    legende: "Plan 03 — l'établi",
  },
  moteurSousCapot: {
    src: moteurSousCapot,
    alt: "Gros plan sur un moteur ouvert pendant une intervention",
    legende: "Sous le capot",
  },
  douillesCle: {
    src: douillesCle,
    alt: "Mains d'un mécanicien choisissant une douille dans sa caisse à outils",
    legende: "Outillage",
  },
  changementPneu: {
    src: changementPneu,
    alt: "Mécanicien démontant une roue à la clé à chocs",
    legende: "Pneumatiques",
  },
  valiseDiagnostic: {
    src: valiseDiagnostic,
    alt: "Valise de diagnostic électronique branchée à la prise OBD d'un véhicule",
    legende: "Diagnostic",
  },
} satisfies Record<string, Photo>;

/** Bande de plans affichée sur l'accueil, dans l'ordre de lecture. */
export const plancheAtelier: Photo[] = [
  photos.moteurSousCapot,
  photos.douillesCle,
  photos.changementPneu,
  photos.valiseDiagnostic,
];
