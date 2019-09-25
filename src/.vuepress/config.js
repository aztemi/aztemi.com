const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')


// get the absolute path of src directory
const srcPath = path.resolve(__dirname + '/../') + '/'

// Read the configuration yaml file
const siteSettings = loadYamlFile(srcPath + '_config.yml')

// load all translation yaml files
const langMsgs = {}
if (siteSettings.supported_languages) {
  siteSettings.supported_languages.forEach(locale => {
    langMsgs[locale] = loadYamlFile(`${srcPath}languages/${locale}.yml`)
  })
}

// combine all in an object that will be made global through themeConfig
let gCustom = {
  srcPath,
  siteSettings,
  langMsgs
}

// Usual VuePress entry point
module.exports = ctx => ({
  extend: '@vuepress/theme-default',
  dest: 'build',

  title: siteSettings.name,

  head: [
    ['meta', {'http-equiv': 'X-UA-Compatible', content: 'IE=Edge,chrome=1'}],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#2b2a2b' }],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' }],
    ['meta', { name: 'theme-color', content: '#9a0000' }],
    ['link', { rel: 'alternate', href: siteSettings.feed.rss, type: 'application/rss+xml', title: siteSettings.url } ],
    ['link', { rel: 'alternate', href: siteSettings.feed.atom, type: 'application/atom+xml', title: siteSettings.url } ],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kelly+Slab|Montserrat:400,700|Roboto+Slab:400,700|Material+Icons' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/v4-shims.min.css' }],
  ],

  themeConfig: {
    // include my custom global object here
    custom: gCustom,
    nav: [
      { text: 'menu.home', link: '/', class: 'home_nav' },
      { text: 'menu.services', link: '/pages/services/' },
      { text: 'menu.contact', link: '/pages/contact/' },
    ]
  },

  stylus: {
    preferPathResolver: 'webpack',
    import: [path.resolve(__dirname, './theme/styles/globalStyle.styl')]
  },

  plugins: [
    ['@vuepress/nprogress', true],
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', {
      selector: 'img.medium_zoom'
    }],
    ['@vuepress/google-analytics', {
      'ga': siteSettings.google_analytics
    }],
  ]
})

// Loads a YAML file into an object
function loadYamlFile(file) {
  let obj = {}
  try {
    obj = yaml.safeLoad(fs.readFileSync(path.resolve(file), 'utf8'))
  } catch (e) {
    console.log(e)
  }
  return obj
}
