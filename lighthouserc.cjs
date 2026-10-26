// Lighthouse CI gate — mobile (the default Lighthouse form factor).
//
// Run against the built `dist/` served by a Pages-faithful static server, not
// `lhci`'s built-in `staticDistDir` (which 404s /about and friends because
// Nitro emits `about.html`, not `about/index.html`).
//
// The performance bar is deliberately low: mobile FCP is ~3.5–3.9 s under 4×
// CPU and the JS bundle, not images, dominates. Accessibility, best practices
// and SEO are the hard gate; performance and LCP are floor-guards that catch a
// catastrophic regression without pretending 90+ mobile was agreed.
//
// npm run lh -- --collect.numberOfRuns=1   # quick probe
module.exports = {
  ci: {
    collect: {
      url: [
        'http://127.0.0.1:4174/',
        'http://127.0.0.1:4174/blog',
        'http://127.0.0.1:4174/blog/case-studies/semantichelp-rag-knowledge-base'
      ],
      startServerCommand: 'node scripts/serve-dist.mjs',
      startServerReadyPattern: 'serve-dist listening',
      startServerReadyTimeout: 20000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage'
      }
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // A hard floor against catastrophic regression, not a quality bar.
        'categories:performance': ['error', { minScore: 0.5 }],
        // The aspiration, expressed as a warning so it is visible without
        // pretending mobile 90+ was agreed.
        'first-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        // Hard guards on the metrics that must never blow up.
        'largest-contentful-paint': ['error', { maxNumericValue: 10000 }],
        'total-blocking-time': ['error', { maxNumericValue: 500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        // Contrast had two failures — the 2.21:1 availability pill and the
        // 4.27:1 active blog filter; both are fixed, so this scores 1 today.
        // Kept as a warning, not an error, so a lone future regression is
        // visible without taking the whole gate down.
        'color-contrast': ['warn', { minScore: 1 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci'
    }
  }
}
