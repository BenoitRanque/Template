<template>
  <q-page>
    <div :style="computedStyle">

    </div>
    <img src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  inject: {
    layout: {}
  },
  computed: {
    computedStyle () {
      const offset =
        (this.layout.header.space ? this.layout.header.size : 0) +
        (this.layout.footer.space ? this.layout.footer.size : 0)

      return {
        minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh'
      }
    }
  }
}
</script>
