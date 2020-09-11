<template>
  <section class="contactform">
    <form class="form_ajax" ref="contactform_ref" :method="method" :action="action" v-if="!responseSuccess">
        <p>
            All fields with <span class="required">*</span> are required.
        </p>
        <div>
            <label for="name">Name <span class="required">*</span></label>
            <input id="name" name="name" type="text" placeholder="Enter your full name" required aria-required=”true” title="Name" pattern="\s*\S+[\s\S]*" maxlength=”100” />
            <div id="name_wrong" class="error_msg hidden">Name is required</div>
        </div>
        <div>
            <label for="email">Email <span class="required">*</span></label>
            <input id="email" name="email" type="email" placeholder="Enter your email address" required aria-required=”true” title="Email" />
            <div id="email_wrong" class="error_msg hidden">Email is not valid</div>
        </div>
        <div>
            <label for="message">Message <span class="required">*</span></label>
            <textarea id="message" name="message" placeholder="Enter your message, questions, etc." cols="45" rows="10" required aria-required=”true” title="Message"></textarea>
            <div id="message_wrong" class="error_msg hidden">Message is required</div>
        </div>
        <div class="hidden">
            <label for="karaspace">Keep this field empty</label>
            <input id="karaspace" name="karaspace" type="text" value="" placeholder="Keep this field empty" />
            <input id="recaptcha" name="recaptcha" type="hidden" />
        </div>
        <div>
            <button class="accent_btn size_l4" type="submit" @click="sendForm($event)" :disabled="formDisabled">Send Message</button>
        </div>
        <div class="recaptcha_text_badge">
            This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
        </div>
    </form>
    <div v-else>
        <p id="thanks_msg">Thanks a lot for your message.</p>
    </div>
  </section>
</template>

<script>
var RECAPTCHA_SITE_KEY = "6Le_a8cZAAAAAFpQ5Cp9tRDvz7NMYOh8-dW-ltNw"

export default {
  props: {
    action: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'post'
    }
  },
  data() {
    return {
      formDisabled: false,
      responseSuccess: false
    }
  },
  beforeDestroy () {
    this.responseSuccess = false
  },

  mounted() {
    this.$nextTick(() => { this.loadRecaptchaJS() })
  },

  methods: {
    loadRecaptchaJS() {
      var js = document.createElement("script")
      js.type = "text/javascript"
      js.src = `https://www.recaptcha.net/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      document.body.appendChild(js)
    },
    sendForm(e) {
      var xhr = this.createHttpRequest(this.method, this.action)
      if (xhr) {
        var form = this.$refs["contactform_ref"]
        if (form && this.validateInputData()) {
          var vm = this
          vm.readyRecaptcha().then(function(token) {
            var recaptcha = document.getElementById("recaptcha")
            if (recaptcha) recaptcha.value = token
            var fd = new FormData(form)
            xhr.onreadystatechange = function() {
              if ((4 === xhr.readyState) && (200 === xhr.status)) {
                vm.formDisabled = false
                var resp = JSON.parse(xhr.responseText)
                if (resp.success) vm.responseSuccess = true
                else vm.handleErrorInput(form, resp.wrong)
              }
            }
            vm.formDisabled = true
            xhr.send(fd)
          })
        }
        e.preventDefault()
      }
    },
    readyRecaptcha() {
      return new Promise(function(resolve) {
        grecaptcha.ready(function() {
          grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: "homepage"})
            .then(function(token) { resolve(token) })
            .catch(function() { /* ignore */ })
        })
      })
    },
    validateInputData() {
      var rtn = true
      var wrong_items = []
      var form = this.$refs["contactform_ref"]

      if (form) {
        var sName = form["name"].value.trim()
        if ("" === sName) {
          wrong_items.push("name")
          rtn = false
        }
        var sMessage = form["message"].value.trim()
        if ("" === sMessage) {
          wrong_items.push("message")
          rtn = false
        }
        var sEmail = form["email"].value.trim()
        if (("" === sEmail) || (!this.isValidEmail(sEmail))) {
          wrong_items.push("email")
          rtn = false
        }

        if (!rtn) this.handleErrorInput(form, wrong_items)
      }

      return rtn
    },
    isValidEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
      return re.test(email)
    },
    handleErrorInput(form, items) {
      for (var pos in items) {
        if (form[items[pos]]) form[items[pos]].classList.add("input_error")
      }
    }
  }

}
</script>

<style lang="stylus">

.contactform
  --color_required: red
  --color_ok_border: black
  --color_ng_border: red
  display: block
  padding: 1rem
  .form_ajax
    p
      line-height: 1rem
    div
      padding: 0.8rem
    label
      display: block
      font-weight: 700
      margin-bottom: 0.5rem
    input, textarea
      border: 1px solid var(--color_ok_border)
      padding: 0.3rem
      width: 90%
      max-width:45rem
      &.input_error
        border: 1px solid var(--color_ng_border)
        & + .error_msg
          display: block
      &:valid
        border: 1px solid var(--color_ok_border)
        & + .error_msg
          display: none
    textarea
      height: 10rem
    button
      border: 0
      width: 90%
      background-color: var(--color_secondary)
      @media $mq_tablet
        width: auto
    .error_msg
      color: var(--color_ng_border)
      padding: 0
    .required
      color: var(--color_secondary)
      font-weight: 700
    .recaptcha_text_badge
      font-size: 0.7rem
      padding: 0
.grecaptcha-badge
  visibility: hidden
  display: none

</style>
