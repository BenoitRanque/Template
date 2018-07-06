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
        <q-select v-model="reportParams.employee_id" :options="options.employee_id"></q-select>
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
      <att-report-cell slot="body-cell-timetable" slot-scope="props" :attendance="props.row" :att-types="[]"></att-report-cell>
      <!-- <div slot="body-cell-timetable" slot-scope="props" class="row full-height items-center">
        <template v-for="(timetable, index) in props.row.timetable.filter(t => t.type_id !== attType.ATT_BREAK)">
          <div class="col-auto q-caption" :key="'A'+index">
            {{$date.formatDate(timetable.start_time, 'HH:mm')}}
            <br/>
            {{$date.formatDate(timetable.start_event, 'HH:mm')}}
          </div>
          <div class="col" :key="'B'+index"></div>
          <div class="col-auto q-caption" :key="'C'+index">
            {{$date.formatDate(timetable.end_time, 'HH:mm')}}
            <br/>
            {{$date.formatDate(timetable.end_event, 'HH:mm')}}

          </div>
        </template>
      </div> -->
    </q-table>
    <div v-for="(day, index) in report.attendance" :key="index" class="q-ma-sm shadow-3">
      {{$date.formatDate(day.date, 'YYYY/MM/DD')}}
    <div class="row">
      <div class="col">
        <div v-for="(timetable, index) in day.timetable" :key="index">
            <div>
              duration: {{$date.formatDate(timetable.duration, 'HH:mm')}}
            </div>
            <div>
              start:
              {{$date.formatDate(timetable.start_event, 'HH:mm')}}
              {{$date.formatDate(timetable.start_time, 'HH:mm')}}
            </div>
            <div>
              end:
              {{$date.formatDate(timetable.end_event, 'HH:mm')}}
              {{$date.formatDate(timetable.end_time, 'HH:mm')}}
            </div>
          </div>
        </div>
        <div class="col">
          <pre>
            {{day.balance}}
          </pre>
        </div>
      </div>
    </div>
    <div class="q-pa-lg bg-blue-3">
      <pre>
        {{report}}
      </pre>
    </div>
  </q-page>
</template>

<script>
import AttReportCell from 'components/AttReportCell'
import { HR_ATT_REPORT, HR_EMPLOYEE } from 'assets/apiRoutes'
import { ATT_BREAK, ATT_WORK, ATT_TIMEOFF } from 'assets/attType'
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
        ATT_BREAK,
        ATT_WORK,
        ATT_TIMEOFF
      },
      report: null,
      reportParams: {
        from: null,
        to: null,
        employee_id: null
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
    data () {
      return this.report && this.report.attendance ? this.report.attendance : []
    },
    columns () {
      return [
        {
          name: 'date',
          field: row => this.$date.formatDate(row.date, 'DD/MM/YYYY'),
          sort: true
        },
        {
          name: 'timetable'
        }
      ]
    }
  },
  methods: {
    filterTimetables (timetable) {
      return timetable.filter(t => t.type_id !== ATT_BREAK)
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
