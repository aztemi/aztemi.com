<template>
  <div class="size_l5">
    <span>Copyright &copy; {{ new Date().getFullYear() }} {{ siteName }}. {{ tr('allRightsReserved') }}</span>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>

div
  background-color: var(--color_primary)
  padding: 1rem 2rem

</style>

