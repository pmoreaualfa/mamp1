// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  ui: {
    devtools: {
      enabled: false
    }
  },
  css: ['~/assets/css/main.css'],
  ssr: true,
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8888'
          : 'https://votre-production-url.com',
    },
  },
});
