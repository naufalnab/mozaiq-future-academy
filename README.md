# Mozaiq Future Academy Website

Static, bilingual (Indonesian default + English) company profile & portfolio website for Mozaiq Future Academy, a premium extracurricular partner for schools, offering 12 programs across Sports, Technology, Tactical, Future Business, and Creative divisions.

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
3. **Kenapa Mozaiq** — value proposition (system, not just a vendor)
4. **Cara Kerja** — 4-step partnership process
5. **Divisi** — 5 program divisions
6. **Program** — 12 programs, reordered by sales appeal; first 6 featured on mobile with "Lihat 6 Program Lainnya"
7. **Kemitraan** — Basic / Premium / Elite (Elite framed as a full school academy system)
8. **Keamanan & SOP** — child safety, supervision, standard operating procedure
9. **FAQ** — 8 common questions schools ask
10. **Kontak** — conversion CTA, 3 next steps, active social channels only
11. **Footer** — brand, links, social, copyright

## Bilingual System

- Default language is **Indonesian**. The **ID / EN** switch in the navbar toggles all content client-side and persists the choice in `localStorage`.
- Each translatable element carries the English text in a `data-en` attribute; the Indonesian original is cached into `data-id` on load.
- The `<html lang>` attribute updates with the selected language.

## Content To Update Before Launch

- **Social links:** only active channels are shown (WhatsApp, Instagram, TikTok, Email). Facebook and YouTube were removed per review; re-add later when the accounts are live. Replace the placeholder `mozaiqfutureacademy` handles with real account URLs.
- **WhatsApp number:** `6287815892929` (0812-2573-4398).
- **Programs & pricing:** each program is an `<article class="program-card">` in the `#programs` section. Cards marked `data-featured="true"` appear in the first 6 on mobile.
- **Trust assets:** the Safety and FAQ sections are copy-based. Add real activity photos, coach profiles, and certificates when available to further raise trust.

## Preview Locally

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

Ready to publish from the `main` branch root. The `.nojekyll` file ensures all assets are served as-is.
