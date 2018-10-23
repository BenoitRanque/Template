<template>
  <q-page>
    <q-table
      ref="table"
      :data="table.data"
      :columns="table.columns"
      :filter="table.filter"
      row-key="id"
      :pagination.sync="table.pagination"
      :loading="table.loading"
      :visible-columns="table.visibleColumns"
      @request="request"
    >
      <template slot="top-left" slot-scope="props">
        <div class="col-6">
          <q-search hide-underline v-model="table.filter" />
        </div>
        <div class="col-6">
          <employee-select hide-underline placeholder="Filtrar Por Empleado" v-model="table.employeesFilter" multiple></employee-select>
        </div>
      </template>

      <template slot="top-right" slot-scope="props">
        <q-btn icon="add"></q-btn>
      </template>
      <!-- <table-cell-edit v-for="field in editableFields"
        :key="field.name"
        :slot="`body-cell-${field.name}`"
        slot-scope="props"
        :props="props"
        :type="field.type"
        :field="field.name"
        :options="field.type === 'select' ? options[field.name] : options.boolean"
        @update="$set(props.row.update, field.name, $event)"
        @revert="$delete(props.row.update, field.name)"
      ></table-cell-edit> -->

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
          icon="more_vert"
          color="secondary" size="md" flat dense
        >
          <q-tooltip>Ver detalles de horario</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
import TableCellEdit from 'components/TableCellEdit'
import EmployeeSelect from 'components/EmployeeSelect'
import { date } from 'quasar'

export default {
  name: 'Shifts',
  components: { TableCellEdit, EmployeeSelect },
  data () {
    return {
      employeeFilter: [],
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
    formatDate: date.formatDate,
    request (criteria) {
      const QUERY = gql`
        query ($first: Int! $skip: Int! $orderBy: ShiftOrderByInput $where: ShiftWhereInput) {
          meta: shiftsConnection (where: $where) {
            aggregate {
              count
            }
          }
          data: shifts (first: $first skip: $skip orderBy: $orderBy where: $where) {
            id
            description
            employee {
              id
              nameFull
            }
            startDate
            endDate
            startIndex
            slots (orderBy: index_ASC) {
              index
              schedule {
                id
                description
              }
            }
            owner {
              id
              username
            }
          }
        }
      `
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
      this.$gql.request(QUERY, PARAMETERS)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data
        })
        .catch(error => console.log(error))
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
