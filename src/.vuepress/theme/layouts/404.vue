<template>
  <LayoutWrapper>
    <div class="content_wrapper">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">Take me home</router-link>.
    </div>
  </LayoutWrapper>
</template>

<script>
import LayoutWrapper from '@theme/components/LayoutWrapper.vue'

const msgs = [
  `We couldn't find the page you requested.`,
  `Page not found.`,
  `That's a Four-Oh-Four.`,
  `This isn't the page you are looking for.`,
  `Oops, nothing here...`
]

export default {
  components: { LayoutWrapper },

  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>


<style lang="stylus">

.content_wrapper
  padding: 2rem
  text-align: center

</style>
