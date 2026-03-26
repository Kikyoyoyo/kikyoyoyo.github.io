# Site renovation plan

## Goals

- **Primary**: English blog (Markdown) with thoughts, phenomena, lessons learned; quant-adjacent audience (friends, collaborators, researchers).
- **Secondary**: Lightweight personal hub with **Projects** and **Badminton** pages (content grows over time).
- **Not in scope**: Marketing-style SEO, Lighthouse score chasing.

## Content & information architecture

| Page / area | Purpose |
|-------------|---------|
| **Home** | One-screen intro, blue **K** logo, links to Blog / Projects / Badminton, contact line (email obfuscated). |
| **Blog** | Post list (newest first), optional short excerpts from Markdown. |
| **Blog post** | Renders `.md` with front matter: `title`, `date`, `category`, `tags`, `description` (optional). |
| **Categories** | `/blog/category/:slug` — posts filtered by `category`. |
| **Tags** | `/blog/tag/:slug` — posts filtered by tag. |
| **Archive** | `/blog/archive` — posts grouped by month (YYYY-MM) for “what did I write when”. |
| **Projects** | Placeholder-friendly; expandable later. |
| **Badminton** | Placeholder-friendly; expandable later. |

**Markdown source**: files under `src/content/posts/*.md`, committed to Git. Front matter dates are normalized to strings (YAML may parse bare `YYYY-MM-DD` as `Date`, which React cannot render).

## Visual & UX

- **Aesthetic**: Minimal academic; **Mizuno-inspired blue + white** (no violet-heavy Tailwind defaults).
- **Theme**: **System** dark/light via `prefers-color-scheme`; if unavailable, **light**.
- **Nav**: Sticky top bar: Home, Blog, Archive, Projects, Badminton; **site search** entry (client-side index over post metadata + body text).
- **Logo**: Blue “K” (SVG), favicon aligned with same mark.

### Mizuno-inspired color & logo language (reference only)

We **do not** copy Mizuno’s RunBird mark or wordmark. We echo their **graphic language**: one strong **deep blue** on **white**, flat shapes, high contrast, no gradients.

| Role | Token / value |
|------|----------------|
| Primary / links / logo fill | `mizuno-600` → **`#001489`** (brand-adjacent navy blue) |
| Page background (light) | `mizuno-50`–`100`, plenty of white |
| Surfaces / chrome (dark) | `mizuno-900` with light text; accents stay readable on navy |

**Logo**: Small **white tile** with **`rx="2"`** (badge-like corners), **bold geometric “K”** built from simple paths—same idea as an athletic mark: minimal, flat, legible at favicon size.

## Technical stack

- **React** + **Vite** + **TypeScript**.
- **Tailwind CSS** with custom color tokens (Mizuno-like palette).
- **react-router-dom** for routing.
- **react-markdown** + **remark-gfm** for post body; **`yaml`** + a small front-matter splitter (no Node `Buffer`; works in all browsers).
- **fuse.js** for in-browser search over a build-time JSON index (or fused at runtime from loaded posts).
- **Build & deploy**: **GitHub Actions** builds and publishes **`dist/`** to GitHub Pages (artifact or `peaceiris/actions-gh-pages`); no requirement to build only locally.

## Discoverability & “basic SEO” (non-marketing)

- Sensible `<title>` per route and a short meta description where it helps humans (not keyword stuffing).
- No sitemap/OG/structured-data campaign unless needed later.

## Accessibility (target: WCAG 2.1 AA — pragmatic)

- **Skip link** to main content.
- **Keyboard**: all interactive controls reachable; visible **focus** styles.
- **Color**: text/background contrast meets AA for normal text (Mizuno palette tuned for this).
- **Semantics**: one `h1` per page, landmarks (`header`, `nav`, `main`, `footer`), nav `aria-current` where appropriate.
- **Images** (if added later): `alt` text.
- **Motion**: respect `prefers-reduced-motion` for any animation added later.

## Analytics: Umami (optional)

**Umami** ([umami.is](https://umami.is)) is a lightweight, **privacy-focused** analytics product (often self-hosted). You get a simple dashboard: page views, referrers, browsers, countries—without the heavy ad-tech surface of typical trackers. Many deployments use **no cookies** by default compared to older analytics stacks.

**How it fits here:** after you deploy Umami somewhere and create a “website” in its UI, you get a **Website ID** and a **`script.js` URL**. This app injects that script **only when** `VITE_UMAMI_WEBSITE_ID` and `VITE_UMAMI_SCRIPT_URL` are set at **build time** (e.g. GitHub Actions secrets). If they are missing, **nothing** is loaded—no broken requests.

See `dev.md` for wiring secrets and hosting notes.

## Phasing

1. **M1 (this rollout)**: React app, Markdown blog, categories/tags/archive, search, sticky nav, theme, AA-oriented UI, GitHub Actions deploy, Umami hook (optional), `plan.md` / `dev.md`.
2. **M2**: Flesh out Projects / Badminton; more posts; RSS if desired.
3. **M3+**: Comments (e.g. Giscus), richer project entries, analytics tuning.

## Out of scope (for now)

- Comments, RSS (unless added in M2).
- Headless CMS; content stays Markdown in Git.
