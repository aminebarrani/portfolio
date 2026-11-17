# Portfolio — Mohamed Amine Barrani

Personal portfolio for a 6-month end-of-studies internship (PFE) in Full-Stack + Generative AI, from January 2027.
Story: **"I build web platforms that ship with AI agents inside."**

Stack: Vite · React · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type-check (tsc -b) + production build into dist/
npm run preview    # serve the production build locally
```

## Edit the content

All text lives in **`src/data/content.ts`** (typed, FR + EN). Edit strings there — components never hardcode copy.
Types are in `src/data/types.ts`. The language toggle (FR/EN) reads from this single file and persists the choice in `localStorage`.

## Add your photo

A branded placeholder ships at **`public/photo.jpg`**. To use your real portrait, overwrite that file
with a 4:5 image (e.g. 800×1000 px) — the About section picks it up automatically, no code change needed.

## Replace the placeholder URLs (4 places)

Once your GitHub Pages site exists, search & replace `aminebarrani.github.io` with your real URL in:

1. `src/data/content.ts` → `SITE_URL`
2. `index.html` → `<link rel="canonical">`, `og:url`, `og:image`
3. `public/sitemap.xml` and `public/robots.txt`

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio`), then:

   ```bash
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow `.github/workflows/deploy.yml` builds with `BASE_PATH=/<repo>/`
   (or `/` if the repo is named `<your-username>.github.io`) and publishes `dist/`
   on every push to `main` (or manually via Actions → Run workflow).
4. Your site is live at `https://<your-username>.github.io/<repo>/`.

> Local builds use base `/`. To preview exactly what Pages will serve, run
> `npm run deploy:local` — it builds with base `/myWebsite/` and serves it at
> `http://localhost:4173/myWebsite/` (adjust the folder name to your repo name).
> `npm run preview` alone always serves at root, so it cannot preview a base-path build.
> Run `npm run build` afterwards to restore the root-base `dist/`.

## Structure

```
src/
  data/        content.ts (all copy, FR+EN), types.ts
  lib/         i18n.tsx (language context), scroll.ts (Lenis bridge)
  hooks/       useMagnetic.ts, useMotionPrefs.ts (reduced-motion / pointer)
  components/  Nav, Hero, ParticleNetwork, Marquee, About, Projects,
               ArchitectureDiagram, Experience, Skills, Certifications,
               Contact, Footer, Cursor, BootLoader, Icons, ui (primitives)
  pages/       Home.tsx, ProjectPage.tsx
```
