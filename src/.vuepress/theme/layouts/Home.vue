<template>
  <LayoutWrapper>
    <Carousel class="carousel">
      <div v-for="(slide, index) in slides" :key="index">
        <ImageFill class="slide" :src="slide.img"> <!-- overlayColor="rgba(201, 182, 167, 0.3)" -->
          <div class="slideCaption">
            <div class="slide_title">{{ slide.title }}</div>
            <!-- <hr /> -->
            <div class="slide_subtitle">{{ slide.caption }}</div>
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
        <router-link :to="card.link" tag="a" class="more_link">Learn More</router-link>
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
          caption: 'Simple but powerful steps towards state-of-the-art software solutions. Trans'
        },
        {
          img: '//unsplash.it/1920/800?image=768',
          title: 'Best in Class Processes',
          caption: 'Software Project Management with Agile methodogy and tracking. Transform your business, become a key player in the digital world'
        },
        {
          img: '//unsplash.it/1920/800?image=769',
          title: 'Software Design and Development, Reimagined.',
          caption: 'Complete Software Lifecycle Development, Over 12 years in the industry brings unparallel, unique experience'
        },
      ],
      cards: [
        {
          link: '/pages/services',
          icon: 'fa-object-group',
          title: 'Solutions & Services',
          caption: 'Empowering you and your teams to achieve more through the solutions and major services we offer. These include Software Consulting, Project Management, Software Architectural Design and Development.',
        },
        {
          link: '/pages/services',
          icon: 'fa-sitemap',
          title: 'Sectors & Segments',
          caption: 'Multiple years of software development experience give us exposure to several industries. Our projects are in automotive in-vehicle infotainment (IVI), FinTech, Online solutions and internet of things (IoT).',
        },
        {
          link: '/pages/services',
          icon: 'fa-cogs',
          title: 'Specialities & Setups',
          caption: 'We work like you do. By using similar technologies and toolchains that your teams already know and love, we can get to business smoothly with lower onboarding effort.',
        },
      ]
    }
  },
}

/*
  Empowering you to achieve more

  Bridge the gap between your software ideas and realization




*/

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
    @media $mq_desktop
      min-height: 25rem
      justify-content: flex-start
    .slideCaption
      text-align: center
      padding: 0 3rem
      color: var(--color_background)
      @media $mq_desktop
        text-align: left
      .slide_title
        font-size: $fs_l
        @media $mq_desktop
          font-size: $fs_xl
      .slide_subtitle
        margin-top: 1.5rem
        @media $mq_desktop
          font-size: $fs_m
      hr
        margin: 1rem auto
        width: 40%
        height: 1px

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
    h3
      margin: 1rem 0 2rem 0
    p
      color: var(--color_on_background)
    a.more_link
      display: block
      margin-top: 1.5rem
      font-size: $fs_l
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
