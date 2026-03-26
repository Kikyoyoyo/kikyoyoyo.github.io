# Development guide

## Prerequisites

- **Node.js** 20+ (LTS recommended) for local `npm run dev` / `npm run build`.
- **Git** for commits; **GitHub** for remote and Actions.

CI builds on every push to the working branch / `main` — you do **not** have to build locally to deploy.

## What is GitHub Actions (here)?

A workflow in `.github/workflows/` runs on GitHub’s servers when you push. Our workflow:

1. Checks out the repo.
2. Runs `npm ci` and `npm run build`.
3. Uploads `dist/` to GitHub Pages (or pushes to `gh-pages` branch, depending on workflow — see the YAML file).

You see pass/fail under the **Actions** tab.

## Local development

```bash
npm ci
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # serve dist/ locally
```

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

## Layout & header

- **Body**: `bg-white` in light mode (not off-white) so the page reads as clean white; dark mode uses `mizuno-900`.
- **Header**: Full-width **`mizuno-600`** bar with white/light nav links; **`Logo variant="onBrand"`** = white tile + `mizuno-600` K so the mark matches the brand blue on the bar. Dark mode header uses **`mizuno-800`** for a deeper navy strip.

## Accessibility (AA)

- Keep focus styles visible (Tailwind `focus-visible:` rings).
- Don’t rely on color alone for meaning.
- Run occasional checks with **axe DevTools** or **WAVE** in the browser; fix obvious violations.

## Deployment

- **GitHub Pages**: Settings → Pages → source from **GitHub Actions** (recommended for Vite) or the branch the workflow deploys to.
- Base path for `username.github.io` root site is `/` — no extra `base` in Vite unless you use a project site path.

## Troubleshooting

| Issue | Hint |
|-------|------|
| **`https://<user>.github.io/` shows GitHub’s “Site not found”** (not your app) while Actions is green | Often **Pages + Actions mis-sync**. Ensure **Settings → Pages → Build and deployment** uses **GitHub Actions** (not “Deploy from a branch” pointing at an empty `main` / root). Re-save if needed. This workflow runs **`actions/configure-pages`** before upload so the Pages site is registered. If you still see the generic GitHub 404, open the latest **Deploy to GitHub Pages** run and confirm the **deploy** job completed; then wait a few minutes for CDN. |
| Blank page on Pages | Check Actions log; confirm `homepage` / `base` in Vite matches repo type (`/` for `username.github.io`). |
| **`ReferenceError: Buffer is not defined`** (or “Can’t find variable: Buffer”) in the console | **`gray-matter`** calls Node’s `Buffer` when parsing front matter. The app loads a **`buffer` polyfill** in `src/polyfills.ts` before React; if you see this error, ensure `main.tsx` still imports `./polyfills` first. |
| 404 on refresh inside the SPA | `npm run build` copies `index.html` → `404.html` for client-side routes. |
| Styles missing | Confirm Tailwind content paths include `index.html` and `./src/**/*`. |
| **`Can't find variable: Buffer`** / `Buffer is not defined` (often Safari) | **gray-matter** used Node’s `Buffer` in the browser bundle. Front matter is parsed with **`yaml`** and a `---` … `---` splitter in `src/lib/frontMatter.ts` instead — no polyfill. |

## Repo layout (after migration)

- `src/content/posts/` — Markdown posts  
- `src/pages/` or `src/routes/` — page components  
- `public/` — static assets (favicon, etc.)  
- `dist/` — build output (gitignored)
