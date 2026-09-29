# AT WebLab

Site vitrine officiel d’**AT WebLab**, studio de création de sites web modernes basé au Maroc. L’expérience présente les services, les réalisations, le processus de travail et les offres, puis guide les visiteurs vers une prise de contact simple.

## Aperçu

Le site repose sur une direction visuelle sombre et éditoriale, enrichie par un cube 3D inspiré du développement web et un réseau orbital animé. Les aperçus Prodyous et Doumi Physio sont intégrés dans des navigateurs interactifs, avec une image statique de secours sur les petits écrans.

### Fonctionnalités principales

- Interface responsive pour ordinateur, tablette et mobile
- Animations accessibles avec prise en charge de `prefers-reduced-motion`
- Aperçus interactifs des projets dans des iframes isolées
- Formulaire de contact relié à Resend
- Champ anti-bot, validation stricte et limitation des requêtes
- Boutons de contact WhatsApp, e-mail et Instagram
- SEO et métadonnées Open Graph
- En-têtes HTTP de sécurité et Content Security Policy
- Images optimisées avec Next.js

## Technologies

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Zod](https://zod.dev/)
- [Resend](https://resend.com/)

## Installation locale

Prérequis : Node.js 20.9 ou une version plus récente.

```bash
git clone https://github.com/Abderr-trz/ATWebLab.git
cd ATWebLab
npm install
cp .env.example .env.local
npm run dev
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000).

Sous Windows PowerShell, remplacez la commande `cp` par :

```powershell
Copy-Item .env.example .env.local
```

## Variables d’environnement

Configurez les valeurs suivantes dans `.env.local` :

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=AT WebLab <contact@atweblab.com>
```

`RESEND_API_KEY` doit rester côté serveur. Les fichiers `.env*.local` sont ignorés par Git.

## Commandes disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Analyse ESLint
```

## Structure du projet

```text
app/
  api/               Routes serveur pour le contact et les aperçus
  globals.css        Système visuel, responsive et animations
  layout.tsx         Métadonnées et structure globale
components/
  layout/            Navigation et pied de page
  sections/          Sections de la page d’accueil
  ui/                Composants visuels et aperçus interactifs
lib/                 Configuration générale du site
public/              Logo et captures des projets
```

## Sécurité

Le projet inclut notamment :

- CSP avec liste blanche des iframes autorisées
- HSTS, protection anti-clickjacking et `nosniff`
- Validation Zod de toutes les données du formulaire
- Contrôle d’origine et de type de contenu
- Taille maximale des requêtes
- Échappement HTML avant l’envoi des e-mails
- Limitation anti-spam par adresse IP
- Iframes protégées avec `sandbox`
- Absence de source maps navigateur en production

Pour un déploiement public, activez également le WAF et la limitation globale des requêtes chez l’hébergeur.

## Déploiement

Le projet peut être déployé directement sur Vercel :

1. Importer ce dépôt GitHub dans Vercel.
2. Ajouter les variables d’environnement de production.
3. Vérifier le domaine d’envoi dans Resend.
4. Déployer puis tester le formulaire de contact.

## Qualité

Avant chaque publication :

```bash
npm run lint
npm run build
npm audit
```

## Propriété

© AT WebLab. Tous droits réservés.
