<template>
  <div class="q-mx-md q-my-lg">
    <div class="q-headline text-center q-mx-md">Crear Boleta</div>
    <div class="q-body-1 text-weight-bold q-mx-md q-my-xs text-center" :class="{
      'text-positive': valid,
      'text-negative': validationCode >= 10
    }">
      {{validationHelper}}
    </div>
    <employee-select v-model="exception.employee.id"></employee-select>
    <div class="flex flex-center q-my-sm" v-if="validationCode !== 1">
      <div>
        <q-btn @click="$refs.schedulePresets.show()" :disable="!exception.employee.id" dense color="primary" icon="search" class="q-mr-sm">
          <q-tooltip>Aggregar dia en base a horario preestablecido</q-tooltip>
          <schedule-preset-select @selected="$event => exception.slots.push({ date: null, schedule: $event, valid: true })" ref="schedulePresets"></schedule-preset-select>
        </q-btn>
        <q-btn @click="calendarRangeModal = true" :disable="!exception.employee.id" dense color="primary" icon="date_range" class="q-mr-sm">
          <q-tooltip>Aggregar dias en base a rangos de fechas</q-tooltip>
        </q-btn>
        <q-btn @click="calendarDateModal = true" :disable="!exception.employee.id" dense color="primary" icon="event" class="q-mr-sm">
          <q-tooltip>Aggregar dia en base a fecha</q-tooltip>
        </q-btn>
        <q-btn @click="addBlankDate" :disable="!exception.employee.id" dense color="primary" icon="add" class="q-mr-sm">
          <q-tooltip>Aggregar dia en blanco</q-tooltip>
        </q-btn>
      </div>
    </div>
    <template v-if="validationCode !== 1 && validationCode !== 2">
      <!-- Show if an employee has been selected and at least one day has been added -->
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
    </template>
    <q-modal v-model="calendarDateModal" content-classes="q-pa-lg group">
      <div class="q-title">
        Aggregar dia en base a fecha
      </div>
      <q-datetime float-label="Fecha" v-model="dateA"></q-datetime>
      <div class="text-center q-pt-md">
        <q-btn :loading="loadingCalendarDate" @click="addCalendarDate" :disable="!dateA || !exception.employee.id" color="secondary" size="md">Aggregar</q-btn>
      </div>
    </q-modal>
    <q-modal v-model="calendarRangeModal" content-classes="q-pa-lg group">
      <div class="q-title">
        Aggregar dias en base a rango de fechas
      </div>
      <q-datetime float-label="Desde" :max="dateC" v-model="dateB"></q-datetime>
      <q-datetime float-label="Hasta" :min="dateB" v-model="dateC"></q-datetime>
      <div class="text-center q-pt-md">
        <q-btn :loading="loadingCalendarRange" @click="addCalendarRange" :disable="!dateB || !dateC || !exception.employee.id" color="secondary" size="md">Aggregar</q-btn>
      </div>
    </q-modal>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { date } from 'quasar'
import ScheduleInput from 'components/ScheduleInput/index'
import EmployeeSelect from 'components/EmployeeSelect'
import SchedulePresetSelect from 'components/SchedulePresetSelect'
export default {
  name: 'ExceptionSidebar',
  components: { EmployeeSelect, SchedulePresetSelect, ScheduleInput },
  data () {
    return {
      dateA: null,
      dateB: null,
      dateC: null,
      calendarDateModal: false,
      loadingCalendarDate: false,
      calendarRangeModal: false,
      loadingCalendarRange: false,
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
      const duplicateDates = this.exception.slots
        .map(({ date }) => date ? new Date(date).getTime() : null)
        .some((date, index, dates) => date && dates.indexOf(date) !== index)
      if (duplicateDates) return 12
      if (this.exception.slots.some(slot => !slot.valid)) return 10

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
    addBlankDate () {
      // generate vacations, appent to slot
      this.exception.slots.push({
        date: null,
        valid: false,
        schedule: {
          description: '',
          baseTime: 8 * 60,
          custom: true,
          restline: [],
          offline1: null,
          offline2: null,
          timeline: []
        }
      })
    },
    addCalendarDate () {
      if (!this.dateA || !this.exception.employee.id) throw new Error(`dateA and exception.employee.id are requires fields for this function`)

      const query = gql`
        query ($employeeID: UUID! $date: DateTime!) {
          employee (where: { id: $employeeID }) {
            calendarDate(date: $date withExceptions: true) {
              date
              schedule {
                ...AllScheduleData
              }
            }
          }
        }

        fragment AllScheduleData on Schedule {
          baseTime
          timeline {
            category
            startTime
            startRequireEvent
            endTime
            endRequireEvent
          }
          restline {
            category
            startTime
            startRequireEvent
            endTime
            endRequireEvent
            duration
          }
          offline1 {
            category
          }
          offline2 {
            category
          }
        }
      `
      const parameters = {
        employeeID: this.exception.employee.id,
        date: this.dateA
      }

      this.loadingCalendarDate = true
      this.$gql.request(query, parameters)
        .then(response => {
          this.exception.slots.push({ valid: true, ...response.employee.calendarDate })
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.calendarDateModal = false
          this.loadingCalendarDate = false
          this.dateA = null
        })
    },
    addCalendarRange () {
      if (!this.dateB || !this.dateC || !this.exception.employee.id) throw new Error(`dateB dateC and exception.employee.id are requires fields for this function`)

      const query = gql`
        query ($employeeID: UUID! $from: DateTime! $to: DateTime!) {
          employee (where: { id: $employeeID }) {
            calendarRange(from: $from to: $to withExceptions: true) {
              date
              schedule {
                ...AllScheduleData
              }
            }
          }
        }

        fragment AllScheduleData on Schedule {
          baseTime
          timeline {
            category
            startTime
            startRequireEvent
            endTime
            endRequireEvent
          }
          restline {
            category
            startTime
            startRequireEvent
            endTime
            endRequireEvent
            duration
          }
          offline1 {
            category
          }
          offline2 {
            category
          }
        }
      `
      const parameters = {
        employeeID: this.exception.employee.id,
        from: this.dateB,
        to: this.dateC
      }

      this.loadingCalendarRange = true
      this.$gql.request(query, parameters)
        .then(response => {
          this.exception.slots.push(...response.employee.calendarRange.map(slot => ({ valid: true, ...slot })))
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.calendarRangeModal = false
          this.loadingCalendarRange = false
          this.dateB = null
          this.dateC = null
        })
    },
        mapExceptionToExceptionInput (exception) {
      return {
        employee: {
          connect: {
            id: exception.employee.id
          }
        },
        slots: exception.slots.map(({ date, schedule }) => ({
          date,
          schedule: {
            create: {
              ...schedule,
              restline: {
                create: schedule.restline
              },
              timeline: {
                create: schedule.timeline
              }
            }
          }
        }))
      }
    },
    createException () {
      // create exception
      const query = gql`
        mutation ($data: ExceptionCreateInput!) {
          exception: createException (data: $data) {
            employee {
              nameFull
            }
          }
        }
      `
      const parameters = {
        data: this.mapExceptionToExceptionInput(this.exception)
      }

      this.$gql.request(query, parameters)
        .then(response => {
          this.$q.notify(`Boleta para empleado ${response.exception.employee.nameFull} creada por usuario ${response.exception.owner.username}`)
          // reset model
        })
        .catch(error => console.log(error))
        .finally(() => {})
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
