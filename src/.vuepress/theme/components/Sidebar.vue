<template>
  <div class="navmenu" :class="{sidebar_open: isSideNavOpen}">
    <ul>
      <template v-for="(menu, index) in sideMenu">
        <li :key="index">
          <router-link :to="menu.link" tag="a" class="btn">{{ tr(menu.text) }}</router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>

export default {
  computed: {
    sideMenu() {
      return this.$themeConfig.nav
    },
    isSideNavOpen() {
      return this.$themeConfig.custom.VuexStore.getters.getIsSidenavOpen
    }
  }
};
</script>

<style lang="stylus">

.navmenu
  position: relative
  transform: scale(1, 0)
  transform-origin: top
  transition: transform 500ms ease-in-out
  z-index: 15
  @media $mq_tablet
    display: none
  ul
    background-color: var(--color_background)
    position: absolute
    top: 0
    right: 0
    text-transform: uppercase
    margin: 0
    padding: 0
    box-shadow: -0.5rem 0.5rem 0.5rem 0px rgba(0,0,0,0.2)
    li + li
      border-top: 1px solid var(--color_primary)
    li
      display: block
      margin: 0
      padding: 0
      a
        padding: 1.5rem 3rem
        color: var(--color_primary)
        &.router-link-exact-active
          background-color: var(--color_primary)
          color: var(--color_on_primary)
  &.sidebar_open
    transform: scale(1,1)

</style>
