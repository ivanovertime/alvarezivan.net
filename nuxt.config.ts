// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-og-image',
    'nuxt-schema-org'
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
        '/sitemap.xml',
        '/rss.xml'
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
  }
})
