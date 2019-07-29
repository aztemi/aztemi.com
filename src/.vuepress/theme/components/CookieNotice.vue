<template>
  <div class="cookienotice" v-if="!cookieAccepted">
    <span class="cookie_msg">This website uses cookies to ensure you get the best experience on our website. You can see our <router-link to="/pages/policy/privacy" tag="a">{{ tr('policy.privacy') }}</router-link> for more details.</span>
    <span class="cookie_btn"><button class="accent_btn" @click.prevent="acceptCookiePolicy()">Got it!</button></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieAccepted: false
    }
  },
  mounted() {
    let Store = this.$themeConfig.custom.Store
    this.cookieAccepted = (typeof Store.get('cookieAccepted') === "undefined") ? false : Store.get('cookieAccepted')
    // ToDo. Remove below line. Only for testing purpose
    // this.cookieAccepted = false
  },
  methods: {
    acceptCookiePolicy() {
      this.cookieAccepted = true
      this.$themeConfig.custom.Store.set('cookieAccepted', true)
      return false
    }
  }
}
</script>

<style lang="stylus">

.cookienotice
  display: block
  padding: 0.8rem 1rem
  background-color: var(--color_primary)
  color: var(--color_on_primary)
  .cookie_msg
    display: block
    a
      color: currentColor
      text-decoration: underline
  .cookie_btn
    display: block
    margin-top: 1rem
    padding: 0.5rem 0
    text-align: right
    .accent_btn
      display: inline-block
      width: 100%
      @media $mq_tablet
        width: auto

</style>
