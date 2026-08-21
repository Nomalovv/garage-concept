# Garage Concept

Site vitrine d'un garage automobile français : vente de véhicules d'occasion,
prestations d'entretien et espace administrateur pour gérer le contenu.

- **Framework** : Next.js 16 (App Router, TypeScript, Turbopack)
- **Style** : Tailwind CSS v4
- **Données** : Firebase — Firestore (voitures & prestations), Storage (photos),
  Auth e-mail/mot de passe (espace admin)
- **Hébergement** : GitHub Pages via un export statique (`output: "export"`)

## Structure du site

| Route                    | Contenu                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `/`                      | Accueil : bannière, véhicules mis en avant, prestations, avis, contact  |
| `/voitures`              | Catalogue complet avec filtres (disponibilité, carburant) et tris       |
| `/voitures/detail?id=…`  | Fiche d'un véhicule (galerie photos, caractéristiques, contact)          |
| `/services`              | Toutes les prestations de l'atelier + engagements du garage             |
| `/contact`               | Coordonnées, horaires et plan d'accès                                   |
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
2. Activer **Authentication** (fournisseur « E-mail/Mot de passe »), **Firestore
   Database** et **Storage**.
3. Créer une application Web dans les paramètres du projet et copier la config.
4. Renseigner `.env.local` à partir de `.env.local.example` :

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=…
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=…
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
   NEXT_PUBLIC_FIREBASE_APP_ID=…
   ```

5. Créer un utilisateur (e-mail + mot de passe) dans Authentication : c'est le
   compte administrateur du site.
6. Déployer les règles de sécurité :

   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

Tant que ces variables ne sont pas renseignées, le site fonctionne mais affiche
un bandeau explicatif à la place des données Firestore. Les prestations
disposent d'un catalogue par défaut affiché tant qu'aucune donnée n'existe en
base (bouton « Importer les prestations par défaut » dans `/admin/services`).

### Modèle de données Firestore

- Collection `cars` : `brand`, `model`, `year`, `price`, `mileage`, `fuel`
  (`essence` | `diesel` | `hybride` | `electrique`), `transmission`
  (`manuelle` | `automatique`), `description`, `images` (`[{ url, path }]`),
  `sold`, `createdAt`, `updatedAt`.
- Collection `services` : `name`, `description`, `price`, `icon`, `order`.
- Storage : les photos sont enregistrées sous `cars/{carId}/…`.

Lecture publique, écriture réservée aux utilisateurs authentifiés
(`firestore.rules`, `storage.rules`).

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit le site et publie `out/` à
chaque push sur `main`.

1. Dans le dépôt GitHub : `Settings > Pages` → source **GitHub Actions**.
2. Dans `Settings > Secrets and variables > Actions`, créer les six secrets
   `NEXT_PUBLIC_FIREBASE_*` avec les mêmes valeurs que `.env.local`.
3. Dans la console Firebase, ajouter le domaine GitHub Pages
   (`<utilisateur>.github.io`) aux **domaines autorisés** d'Authentication.

En CI, `next.config.ts` applique automatiquement le `basePath`
`/garage-concept` (variable `GITHUB_ACTIONS`).

## Personnalisation

Les coordonnées, horaires, points forts et avis clients sont centralisés dans
`src/lib/garageInfo.ts` — il suffit de les modifier à cet endroit.
