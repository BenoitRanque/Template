<template>
  <canvas id="barcode"></canvas>
</template>

<script>
import bwipjs from 'bwip-js'
export default {
  name: 'Barcode',
  props: {
    value: {
      type: String,
      default: 'hello'
    }
  },
  watch: {
    value () {
      this.update()
    }
  },
  methods: {
    update () {
      bwipjs(this.$el, {
        bcid: 'code128',
        text: this.value,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center'
      }, (err, cvs) => {
        if (err) {
          throw new Error(`BWIP BARCODE ERROR: ${err}`)
        } else {

        }
      })
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style scoped>

</style>
