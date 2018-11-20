<template>
  <q-btn v-bind="$attrs" :icon="mainBtnIcon" @click="mainBtnAction">
    <q-tooltip>{{tooltip}}</q-tooltip>
    <q-modal v-model="modal">
      <q-modal-layout>
        <q-toolbar slot="header" class="col">
          <q-toolbar-title>
            {{tooltip}}
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <q-table
          v-if="mode === 'preset'"
          hide-header
          title="Aggregar Jornada"
          ref="table"
          :data="table.data"
          :columns="table.columns"
          :filter="table.filter"
          row-key="id"
          :pagination.sync="table.pagination"
          :loading="table.loading"
          @request="requestPreset"
        >
          <template slot="top-left" slot-scope="props">
            <q-search hide-underline v-model="table.filter" />
          </template>

          <q-td slot="body-cell-actions" slot-scope="props">
            <q-btn rounded color="primary" size="sm" @click="selectPreset(props.row)">Aggregar</q-btn>
          </q-td>
        </q-table>
        <div v-else class="q-pa-md relative-position">
          <employee-select v-model="calendar.employee.id"></employee-select>
          <q-datetime v-if="mode === 'date'" float-label="Fecha" v-model="calendar.dateA"></q-datetime>
          <q-datetime v-if="mode === 'range' || mode === 'vacation'" float-label="Desde" :max="calendar.dateC" v-model="calendar.dateB"></q-datetime>
          <q-datetime v-if="mode === 'range' || mode === 'vacation'" float-label="Hasta" :min="calendar.dateB" v-model="calendar.dateC"></q-datetime>
          <q-datetime v-if="mode === 'switch'" float-label="Fecha A" v-model="calendar.dateD"></q-datetime>
          <q-datetime v-if="mode === 'switch'" float-label="Fecha B" v-model="calendar.dateE"></q-datetime>
          <div class="text-center q-pt-md">
            <q-btn @click="calendarBtnAction" :disable="disableCalendarBtn" rounded color="primary" size="md">Aggregar</q-btn>
          </div>
          <q-inner-loading :visible="calendar.loading">
            <q-spinner size="36px" color="primary"/>
          </q-inner-loading>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-btn>
</template>

<script>
import {
  SchedulesPagination,
  EmployeeCalendarDateSchedule,
  EmployeeCalendarRangeSchedules,
  EmployeeCalendarVacationSchedule,
  EmployeeCalendarSwitchSchedule
} from 'assets/queries/Schedule.graphql'
import EmployeeSelect from 'components/EmployeeSelect'

export default {
  name: 'ScheduleSelect',
  components: { EmployeeSelect },
  props: {
    mode: {
      type: String,
      default: 'empty',
      validator (value) {
        return ['preset', 'empty', 'date', 'range', 'vacation', 'switch'].includes(value)
      }
    },
    employeeId: {
      type: [String, null],
      default: null
    }
  },
  data () {
    return {
      modal: false,
      calendar: {
        employee: {
          id: null
        },
        loading: false,
        dateA: null,
        dateB: null,
        dateC: null,
        dateD: null,
        dateE: null
      },
      table: {
        data: [],
        columns: [
          {
            name: 'description',
            field: 'description',
            align: 'left'
          },
          {
            name: 'actions'
          }
        ],
        filter: '',
        loading: false,
        pagination: {
          page: 1,
          rowsPerPage: 5, // current rows per page being displayed
          rowsNumber: 0
        }
      }
    }
  },
  watch: {
    employeeId (employeeId) {
      this.calendar.employee.id = employeeId
    }
  },
  computed: {
    mainBtnIcon () {
      switch (this.mode) {
        case 'preset': return 'search'
        case 'range': return 'date_range'
        case 'date': return 'today'
        case 'empty': return 'add'
        case 'vacation': return 'airport_shuttle'
        case 'switch': return 'swap_horiz'
      }
    },
    tooltip () {
      switch (this.mode) {
        case 'preset': return 'Aggregar dia en base a horario preestablecido'
        case 'range': return 'Aggregar dias en base a rangos de fechas'
        case 'date': return 'Aggregar dia en base a fecha'
        case 'empty': return 'Aggregar dia en blanco'
        case 'vacation': return 'Aggregar rango de vacaciones'
        case 'switch': return 'Aggregar intercambio de horarios'
      }
    },
    disableCalendarBtn () {
      if (this.calendar.employee.id) {
        if (this.mode === 'date') {
          return !this.calendar.dateA
        } else if (this.mode === 'range' || this.mode === 'vacation') {
          return !this.calendar.dateB || !this.calendar.dateC
        } else if (this.mode === 'switch') {
          return !this.calendar.dateD || !this.calendar.dateE
        }
      }
      return true
    }
  },
  methods: {
    mainBtnAction () {
      switch (this.mode) {
        case 'preset':
          this.modal = true
          this.requestPreset()
          return
        case 'range':
        case 'date':
        case 'switch':
        case 'vacation':
          this.modal = true
          return
        case 'empty': return this.$emit('select', {
          schedule: {
            // empty schedule
            description: '',
            baseTime: 8 * 60,
            // isPreset: false,
            restline: [],
            offline1: null,
            offline2: null,
            timeline: []
          }
        })
      }
    },
    resetCalendar () {
      this.calendar.loading = false
      this.calendar.dateA = null
      this.calendar.dateB = null
      this.calendar.dateC = null
      this.calendar.dateD = null
      this.calendar.dateE = null
    },
    calendarBtnAction () {
      this.calendar.loading = true

      switch (this.mode) {
        case 'date':
          this.$gql.request(EmployeeCalendarDateSchedule, {
            employeeId: this.calendar.employee.id,
            date: this.calendar.dateA
          })
            .then(response => {
              if (response.employee.calendarDate) {
                const { schedule, date } = response.employee.calendarDate
                const payload = { schedule, date }
                this.$emit('select', payload)
              }
              this.modal = false
              this.resetCalendar()
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.resetCalendar()
              this.modal = false
            })
          break
        case 'range':
          this.$gql.request(EmployeeCalendarRangeSchedules, {
            employeeId: this.calendar.employee.id,
            from: this.calendar.dateB,
            to: this.calendar.dateC
          })
            .then(response => {
              if (response.employee.calendarRange.length) {
                const payload = response.employee.calendarRange.map(({ schedule, date }) => ({ schedule, date }))
                this.$emit('select', payload)
              }
              this.resetCalendar()
              this.modal = false
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.resetCalendar()
              this.modal = false
            })
          break
        case 'switch':
          this.$gql.request(EmployeeCalendarSwitchSchedule, {
            employeeId: this.calendar.employee.id,
            dateA: this.calendar.dateD,
            dateB: this.calendar.dateE
          })
            .then(response => {
              if (response.employee.dateA && response.employee.dateB) {
                const payload = [
                  {
                    schedule: response.employee.dateB.schedule,
                    date: response.employee.dateA.date
                  },
                  {
                    schedule: response.employee.dateA.schedule,
                    date: response.employee.dateB.date
                  }
                ]
                this.$emit('select', payload)
              }
              this.modal = false
              this.resetCalendar()
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.resetCalendar()
              this.modal = false
            })
          break
        case 'vacation':
          this.$gql.request(EmployeeCalendarVacationSchedule, {
            employeeId: this.calendar.employee.id,
            from: this.calendar.dateB,
            to: this.calendar.dateC
          })
            .then(response => {
              if (response.employee.vacationRange.length) {
                const payload = response.employee.vacationRange.map(({ schedule, date }) => ({ schedule, date }))
                this.$emit('select', payload)
              }
              this.resetCalendar()
              this.modal = false
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.resetCalendar()
              this.modal = false
            })
          break
      }
    },
    selectPreset (preset) {
      this.$emit('select', { schedule: preset.schedule })
      this.modal = false
    },
    requestPreset ({ pagination, filter } = { pagination: this.table.pagination, filter: this.table.filter }) {
      const parameters = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        where: { isPreset: true }
      }

      if (filter.length > 0) {
        parameters.where.description_contains = filter
      }

      this.loading = true
      this.$gql.request(SchedulesPagination, parameters)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data.map(schedule => ({
            description: schedule.description,
            schedule
          }))
          this.loading = false
        })
        .catch(error => {
          this.$defaultErrorHandler(error)
          this.loading = false
        })
    }
  },
  mounted () {
    this.calendar.employee.id = this.employeeId
  }
}
</script>

<style scoped>

</style>
