<template>
  <q-modal v-model="modal" @show="preview ? null : print()" @hide="preview = false" maximized :class="{ 'print-only': !preview }" class="print-area">
    <q-toolbar class="q-py-none q-pr-none print-hide">
        <q-toolbar-title>
          Print Preview
        </q-toolbar-title>
        <q-btn icon="print" class="no-shadow" style="border-radius: 0" color="info" size="lg" @click="print()"></q-btn>
        <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" v-close-overlay></q-btn>
    </q-toolbar>
    <portal-target name="print" multiple></portal-target>
  </q-modal>
</template>

<script>
export default {
  name: 'PrintPreview',
  data () {
    return {
      preview: false,
      modal: false
    }
  },
  methods: {
    requestPrint (preview = false) {
      this.preview = preview
      if (this.modal) {
        this.modal = false
      }
      this.$nextTick(() => {
        this.modal = true
      })
    },
    print () {
      if (this.$q.platform.is.electron) {
        const { remote } = require('electron')

        remote.getCurrentWebContents().print({ silent: false, printBackground: true, deviceName: '' }, (success) => {
          this.modal = false
          if (!success) {
            this.$q.notify({ type: 'negative', message: 'Something went wrong' })
          }
        })
      } else {
        window.print()
      }
    }
  },
  created () {
    this.$root.$on('PRINT', this.requestPrint)
  },
  beforeDestroy () {
    this.$root.$off('PRINT', this.requestPrint)
  }
}
</script>

<style lang="stylus">
@media print
  .q-maximized-modal
    overflow auto

  .print-area
    position absolute
    bottom inherit
    max-height none
</style>
