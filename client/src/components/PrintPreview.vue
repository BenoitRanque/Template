<template>
  <q-modal v-model="modal" maximized>
    <q-modal-layout content-class="">
      <q-toolbar slot="header" class="print-hide">
          <q-toolbar-title>
            Print Preview
          </q-toolbar-title>
          <q-btn icon="print" class="no-shadow" style="border-radius: 0" color="info" size="lg" @click="print()"></q-btn>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" v-close-overlay></q-btn>
      </q-toolbar>
      <div class="print-area">
        <h1 v-for="n in 50" :key="n">test</h1>
        <!-- <div v-html="printData"></div> -->
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { remote } from 'electron'
export default {
  name: 'PrintPreview',
  data () {
    return {
      modal: false,
      printData: null,
      template: 'raw'
    }
  },
  methods: {
    showPreview ({ template, data }) {
      this.template = template
      this.printData = data
      this.modal = true
      console.log('showing')
    },
    print () {
      remote.getCurrentWebContents().print()
      // window.print()
    }
  },
  created () {
    this.$root.$on('PRINT', this.showPreview)
  },
  beforeDestroy () {
    this.$root.$off('PRINT', this.showPreview)
  }
}
</script>

<style scoped lang="stylus">
// @media print
  .print-area
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    overflow visible
    width 100%
    height 100%
    display block
</style>
