# Mozaiq Future Academy Website

Static, bilingual (Indonesian default + English) company profile & portfolio website for Mozaiq Future Academy, a premium extracurricular partner for schools, offering 26 programs across Sports, Technology, Tactical, Future Business, and Creative divisions.

## Project Structure

```
.
├── index.html              # Single-page landing site
├── README.md
├── .gitignore
├── .nojekyll               # Disables Jekyll on GitHub Pages
└── assets/
    ├── css/
    │   └── style.css       # All site styles
    └── js/
        └── main.js         # Language switch, mobile menu, program filter, show-more, scrollspy
```

## Sections (B2B conversion flow)

1. **Hero** — positioning, partnership CTA, microcopy, stats
2. **Realita di Sekolah** — the problem schools face
3. **Kenapa Mozaiq** — integrated program management approach
4. **Cara Kerja** — 4-step partnership process
5. **Divisi** — 5 program divisions
6. **Program** — 26 programs, ordered by sales appeal; first 6 featured on mobile with "Lihat 20 Program Lainnya"
7. **Kemitraan** — Basic / Premium / Elite (Elite framed as a full school academy system)
8. **Keamanan & SOP** — child safety, supervision, standard operating procedure
9. **FAQ** — common questions schools ask
10. **Kontak** — conversion CTA, 3 next steps, active social channels only
11. **Footer** — brand, links, social, copyright

## Bilingual System

- Default language is **Indonesian**. The **ID / EN** switch in the navbar toggles all content client-side and persists the choice in `localStorage`.
- Each translatable element carries the English text in a `data-en` attribute; the Indonesian original is cached into `data-id` on load.
- The `<html lang>` attribute updates with the selected language.

## Content To Update Before Launch

- **Social links:** only active channels are shown (WhatsApp, Instagram, TikTok, Email). Facebook and YouTube were removed per review; re-add later when the accounts are live. Replace the placeholder `mozaiqfutureacademy` handles with real account URLs.
- **WhatsApp number:** `6281225734398` (0812-2573-4398), consistently used in the landing page. Ownership and message delivery still require business confirmation.
- **Programs & pricing:** each program is an `<article class="program-card">` in the `#programs` section. Cards marked `data-featured="true"` appear in the first 6 on mobile.
- **Trust assets:** the Safety and FAQ sections are copy-based. Add real activity photos, coach profiles, and certificates when available to further raise trust.

## Preview Locally

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

The documented production workflow publishes the `main` branch root after business approval. The `.nojekyll` file ensures all assets are served as-is.


## Landing page QA and staging

This is buildless HTML/CSS/JavaScript, with no package manager, TypeScript,
framework compilation, or configured lint runner. No dependencies are required.

With the HTTP preview above running and Google Chrome installed on macOS:

```bash
node --check assets/js/main.js
node --check assets/js/motion.js
node scripts/qa-landing.mjs
node scripts/build-landing.mjs
```

The asserted Chrome/CDP suite checks both languages at 320, 375, 390, 428,
768, 1024, 1280, 1440, and 1920px; navigation, filters, expansions, keyboard
FAQ/menu behavior, metadata, section anchors, local assets, and WhatsApp URL
consistency. It writes screenshots and machine-readable results to `docs/qa/`.
`node scripts/verify-production.mjs` is a compatibility entry point to this
local suite; it does not verify production deployment.

To include axe-core WCAG A/AA scanning without adding it to the website,
provide a temporary local copy of axe-core 4.14.0:

```bash
MOZAIQ_AXE_PATH=/absolute/path/to/axe.min.js node scripts/qa-landing.mjs
```

The optional staging build copies only public site directories into
`.build/landing/` (ignored by Git), preserving linked public subpages. It is
independent of `scripts/build-sites.mjs`, whose worker serves the separate
training-planner experience and redirects `/` to that planner. Do not use
that worker to deploy the marketing landing page.

The language mechanism also handles `data-en-label` accessible labels and
`data-en-content` metadata, restoring the original Indonesian values on ID.
The shared canonical URL remains Indonesian by default; switching language
is client-side, not a separate indexed English route.

See [the delivery and QA report](docs/website-refinement-report.md) for
remaining business verification items and publication status.
