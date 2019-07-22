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
  serviceWorker: true,

  head: [
    ['meta', {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}],
    ['link', { rel: 'icon', href: siteSettings.favicon }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'alternate', href: siteSettings.feed.rss, type: 'application/rss+xml', title: siteSettings.url } ],
    ['link', { rel: 'alternate', href: siteSettings.feed.atom, type: 'application/atom+xml', title: siteSettings.url } ],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kelly+Slab|Montserrat:400,700|Roboto+Slab:400,700|Material+Icons' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }],
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

  locales() {
    return {
      '/': {
        lang: 'en'
      },
      '/posts/ja/': {
        lang: 'ja'
      }
    }
  },

  stylus: {
    preferPathResolver: 'webpack',
    import: [path.resolve(__dirname, './theme/styles/globalStyle.styl')]
  },

  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: 'posts',
          path: '/post/',
          itemPermalink: '/post/:slug',
          itemlayout: 'Page',
          pagination: {
            perPagePosts: 2,
          },
        },
      ],
      frontmatters: [
        {
          id: "tag",
          keys: ['tag', 'tags'],
          path: '/tag/',
          layout: 'Tags',
          frontmatter: { title: 'Tag' },
          itemlayout: 'Tag',
          pagination: {
            perPagePosts: 3
          }
        },
        {
          id: "category",
          keys: ['category', 'categories'],
          path: '/category/',
          layout: 'Categories',
          frontmatter: { title: 'Category' },
          itemlayout: 'Category',
          pagination: {
            perPagePosts: 3
          }
        },
      ]
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
