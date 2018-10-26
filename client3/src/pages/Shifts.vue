<template>
  <q-page>
    <q-table
      :data="table.data"
      :columns="table.columns"
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
        </div>
      </template>

      <template slot="top-right" slot-scope="props">
        <q-btn round color="positive" @click="activeShiftModal = true" icon="add"></q-btn>
      </template>

      <q-td slot="body-cell-employee" class="group" slot-scope="props" :props="props">
        <q-btn
          @click="$router.push({ path: '/Employees', query: { employeeId: props.row.employee.id } })"
          icon-right="open_in_new"
          color="secondary" size="sm" flat dense
        >
          {{props.row.employee.nameFull}}
          <q-tooltip>Ir a Empleado</q-tooltip>
        </q-btn>
      </q-td>

      <q-td slot="body-cell-actions" class="group" slot-scope="props" :props="props">
        <q-btn
          icon="schedule"
          color="secondary" size="md" flat dense
          @click="viewShift(props.row)"
        >
          <q-tooltip>Ver detalles de horario</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>
    <q-modal v-model="activeShiftModal" @hide="activeShiftId = null">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Horario
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <div class="q-pa-md">
          <shift-form
            :shift-id="activeShiftId"
            @created="activeShiftModal = false; request()"
            @updated="activeShiftModal = false; request()"
            @deleted="activeShiftModal = false; request()"
          ></shift-form>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { ShiftsPagination } from 'assets/queries/Shift.graphql'
import TableCellEdit from 'components/TableCellEdit'
import EmployeeSelect from 'components/EmployeeSelect'
import ShiftForm from 'components/ShiftForm'
import { date } from 'quasar'

export default {
  name: 'Shifts',
  components: { TableCellEdit, EmployeeSelect, ShiftForm },
  data () {
    return {
      activeShiftId: null,
      activeShiftModal: false,
      table: {
        data: [],
        columns: [
          {
            name: 'employee',
            align: 'left',
            label: 'Empleado'
          },
          {
            name: 'description',
            field: 'description',
            label: 'Descripcion',
            sortable: true,
            align: 'left'
          },
          {
            name: 'startDate',
            field: row => this.formatDate(row.startDate, 'DD/MM/YYYY'),
            label: 'Fecha Inicial',
            sortable: true,
            align: 'left'
          },
          {
            name: 'endDate',
            field: row => this.formatDate(row.endDate, 'DD/MM/YYYY'),
            label: 'Fecha Final',
            sortable: true,
            align: 'left'
          },
          {
            name: 'actions',
            required: true,
            // label: 'Vínculos Externos',
            align: 'center'
          }
        ],
        employeesFilter: [],
        filter: '',
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
    }
  },
  methods: {
    viewShift (row) {
      this.activeShiftId = row.id
      this.activeShiftModal = true
    },
    formatDate: date.formatDate,
    request (criteria) {
      if (!criteria) criteria = {}
      const { pagination, filter } = {
        pagination: this.table.pagination,
        filter: this.table.filter,
        ...criteria
      }

      const PARAMETERS = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        where: {}
      }

      if (filter.length > 0) {
        PARAMETERS.where.OR = [
          { description_contains: filter },
          { employee: { nameFirst_contains: filter } },
          { employee: { nameMiddle_contains: filter } },
          { employee: { namePaternal_contains: filter } },
          { employee: { nameMaternal_contains: filter } },
          { employee: { cargo_contains: filter } },
          { employee: { department: { name_contains: filter } } }
        ]
      }

      if (this.table.employeesFilter.length > 0) {
        PARAMETERS.where.employee = { id_in: this.table.employeesFilter }
      }

      if (pagination.sortBy !== null) {
        PARAMETERS.orderBy = `${pagination.sortBy}_${pagination.descending ? 'DESC' : 'ASC'}`
      }

      this.table.loading = true
      this.$gql.request(ShiftsPagination, PARAMETERS)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data
        })
        .catch(this.$defaultErrorHandler)
        .finally(() => {
          this.table.loading = false
        })
    }
  },
  mounted () {
    if (this.$route.query && this.$route.query.employeeId) {
      this.table.employeesFilter = Array.isArray(this.$route.query.employeeId) ? this.$route.query.employeeId : [ this.$route.query.employeeId ]
    }
    this.request()
  }
}
</script>

<style scoped>

</style>
