<template>
  <LayoutWrapper>
    <Carousel class="carousel">
      <div v-for="(slide, index) in slides" :key="index">
        <ImageFill class="slide" :src="slide.img"> <!-- overlayColor="rgba(201, 182, 167, 0.3)" -->
          <div class="slideCaption">
            <span class="size_l3">{{ slide.title }}</span>
            <hr />
            <span class="size_l5">{{ slide.caption }}</span>
          </div>
        </ImageFill>
      </div>
    </Carousel>
    <h3 class="catchPhrase">Bridge the gap between your software ideas and realization</h3>
    <div class="cards">
      <div v-for="(card, index) in cards" :key="index" class="card speaciality">
        <i class="round_icon fa" :class="card.icon" />
        <h3>{{ card.title }}</h3>
        <p>{{ card.caption }}</p>
      </div>
    </div>
    <Content />
  </LayoutWrapper>
</template>

<script>
import LayoutWrapper from '@theme/components/LayoutWrapper.vue'
import Carousel from '@theme/components/Carousel.vue'

export default {
  components: { LayoutWrapper, Carousel },

  data() {
    return {
      slides: [
        {
          img: '//unsplash.it/1920/800?image=767',
          title: 'Software Consulting Made Simple',
          caption: 'Simple but powerful steps towards state-of-the-art software solutions'
        },
        {
          img: '//unsplash.it/1920/800?image=768',
          title: 'Best in Class Processes',
          caption: 'Software Project Management with Agile methodogy and tracking'
        },
        {
          img: '//unsplash.it/1920/800?image=769',
          title: 'Complete Software Lifecycle Development',
          caption: 'Over 12 years in the industry brings unparallel, unique experience'
        },
      ],
      cards: [
        {
          icon: 'fa-rocket',
          title: 'Software Consulting',
          caption: ''
        },
        {
          icon: 'fa-puzzle-piece',
          title: 'Project Management',
          caption: ''
        },
        {
          icon: 'fa-bolt',
          title: 'Architectural Design and Development',
          caption: ''
        },
      ]
    }
  },
}

</script>

<style lang="stylus">

.carousel
  @media $mq_tablet
    padding: 0 3rem 2rem 3rem
  .slide
    display: flex
    align-items: center
    justify-content: center
    min-height: 20rem
  .slideCaption
    text-align: center
    hr
      margin: 1rem auto
      width: 40%

.catchPhrase
  display: block
  padding: 1rem
  text-align: center
  text-transform: uppercase
  font-weight: 500

.cards
  padding: 0.8rem
  .speaciality
    text-align: center
    padding: 3rem 2rem
    border: solid 1px rgba(144, 144, 144, 0.25)
    border-radius: 6px
    @media $mq_tablet
      --card-margin: 1rem
      --card-width: 50%
    @media $mq_desktop
      --card-width: 33%
    .round_icon
      display: inline-block
      text-align: center
      height: 5rem
      width: 5rem
      line-height: 5rem
      color: var(--color_on_secondary)
      background: var(--color_secondary)
      border-radius: 100%
      box-shadow: 0 0 0 0.8rem var(--color_on_secondary), 0 0 0 0.9rem var(--color_secondary)
      margin: 0 0 1.25em 0

</style>
