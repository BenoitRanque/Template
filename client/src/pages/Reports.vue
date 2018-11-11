<template>
  <q-page>
    <q-table
      ref="table"
      :data="table.data"
      :columns="tableColumns"
      :filter="table.filter"
      row-key="id"
      :pagination.sync="table.pagination"
      :loading="table.loading"
      @request="request"
    >
      <template slot="top-left" slot-scope="props">
        <div class="row full-width no-wrap">
          <div class="col-auto">
            <q-search hide-underline v-model="table.filter" />
          </div>
          <div class="col-auto">
            <employee-select hide-underline placeholder="Filtrar Por Empleado" v-model="table.employeesFilter" multiple></employee-select>
          </div>
          <div class="col-auto">
            <q-datetime hide-underline placeholder="Desde" v-model="table.from" :max="table.to"></q-datetime>
          </div>
          <div class="col-auto">
            <q-datetime hide-underline placeholder="Desde" v-model="table.to" :min="table.from"></q-datetime>
          </div>
        </div>
      </template>

      <q-td slot="body-cell-nameFull" slot-scope="props" :props="props">
        <q-btn
          @click="$router.push({ path: '/Employees', query: { employeeId: props.row.id } })"
          icon-right="open_in_new"
          color="secondary" size="sm" flat dense
        >
          {{props.row.nameFull}}
          <q-tooltip>Ir a Empleado</q-tooltip>
        </q-btn>
      </q-td>

      <attendance-report-cell
        v-for="(date, index) in dates"
        :slot="`body-cell-${date}`"
        :key="index"
        :index="index"
        slot-scope="props"
        :props="props"
      ></attendance-report-cell>
    </q-table>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { EmployeeAttendanceReportPaginationQuery } from 'assets/queries/Employee.graphql'
import EmployeeSelect from 'components/EmployeeSelect'
import AttendanceReportCell from 'components/AttendanceReportCell'

const YESTERDAY = date.subtractFromDate(date.startOfDate(new Date(), 'day'), { days: 1 })

export default {
  name: 'Reports',
  components: { EmployeeSelect, AttendanceReportCell },
  data () {
    return {
      table: {
        data: [],
        employeesFilter: [],
        filter: '',
        from: date.subtractFromDate(YESTERDAY, { days: 6 }),
        to: YESTERDAY,
        loading: false,
        pagination: {
          sortBy: null,
          descending: false,
          page: 1,
          rowsPerPage: 10, // current rows per page being displayed
          rowsNumber: 0
        }
      }
    }
  },
  watch: {
    'table.employeesFilter': function () {
      this.request()
    },
    'table.from': function () {
      this.request()
    },
    'table.to': function () {
      this.request()
    }
  },
  computed: {
    dates () {
      if (this.table.data && this.table.data[0] && this.table.data[0].attendanceReport && this.table.data[0].attendanceReport.dates) {
        return this.table.data[0].attendanceReport.dates.map(({ date }) => date)
      }
      return []
    },
    tableColumns () {
      return [
        {
          name: 'nameFull',
          label: 'Empleado',
          align: 'left'
        },
        ...this.dates.map((date, index) => ({
          name: date,
          label: this.formatDate(date, 'ddd DD/MM/YYYY'),
          field: row => row.attendanceReport.dates[1].date,
          align: 'left'
        }))
      ]
    }
  },
  methods: {
    formatDate: date.formatDate,
    request (criteria) {
      if (!this.table.from || !this.table.to) return

      const { filter, pagination } = {
        filter: this.table.filter,
        pagination: this.table.pagination,
        ...criteria
      }

      const PARAMETERS = {
        withExceptions: true,
        withHolidays: true,
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        from: this.table.from,
        to: this.table.to,
        where: {}
      }

      if (filter.length > 0) {
        PARAMETERS.where.OR = [
          { nameFirst_contains: filter },
          { nameMiddle_contains: filter },
          { namePaternal_contains: filter },
          { nameMaternal_contains: filter },
          { cargo_contains: filter },
          { department: { name_contains: filter } }
        ]
      }

      if (this.table.employeesFilter.length > 0) {
        PARAMETERS.where.id_in = this.table.employeesFilter
      }

      this.table.loading = true
      this.$gql.request(EmployeeAttendanceReportPaginationQuery, PARAMETERS)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data
          this.table.loading = false
        })
        .catch(error => {
          this.table.loading = false
          this.$defaultErrorHandler(error)
        })
    }
  },
  mounted () {
    this.request()
  }
}
</script>

<style scoped>

</style>
