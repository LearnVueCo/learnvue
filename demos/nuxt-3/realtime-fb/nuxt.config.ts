// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-vuefire'],

  vuefire: {
    admin: {
      serviceAccount: 'service-account.json'
    },
    auth: true,
    config: {
      apiKey: 'AIzaSyCohKcDCZN46Ww7XqCvIACZ50CT9JQTSn4',
      authDomain: 'learnvue-fb-7e90d.firebaseapp.com',
      projectId: 'learnvue-fb-7e90d',
      storageBucket: 'learnvue-fb-7e90d.appspot.com',
      messagingSenderId: '554015082983',
      appId: '1:554015082983:web:3ea6171b8dcce8dce9d542'
    }
  }
})
