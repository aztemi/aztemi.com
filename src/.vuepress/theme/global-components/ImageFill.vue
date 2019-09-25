<template>
  <div class="imagefill" v-if="src" :style="{ backgroundImage: 'url(' + src + ')', backgroundSize: size }">
    <span class="overlay" :style="{ backgroundColor: overlayColor }" v-if="overlayColor.toLowerCase() != 'transparent'" />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'cover'
    },
    overlayColor: {
      default: 'transparent'
    }
  },
}

</script>

<style lang="stylus">

.imagefill
  position: relative
  background-repeat: no-repeat
  background-position: center
  display: inline-block
  width: 100%
  .overlay
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0

</style>
