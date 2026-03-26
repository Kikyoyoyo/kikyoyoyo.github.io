# Development guide

## Prerequisites

- **Node.js** 20+ (LTS recommended) — **default** way to run `npm run dev` / `npm run build` on your machine.
- **Git** for commits; **GitHub** for remote.
- **Docker Desktop** (optional) — alternate local dev via Compose (see below); you do **not** need Docker for day-to-day work if Node is installed.

## Local vs Docker vs production

| Where | What runs |
|-------|-----------|
| **Your machine (default)** | Node 20: `npm ci`, `npm run dev`, `npm run build` — same toolchain as CI. |
| **Your machine (optional)** | Docker Compose: Node inside a container; handy if you skip host Node or want an isolated env. |
| **Production (always)** | **[GitHub Actions](.github/workflows/deploy.yml)** on push to `main`: `npm ci` → `npm run build` → upload `dist/` to **GitHub Pages**. The Docker image is **not** used in CI; the live site is whatever Actions builds. |

You do **not** have to build locally to deploy — push and let Actions run — but local `npm run build` is useful to catch errors before push.

Keep **`package-lock.json`** in sync with **`package.json`** (commit both after `npm install`); `npm ci` in Actions and in the Docker entrypoint expects a matching lockfile.

## Local development (default)

```bash
npm ci
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # serve dist/ locally
```

## GitHub Actions (deploy)

When you push to **`main`**, the **Deploy to GitHub Pages** workflow:

1. Checks out the repo on GitHub’s runners.
2. Runs **`npm ci`** and **`npm run build`** (Node 20 in the workflow).
3. Uploads **`dist/`** as the Pages artifact.

Optional build-time env vars (e.g. Umami) are set in the workflow **`env:`** block from repository **Secrets**. See pass/fail under the **Actions** tab.

## Docker (optional local dev)

Same app as local Node, but Node runs inside a container with the repo bind-mounted. Use this when you prefer not to install Node on the host or want a repeatable Linux environment; **it does not replace** GitHub Actions for the public site.

| File | Role |
|------|------|
| `Dockerfile` | Node 20 image; installs deps; runs `docker-entrypoint.sh`. |
| `docker-compose.yml` | Mounts `.` → `/app`, named volume for `node_modules`, exposes `5173`, sets `CHOKIDAR_USEPOLLING=true` for file watching under Docker mounts (especially on Windows). |
| `docker-entrypoint.sh` | `npm ci` → `npm run build` → `npm run dev`. |
| `build_and_run.sh` / `build_and_run.ps1` | Run `docker compose up` (add `--build` / `-Build` to rebuild the image). |

**Shell scripts** should use **LF** line endings (see `.gitattributes` / `.editorconfig`) so Bash in Git Bash/WSL does not see `\r` errors.

**Vite** (`vite.config.ts`): `server.host` is enabled and polling follows `CHOKIDAR_USEPOLLING` so the dev server is reachable from the host and HMR works in the container.

**No Node on the host?** Update dependencies from the container (writes into the bind-mounted repo):  
`docker compose run --rm --entrypoint "" app npm install <package>` — then commit `package.json` and `package-lock.json` so **GitHub Actions** `npm ci` stays in sync.

## Fun (routes)

| Route | Content |
|-------|---------|
| `/fun` | Fun hub (links to Games, Tools, placeholders). |
| `/fun/games` | Games index. |
| `/fun/games/gomoku` | Two-player Gomoku, 19×19, same device — pure frontend (`src/lib/gomoku.ts`, `src/pages/GomokuPage.tsx`). |
| `/fun/tools` | Tools index. |
| `/fun/tools/local-file-transfer` | Same-LAN file transfer (WebRTC + Firebase Realtime DB signaling): `src/pages/LocalFileTransferPage.tsx`, `src/hooks/useFileTransfer.ts`, `src/lib/firebase.ts`, `src/lib/webrtc.ts`. |
| `/badminton` | Redirects to `/fun` (old links keep working). |

On **narrow viewports**, the board uses fixed cell sizes and **horizontal scroll**; optional **pinch-to-zoom** applies only to the board on small screens (see `usePinchZoomBoard`). **Undo** is one move; a **red line** marks the winning five when the game ends.

## Blog posts (Markdown)

Add a file under `src/content/posts/` with front matter:

```yaml
---
title: "Your title"
date: "2025-03-25"
category: quant
tags: [markets, notes]
description: "Optional one-line summary for lists."
---
```

**Date field:** Unquoted `date: 2025-03-25` is parsed by YAML as a JavaScript `Date`. The app normalizes that to `YYYY-MM-DD` strings for display, but quoting the date (`"2025-03-25"`) is also fine and avoids ambiguity.

Write in **Markdown**. Use GFM tables, lists, code blocks, etc.

- **Filename** should be unique, e.g. `2025-03-25-my-note.md` (slug can be derived from filename or title — implementation uses filename stem as slug unless specified otherwise).
- Rebuild / redeploy to publish.

## Umami analytics (optional)

**Umami** ([https://umami.is/](https://umami.is/)) is a lightweight, privacy-focused analytics tool you self-host (or use a provider). It shows page views and simple breakdowns without the heavy tracking surface of typical ad-tech stacks.

**Typical setup:**

1. Deploy Umami (Docker example) and create a **site** in the Umami UI to get a **Website ID**.
2. Note the script URL (e.g. `https://your-umami.example.com/script.js`).

**This project** reads at **build time**:

| Variable | Meaning |
|----------|---------|
| `VITE_UMAMI_WEBSITE_ID` | Website ID from Umami dashboard |
| `VITE_UMAMI_SCRIPT_URL` | Full URL to `script.js` |

In **GitHub**: Repository → **Settings → Secrets and variables → Actions** → add secrets, then map them in the workflow file as `env:` for the build step (or use `VITE_` prefixed vars in the workflow `env` block).

If these are **unset**, the site builds and runs **without** Umami (no broken requests).

**Privacy note**: Tell visitors you use analytics if your jurisdiction or employer requires it; Umami is lighter than many alternatives but policies are your responsibility.

## Firebase — Local File Transfer signaling (optional)

The **Local File Transfer** tool (`/fun/tools/local-file-transfer`) uses **Firebase Realtime Database** only to exchange WebRTC signaling (SDP + ICE). File bytes are not uploaded to Firebase.

**One-time setup:**

1. In [Firebase console](https://console.firebase.google.com/), create a project (Spark / free tier is enough for light use).
2. Enable **Realtime Database** (not Firestore for this feature). Pick a region; note the database URL (e.g. `https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com`).
3. Project settings → **Your apps** → Web app → copy the config snippet values.

**Build-time env vars** (Vite exposes only `VITE_*` to the client):

| Variable | Meaning |
|----------|---------|
| `VITE_FIREBASE_API_KEY` | Web API key from Firebase config |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `YOUR_PROJECT_ID.firebaseapp.com` |
| `VITE_FIREBASE_DATABASE_URL` | Realtime Database URL |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |

**Local dev:** create `.env.local` in the repo root with those four variables (do not commit this file; it is gitignored by convention).

**GitHub Actions:** add the same four names as **repository secrets** (Settings → Secrets and variables → Actions). The deploy workflow passes them into `npm run build` so production Pages builds include the config.

**Realtime Database rules (manual):** lock down writes to room paths only, for example:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

Tighten further if you want stricter caps (e.g. validation on `createdAt` / size of strings). If these variables are **unset**, the Local File Transfer page still loads but shows a short “not configured” message instead of the tool.

## Layout & header

- **Body**: `bg-white` in light mode (not off-white) so the page reads as clean white; dark mode uses `mizuno-900`.
- **Header**: Full-width **`mizuno-600`** bar (`#031583`) with white/light nav links; **`Logo variant="onBrand"`** = white tile + `mizuno-600` K so the mark matches the brand blue on the bar. Dark mode header uses **`mizuno-800`** for a deeper navy strip.

## Accessibility (AA)

- Keep focus styles visible (Tailwind `focus-visible:` rings).
- Don’t rely on color alone for meaning.
- Run occasional checks with **axe DevTools** or **WAVE** in the browser; fix obvious violations.

## Deployment

- **Build**: Always on **GitHub Actions** after push (see **GitHub Actions (deploy)** above). Docker is for optional local dev only.
- **GitHub Pages**: Settings → Pages → source from **GitHub Actions** (recommended for Vite) or the branch the workflow deploys to.
- Base path for `username.github.io` root site is `/` — no extra `base` in Vite unless you use a project site path.

## Troubleshooting

| Issue | Hint |
|-------|------|
| **`https://<user>.github.io/` shows GitHub’s “Site not found”** (not your app) while Actions is green | Often **Pages + Actions mis-sync**. Ensure **Settings → Pages → Build and deployment** uses **GitHub Actions** (not “Deploy from a branch” pointing at an empty `main` / root). Re-save if needed. This workflow runs **`actions/configure-pages`** before upload so the Pages site is registered. If you still see the generic GitHub 404, open the latest **Deploy to GitHub Pages** run and confirm the **deploy** job completed; then wait a few minutes for CDN. |
| Blank page on Pages | Check Actions log; confirm `homepage` / `base` in Vite matches repo type (`/` for `username.github.io`). |
| **`ReferenceError: Buffer is not defined`** / **`Can't find variable: Buffer`** | Front matter is parsed in the browser with **`yaml`** and `src/lib/frontMatter.ts` (no Node `Buffer`). If this appears after a dependency change, something may be pulling Node-only code into the bundle — check recent imports. |
| 404 on refresh inside the SPA | `npm run build` copies `index.html` → `404.html` for client-side routes. |
| Styles missing | Confirm Tailwind content paths include `index.html` and `./src/**/*`. |
| **`docker` not found** / Compose fails | Install Docker Desktop; ensure `docker compose` is on `PATH`. |
| Bash **`set: pipefail`** / **`$'\r': command not found`** | Script saved as CRLF — normalize to LF (see `.editorconfig`) or run `git add --renormalize .` after pulling `.gitattributes`. |

## Repo layout (after migration)

- `src/content/posts/` — Markdown posts  
- `src/pages/` — page components (Home, Blog, Fun, Gomoku, Tools, Local File Transfer, …)  
- `src/hooks/` — shared hooks (e.g. document title, pinch zoom for Gomoku, `useFileTransfer`)  
- `src/lib/` — utilities (`posts`, `gomoku`, `firebase` signaling, `webrtc` helpers, …)  
- `public/` — static assets (favicon, etc.)  
- `dist/` — build output (gitignored)  
- `Dockerfile`, `docker-compose.yml`, `docker-entrypoint.sh`, `build_and_run.sh`, `build_and_run.ps1` — optional local dev via Docker Compose (CI does not use this image)
