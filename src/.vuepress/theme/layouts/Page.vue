<template>
  <LayoutWrapper>
    <div class="content">
        <Content/>
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

.content
  padding: 2rem 1.5rem
  @media $mq_tablet
    padding: 3rem 2rem
  p
    margin: 1rem 0
  h1, h2, h3, h4, h5, h6
    margin-top: 3rem
    &:first-child
      margin-top: 0
    .header-anchor
      margin-left: -.87em
      opacity: 0
    &:hover .header-anchor
      opacity: 1

</style>
