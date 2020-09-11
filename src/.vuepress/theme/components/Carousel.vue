<template>
  <div class="carousel" ref="carousel_ref" v-show="slidesCount">
    <!-- Slides. Only children with specified tagName are considered -->
    <div class="slot" @mouseover="pauseAutoPlay(true)" @mouseleave="pauseAutoPlay(false)">
      <slot />
    </div>
    <!-- Next and previous buttons -->
    <span class="flat_btn prev" @click="nextSlide(-1)" v-if="showNavigation"><i class="fa fa-chevron-left" /></span>
    <span class="flat_btn next" @click="nextSlide(1)" v-if="showNavigation"><i class="fa fa-chevron-right" /></span>
    <!-- AutoPlay buttons -->
    <span class="flat_btn autoplay" v-if="showPlay" @click="toggleAutoPlay()">
      <i class="fa fa-play-circle" :class="{invisible: this.isAutoPlay}" />
      <i class="fa fa-pause-circle" :class="{invisible: !this.isAutoPlay}" />
    </span>
    <!-- Pagination dots -->
    <div class="dots" v-if="showDots">
      <span class="dot" v-for="(slide, index) in slides" :key="index" @click="setCurrentSlide(index)">
      <span :class="{active: index == activeSlide}" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showNavigation: {
      type: Boolean,
      default: true
    },
    showDots: {
      type: Boolean,
      default: true
    },
    showPlay: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoPlayInterval: {
      type: Number,
      default: 20000
    },
    slidesTagName: {
      type: String,
      default: 'div'
    }
  },

  data() {
    return {
      activeSlide: 0,
      draging: false,
      touchStartPosX: 0,
      isAutoPlay: this.autoPlay,
      autoPlayPaused: !this.autoPlay,
      slides: []
    }
  },

  mounted() {
    if (this.$refs['carousel_ref']) this.$refs['carousel_ref'].addEventListener('touchstart', this.handleTouchStart)
    this.getAllSlides()
    this.updateSlidesClass(this.activeSlide, 0)
    this.setRecursiveTimer()
  },
  beforeDestroy () {
    if (this.$refs['carousel_ref']) this.$refs['carousel_ref'].removeEventListener('touchstart', this.handleTouchStart)
  },

  computed: {
    slidesCount() {
      return this.slides.length
    },
  },
  methods: {
    getAllSlides() {
      if (this.$slots && this.$slots.default) {
        this.slides = this.$slots.default.filter(
          slot =>
            slot.tag &&
            slot.tag.toLowerCase().includes(this.slidesTagName.toLowerCase()) !== null
        )
      }
    },
    updateSlidesClass(activePos, direction) {
      this.slides.forEach((slide, index) => {
        if (slide.elm) {
          slide.elm.classList.remove('inactive', 'from_right', 'from_left')
          if (activePos != index) slide.elm.classList.add('slide', 'inactive', direction < 0 ? 'from_right' : 'from_left')
          else slide.elm.classList.add('slide', direction < 0 ? 'from_left' : 'from_right')
        }
      })
    },
    setCurrentSlide(pos) {
      // decide the direction
      var direction = Math.sign(pos - this.activeSlide)
      // prevent over- / underflow
      if (pos >= this.slides.length) pos = 0
      if (pos < 0) pos = this.slides.length - 1
      // emit and update active slide position
      this.$emit("active_slide_changed", { position: pos, direction: direction })
      this.activeSlide = pos
      // update classes of slot slides
      this.updateSlidesClass(pos, direction)
    },
    nextSlide(inc) {
      this.setCurrentSlide(this.activeSlide + inc)
    },
    toggleAutoPlay() {
      this.isAutoPlay = !this.isAutoPlay
      this.autoPlayPaused = !this.isAutoPlay
      this.setRecursiveTimer()
    },
    pauseAutoPlay(pauseReq) {
      if (pauseReq || this.isAutoPlay) {
        this.autoPlayPaused = pauseReq
      }
    },
    setRecursiveTimer() {
      if (this.isAutoPlay && (this.slidesCount > 1)) {
        var vm = this
        setTimeout(function () {
          vm.autoPlayPaused || vm.draging || !vm.isAutoPlay || vm.nextSlide(1)
          vm.setRecursiveTimer()
        }, this.autoPlayInterval)
      }
    },
    handleTouchStart(e) {
      // e.preventDefault()
      this.draging = true
      this.touchStartPosX = e.touches[0].clientX
      document.addEventListener('touchend', this.handleTouchEnd)
    },
    handleTouchEnd(e) {
      if (this.draging) {
        var dragSpanX = e.changedTouches[0].clientX - this.touchStartPosX
        if (Math.abs(dragSpanX) > 50) this.nextSlide(Math.sign(-dragSpanX))
      }
      this.draging = false
      document.removeEventListener('touchend', this.handleTouchEnd)
    }
  },

}
</script>

<style lang="stylus">

.carousel
  --color_carousel_primary: var(--color_accent)
  --color_carousel_dot: var(--color_on_primary_variant)
  --color_carousel_dot_active: var(--color_accent)
  color: var(--color_carousel_primary)
  position: relative
  width: 100%
  padding: 0
  .slot
    position: relative
    width: 100%
    height: 100%
    .slide
      width: 100%
      transform: scaleX(1)
      transition: transform 500ms ease-in-out
      &.from_right
        transform-origin: right
      &.from_left
        transform-origin: left
      &.inactive
        transform: scaleX(0)
        position: absolute
        top: 0
        left: 0
  .prev, .next
    position: absolute
    top: 50%
    padding: 2rem
    transform: translateY(-50%)
  .prev
    left: 0
    padding-left: 1 rem
  .next
    right: 0
    padding-right: 1 rem
  .autoplay
    position: absolute
    bottom: 0
    right: 0
    padding: 1rem
  .dots
    position: absolute
    bottom: 0
    left: 50%
    transform: translateX(-50%)
    text-align: center
    .dot
      display: inline-block
      padding: 0.5rem
      span
        cursor: pointer
        height: 0.7rem
        width: 0.7rem
        display: inline-block
        border-radius: 50%
        background-color: var(--color_carousel_dot)
        &.active
          background-color: var(--color_carousel_dot_active)

</style>
