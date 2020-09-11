---
layout:
title: Contact Us
coverimage: /img/unsplash/melinda-gimpel-5Ne6mMQtIdo.jpg
---

## Get in Touch

<div id="md_contact_index">
  <div class="cards">
  <div class="card">

  ### Contact Form

  <ContactForm action="https://script.google.com/macros/s/AKfycbzUvUqtQPuvjCCQlb1O3gGq5B5jhw5rR96SNyEqRJGliYOqqgNQ/exec" />
  </div>
  <div class="map card">

  ### Office Location

  <a href="https://www.google.com/maps/place/AZTemi/@50.2712985,8.6468855,17z/data=!3m1!4b1!4m5!3m4!1s0x47bd07bb198cb27f:0x9c7506d387202ddf!8m2!3d50.2712951!4d8.6490742" class="maplink" target="_blank" rel="noopener noreferrer">

  **AZTemi**\
  <span class="size_l4" v-html="tr('businessAddress')"></span>

  <ImageFill class="imgslide" src="/img/map.png" size="contain" />

  </a>

  </div>
  </div>
</div>


<style lang="stylus">

#md_contact_index
  width: 100%
  .cards
    @media $mq_desktop
      --card-width: 50%
  .map
    .maplink
      color: currentColor
      margin: 0
      img
        width: 100%
        max-height: 25rem
      .imgslide
        width: 100%
        height: 15rem
        @media $mq_tablet
          height: 25rem


</style>
