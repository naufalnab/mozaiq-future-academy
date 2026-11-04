# Comparison introduction alignment follow-up

The screenshot reported an off-center supporting paragraph: its inherited 460px
maximum width had no automatic horizontal margins inside the centered 820px
heading container. The title also left a short final English line.

Scoped the correction to `#why`: center the paragraph with automatic margins,
allow a readable 68ch maximum line length, balance the title wrapping, and set
explicit eyebrow/title/paragraph spacing. No catalogue, pricing or service copy
changed.

Validation: 139 assertions passed, including center-axis alignment within 1px
for ID and EN at 320, 375, 390, 428, 768, 1024, 1280, 1440 and 1920px, plus the
existing navigation, keyboard, localization, catalogue and local asset checks.
Static staging build and `git diff --check` passed. Optional axe scan was not
rerun for this scoped spacing-only change. Desktop/mobile comparison screenshots
were reviewed in English and Indonesian; the saved JSON contains actual results.

Run the suite without overwriting the original QA evidence:

```sh
MOZAIQ_QA_OUT=/tmp/mozaiq-alignment-qa node scripts/qa-landing.mjs
```
