# AGENTS.md

Multi-tenant art-gallery showcase built with React 19 + Vite 8 + Tailwind 4 + React Three Fiber. No test framework.

## Commands
- `npm run dev` — Vite dev server
- `npm run lint` — oxlint (the standard verification step; warnings exist in `src/tenants/riannecorvalis.js` and `src/utils/trajectory/lemniscatesTrajectory.js` — leave untouched unless asked)
- `npm run build` — `vite build` + copies `dist/index.html` to `dist/404.html`

No tests exist; verify changes with `npm run lint` and, if in doubt, `npm run build`.

## Architecture
- **Tenant-driven config**: the active tenant is chosen by the `VITE_CLIENT` env var (default `demo`), see `src/tenants/index.js`. Each tenant file exports a `RESOURCES` array of `{ registry, keys, key }` entries — this declaration drives ALL selects/data available on the site.
- **`useTenant()`** (`src/hooks/tenant/useTenant.js`) loads every registry listed in the tenant `RESOURCES` and exposes them as `xxxItems` / `xxxItem`, where the name is the registry filename minus `Registry`, lowerCamelCased. E.g. `motionRegistry` → `motionItems`, `dataRegistry` → `dataItems`/`dataItem`.
- **Registries** (`src/registries/*Registry.js`) define switchable things (motions, views, selectors, overlays, transitions, her scroll, langs, etc.), always built with `createItemsConfig`. Items carry `key`, `label`, and for scene items a `component` that renders inside `ViewScene` / `MotionScene`.
- **Scene rendering**: `Gallery.jsx` renders either `motionKey` → `MotionScene` or `viewKey` → `ViewScene` (with overlay). Data resolution lives in `src/hooks/scene/useMotionScene.js` and `src/hooks/scene/useViewScene.js` — new selectors/scene components must keep this split.

## Data & media roots (gotcha: relies on external/absent assets)
- `dataRegistry` builds image/video/glb sources from manifests at `public/data/{img,video,glb}/manifest.json` (`src/utils/mediaPaths.js`, `src/services/fileListService.js`).
- Artwork image URLs are built against Cloudinary — requires `VITE_CLOUDINARY_CLOUD_NAME` from `.env`. Loading can silently stall if that env is missing.
- SPA fallback on Vercel via `vercel.json` rewrites; `vite.config.js` sets `base: '/matrice/'` locally and `'/'` on Vercel. All fetches/urls use `import.meta.env.BASE_URL`.

## Conventions
- The codebase is **French by convention**: component folders (`src/composants/...`), comments, route `/galerie`, tenant files and UI labels. Match this for new labels, comments and routes.
- Hooks live in `src/hooks/<domain>/`, named exports `export function useX()`. Scenes use scene hooks; pages use page hooks.
- `react/no-unknown-property` is off, so R3F/three element props pass lint without JSX namespace fixes.
- `doc/GUIDELINES.md` is human-owned and READ-ONLY for AI — never edit it. It is loaded as an instruction via `opencode.json`.