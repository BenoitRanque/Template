<template>
  <div class="">
    <q-modal v-model="modal">
      <q-modal-layout content-class="q-px-md q-pt-md q-pb-xl">
        <q-toolbar slot="header" class="col">
          <q-toolbar-title>
            Imprimir
          </q-toolbar-title>
          <q-btn
            icon="print"
            dense
            round
            color="secondary"
            class="q-mx-xs"
            :disable="printing"
            :loading="printing"
            @click="print"
          >
            <q-tooltip>Imprimir</q-tooltip>
          </q-btn>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>

        <exception-template v-if="template === 'exception'" :data="data"></exception-template>
        <vacation-template v-else-if="template === 'vacation'" :data="data"></vacation-template>
        <default-template v-else :data="data"></default-template>

      </q-modal-layout>
    </q-modal>

    <div class="print-area z-max print-only">
      <exception-template v-if="template === 'exception'" :data="data"></exception-template>
      <vacation-template v-else-if="template === 'vacation'" :data="data"></vacation-template>
      <default-template v-else :data="data"></default-template>
    </div>
  </div>
</template>

<script>
import ExceptionTemplate from './templates/Exception.vue'
import VacationTemplate from './templates/Vacation.vue'
import DefaultTemplate from './templates/Default.vue'
export default {
  name: 'Printing',
  components: { ExceptionTemplate, DefaultTemplate, VacationTemplate },
  data () {
    return {
      modal: true,
      data: 'hello',
      template: 'default',
      printing: false
    }
  },
  methods: {
    requestPrint (params) {
      const {
        preview,
        data,
        template
      } = {
        preview: false,
        data: null,
        template: 'default',
        ...params
      }

      this.data = data
      this.template = template

      if (preview) {
        this.modal = true
      } else {
        this.$nextTick(() => {
          this.print()
        })
      }
    },
    print () {
      if (this.$q.platform.is.electron) {
        const { remote } = require('electron')

        this.printing = true
        remote.getCurrentWebContents().print({ silent: false, printBackground: true, deviceName: '' }, (success) => {
          if (this.modal) this.modal = false
          this.printing = false

          if (!success) {
            this.$q.notify({ type: 'negative', message: 'Error de Impresion' })
          }
        })
      } else {
        window.print()
        if (this.modal) this.modal = false
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
  // Hide other elements
  .modal,
  .q-layout
    display none

  .print-area
    position absolute
    top 0
    left 0
    right 0
    bottom inherit
    max-height none
    background white

</style>
