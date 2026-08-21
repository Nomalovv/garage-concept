export const garageInfo = {
  name: "Garage Concept",
  tagline: "Votre garage automobile de confiance",
  intro:
    "Entretien, réparation et vente de véhicules d'occasion contrôlés. Une équipe de mécaniciens passionnés, des devis gratuits et une transparence totale sur chaque intervention.",
  email: "contact@garage-concept.fr",
  phone: "+33231000000",
  phoneDisplay: "02 31 00 00 00",
  address: {
    street: "12 rue des Mécaniciens",
    postalCode: "14000",
    city: "Caen",
    country: "France",
  },
  hours: [
    { days: "Lundi — Vendredi", value: "08h00 — 18h30" },
    { days: "Samedi", value: "09h00 — 17h00" },
    { days: "Dimanche", value: "Fermé" },
  ],
  siret: "000 000 000 00000",
} as const;

export const fullAddress = `${garageInfo.address.street}, ${garageInfo.address.postalCode} ${garageInfo.address.city}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${fullAddress}, ${garageInfo.address.country}`,
)}&output=embed`;

export const strengths = [
  {
    title: "Garantie 12 mois",
    description:
      "Chaque véhicule vendu est couvert par une garantie mécanique de 12 mois, pièces et main-d'œuvre incluses.",
  },
  {
    title: "Pièces d'origine",
    description:
      "Nous ne montons que des pièces d'origine ou de qualité équivalente, avec la facture détaillée systématiquement remise.",
  },
  {
    title: "Devis gratuit",
    description:
      "Un diagnostic et un devis chiffré offerts avant toute intervention. Aucune réparation n'est lancée sans votre accord.",
  },
  {
    title: "Véhicule de prêt",
    description:
      "Un véhicule de courtoisie est mis à votre disposition gratuitement pendant l'immobilisation de votre voiture.",
  },
  {
    title: "Contrôle 100 points",
    description:
      "Toutes nos occasions passent un contrôle complet de 100 points avant d'être mises en vente.",
  },
  {
    title: "Reprise de votre ancien véhicule",
    description:
      "Nous estimons et reprenons votre véhicule actuel au juste prix pour financer votre prochain achat.",
  },
];

export const testimonials = [
  {
    name: "Camille D.",
    city: "Caen",
    rating: 5,
    text: "J'ai acheté une Clio ici il y a six mois : véhicule impeccable, dossier d'entretien complet et aucune mauvaise surprise. Le suivi après-vente est vraiment sérieux.",
  },
  {
    name: "Julien M.",
    city: "Hérouville-Saint-Clair",
    rating: 5,
    text: "Devis clair, prix tenu au centime près et voiture rendue le jour même. Cela faisait longtemps que je n'avais pas vu un garage aussi transparent.",
  },
  {
    name: "Sophie L.",
    city: "Ifs",
    rating: 4,
    text: "Une équipe qui prend le temps d'expliquer les réparations. Ils m'ont même déconseillé une intervention qui n'était pas nécessaire.",
  },
];
