<template>
  <div>
    <div class="row items-center">
      <div class="col q-title q-my-sm">
        <div class="q-headline">
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
        <div class="q-caption">Fecha: {{formatDate(payload.createdAt, 'DD/MM/YYYY')}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">Nombre:</div>
      <div class="col-9">{{payload.employee.nameFull}}</div>
    </div>
    <div class="q-my-sm">
      <div class="q-title">Dias</div>
      <div class="row" v-for="(slot, index) in payload.slots" :key="index">
        <div class="col-4">{{formatDate(slot.date, 'DD/MM/YYYY')}}</div>
        <div class="col-8">{{slot.schedule.description}}</div>
      </div>
    </div>
    <div v-if="debits" class="q-my-sm">
      <div class="q-title">Devoluciones</div>
      <div class="row" v-for="(amount, creditCategory) in credits" :key="creditCategory">
        <div class="col-4">{{amount}}</div>
        <div class="col-8">{{categoryDescription(creditCategory)}}</div>
      </div>
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
        style="transform: scaleX(0.60)"
        :value="payload.id"
        :options="{
          textAlign: 'right',
          format: 'CODE128',
          displayValue: false,
          width: 1,
          height: 30,
          margin: 0
        }"
      />
      <div style="font-family: monospace, monospace; font-size: 12px;">{{payload.id}}</div>
    </div>
  </div>
</template>

<script>
import Barcode from '@chenfengyuan/vue-barcode'
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'ExceptionPrintingTemplate',
  props: ['payload'],
  components: {
    Barcode
  },
  computed: {
    ...mapGetters('schedule', {
      categoryDescription: 'categoryDescription'
    }),
    credits () {
      return [{ category: 'SCH_DAY_OFF' }].reduce((credits, credit) => {
        if (credits[credit.category] === undefined) {
          credits[credit.category] = 0
        }
        credits[credit.category] += 0.5
        return credits
      }, {})
      // if (!this.payload || !this.payload.credits || !this.payload.credits.length) return null
      // return this.payload.credits.reduce((credits, credit) => {
      //   if (credits[credit.category] === undefined) {
      //     credits[credit.category] = 0
      //   }
      //   credits[credit.category] += 0.5
      // }, {})
    },
    debits () {
      if (!this.payload || !this.payload.debits || !this.payload.debits.length) return null
      return this.payload.debits.reduce((debits, debit) => {
        if (debits[debit.category] === undefined) {
          debits[debit.category] = 0
        }
        debits[debit.category] += 0.5
        return debits
      }, {})
    }
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
