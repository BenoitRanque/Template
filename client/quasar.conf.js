// Configuration for your app

module.exports = function (ctx) {
  return {
    plugins: [
      'i18n',
      'axios',
      'vuelidate',
      'portal'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          loader: '@kazupon/vue-i18n-loader'
        })
      }
    },
    devServer: {
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        // '/api': 'http://localhost:80'
        '/api/**': {
          target: 'http://localhost:80',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      },
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      i18n: 'es',
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QPageSticky',
        'QToolbar',
        'QToolbarTitle',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QBtn',
        'QBtnGroup',
        'QIcon',
        'QField',
        'QInput',
        'QChipsInput',
        'QSelect',
        'QCheckbox',
        'QToggle',
        'QDatetime',
        'QColor',
        'QProgress',
        'QModal',
        'QModalLayout',
        'QTooltip',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QTable',
        'QTableColumns',
        'QTr',
        'QTd',
        'QTh',
        'QSearch',
        'QSlideTransition'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      plugins: [
        'Notify',
        'Loading',
        'Dialog'
      ]
    },
    // animations: 'all' --- includes all animations
    animations: [
      'bounceInLeft',
      'bounceOutRight'
    ],
    pwa: {
      cacheExt: 'js,html,css,woff,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0-beta.4'
  }
}
