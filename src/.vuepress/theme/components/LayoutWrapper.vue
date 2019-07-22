<template>
  <div id="site" class="site" :class="{site_theme_dark: isDarkTheme}" :dark=isDarkTheme>
    <div class="site_wrapper">
      <nav id="site_nav" class="site_nav sticky" :class="{sticky: enableSticky, slideInDown2: enableSticky}">
        <div class="section_wrapper">
          <Navbar />
          <Sidebar />
        </div>
      </nav>
      <main class="site_main">
        <div class="section_wrapper">
          <slot />
        </div>
      </main>
      <footer class="site_footer_top">
        <div class="section_wrapper">
          <FooterTop />
        </div>
      </footer>
      <footer class="site_footer">
        <div class="section_wrapper">
          <Footer />
          <CookieNotice class="cookienotice slideInUp" />
        </div>
      </footer>
    </div>

    <div style="width:95%;font-size:1rem" class="invisible">
      Test All Routes. $localePath = {{$localePath}},  $lang = {{$lang}}
      <ul>
        <router-link
          v-for="page in this.$site.pages"
          :key="page.key"
          :to="page.regularPath"
          tag="li"
        >
          <span class="btn">
            {{ (page.title || '') + ', Path: ' + page.path
            + ', regularPath: ' + page.regularPath
              + ', relativePath: ' + page.relativePath
              + ', Lang: ' + page.lang }}
          </span>
        </router-link>
      </ul>
    </div>

  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue"
import Sidebar from "@theme/components/Sidebar.vue"
import Footer from "@theme/components/Footer.vue"
import FooterTop from "@theme/components/FooterTop.vue"
import CookieNotice from "@theme/components/CookieNotice.vue"

export default {
  components: { Navbar, Sidebar, Footer, FooterTop, CookieNotice },

  data() {
    return {
      enableSticky: false,
      navbarPosY: 0
    }
  },
  mounted() {
    var site_nav = document.getElementById('site_nav')
    if (site_nav) this.navbarPosY = site_nav.offsetTop
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy () {
    this.$themeConfig.custom.VuexStore.dispatch('SET_IsSidenavOpen', false)
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  computed: {
    isDarkTheme() {
      return this.$themeConfig.custom.VuexStore.getters.getIsDarkTheme
    }
  },
  methods: {
    handleScroll() {
      var site_nav = document.getElementById("site_nav")
      if (site_nav)
        this.enableSticky = (window.pageYOffset >= this.navbarPosY)
    }
  },
};
</script>

<style lang="stylus">

.site
  .site_wrapper
    font-family: var(--font_face_default)
    position: relative
    padding: 0
    width: 100%
    min-height: 100vh
    display: flex
    flex-direction: column
    justify-content: space-around
    .cookienotice
      font-size: $fs_s
      z-index: 100
      position: fixed
      bottom: 0
      width: 100%
      max-width: $site_max_width
    .section_wrapper
      max-width: $site_max_width
      margin: 0 auto
      width: 100%
      display: block
      position: relative
      i
        font-size: $fs_l
    .site_nav_top
      background-color: var(--color_primary_variant)
      color: var(--color_on_primary)
    .site_nav
      background-color: var(--color_secondary)
      color: var(--color_on_secondary)
      border-bottom: 1px solid var(--color_primary)
      width: 100%
      margin: 0 auto
      &.sticky
        z-index: 10
        position: fixed
        top: 0
        & + .site_main
          margin-top: 4rem
          // margin-top: 19rem
      a
        font-weight: 700
    .site_main
      flex: 1
      background-color: var(--color_background)
      a, .link
        color: var(--color_secondary)
    .site_footer_top
      background-color: var(--color_primary_variant)
      color: var(--color_on_primary_variant)
      a
        color: var(--color_on_primary_variant)
    .site_footer
      background-color: var(--color_primary)
      color: var(--color_on_primary)

</style>
