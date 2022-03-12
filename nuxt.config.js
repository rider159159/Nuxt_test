export default {
  // env:{
  //   firebaseApiKey: "AIzaSyBpyaspqWf2iWyLz23KzyF3MtXDE6TnwS4"
  // },

  serverMiddleware: [
    { path: '/api', handler: '~/server/api.js' },
    { path: '/auth', handler: '~/server/auth.js' },

  ],
  buildModules: [
    ["@nuxtjs/dotenv", {filename: ".env." + process.env.NODE_ENV}]
  ],


  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/proxy'
  ],
  // axios: {
  //   proxy: true
  // },
  // proxy: [
  //   'http://localhost:3034/api'
  // ],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'newNuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // router: {
  //   base: '/<newNuxt>/'
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '~/assets/scss/main.scss'
  ]
,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/datepicker.js', mode: 'client' },
    { src: '~/plugins/bootstrap.js', mode: 'client'},
    { src: '~/plugins/qs.js'},
    { src: '~/plugins/axios.js'},

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: [
  //   '@nuxtjs/axios',

  // ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { 
    loaders:{
      imgUrl:{
        limit:100000,
      }
    },
    extend (config, ctx) {
        console.log(config.module.rules); //查看現在的 loader
    }
  } 
}
