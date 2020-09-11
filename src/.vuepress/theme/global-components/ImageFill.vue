<template>
  <div class="imagefill" v-if="src">
    <div class="imgdiv"><img :src="src" alt="" :key="src" /></div>
    <div class="overlay" :style="{ backgroundColor: overlayColor }" v-if="overlayColor.toLowerCase() != 'transparent'" />
    <div class="content"><slot /></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
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
  .imgdiv
  .content
  .overlay
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
  .imgdiv img
    width 100%
    height 100%
    object-fit: cover
  .content
    position relative

</style>
