# Matrice

Site vitrine fictif pour artistes et collections, réalisé dans le cadre d'un projet d'école avec développement assisté par IA.

Galerie web expérimentale : les œuvres (images, vidéos, modèles 3D) sont projetées dans des **scènes 2D (DOM)** et **scènes 3D (React Three Fiber)** selon des compositions programmatiques — grilles, listes, hélices, lemniscates, cercles...

## Site multi-instance

Le projet est multi-tenant : une même base de code sert plusieurs vitrines, chacune activée par une variable d'environnement.

- [Rianne Corvalis](https://riannecorvalis.vercel.app/) — design system « Julis »
- Démo locale (`VITE_CLIENT=demo`) — design system « Matrice »

## Stack

- [React](https://react.dev/) 19 + [Vite](https://vitejs.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) 9 + [drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org/) 0.185
- [React Router](https://reactrouter.com/) 7

## Démarrage

```bash
npm install
npm run dev        # serveur de dev local
npm run lint       # lint (oxlint)
npm run build      # build de production + copie 404.html
npm run preview    # préview du build
```

Le `base` de Vite est `/matrice/` en local, `/` sur Vercel (détecté via la variable d'environnement `VERCEL`).

## Configuration d'un tenant

Choisir l'instance active dans `.env` :

```env
VITE_CLIENT = demo            # → src/tenants/demoRegistry.js
VITE_CLIENT = riannecorvalis  # → src/tenants/riannecorvalisRegistry.js
```

Chaque tenant déclare dans son `TENANT_REGISTRY` les **ressources actives** : registre concerné (`dataRegistry`, `viewRegistry`…), clés autorisées et clé par défaut. En production, l'URL `https://<tenant>.vercel.app` sert l'instance correspondante.

## Données

Les œuvres ne sont pas codées en dur : elles sont servies depuis `public/data` sous forme de JSON.

```
public/data/
├── img/manifest.json      # collections d'images (key, label, file)
├── img/<collection>.json  # œuvres : title, artist, date, place, file
├── video/manifest.json    # idem, vidéos
└── glb/manifest.json      # idem, modèles 3D (.glb)
```

Chaque `manifest.json` liste les collections ; chaque fichier de collection liste les œuvres et leurs métadonnées.

### Modèle d'œuvre (`createArtWorkItem`)

```js
{
  id,                  // identifiant dans la collection
  collection,          // libellé de la série (source)
  text,                // texte affiché (carte/sprite) — valorisé par les sources meta
  title, artist, date, place,
  image | video | glb, // média selon le type de la collection
  transformations      // scènes imbriquées (ViewScene, MotionScene)
}
```

## Concepts

### Ressources et registres

Une **ressource** est un item homogène (une vue, un motion, un dataset, un design…) déclaré dans un registre (`*Registry.js`). Chaque registre expose des getters (`getAllItems`, `getItem`, `getKeys`…) générés par `createGettersRegistry`.

- `viewRegistry` — vues 2D : `gridKey` (GridView), `listKey` (ListView), `sphereKey`, `cylinderKey`, `ellipseKey`
- `motionRegistry` — scènes 3D animées : `circlesKey`, `lemniscatesKey`, `helicesKey`
- `dataRegistry` — datasets et sources meta (`categoriesKey`, `gridMetaKey`) chargés depuis `public/data`
- `selectorRegistry`, `heroRegistry`, `overlayRegistry`, `transitionRegistry`, `loadingRegistry`, `headerRegistry`, `langRegistry`, `designRegistry`

Le `tenantRegistry` (`src/registries/common/tenantRegistry.js`) regroupe les registres et filtre les ressources actives d'un tenant.

### Design system

Un design system (`src/design/*.js`) déclare des **tokens par groupe** (`colors`, `font`, `grid`, `list`, `motion`…). Le `DesignProvider` les injecte en variables CSS `--<groupe>-<token>` (ex. `--grid-column-width`, `--list-photo-height`). Les composants et CSS consomment ces variables — c'est ce qui permet de changer d'identité visuelle par tenant. Designs disponibles : `matriceKey` (Matrice) et `julisKey` (Julis).

### Rendu d'une œuvre

`ViewScene` (vue) et `MotionScene` (motion) ouvrent un dataset dans un `<Canvas>` R3F. Chaque œuvre est rendue par `DynamicView` dans le Canvas : image/vidéo/texte → sprite (`SpriteView`, texture via `useSpriteTexture`), glb → `GlbView`, sinon ses `transformations` (scènes imbriquées). En DOM, `GridView`/`ListView` rendent les cartes via `StaticView`.

## Routes

| Route     | Page     |
|-----------|----------|
| `/`       | `Home`   |
| `/galerie`| `Gallery`|
| `/about`  | `About`  |
| `/contact`| `Contact`|