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
        <q-search hide-underline v-model="table.filter" />
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
          @click="$router.push({ path: '/Shifts', query: { employeeId: props.row.id } })"
          icon-right="open_in_new"
          color="secondary" size="sm" flat dense
        >
          Horarios
          <q-tooltip>Ir a Horarios</q-tooltip>
        </q-btn>
        <q-btn
          @click="$router.push({ path: '/Exceptions', query: { employeeId: props.row.id } })"
          icon-right="open_in_new"
          color="secondary" size="sm" flat dense
        >
          Boletas
          <q-tooltip>Ir a Boletas</q-tooltip>
        </q-btn>
        <q-btn
          @click="$router.push({ path: '/Reports', query: { employeeId: props.row.id } })"
          icon-right="open_in_new"
          color="primary" size="sm" flat dense
        >
          Reportes
          <q-tooltip>Ir a Reportes</q-tooltip>
        </q-btn>
      </q-td>

      <q-td slot="body-cell-save" slot-scope="props" :props="props">
        <q-btn
          v-if="Object.keys(props.row.update).length"
          @click="save(props.row)"
          icon="save"
          color="secondary"
          size="sm"
          round
          dense
          outline
        >
          <q-tooltip class="text-no-wrap">Guardar Cambios</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
import TableCellEdit from 'components/TableCellEdit'

const tableFields = [
  {
    name: 'zkTimePin',
    label: 'PIN ZKTime',
    type: 'number'
  },
  {
    name: 'nameFirst',
    label: 'Primer Nombre',
    type: 'text'
  },
  {
    name: 'nameMiddle',
    label: 'Segundo Nombre',
    type: 'text'
  },
  {
    name: 'namePaternal',
    label: 'Apellido Paterno',
    type: 'text'
  },
  {
    name: 'nameMaternal',
    label: 'Apellido Materno',
    type: 'text'
  },
  {
    name: 'cargo',
    label: 'Cargo',
    type: 'text'
  },
  {
    name: 'documentType',
    label: 'Tipo de Documento',
    type: 'select'
  },
  {
    name: 'documentNumber',
    label: 'Numero de Documento',
    type: 'text'
  },
  {
    name: 'sex',
    label: 'Sexo',
    type: 'select'
  },
  {
    name: 'dateOfBirth',
    label: 'Fecha de Nacimiento',
    type: 'date'
  },
  {
    name: 'jubilado',
    label: 'Jubilado',
    type: 'boolean'
  },
  {
    name: 'personaConDiscapacidad',
    label: 'Persona Con Discapacidad',
    type: 'boolean'
  },
  {
    name: 'tutorPersonaConDiscapacidad',
    label: 'Tuto de Persona Con Discapacidad',
    type: 'boolean'
  },
  {
    name: 'cajaDeSalud',
    label: 'Caja De Salud',
    type: 'select'
  },
  {
    name: 'aportaAFP',
    label: 'Aporta AFP',
    type: 'boolean'
  },
  {
    name: 'AFP',
    label: 'AFP',
    type: 'select'
  }
]

export default {
  name: 'Employees',
  components: { TableCellEdit },
  data () {
    return {
      options: {
        boolean: [],
        sex: [],
        documentType: [],
        cajaDeSalud: [],
        AFP: []
      },
      table: {
        data: [],
        columns: [
          ...tableFields.map(({ name, label, type }) => ({
            name,
            label,
            sortable: true,
            align: 'left'
          })),
          {
            name: 'department',
            label: 'Departamento',
            field: row => row.data.department ? row.data.department.name : null,
            align: 'left'
          },
          {
            name: 'links',
            required: true,
            // label: 'Vínculos Externos',
            align: 'center'
          },
          {
            name: 'save',
            label: 'Guardar',
            required: true,
            align: 'center'
          }
        ],
        filter: '',
        loading: false,
        visibleColumns: ['nameFirst', 'namePaternal', 'cargo'],
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
  computed: {
    editableFields () {
      return tableFields.map(({ name, type }) => ({ name, type }))
    },
    visibleColumnOptions () {
      return tableFields.map(({ name, label }) => ({ value: name, label }))
    }
  },
  methods: {
    request (criteria) {
      const QUERY = gql`
        query ($first: Int! $skip: Int! $orderBy: EmployeeOrderByInput $where: EmployeeWhereInput) {
          meta: employeesConnection (where: $where) {
            aggregate {
              count
            }
          }
          data: employees (first: $first skip: $skip orderBy: $orderBy where: $where) {
            id
            zkTimePin
            nameFirst
            nameMiddle
            namePaternal
            nameMaternal
            cargo
            department {
              name
            }
            documentType
            documentNumber
            sex
            dateOfBirth
            nationality
            jubilado
            personaConDiscapacidad
            tutorPersonaConDiscapacidad
            cajaDeSalud
            aportaAFP
            AFP
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
        skip: pagination.rowsPerPage * (pagination.page - 1)
      }

      if (filter.length > 0) {
        PARAMETERS.where = {
          OR: [
            { id: filter },
            { nameFirst_contains: filter },
            { nameMiddle_contains: filter },
            { namePaternal_contains: filter },
            { nameMaternal_contains: filter },
            { cargo_contains: filter },
            { department: { name_contains: filter } }
          ]
        }
        if (!isNaN(Number(filter))) {
          PARAMETERS.where.OR.push({ zkTimePin: Number(filter) })
        }
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
    },
    save (employee) {
      const QUERY = gql`
        mutation ($where: EmployeeWhereUniqueInput! $data: EmployeeUpdateInput!) {
          employee: updateEmployee (where: $where data: $data) {
            nameFull
          }
        }
      `
      const { data, update } = employee
      const PARAMETERS = { where: { id: data.id }, data: update }

      employee.updating = true
      this.$gql.request(QUERY, PARAMETERS)
        .then(response => {
          this.$q.notify({ type: 'positive', message: `Empleado ${response.employee.nameFull} actualizado` })
          this.request()
        })
        .catch(this.$defaultErrorHandler)
        .finally(() => {
          employee.updating = false
        })
    },
    loadFieldOptionLabels () {
      const QUERY = gql`
        query {
          boolean: fieldOptionLabels(where: {
            field: "Boolean"
          }) {
            value
            label
          }
          sex: fieldOptionLabels(where: {
            field: "EmployeeSex"
          }) {
            value
            label
          }
          documentType: fieldOptionLabels(where: {
            field: "EmployeeDocumentType"
          }) {
            value
            label
          }
          cajaDeSalud: fieldOptionLabels(where: {
            field: "EmployeeCajaDeSalud"
          }) {
            value
            label
          }
          AFP: fieldOptionLabels(where: {
            field: "EmployeeAFP"
          }) {
            value
            label
          }
        }
      `
      this.$gql.request(QUERY)
        .then(response => {
          this.options = response
        })
        .catch(this.$defaultErrorHandler)
    }
  },
  mounted () {
    this.loadFieldOptionLabels()
    this.request(this.$route.query && this.$route.query.employeeId ? { filter: this.$route.query.employeeId } : {})
  }
}
</script>

<style scoped>

</style>
