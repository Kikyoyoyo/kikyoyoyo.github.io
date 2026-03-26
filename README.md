# kikyoyoyo.github.io

Personal site: **React** + **Vite** + **Tailwind**, Markdown blog, deployed with **GitHub Actions** to **GitHub Pages**.

See **`plan.md`** for goals and scope, and **`dev.md`** for local dev, posts, Umami, and deployment.

## Quick start

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

## Blog posts

Add `*.md` under `src/content/posts/` with YAML front matter (`title`, `date`, `category`, `tags`). See `dev.md`.

## Deploy

The workflow `.github/workflows/deploy.yml` runs on pushes to **`main`**.

1. Repository **Settings → Pages**: set source to **GitHub Actions** (not “Deploy from a branch” for this setup).
2. Optional: **Settings → Secrets and variables → Actions** — add `VITE_UMAMI_WEBSITE_ID` and `VITE_UMAMI_SCRIPT_URL` for Umami; add `VITE_FIREBASE_*` for Local File Transfer (see `dev.md`).

## License

Personal content — all rights reserved unless stated otherwise. 
