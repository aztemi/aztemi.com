<template>
  <span class="flat_btn sidebaricon_menu" :class="{sidebaricon_cross: isSideNavOpen}" @click="toggleSidenavOpen()">
    <span></span>
  </span>
</template>

<script>

export default {
  computed: {
    isSideNavOpen() {
      return this.$themeConfig.custom.VuexStore.getters.getIsSidenavOpen
    }
  },
  methods: {
    toggleSidenavOpen() {
      this.$themeConfig.custom.VuexStore.dispatch('SET_IsSidenavOpen', !this.isSideNavOpen)
    }
  }
};
</script>

<style lang="stylus">

.sidebaricon_menu
  & span,
  & span::before,
  & span::after
    content: ''
    display: block
    height: 3px
    width: 1.75rem
    border-radius: 3px
    background-color: currentColor
    transition: transform ease-in-out 500ms
  & span::before
    transform: translateY(-6px)
  & span::after
    transform: translateY(3px)
.sidebaricon_cross
  & span
    transform: rotate(45deg)
  & span::before
    transform: rotate(90deg)
  & span::after
    transform: translateY(-3px) rotate(-90deg)

</style>
