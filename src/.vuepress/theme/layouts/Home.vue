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
    <div class="catchphrase">
      <h3 class="catchphrase_caption">Bridge the gap between your software ideas and their implementation</h3>
      <router-link to="/pages/contact/" tag="a" class="catchphrase_link">Contact Us</router-link>
    </div>
    <div class="cards">
      <div v-for="(card, index) in cards" :key="index" class="card speaciality">
        <i class="round_icon fa" :class="card.icon" />
        <h3>{{ card.title }}</h3>
        <p v-html="card.caption"></p>
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
          img: 'https://picsum.photos/id/378/1400/800?grayscale',
          title: 'State-of-the-art Software Consulting',
          caption: 'Simple but powerful solutions geared towards boosting the performance of your business'
        },
        {
          img: 'https://picsum.photos/id/304/1400/800?grayscale',
          title: 'Hands-on Project Management Approach',
          caption: 'Working directly with your developers brings unparalleled perspectives to PM methodology and tracking'
        },
        {
          img: 'https://picsum.photos/id/1033/1400/800?grayscale',
          title: 'Software Design and Development, Reimagined',
          caption: 'Complete Development Lifecycle using latest technologies to accelerate projects deployment and time to market'
        },
      ],
      cards: [
        {
          link: '/pages/services/#our-services',
          icon: 'fa-object-group',
          title: 'What We Offer',
          caption: 'Our services include <b>Software Consulting</b>, <b>Project Management</b>, <b>Software Architectural Design</b>, <b>Software Development</b> and <b>Offshore Outsourcing</b>.',
        },
        {
          link: '/pages/services/#target-sectors',
          icon: 'fa-sitemap',
          title: 'Sectors We Serve',
          caption: 'Our solutions and expertise span multiple industries including, but not limited to, <b>IT</b>, <b>Automotive</b>, <b>FinTech</b>, <b>IoT</b>, <b>E-commerce</b>, <b>Outsourcing</b> and <b>Web Design</b>.',
        },
        {
          link: '/pages/services/#technologies',
          icon: 'fa-cogs',
          title: 'Technologies We Use',
          caption: 'We employ <b>Agile</b> development principles and modern toolchains, most of which are <b>open source</b>. These include <b>Qt</b>, <b>Hypervisor</b>, <b>LAMP Stack</b>, <b>JAMstack</b>, <b>PWA</b>, <b>CMS</b> and many more.',
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
    height: 20rem
    @media $mq_desktop
      height: 25rem
      justify-content: flex-start
    .slideCaption
      text-align: center
      padding: 0 3rem
      color: var(--color_background)
      text-shadow: 0.1rem 0.1rem var(--color_secondary)
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

.catchphrase
  display: block
  padding: 1rem
  text-align: center
  .catchphrase_caption
    text-transform: uppercase
    font-weight: 500
  a.catchphrase_link
    display: inline-block
    margin-top: 1.5rem
    font-size: $fs_l
    padding: 0.5rem 3rem
    border: 1px solid currentColor
    border-radius: 0.4rem

.cards
  padding: 0.8rem
  .speaciality
    text-align: center
    padding: 3rem 2rem
    border: solid 1px rgba(144, 144, 144, 0.25)
    border-radius: 0.4rem
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
      margin: 0 0 1.25rem 0

</style>
