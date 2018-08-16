<template>
  <q-page>
    <q-table
      :filter="filter"
      :data="data"
      :columns="columns"
      :loading="loading"
    >
      <template slot="top-left" slot-scope="props">
        <q-btn class="q-mr-sm" round flat color="primary" icon="refresh" size="md" @click="fetch()" />
        <q-search hide-underline color="secondary"  v-model="filter" class="col-6" />
      </template>

      <template slot="top-right" slot-scope="props">
        <q-datetime float-label="desde" v-model="reportParams.from"></q-datetime>
        <q-datetime float-label="hasta" v-model="reportParams.to"></q-datetime>
        <q-select float-label="empleados" filter multiple v-model="reportParams.employee_id" :options="subordinateEmployeeOptions"></q-select>
      </template>

      <att-report-cell v-for="(date, index) in dates" :key="index" :slot="`body-cell-${date}`" slot-scope="props" :value="props.row.attendance.find(att => att.date === date)"></att-report-cell>
    </q-table>
    <!-- <pre>{{report}}</pre> -->
  </q-page>
</template>

<script>
import AttReportCell from 'components/AttReportCell'
import { HR_ATT_REPORT } from 'assets/apiRoutes'
import { mapGetters } from 'vuex'
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
      filter: '',
      loading: false,
      report: null,
      reportParams: {
        from: null,
        to: null,
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
    ...mapGetters('hr', {
      subordinateEmployeeOptions: 'subordinateEmployeeOptions'
    }),
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
          label: this.$date.formatDate(date, 'DDD DD/MM/YYYY'),
          field: row => row.attendance.find(att => att.date === date)
        }))
      ]
    }
  },
  methods: {
    fetch () {
      this.report = null
      this.loading = true
      this.$axios.get(HR_ATT_REPORT, {
        params: this.reportParams
      })
        .then(response => {
          this.loading = false
          this.report = response.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
