// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { ssr: false },
    '/livestreams/:id': { ssr: false },
  },
  spaLoadingTemplate: "./spa-loading-template.html",
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  runtimeConfig: {
    public: {
      API: process.env.API
    }
  },
  app: {
    head: {
      title: 'Cart & Tell',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' }
      ],
    }
  },
  tailwindcss: {
    configPath: '~/tailwind.config.js',
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@vueuse/nuxt',
  ]
})


