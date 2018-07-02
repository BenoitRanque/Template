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
    <div class="q-pa-lg bg-blue-3">
      <pre>
        {{report}}
      </pre>
    </div>
  </q-page>
</template>

<script>
import { HR_ATT_REPORT, HR_EMPLOYEE } from 'assets/apiRoutes'
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
  data () {
    return {
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
  methods: {
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
