<template>
  <div class="footer_top_wrapper cards">
    <div class="card logo size_l3">
      <ul>
        <li><router-link to="/" tag="a"><img src="/img/logo.png" alt="AZTemi" /></router-link></li>
      </ul>
    </div>
    <div class="card">
      <ul>
        <h4 class="title">{{ siteName }}</h4>
        <li><router-link to="/pages/services" tag="a">{{ tr('menu.services') }}</router-link></li>
        <li><router-link to="/pages/contact/" tag="a">Contact Us</router-link></li>
        <li><router-link to="/pages/policy/privacy" tag="a">{{ tr('policy.privacy') }}</router-link></li>
        <li><router-link to="/pages/policy/imprint/" tag="a">{{ tr('policy.imprint') }}</router-link></li>
      </ul>
    </div>
    <div class="card social">
      <ul>
        <h4 class="title">{{ tr('menu.follow') }}</h4>
        <router-link to="" tag="a"><i class="fa fa-twitter" /></router-link>
        <router-link to="" tag="a"><i class="fa fa-facebook-official" /></router-link>
        <router-link to="" tag="a"><i class="fa fa-linkedin-square" /></router-link>
        <a href="mailto:?to=webmaster[at]aztemi.com"><i class="fa fa-envelope-o" /></a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">

.footer_top_wrapper
  padding: 1rem 0
  .card
    padding: 0
    text-align: left
    justify-self: left
    align-self: left
    @media $mq_tablet
      --card-width: 50%
    @media $mq_desktop
      --card-width: 33%
    .title
      text-transform: uppercase
      font-weight: 700
      margin-bottom: 0.5rem
      color: var(--color_primary)
    a + a
      margin-left: 0.8rem
    li a
      line-height: 2rem
      text-transform: capitalize
      @media $mq_tablet
        line-height: initial
      &:hover, &:focus
        text-decoration: underline
  .logo
    display: none !important
    @media $mq_desktop
      display: block !important
      text-align: left
      justify-self: left
      align-self: center
      font-family: var(--font_face_logo)
    img
      width: 50%
  .social
    text-align: left
    .fa
      font-size: $fs_xl !important

</style>

