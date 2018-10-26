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
          <div class="col-auto">
            <q-select multiple hide-underline v-model="table.statusFilter" placeholder="Filtrar Por Estado" :options="options.statusFilter"></q-select>
          </div>
        </div>
      </template>

      <template slot="top-right" slot-scope="props">
        <q-btn round color="positive" @click="activeExceptionModal = true" icon="add"></q-btn>
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
          @click="viewException(props.row)"
        >
          <q-tooltip>Ver detalles de horario</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>
    <q-modal v-model="activeExceptionModal" @hide="activeExceptionId = null">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Boleta
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <div class="q-pa-md">
          <exception-authorization-form
            :exception-id="activeExceptionId"
            @created="activeExceptionModal = false; request()"
          ></exception-authorization-form>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { ExceptionsPaginationQuery } from 'assets/queries/Exception.graphql'
import EmployeeSelect from 'components/EmployeeSelect'
import ExceptionAuthorizationForm from 'components/ExceptionAuthorizationForm'
import { date } from 'quasar'

export default {
  name: 'Exceptions',
  components: { EmployeeSelect, ExceptionAuthorizationForm },
  data () {
    return {
      options: {
        statusFilter: [
          {
            value: 'PENDING',
            label: 'Pendientes'
          },
          {
            value: 'APROVED',
            label: 'Aprobadas'
          },
          {
            value: 'DENIED',
            label: 'Denegadas'
          }
        ]
      },
      activeExceptionId: null,
      activeExceptionModal: false,
      table: {
        employeeFilter: [],
        statusFilter: ['PENDING'],
        data: [],
        columns: [
          {
            name: 'status',
            field: row => {
              if (!row.authorization) return 'PENDIENTE'
              return row.authorization.granted ? 'APROBADA' : 'DENEGADA'
            },
            label: 'Estado',
            align: 'left'
          },
          {
            name: 'employee',
            align: 'left',
            label: 'Empleado'
          },
          {
            name: 'owner',
            field: row => row.owner ? row.owner.username : '',
            label: 'Solicitada Por',
            align: 'left'
          },
          {
            name: 'createdAt',
            field: row => this.formatDate(row.createdAt, 'HH:mm - DD/MM/YYYY'),
            label: 'Fecha Solicitud',
            align: 'left'
          },
          {
            name: 'authorizationOwner',
            field: row => row.authorization && row.authorization.owner ? row.authorization.owner.username : '',
            label: 'Aprobada Por',
            align: 'left'
          },
          {
            name: 'authorizationCreatedAt',
            field: row => row.authorization ? this.formatDate(row.authorization.createdAt, 'HH:mm - DD/MM/YYYY') : '',
            label: 'Fecha Aprobacion',
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
    },
    'table.statusFilter': function () {
      this.request()
    }
  },
  methods: {
    viewException (row) {
      this.activeExceptionId = row.id
      this.activeExceptionModal = true
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
        where: { AND: [] }
      }

      if (filter.length > 0) {
        PARAMETERS.where.AND.push({
          OR: [
            { employee: { nameFirst_contains: filter } },
            { employee: { nameMiddle_contains: filter } },
            { employee: { namePaternal_contains: filter } },
            { employee: { nameMaternal_contains: filter } },
            { employee: { cargo_contains: filter } },
            { employee: { department: { name_contains: filter } } }
          ]
        })
      }

      if (this.table.employeesFilter.length > 0) {
        PARAMETERS.where.AND.push({
          id_in: this.table.employeesFilter
        })
      }

      if (this.table.statusFilter.length > 0) {
        const statusFilter = []

        if (this.table.statusFilter.includes('PENDING')) {
          statusFilter.push({ authorization: null })
        }

        if (this.table.statusFilter.includes('AUTHORIZED')) {
          statusFilter.push({ authorization: { granted: true } })
        }

        if (this.table.statusFilter.includes('DENIED')) {
          statusFilter.push({ authorization: { granted: false } })
        }

        PARAMETERS.where.AND.push({ OR: statusFilter })
      }

      this.table.loading = true
      this.$gql.request(ExceptionsPaginationQuery, PARAMETERS)
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
