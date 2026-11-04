// Compatibility entry point for the asserted local landing-page QA suite.
// Requires the local HTTP preview documented in README.md. This does not
// verify a deployed production website; external delivery needs separate QA.
await import('./qa-landing.mjs');
