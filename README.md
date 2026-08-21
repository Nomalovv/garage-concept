# Garage Concept

Site vitrine d'un garage automobile français : vente de véhicules d'occasion,
prestations d'entretien et espace administrateur pour gérer le contenu.

- **Framework** : Next.js 16 (App Router, TypeScript, Turbopack)
- **Style** : Tailwind CSS v4
- **Données** : Firebase — Firestore (voitures & prestations) et Auth
  e-mail/mot de passe (espace admin). Les photos ne sont pas hébergées sur
  Firebase : l'admin colle un lien vers une image déjà hébergée ailleurs
  (Imgur, Cloudinary…), ce qui évite de dépendre du forfait payant Firebase
  Storage.
- **Hébergement** : GitHub Pages via un export statique (`output: "export"`)

## Structure du site

| Route                    | Contenu                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `/`                      | Accueil : bannière, véhicules mis en avant, prestations, avis, contact  |
| `/voitures`              | Catalogue complet avec filtres (disponibilité, carburant) et tris       |
| `/voitures/detail?id=…`  | Fiche d'un véhicule (galerie photos, caractéristiques, contact)          |
| `/services`              | Toutes les prestations de l'atelier + engagements du garage             |
| `/contact`               | Coordonnées, horaires et plan d'accès                                   |
| `/mentions-legales`      | Éditeur, hébergement, propriété intellectuelle, données personnelles   |
| `/admin`                 | Connexion à l'espace administrateur (Firebase Auth)                     |
| `/admin/voitures`        | Ajout / modification / vendu / suppression des véhicules et des photos  |
| `/admin/services`        | Ajout / modification / suppression des prestations                      |

> **Pourquoi une query string pour la fiche véhicule ?**
> L'export statique ne peut pas pré-générer une page par voiture, puisque des
> véhicules sont ajoutés après le déploiement par l'administrateur. La fiche est
> donc une page unique (`/voitures/detail`) qui lit l'identifiant dans l'URL et
> interroge Firestore côté client.

## Démarrage en local

```bash
npm install
cp .env.local.example .env.local   # puis remplir les valeurs Firebase
npm run dev
```

Le site est disponible sur http://localhost:3000.

Scripts disponibles :

| Commande        | Effet                                                      |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Serveur de développement                                    |
| `npm run build` | Build + export statique dans `out/`                        |
| `npm run lint`  | ESLint                                                      |

## Configuration Firebase

1. Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com).
2. Activer **Authentication** (fournisseur « E-mail/Mot de passe ») et
   **Firestore Database** (mode production). Storage n'est **pas** nécessaire
   (il exige le forfait payant Blaze) : les photos sont de simples URL
   collées dans le formulaire admin.
3. Créer une application Web dans les paramètres du projet et copier la config.
4. Renseigner `.env.local` à partir de `.env.local.example` :

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=…
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
   NEXT_PUBLIC_FIREBASE_APP_ID=…
   ```

5. Créer un utilisateur (e-mail + mot de passe) dans Authentication : c'est le
   compte administrateur du site.
6. Déployer les règles de sécurité Firestore :

   ```bash
   firebase deploy --only firestore:rules
   ```

Tant que ces variables ne sont pas renseignées, le site fonctionne mais affiche
un bandeau explicatif à la place des données Firestore. Les prestations
disposent d'un catalogue par défaut affiché tant qu'aucune donnée n'existe en
base (bouton « Importer les prestations par défaut » dans `/admin/services`).

## Avis Google (optionnel)

La section « Ils nous font confiance » de l'accueil peut afficher les vrais
avis Google de l'établissement au lieu des témoignages de démonstration.

1. Créer/activer la **Places API** dans
   [console.cloud.google.com](https://console.cloud.google.com) (`APIs & Services`
   → activer `Places API` → `Identifiants` → créer une clé API).
2. Récupérer le **Place ID** de l'établissement avec l'outil
   [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   de Google, ou depuis sa fiche Google Business.
3. Renseigner dans `.env.local` :

   ```
   GOOGLE_PLACES_API_KEY=…
   GOOGLE_PLACE_ID=…
   ```

Tant que l'une des deux valeurs est vide, le site retombe sur les témoignages
fictifs de `src/lib/garageInfo.ts` (badge « Démonstration »). Ces deux
variables sont **volontairement sans préfixe `NEXT_PUBLIC_`** : la clé n'est
lue qu'au build par `src/lib/googleReviews.ts` (Server Component) et ne doit
jamais atteindre le bundle navigateur.

Le site étant en export statique, les avis sont figés dans le HTML généré au
build : après avoir renseigné ces variables (en local et comme secrets GitHub
Actions), il faut relancer un `npm run build` / redéployer pour qu'ils
apparaissent — aucun rafraîchissement en direct.

### Modèle de données Firestore

- Collection `cars` : `brand`, `model`, `trim` (finition), `engine`
  (motorisation), `powerKw`, `co2` (utilisés pour calculer ch/CV fiscaux),
  `bodyType` (`citadine` | `berline` | `break` | `suv` | `monospace` |
  `coupe` | `cabriolet` | `utilitaire`), `doors`, `seats`, `color`,
  `firstRegistration` (`AAAA-MM`), `euroNorm` (`euro3` à `euro6d`), `year`,
  `price`, `mileage`, `fuel` (`essence` | `diesel` | `hybride` |
  `electrique`), `transmission` (`manuelle` | `automatique`), `description`,
  `images` (tableau d'URL), `sold`, `createdAt`, `updatedAt`.
- Les suggestions marque/modèle du formulaire admin viennent d'un catalogue
  local (`src/lib/carCatalog.ts`), pas d'une API : NHTSA (seule API gratuite
  disponible) ne couvre pas correctement le marché français/européen.
- Collection `services` : `name`, `description`, `price`, `icon`, `order`.

Lecture publique, écriture réservée aux utilisateurs authentifiés
(`firestore.rules`).

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit le site et publie `out/` à
chaque push sur `main`.

1. Dans le dépôt GitHub : `Settings > Pages` → source **GitHub Actions**.
2. Dans `Settings > Secrets and variables > Actions`, créer les cinq secrets
   `NEXT_PUBLIC_FIREBASE_*` avec les mêmes valeurs que `.env.local`, et, si les
   avis Google sont activés, les secrets `GOOGLE_PLACES_API_KEY` et
   `GOOGLE_PLACE_ID`.
3. Dans la console Firebase, ajouter le domaine GitHub Pages
   (`<utilisateur>.github.io`) aux **domaines autorisés** d'Authentication.

En CI, `next.config.ts` applique automatiquement le `basePath`
`/garage-concept` (variable `GITHUB_ACTIONS`).

## Personnalisation

Les coordonnées, horaires, points forts et témoignages de démonstration sont
centralisés dans `src/lib/garageInfo.ts` — il suffit de les modifier à cet
endroit (les témoignages sont remplacés par les vrais avis Google dès que
`GOOGLE_PLACES_API_KEY`/`GOOGLE_PLACE_ID` sont renseignés, voir plus haut).

Les photos d'atelier utilisées sur l'accueil et les pages intérieures (fond du
bandeau d'ouverture, planche contact, épreuves à côté des titres) sont des
images libres de droit dans `public/images/` — sources et licences détaillées
dans `public/images/CREDITS.md`. Elles peuvent être remplacées par de vraies
photos de l'atelier en conservant les mêmes noms de fichiers (les imports
statiques sont centralisés dans `src/lib/photos.ts`).

La page `/mentions-legales` (obligatoire pour un site professionnel en
France, LCEN art. 6-III) lit `garageInfo.legal` (`legalForm`, `capitalSocial`,
`rcsCity`, `vatNumber`) en plus des champs déjà présents (adresse, SIRET,
contact) — valeurs fictives à remplacer par les vraies informations de
l'entreprise, `capitalSocial` et `vatNumber` pouvant être laissés vides si
non applicables.
