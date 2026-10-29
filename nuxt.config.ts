// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-schema-org',
    'nuxt-og-image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://alvarezivan.net',
    name: 'Iván Álvarez'
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://alvarezivan.net'
    }
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      routes: [
        '/',
        '/es',
        '/es/about',
        '/es/blog',
        '/es/contact',
        '/es/now',
        '/es/uses',
        '/sitemap.xml',
        '/rss.xml',
        '/es/rss.xml',
        '/search.json'
      ],
      crawlLinks: true,
      // Emit `dist/about.html` instead of `dist/about/index.html`.
      // Stops Cloudflare Pages from 308-redirecting `/about` -> `/about/`
      // and avoids trailing-slash mismatches that 404 on hard reload.
      autoSubfolderIndex: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    experimental: {
      // Generate `.nuxt/types/i18n-messages.d.ts` from the default locale catalogue
      // on dev-server run, so a misspelled `t()` key fails type checks in dev/IDE
      // instead of rendering as literal text. (v10 generates this in dev only — CI
      // `nuxt typecheck` does not reference it; the locale codes are still typed.)
      typedOptionsAndMessages: 'default'
    },
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' }
    ]
  },

  image: {
    // Cloudflare Pages serves static assets only, so there is no sharp at
    // runtime: the `ipx` provider would emit /_ipx/... URLs that 404 in
    // production. `ipxStatic` generates every variant at build time instead.
    // `ipxStatic` is build-time only, though — in `nuxt dev` nothing generates
    // the variants, so every transformed image 404s and renders as broken.
    // Dev uses the runtime `ipx` provider (sharp ships in node_modules);
    // production builds run with NODE_ENV=production and stay `ipxStatic`.
    provider: process.env.NODE_ENV === 'development' ? 'ipx' : 'ipxStatic',
    quality: 80
  },

  ogImage: {
    // Disable all runtime generation — images are prerendered at build time.
    // This avoids Cloudflare Pages edge incompatibilities (no node:stream).
    zeroRuntime: true
  }
})
