<template>
  <div class="q-py-md">
    <div class="row items-center q-mx-md">
      <div class="col">
        <div class="q-headline">Crear Boleta</div>
      </div>
      <div class="col-auto">
        <q-btn @click="$refs.exchangeModal.show()" :disable="!exception.employee.id" dense color="primary" icon="swap_horiz" class="q-mr-sm">
          <q-tooltip>Generar Intercambio de Horarios</q-tooltip>
        </q-btn>
        <q-btn @click="$refs.vacationModal.show()" :disable="!exception.employee.id" dense color="primary" icon="date_range">
          <q-tooltip>Generar Periodo de Vacaciones</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-field class="q-mx-md q-mb-md">
      <employee-select v-model="exception.employee.id"></employee-select>
    </q-field>
    <div class="row item-center q-mx-md">
      <div class="q-title col">Dias</div>
      <div class="col-auto">
        <q-btn dense color="primary" icon="add" @click="$refs.schedulePresets.show()">
          <q-tooltip>Aggregar Dia a Boleta</q-tooltip>
          <schedule-preset-select @selected="$event => exception.slots.push({ date: null, schedule: $event, valid: true })" ref="schedulePresets"></schedule-preset-select>
        </q-btn>
      </div>
    </div>
    <div class="q-body-1 text-weight-bold q-mx-md text-center" :class="{
      'text-positive': valid,
      'text-negative': validationCode >= 10
    }">
      {{validationHelper}}
    </div>
    <div class="group">
      <q-card color="teal-8" text-color="black" dark v-for="(slot, index) in exception.slots" :key="`slot_card_${index}`">
        <q-card-main>
          <schedule-input v-model="slot.schedule" :valid.sync="slot.valid">
            <q-datetime
              color="teal-8"
              :display-value="slot.date ? `${formatDate(slot.date, 'dddd')} ${formatDate(slot.date, 'D')} de ${formatDate(slot.date, 'MMMM YYYY')}` : ''"
              placeholder="Seleccionar Fecha..." slot="top-left" hide-underline v-model="slot.date"></q-datetime>
            <q-btn @click="removeSlot(index)" slot="top-right" dense color="negative" icon="close">
              <q-tooltip>Quitar</q-tooltip>
            </q-btn>
          </schedule-input>
        </q-card-main>
      </q-card>
    </div>
    <div class="text-center q-py-md">
      <q-btn @click="createException" :disable="!valid" color="secondary" size="lg">Solictar</q-btn>
    </div>
    <q-modal ref="exchangeModal" content-classes="q-pa-lg group">
      <div class="q-title">
        Generar Intercambio de Horarios
      </div>
      <q-datetime float-label="Fecha A" v-model="exchange.dateA"></q-datetime>
      <q-datetime float-label="Fecha B" v-model="exchange.dateB"></q-datetime>
      <div class="text-center q-pt-md">
        <q-btn @click="generateScheduleExchange" :disable="!exchange.dateA || !exchange.dateB" color="secondary" size="lg">Generar</q-btn>
      </div>
    </q-modal>
    <q-modal ref="vacationModal" content-classes="q-pa-lg group">
      <div class="q-title">
        Generar Periodo de Vacaciones
      </div>
      <q-datetime float-label="Desde" :max="vacation.dateB" v-model="vacation.dateA"></q-datetime>
      <q-datetime float-label="Hasta" :min="vacation.dateA" v-model="vacation.dateB"></q-datetime>
      <div class="text-center q-pt-md">
        <q-btn @click="generateVacationRange" :disable="!vacation.dateA || !vacation.dateB" color="secondary" size="lg">Generar</q-btn>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { date } from 'quasar'
import ScheduleInput from 'components/ScheduleInput/index'
import EmployeeSelect from 'components/EmployeeSelect'
import SchedulePresetSelect from 'components/SchedulePresetSelect'
export default {
  name: 'ExceptionSidebar',
  components: { EmployeeSelect, SchedulePresetSelect, ScheduleInput },
  data () {
    return {
      exchange: {
        dateA: null,
        dateB: null
      },
      vacation: {
        dateA: null,
        dateB: null
      },
      exception: {
        employee: {
          id: null
        },
        slots: []
      }
    }
  },
  computed: {
    validationCode () {
      if (this.exception.slots.some(slot => !slot.valid)) return 10
      const duplicateDates = this.exception.slots
        .map(({ date }) => date ? new Date(date).getTime() : null)
        .some((date, index, dates) => date && dates.indexOf(date) !== index)
      if (duplicateDates) return 12

      if (!this.exception.employee.id) return 1
      if (this.exception.slots.length < 1) return 2
      if (this.exception.slots.some(slot => slot.date === null)) return 3

      return 0
    },
    valid () {
      return this.validationCode === 0
    },
    validationHelper () {
      switch (this.validationCode) {
        case 0: return 'Boleta valida'
        case 1: return `Bienvenido. Por favor escoja un empleado`
        case 2: return `Ahora puede empezar aggregar dias`
        case 3: return `Se requiere fecha para dia ${this.exception.slots.findIndex(slot => slot.date === null) + 1}`
        case 10: return `Horario invalido para dia ${this.exception.slots.findIndex(slot => !slot.valid) + 1}`
        case 12:
          const dateSrings = this.exception.slots
            .map(({ date }) => date ? new Date(date).getTime() : null)

          const duplicateDate = dateSrings
            .filter(date => date)
            .find((date, index, dates) => dates.indexOf(date) !== index)

          const instances = dateSrings
            .reduce((acc, val, index) => {
              if (val === duplicateDate) acc.push(index)
              return acc
            }, [])

          return `Fecha ${this.formatDate(new Date(duplicateDate), 'DD/MM/YYYY')} duplicada en dias ${instances.map(i => i + 1).join(', ')}`
      }
    }
  },
  methods: {
    formatDate: date.formatDate,
    differenceInDays: (a, b) => date.getDateDiff(a, b, 'days'),
    removeSlot (index) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Quitar elemento?',
        ok: true,
        cancel: true
      })
        .then(() => this.$delete(this.exception.slots, index))
        .catch(() => {})
    },
    generateScheduleExchange () {
      // generate exchange, append to slots
    },
    generateVacationRange () {
      // generate vacations, appent to slot
    },
    createException () {
      // create exception
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
