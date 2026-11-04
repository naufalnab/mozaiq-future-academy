# Mozaiq Future Academy — refinement and QA report

Date: 4 November 2026 (Asia/Jakarta). Baseline: `1d03023`.
Branch: `refine/institutional-readiness`. Production was not published or changed.

## 1. Executive summary

Refined the existing school partnership landing page, preserving the navy/purple
identity, cinematic imagery, 26-program catalogue, prices, package tiers, and
WhatsApp conversion flow. The baseline already included the brief’s longer
comparison headline, four challenge/solution points, and contextual CTA; this
work improves those existing elements rather than claiming to have added them.

### Baseline discovery

- Architecture: buildless static HTML, one root landing page in `index.html`,
  shared CSS and deferred vanilla JavaScript; no frontend framework, package
  manager, component library, compiler, configured linter, or TypeScript.
- Styling: existing `:root` tokens for navy, purple, neutral surfaces, typography,
  radii, shadows, and a 1180px content container. Existing content breakpoints
  include 1080, 1024, 860, 680, and 400px; navigation now switches at 1200px.
- Localization: `data-en`/cached `data-id`, persisted in `mfa-lang` localStorage.
  It is a client-side toggle with a shared canonical URL, not separate ID/EN routes.
- Navigation: seven section anchors, program/division filters, programme/gallery
  expansion, native details/summary FAQ, and WhatsApp links. No lead form,
  analytics integration, school dashboard, parent portal, or reporting API found
  in the landing-page implementation. No digital platform claim was added.
- Deployment: README documents GitHub Pages from the root of `main`. No PR
  preview workflow is configured here. The existing Sites worker is a different
  experience: `/` redirects to the training planner and does not serve this
  marketing landing page. Its configuration and generated worker were preserved.
- Git started clean on `main`, commit `1d03023`. No repository `AGENTS.md` was found.
- Strengths: established brand, structured catalogue, bilingual content, clear
  contact path, native FAQ, responsive card grids, optimized WebP assets, existing
  reduced-motion support, canonical/Open Graph metadata, and organization schema.
- Gaps: lengthy comparison heading; negative/generalizing challenge introduction;
  uneven comparison rows; unverified popularity/certification/numeric claims;
  named sample student; unqualified weekly-report and equipment promises;
  ambiguous programme/package relationship; untranslated accessible labels;
  missing control states; tablet header crowding; mobile contact overlap; a
  report-label contrast failure; and QA that logged success without assertions.
- No reference screenshot was attached. Before screenshots were captured from
  the actual repository before edits. No business credentials, contracts, consent
  records, or independent evidence of completed partnerships were available.

## 2. Before vs after

| Area | Baseline | Final implementation |
| --- | --- | --- |
| Positioning | School partnership wording mixed with marketing metrics | Explicit extracurricular development and management partner in hero eyebrow |
| Main comparison headline | Long headline ending “yang Terarah dan Terukur” | “Dari Kegiatan Rutin Menjadi Program Unggulan Sekolah.”; supporting copy explains scope |
| Comparison cards | Four points on each side; x/check icons; negative generalization | Same light/dark cards, neutral introductions, matching 01–04 markers, aligned desktop rhythm, natural mobile row heights |
| CTAs | Working WhatsApp and programme links | Preserved destinations; concise partnership language, contextual cost-simulation link, translated accessible labels |
| Hero evidence | 50+ visual assets, 30+ concepts; certified mentors | Verified 26 programmes and five divisions; syllabus emphasis; curated mentor wording without unsupported certification |
| Programmes | Existing 26 programmes, categories and rates | All names, categories, nominal rates and units preserved; both range endpoints use Rp; filters expose selected states |
| Documentation | “Bukti Nyata”, weekly-report blanket promise, named illustrative student | Clearly labelled visual references and sample report, anonymized Student A, agreed-scope reporting and equipment wording |
| Process | Four established steps; safety guarantee heading | Four steps preserved; needs mapping through semester evaluation wording; standards rather than guarantee in translated heading |
| Pricing | Basic/Premium/Elite, “most popular” badge, no programme/package relationship explanation | Same nominal rates and inclusions; neutral integrated-program badge; explicit proposal checklist without inventing fee relationships |
| Responsive layout | Desktop links crowded brand at 1024px; floating action obscured comparison text | Navigation breakpoint at 1200px; scrollable mobile menu; floating action hidden during mobile comparison; stacked comparison retained |
| Accessibility | Partial focus and keyboard support | Skip link, general focus ring, control relationships, pressed/current states, translated labels, stronger report-label contrast, semantic labelled groups |
| SEO and motion | Static Indonesian metadata; costly blur reveal/compositor hints | Translated title/social metadata; root sitemap; canonical/schema preserved; simpler opacity/transform reveals; redundant initial text rebuild skipped |

## 3. Modified files

- `index.html`: institutional copy, comparison markers, evidence labels, anonymous
  sample, pricing clarification, currency formatting, semantic groups, accessible
  labels/controls, translated metadata, and sitemap discovery.
- `assets/css/style.css`: focus/skip-link styles, comparison alignment, pricing
  note, report contrast, tablet navigation, mobile menu height, and lighter motion.
- `assets/js/main.js`: language states/accessible labels/metadata, filter states,
  reduced-motion-aware scrolling, accurate scrollspy, contact overlap handling,
  breakpoint synchronization, and avoiding unchanged text reconstruction.
- `assets/js/motion.js`: removes unnecessary blur effects.
- `robots.txt`, `sitemap.xml`: landing-page sitemap discovery; existing training
  planner crawl restriction preserved.
- `scripts/qa-landing.mjs`: isolated temporary Chrome profile, asserted bilingual
  HTTP/browser QA, optional axe scan, screenshots and JSON evidence.
- `scripts/verify-production.mjs`: compatibility entry point to the asserted local
  suite; no longer prints unconditional production-verification success.
- `scripts/build-landing.mjs`: optional public-file staging build, independent of
  the existing Sites worker; preserves linked public subpages.
- `README.md`, `.gitignore`: accurate contact documentation, commands, workflow
  boundaries, and ignored staging output.
- `docs/qa/*`, this report: before/after screenshots and actual QA evidence.

## 4. Quality assurance results

| Gate | Status | Evidence / limitation |
| --- | --- | --- |
| JS syntax/static checks | PASS | `node --check` on changed JavaScript and build/QA entry points; `git diff --check`; sitemap XML, JSON-LD and common secret-pattern scan |
| Configured lint | NOT TESTED | No lint configuration or runner exists; syntax checks are not labelled lint |
| Typecheck | NOT TESTED | No TypeScript or typecheck configuration exists |
| Production staging build | PASS | `node scripts/build-landing.mjs`; public site staged in `.build/landing/`; no framework compilation required |
| Programme data regression | PASS | Compared against `1d03023`: all 26 names, categories, nominal rates and units unchanged; `qa/content-preservation.json` |
| Browser/functional suite | PASS | **125 assertions passed** against the staged public build; tested artifact URL is recorded in `qa/after-results.json` |
| Existing unit/component tests | NOT TESTED | No landing-page unit/component test runner exists; unrelated training-planner tests were outside scope |
| Responsive matrix | PASS | Both ID and EN: 320, 375, 390, 428, 768, 1024, 1280, 1440, 1920px; measured visible text and control bounds plus page width, not just hidden-overflow scroll width |
| Menu/FAQ keyboard checks | PASS | Menu focus, Tab cycle, Escape return, and native FAQ Enter activation |
| Localization | PASS | Language/pressed states, title/social locale, ID restoration, persisted EN preference, and working catalogue controls |
| Programme filters/expansion | PASS | All five filters, all 26 programmes expanded, gallery expansion in both languages |
| Internal links and assets | PASS | Section targets exist; anchor clearance below sticky header; local resources fetched over HTTP; loaded images, dimensions and alt attributes checked |
| Accessibility automation | PASS | axe-core 4.14.0, WCAG 2 A/AA, 2.1 AA and 2.2 AA tags, at 390 and 1440px in both languages; zero automated violations after fixes |
| Accessibility conformance | NOT TESTED | Automated scans do not establish WCAG conformance. Gradient/image contrast needing review is retained in axe `incomplete` records. No assistive-technology or real-device audit was performed |
| Conversion journeys A/B/C | PASS (local scope) | Principal: why → partnership → contact; coordinator: catalogue/filter → process → documentation → contact; foundation: why → documentation → packages → contact. All section links and WhatsApp URL/message structures validated |
| External contact delivery/ownership | BLOCKED | No messages sent; ownership, availability and WhatsApp delivery cannot be established from repository URLs alone. README identifies social handles as requiring confirmation |
| Runtime/HTTP errors | PASS | No browser exceptions or HTTP asset errors in the asserted suite |
| Motion | PASS | Reduced-motion browser checks plus ordinary-motion section reveals; no added animation dependency |
| Performance | See lab result below | Local synthetic Lighthouse run; not production field Core Web Vitals or a guarantee |
| Hosted preview / production | NOT TESTED | No deployment performed; final browser suite ran against the local staged artifact |

Responsive PASS means the scripted bounds/interaction checks passed. Detailed visual
review covered the comparison at desktop/mobile, ID/EN hero screenshots, and the
full desktop/mobile page captures. It does not claim manual screenshot review or
real-device testing at all 18 language/width combinations.

### Performance measurement

Local mobile Lighthouse: performance **85/100**, LCP **1.9 s**, CLS **0**,
TBT **490 ms**, Speed Index **2.1 s**. LCP and CLS meet the requested targets
in this run; TBT shows remaining performance headroom and is not an INP result.

Final local Lighthouse results are recorded in `qa/performance-summary.json`.
The run uses the staged HTTP artifact, Lighthouse's simulated mobile environment,
and a local uncompressed Python server. It does not reproduce production caching,
CDN behavior, real devices, or network geography. INP requires real interaction
or field measurement; TBT is recorded separately and is not called INP.

## 5. Evidence and review

- Before: `qa/before-comparison-desktop.png`, `qa/before-comparison-mobile.png`.
- After: `qa/after-comparison-desktop.png`, `qa/after-comparison-mobile.png`.
- Hero: `qa/after-hero-{id,en}-{390,1440}.png`.
- Complete page: `qa/after-page-390.png`, `qa/after-page-1440.png`.
- Assertions: `qa/after-results.json`.
- Accessibility: `qa/axe-{id,en}-{390,1440}.json`, including manual-review findings.
- Data integrity: `qa/content-preservation.json`.
- Optional local review: run `python3 -m http.server 8000` and open
  `http://127.0.0.1:8000/`. This is not a hosted preview URL.
- Commit: supplied in the delivery message; inspect `git log -1 --oneline` on the
  refinement branch. No push, protected-branch mutation, or live publication.

## 6. Business verification items

1. Confirm whether programme and package rates replace, include, or supplement
   one another. The site explicitly asks schools to confirm this in a proposal;
   no arithmetic relationship was invented.
2. Confirm minimum participants per programme, duration/count of sessions, trial
   conditions, facilities, equipment inclusions, and actual commercial terms.
3. Confirm reporting frequency, evaluation method, syllabus milestones, instructor
   coordination/replacement commitments, dedicated Elite coordinator availability,
   quarterly showcases, and precise tier-specific deliverables. Existing listed
   package inclusions were preserved, not independently verified.
4. Confirm ownership/availability of `6281225734398`, the published email, Instagram
   and TikTok accounts. The old README contained a conflicting machine-format
   phone number, now corrected to match the site and visible phone number.
5. Establish provenance/publication permission for existing programme/gallery
   imagery. Samples are explicitly presented as visual references, not completed
   partnership evidence. No new student imagery, school logos, named testimonials,
   partner counts, credentials, or academic results were invented.
6. Obtain consent/anonymization checks before replacing illustrative examples with
   actual student reports or field documentation. “Siswa A” and report scores are
   clearly illustrative, not actual student performance evidence.
7. Confirm remaining existing school outcomes, service coverage and operational
   commitments before publication. No software dashboard or digital portal is
   represented as a currently available service.

## 7. Production status

**READY WITH BUSINESS APPROVAL REQUIRED**

The local technical implementation and staged-artifact functional checks pass.
Publication remains subject to the business confirmations above. Real-world
contact delivery, production field performance, and assistive-technology testing
remain explicitly outside the verified local evidence. No live deployment is claimed.
