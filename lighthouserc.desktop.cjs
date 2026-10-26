// Lighthouse CI gate — desktop, on the home page only.
//
// Desktop is where the site earns a real performance score (96 measured), so
// the bar here is a genuine one rather than the mobile floor-guard.
module.exports = {
  ci: {
    collect: {
      url: ['http://127.0.0.1:4174/'],
      startServerCommand: 'node scripts/serve-dist.mjs',
      startServerReadyPattern: 'serve-dist listening',
      startServerReadyTimeout: 20000,
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage'
      }
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:performance': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci'
    }
  }
}
