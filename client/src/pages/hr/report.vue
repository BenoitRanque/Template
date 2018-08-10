<template>
  <q-page>
    <div class="row">
      <div class="col-4">
        <q-datetime v-model="reportParams.from"></q-datetime>
      </div>
      <div class="col-4">
        <q-datetime v-model="reportParams.to"></q-datetime>
      </div>
      <div class="col-4">
        <q-select multiple v-model="reportParams.employee_id" :options="options.employee_id"></q-select>
      </div>
    </div>
    <div class="q-pa-sm row justify-center">
      <q-btn @click="refresh" icon="refresh">refresh</q-btn>
    </div>
    <div class="q-pa-sm row justify-center">
      <q-btn @click="fetch" icon="refresh">report</q-btn>
    </div>
    <hr>
    <q-table
      :data="data"
      :columns="columns"
    >
      <att-report-cell v-for="(date, index) in dates" :key="index" :slot="`body-cell-${date}`" slot-scope="props" :attendance="props.row.attendance.find(att => att.date === date)"></att-report-cell>
    </q-table>
    <div class="row">
      <div class="q-caption row col-auto" style="width: 80px; height: 80px">
        <div class="column col-12">
          <div class="col row items-center justify-center text-white text-center bg-info">
            <div class="col">
              V
              <q-tooltip>
                0.5 dia de vacacion
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-info">
            <div class="col">
              L
              <q-tooltip>
                0.5 dia libre
              </q-tooltip>
            </div>
          </div>
        </div>
        <q-popover>
          hello
        </q-popover>
      </div>
      <div class="q-caption row col-auto" style="width: 80px; height: 80px">
        <div class="column col-8">
          <div class="col row items-center justify-center text-white text-center bg-tertiary">
            <div class="col">
              <del>
                08:30
              </del>
              <q-tooltip>
                Marcacion faltante
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-negative">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion atrasada
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-positive">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion adecuada
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-positive">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion adecuada
              </q-tooltip>
            </div>
          </div>
        </div>
        <div class="column col-4">
          <div class="col row items-center justify-center text-white text-center bg-info">
            <div class="col">
              V
              <q-tooltip>
                0.5 dia de vacacion
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-info">
            <div class="col">
              L
              <q-tooltip>
                0.5 dia libre
              </q-tooltip>
            </div>
          </div>
        </div>
        <q-popover>
          hello
        </q-popover>
      </div>
      <div class="q-caption row col-auto" style="width: 80px; height: 80px">
        <div class="column col-8">
          <div class="col row items-center justify-center text-white text-center bg-negative">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion atrasada
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-positive">
            <div class="col">
              12:30
              <q-tooltip>
                Marcacion adecuada
              </q-tooltip>
            </div>
          </div>
        </div>
        <div class="column col-4">
          <div class="col row items-center justify-center text-white text-center bg-negative">
            <div class="col">
              F
              <q-tooltip>
                0.5 dia de falta
              </q-tooltip>
            </div>
          </div>
        </div>
        <q-popover>
          hello
        </q-popover>
      </div>
      <div class="q-caption row col-auto" style="width: 80px; height: 80px">
        <div class="column col-12">
          <div class="col row items-center justify-center text-white text-center bg-tertiary">
            <div class="col">
              <del>
                08:30
              </del>
              <q-tooltip>
                Marcacion faltante
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-negative">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion atrasada
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-positive">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion adecuada
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-positive">
            <div class="col">
              09:45
              <q-tooltip>
                Marcacion adecuada
              </q-tooltip>
            </div>
          </div>
        </div>
        <q-popover anchor="bottom middle" self="top middle" class="q-pa-md">
          hello
        </q-popover>
      </div>
      <div class="q-caption row col-auto" style="width: 80px; height: 80px">
        <div class="column col-12">
          <div class="col row items-center justify-center text-white text-center bg-tertiary">
            <div class="col">
              <del>
                08:30
              </del>
              <q-tooltip>
                Marcacion faltante
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-tertiary">
            <div class="col">
              <del>
                08:30
              </del>
              <q-tooltip>
                Marcacion faltante
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-tertiary">
            <div class="col">
              <del>
                08:30
              </del>
              <q-tooltip>
                Marcacion faltante
              </q-tooltip>
            </div>
          </div>
          <div class="col row items-center justify-center text-white text-center bg-tertiary">
            <div class="col">
              <del>
                08:30
              </del>
              <q-tooltip>
                Marcacion faltante
              </q-tooltip>
            </div>
          </div>
        </div>
        <q-popover anchor="bottom middle" self="top middle" class="q-pa-md">
          hello
        </q-popover>
      </div>
    </div>
  </q-page>
</template>

<script>
import AttReportCell from 'components/AttReportCell'
import { HR_ATT_REPORT, HR_EMPLOYEE } from 'assets/apiRoutes'
import attTypes from 'assets/attType'
const { ATT_BREAKTIME, ATT_WORK, ATT_TIMEOFF } = attTypes
import {
  // requiredIf,
  // requiredUnless,
  // minLength,
  // maxLength,
  // minValue,
  // maxValue,
  // between,
  // alpha,
  // alphaNum,
  // numeric,
  // email,
  // ipAddress,
  // macAddress,
  // sameAs,
  // url,
  // or,
  // and,
  // withParams,
  required
} from 'vuelidate/lib/validators'
export default {
  name: 'HRReport',
  components: {
    AttReportCell
  },
  data () {
    return {
      attType: {
        ATT_BREAKTIME,
        ATT_WORK,
        ATT_TIMEOFF
      },
      report: null,
      reportParams: {
        from: null,
        to: null,
        employee_id: []
      },
      options: {
        employee_id: []
      }
    }
  },
  validations: {
    reportParams: {
      from: { required },
      to: { required },
      employee_id: { required }
    }
  },
  computed: {
    dates () {
      if (!this.report || !this.report[0] || !this.report[0].attendance) return []

      return this.report[0].attendance.map(att => att.date)
    },
    data () {
      return this.report ? this.report : []
    },
    columns () {
      return [
        {
          name: 'employee',
          field: row => row.employee.name_first + ' ' + row.employee.name_paternal,
          label: 'Nombre del Empleado',
          sort: true
        },
        ...this.dates.map(date => ({
          name: date,
          label: this.$date.formatDate(date, 'DD/MM/YYYY'),
          field: row => row.attendance.find(att => att.date === date)
        }))
      ]
    }
  },
  methods: {
    filterTimetables (timetable) {
      return timetable.filter(t => t.type_id !== ATT_BREAKTIME)
    },
    refresh () {
      Promise.all([
        this.$axios.get(HR_EMPLOYEE)
      ]).then(response => {
        this.options.employee_id = (response[0] && response[0].data) ? response[0].data.map(e => ({
          value: e.employee_id,
          label: e.name_first + ' ' + e.name_paternal,
          stamp: e.zktime_id
        })) : []
      }).catch(() => {

      })
    },
    fetch () {
      this.report = null
      this.$axios.get(HR_ATT_REPORT, {
        params: this.reportParams
      })
        .then(response => {
          this.report = response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
