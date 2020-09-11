<template>
  <LayoutWrapper>
    <div class="content_wrapper">
      <ImageFill class="topimg" :src="topImage" />
      <Content class="theme_content" />
    </div>
  </LayoutWrapper>
</template>

<script>
import LayoutWrapper from '@theme/components/LayoutWrapper.vue'

export default {
  components: { LayoutWrapper },
  computed: {
    topImage() {
      return this.$page.frontmatter.coverimage || '/img/picsum/516-1400x800.jpg'
    }
  },
}
</script>


<style lang="stylus">

.content_wrapper
  position: relative
  width: 100%
  margin-top: 15rem
  @media $mq_desktop
    margin-top: 25rem
  @media $mq_short
    margin-top: 8rem
  .topimg
    background-color: var(--color_primary_variant)
    width: 100%
    height: 30rem
    position: fixed
    top: 0
    left: 0
  .theme_content
    background-color: var(--color_background)
    position: relative
    padding: 0 1.5rem 2rem 1.5rem
    @media $mq_tablet
      padding: 0 2rem 3rem 2rem
    p
      margin: 1rem 0
      color: var(--color_on_background)
    h1, h2, h3, h4, h5, h6
      .header-anchor
        display: block
        position: relative
        margin-top: -3rem
        padding-top: 3rem
        margin-left: -.87em
        color: var(--color_background)
        opacity: 0
      &:first-child .header-anchor
        margin-top: 0
        font-size: 1px

</style>
