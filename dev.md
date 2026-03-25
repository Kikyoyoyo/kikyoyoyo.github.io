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
date: 2025-03-25
category: quant
tags: [markets, notes]
description: "Optional one-line summary for lists."
---

Write in **Markdown**. Use GFM tables, lists, code blocks, etc.
```

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
| Blank page on Pages | Check Actions log; confirm `homepage` / `base` in Vite matches repo type. |
| 404 on refresh | SPA fallback: GitHub Pages needs `404.html` = `index.html` or hash routing — we add `404.html` copy in `public/` or CI step for GH Pages. |
| Styles missing | Confirm `tailwind` content paths include `index.html` and `./src/**/*`. |

## Repo layout (after migration)

- `src/content/posts/` — Markdown posts  
- `src/pages/` or `src/routes/` — page components  
- `public/` — static assets (favicon, etc.)  
- `dist/` — build output (gitignored)
