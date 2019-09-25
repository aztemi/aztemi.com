import Store from 'store'
import VueMeta from 'vue-meta'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(VueI18n)
  Vue.use(Vuex)
  Vue.use(VueMeta, { refreshOnceOnNavigation: true })

  // Add more functions to our custom global variable in themeConfig
  updateCustomVariable(siteData)

  // add global mixins
  addGlobalMixin(Vue)
}

function updateCustomVariable(siteData) {
  let gCustom = siteData.themeConfig.custom

  // i18n handling
  const i18n = new VueI18n({
    locale: Store.get('DefaultLanguage') || gCustom.siteSettings.default_language,
    fallbackLocale: gCustom.siteSettings.fallback_language,
    messages: gCustom.langMsgs
  })

  gCustom.i18n = i18n
  gCustom.getCurrentLanguage = function() { return gCustom.i18n.locale.split('-')[0] }
  gCustom.setCurrentLanguage = function(lang) {
    gCustom.i18n.locale = lang
    Store.set('DefaultLanguage', lang)
  }

  // path handling
  gCustom.absPathFromSrc = function(path) { return util.srcPath + path }

  // Vuex Store
  gCustom.VuexStore = getVuexStoreObj()

  // local storage
  gCustom.Store = Store

  // theme handling
  let persistedDarkThemeValue = (typeof Store.get('DarkTheme') === "undefined") ? false : Store.get('DarkTheme')
  gCustom.VuexStore.commit('SET_IsDarkTheme', persistedDarkThemeValue)

  // console.log('gCustom:', gCustom)
}

function addGlobalMixin(Vue) {
  Vue.mixin({
    computed: {
      siteName() {
        return this.$themeConfig.custom.siteSettings.name
      },
      currentLanguage() {
        var lang = this.$themeConfig.custom.getCurrentLanguage()
        this.$page.frontmatter.lang = lang
        return lang
      }
    },
    methods: {
      tr(s) {
        return this.$themeConfig.custom.i18n.t(s)
      },
      createHttpRequest(method, action) {
        var xhr = new XMLHttpRequest()
        if ("withCredentials" in xhr) {
          xhr.open(method, action, true)
        } else if (typeof XDomainRequest != "undefined") {
          // for IE
          xhr = new XDomainRequest()
          xhr.open(method, action)
        } else {
          // CORS not supported
          xhr = null
        }
        return xhr;
      }
    },
    metaInfo() {
      var vm = this
      var getPageTitle = function() {
        return vm.$page.frontmatter.title || vm.tr('title')
      }
      var getPageDescription = function() {
        vm.$page.frontmatter.description = vm.$page.frontmatter.description || vm.tr('description')
        return vm.$page.frontmatter.description
      }
      var getPageKeywords = function() {
        return vm.$page.frontmatter.keywords || vm.tr('keywords')
      }
      var getCanonicalUrl = function() {
        return vm.$themeConfig.custom.siteSettings.url + vm.$page.regularPath
      }
      var getPageImage = function() { // Todo
        return vm.$themeConfig.custom.siteSettings.url + '/android-icon-192x192.png'
      }
      return {
        title: getPageTitle(),
        htmlAttrs: {
          lang: this.currentLanguage,
        },
        headAttrs: {
          prefix: 'og: http://ogp.me/ns#',
        },
        meta: [
          { name: 'description', content: getPageDescription() },
          { name: 'keywords', content: getPageKeywords() },
          { name: 'canonical', content: getCanonicalUrl() },
          { 'property': 'og:site_name', 'content': this.$themeConfig.custom.siteSettings.url },
          { 'property': 'og:type', 'content': 'website' }, // Todo
          { 'property': 'og:locale', 'content': this.currentLanguage },
          { 'property': 'og:url', 'content': getCanonicalUrl() },
          { 'property': 'og:title', 'content': getPageTitle() },
          { 'property': 'og:description', 'content': getPageDescription() },
          { 'property': 'og:image', 'content': getPageImage() },
          { 'property': 'og:updated_time', 'content': this.$page.lastUpdated }, // Todo
          { 'property': 'twitter:card', 'content': 'summary' },
          { 'property': 'twitter:title', 'content': getPageTitle() },
          { 'property': 'twitter:description', 'content': getPageDescription() },
          { 'property': 'twitter:image', 'content': getPageImage() },
        ]
      }
    },
  })
}

function getVuexStoreObj() {
  const VuexStore = new Vuex.Store({
    state: {
      isDarkTheme: false,
      isSidenavOpen: false
    },
    getters: {
      getIsDarkTheme(state) {
        return state.isDarkTheme
      },
      getIsSidenavOpen(state) {
        return state.isSidenavOpen
      }
    },
    mutations: {
      SET_IsDarkTheme(state, isDark) {
        state.isDarkTheme = isDark
        Store.set('DarkTheme', isDark)
      },
      SET_IsSidenavOpen(state, isOpen) {
        state.isSidenavOpen = isOpen
      }
    },
    actions: {
      SET_IsDarkTheme(context, isDark) {
        context.commit('SET_IsDarkTheme', isDark)
      },
      SET_IsSidenavOpen(context, isOpen) {
        context.commit('SET_IsSidenavOpen', isOpen)
      }
    }
  })

  return VuexStore
}
