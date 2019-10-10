<template>
  <div id="site" class="site" :class="{site_theme_dark: isDarkTheme}" :dark=isDarkTheme>
    <div class="site_wrapper">
      <nav class="site_nav sticky">
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

  mounted() {
    this.$router.afterEach(() => {
      this.$themeConfig.custom.VuexStore.dispatch('SET_IsSidenavOpen', false)
    });
  },
  beforeDestroy () {
    this.$themeConfig.custom.VuexStore.dispatch('SET_IsSidenavOpen', false)
  },
  computed: {
    isDarkTheme() {
      return this.$themeConfig.custom.VuexStore.getters.getIsDarkTheme
    }
  },
};
</script>

<style lang="stylus">

@import "../styles/colorTheme"
@import "../styles/base.styl"

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
          margin-top: 3.5rem
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
