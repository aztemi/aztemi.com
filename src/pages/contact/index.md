---
layout: Page
title: Contact Us
---
<div id="md_contact_index">
  <div class="cards">
  <div class="card">

  ### Get in Touch

  <ContactForm action="https://script.google.com/macros/s/AKfycbyTQbtBzht7XhE3LVYOwPgPEEYjkHw4lf0C3J_6Jg/exec" />
  </div>
  <div class="map card">

  ### Office Location

  <router-link to="/pages/contact/" tag="a" class="maplink">

  <ImageFill class="mapimage" src="//unsplash.it/1920/800?image=768">

  <span class="address">

  **AZTemi**\
  <span class="size_l5" v-html="tr('businessAddress')"></span>

  </span>

  </ImageFill>

  </router-link>


  </div>
  </div>
</div>


<style lang="stylus">

#md_contact_index
  .cards
    @media $mq_desktop
      --card-width: 45%
  .map
    .maplink
      display: block
      padding: 1rem 0
      .mapimage
        position: relative
        height: 25rem
        .address
          background-color: white
          padding: 0.5rem 1rem
          position: absolute
          top: 20%
          left: 40%
          transform: translateX(-100%)
          color: black
          border-radius: 0.5rem
          line-height: 1rem
          &::after
            position: absolute
            top: 50%
            left: 100%
            transform: translateY(-50%)
            color: white
            $mx_arrow(1rem, left)


</style>
