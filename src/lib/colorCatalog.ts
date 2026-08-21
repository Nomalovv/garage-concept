// Suggestions de couleurs pour le champ libre du formulaire véhicule : les
// teintes constructeur ont des noms commerciaux très variés (« Gris
// Platinium », « Bleu Iron »…), donc pas de liste officielle exhaustive
// possible. Cette liste couvre les teintes courantes et leurs finitions
// (métallisé, nacré, mat) pour aider la saisie sans la contraindre — c'est
// une simple aide, le champ reste du texte libre.
export const carColors: string[] = [
  "Blanc",
  "Blanc nacré",
  "Blanc métallisé",
  "Noir",
  "Noir métallisé",
  "Noir nacré",
  "Gris",
  "Gris métallisé",
  "Gris anthracite",
  "Gris platinium",
  "Gris souris",
  "Argent",
  "Bleu",
  "Bleu métallisé",
  "Bleu nuit",
  "Bleu marine",
  "Bleu ciel",
  "Rouge",
  "Rouge métallisé",
  "Rouge flamme",
  "Bordeaux",
  "Vert",
  "Vert métallisé",
  "Vert bouteille",
  "Jaune",
  "Orange",
  "Marron",
  "Marron métallisé",
  "Beige",
  "Bronze",
  "Violet",
].sort((a, b) => a.localeCompare(b, "fr"));
