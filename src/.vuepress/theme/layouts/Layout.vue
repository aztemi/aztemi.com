<template>
  <LayoutWrapper>
    <div class="content_wrapper">
      <ImageFill class="topimg" src="//unsplash.it/1920/800?image=767"> <!-- overlayColor="rgba(201, 182, 167, 0.3)" -->
      </ImageFill>
      <Content class="theme_content" />
    </div>
  </LayoutWrapper>
</template>

<script>
import LayoutWrapper from '@theme/components/LayoutWrapper.vue'

export default {
  components: { LayoutWrapper },
}
</script>


<style lang="stylus">

.content_wrapper
  position: relative
  width: 100%
  margin-top: 15rem
  @media $mq_desktop
    margin-top: 20rem
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
    padding: 0 1.5rem
    @media $mq_tablet
      padding: 0 2rem
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
        opacity: 0
      &:first-child .header-anchor
        margin-top: 0
        font-size: 1px

</style>
