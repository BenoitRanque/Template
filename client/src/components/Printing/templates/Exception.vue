<template>
  <div>
    <div class="row items-center">
      <div class="col q-title">
        <div class="q-title">
          Boleta de Autorizacion
        </div>
        <!-- <div class="q-caption">Identificador Unico</div>
        <barcode
          style="transform: scaleX(0.75)"
          :value="payload.id"
          :options="{
            format: 'CODE128',
            displayValue: false,
            width: 1,
            height: 20,
            margin: 0
          }"
        />
        <div style="font-family: monospace, monospace; font-size: 14px;">{{payload.id}}</div> -->
      </div>
      <div class="col-auto">
        <div class="q-caption">Fecha de creacion: {{formatDate(payload.createdAt, 'DD/MM/YYYY')}}</div>
      </div>
    </div>

    <div class="row">
      <div class="col">Nombre de interesado</div>
      <div class="col">{{payload.employee.nameFull}}</div>
    </div>
    <div class="q-px-lg row gutter-x-md">
      <div class="col">
        <div class="text-center q-pt-xs q-mt-xl q-mb-md" style="border-top: solid 1px black">Interesado</div>
      </div>
      <div class="col">
        <div class="text-center q-pt-xs q-mt-xl q-mb-md" style="border-top: solid 1px black">Jefe De Área</div>
      </div>
      <div class="col">
        <div class="text-center q-pt-xs q-mt-xl q-mb-md" style="border-top: solid 1px black">Gerente de Área</div>
      </div>
    </div>
    <div class="text-center">
      <!-- <div class="q-caption">Fecha de creacion: {{formatDate(payload.createdAt, 'DD/MM/YYYY')}}</div> -->
      <!-- <div class="q-caption">Identificador Unico</div> -->
      <barcode
        style="transform: scaleX(0.75)"
        :value="payload.id"
        :options="{
          textAlign: 'right',
          format: 'CODE128',
          displayValue: false,
          width: 1,
          height: 20,
          margin: 0
        }"
      />
      <div style="font-family: monospace, monospace; font-size: 14px;">{{payload.id}}</div>
    </div>
  </div>
</template>

<script>
import Barcode from '@chenfengyuan/vue-barcode'
import { date } from 'quasar'

export default {
  name: 'ExceptionPrintingTemplate',
  props: ['payload'],
  components: {
    Barcode
  },
  methods: {
    formatDate: date.formatDate
  }
}
</script>

<style scoped lang="stylus">

.exception-template-grid
  display grid
  grid-template-columns repeat(12, 1fr)
  grid-template-rows auto auto 28px 28px 28px
  grid-gap 10px 10px
  grid-template-areas
    "repeat(12, header)"
    "repeat(12, label)"
    "repeat(12, timeline)"
    "repeat(12, restline)"
    "repeat(12, downtime1)"
    "repeat(12, downtime2)"
    "label label"
    "timeline timeline"
    "restline restline"
    "timeoff1 timeoff2"
</style>
