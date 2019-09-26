<template>
  <div class="top_navbar">
    <span class="logo">
      <router-link to="/" tag="a">AZTemi</router-link>
    </span>
    <ul>
      <template v-for="(menu, index) in sideMenu">
        <li :key="menu.link">
          <router-link :to="menu.link" tag="a" class="flat_btn" :class="menu.class || ''">{{ tr(menu.text) }}</router-link>
        </li>
      </template>
    </ul>
    <SidebarIcon class="sidebaricon" />
  </div>
</template>

<script>
import SidebarIcon from "@theme/components/SidebarIcon.vue"

export default {
  components: { SidebarIcon },

  computed: {
    sideMenu() {
      return this.$themeConfig.nav
    },
  },
};
</script>

<style lang="stylus">

.top_navbar
  padding: 0 1rem
  text-align: left
  display: flex
  align-items: center
  justify-content: space-between
  .logo
    font-size: $fs_xxl
    font-family: var(--font_face_logo)
    a
      color: currentColor
      font-weight: normal !important
  ul
    text-transform: uppercase
    display: none
    @media $mq_tablet
      display: initial
    li
      display: inline-block
      a
        color: var(--color_on_primary)
        &.router-link-exact-active
          background-color: var(--color_primary)
          border-radius: 0.3rem
        &:hover, &:focus
          border-bottom: 1px solid var(--color_primary)
      .home_nav
        display: none
        @media $mq_desktop
          display: initial
  .sidebaricon
    @media $mq_tablet
      display: none

</style>
