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
        <div class="row">
          <div class="col-6">
            <q-search hide-underline v-model="table.filter.search" />
          </div>
          <div class="col-6">
            <employee-select></employee-select>
          </div>
        </div>
      </template>

      <template slot="top-right" slot-scope="props">
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="table.visibleColumns"
          :columns="table.columns"
        />
      </template>

      <template v-for="field in editableFields" :slot="`body-cell-${field.name}`" slot-scope="props">
        <table-cell-edit
          :key="field.name"
          :props="props"
          :type="field.type"
          :field="field.name"
          :options="field.type === 'select' ? options[field.name] : options.boolean"
          @update="$set(props.row.update, field.name, $event)"
          @revert="$delete(props.row.update, field.name)"
        ></table-cell-edit>
      </template>

      <q-td slot="body-cell-links" class="group" slot-scope="props" :props="props">
        <q-btn
          @click="$router.push({ path: '/Shifts', query: { employeeId: props.row.employee.id } })"
          icon-right="open_in_new"
          color="secondary" size="sm" flat dense
        >
          Empleado
          <q-tooltip>Ir a Empleado</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
import TableCellEdit from 'components/TableCellEdit'
import EmployeeSelect from 'components/EmployeeSelect'

export default {
  name: 'Exceptions',
  components: { TableCellEdit, EmployeeSelect },
  data () {
    return {
      employeeFilter: [],
      table: {
        data: [],
        columns: [
          {
            name: 'links',
            required: true,
            // label: 'Vínculos Externos',
            align: 'center'
          }
        ],
        filter: {
          search: '',
          employee: []
        },
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
  methods: {
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
      const { search, employees } = {
        search: '',
        employees: [],
        ...filter
      }

      const PARAMETERS = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        where: {}
      }

      if (search.length > 0) {
        PARAMETERS.where.OR = [
          { description_contains: search },
          { employee: { nameFirst_contains: search } },
          { employee: { nameMiddle_contains: search } },
          { employee: { namePaternal_contains: search } },
          { employee: { nameMaternal_contains: search } },
          { employee: { cargo_contains: search } },
          { employee: { department: { name_contains: search } } }
        ]
      }

      if (employees.length > 0) {
        PARAMETERS.employee = { id_in: Array.isArray(employees) ? employees : [ employees ] }
      }

      if (pagination.sortBy !== null) {
        PARAMETERS.orderBy = `${pagination.sortBy}_${pagination.descending ? 'DESC' : 'ASC'}`
      }

      this.table.loading = true
      this.$gql.request(QUERY, PARAMETERS)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data.map(employee => ({
            id: employee.id,
            data: employee,
            update: {},
            updating: false
          }))
        })
        .catch(this.$defaultErrorHandler)
        .finally(() => {
          this.table.loading = false
        })
    }
  },
  mounted () {
    this.request(this.$route.query && this.$route.query.employeeId ? { filter: { employees: this.$route.query.employeeId } } : {})
  }
}
</script>

<style scoped>

</style>
