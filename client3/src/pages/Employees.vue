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

      <employee-table-cell v-for="field in editableFields"
        :key="field.name"
        :slot="`body-cell-${field.name}`"
        slot-scope="props"
        :props="props"
        :type="field.type"
        :field="field.name"
        :options="field.type === 'select' ? selectOptions[field.name] : null"
        @update="$set(props.row.update, field.name, $event)"
        @revert="$delete(props.row.update, field.name)"
      ></employee-table-cell>

      <q-td class="group" slot="body-cell-actions" slot-scope="props" :props="props">
        <q-btn
          @click="$router.push({ path: '/Shifts', query: { employeeID: props.row.id } })"
          color="secondary" size="sm" rounded outline dense
        >Horarios</q-btn>
        <q-btn
          @click="$router.push({ path: '/Exceptions', query: { employeeID: props.row.id } })"
          color="secondary" size="sm" rounded outline dense
        >Boletas</q-btn>
        <q-btn
          @click="$router.push({ path: '/Reports', query: { employeeID: props.row.id } })"
          color="primary" size="sm" rounded outline dense
        >Reportes</q-btn>
      </q-td>

      <q-td class="group" slot="body-cell-update" slot-scope="props" :props="props">
        <q-btn
          @click="update(props.row)"
          :disable="!Object.keys(props.row.update).length"
          color="secondary" size="sm" rounded dense
        >Actualizar</q-btn>
      </q-td>
    </q-table>
    <pre>
      {{table}}
    </pre>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
import EmployeeTableCell from 'components/EmployeeTableCell'

const QUERY_EMPLOYEES = gql`
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

const UPDATE_EMPLOYEE = gql`
  mutation ($where: EmployeeWhereUniqueInput! $data: EmployeeUpdateInput!) {
    updateEmployee (where: $where data: $data) {
      updatedAt
    }
  }
`

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
    type: 'select'
  },
  {
    name: 'personaConDiscapacidad',
    label: 'Persona Con Discapacidad',
    type: 'select'
  },
  {
    name: 'tutorPersonaConDiscapacidad',
    label: 'Tuto de Persona Con Discapacidad',
    type: 'select'
  },
  {
    name: 'cajaDeSalud',
    label: 'Caja De Salud',
    type: 'select'
  },
  {
    name: 'aportaAFP',
    label: 'Aporta AFP',
    type: 'select'
  },
  {
    name: 'AFP',
    label: 'AFP',
    type: 'select'
  }
]

export default {
  name: 'Employees',
  components: { EmployeeTableCell },
  data () {
    return {
      selectOptions: {
        sex: [{ label: 'Masculino', value: 'M' }, { label: 'Feminino', value: 'F' }],
        documentType: [],
        jubilado: [],
        personaConDiscapacidad: [],
        tutorPersonaConDiscapacidad: [],
        cajaDeSalud: [],
        aportaAFP: [],
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
            name: 'actions',
            required: true
          },
          {
            name: 'update',
            required: true
          }
        ],
        filter: '',
        loading: false,
        visibleColumns: tableFields.map(({ name }) => name),
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
      const { pagination, filter } = {
        pagination: this.table.pagination,
        filter: this.table.filter,
        ...criteria
      }

      const parameters = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1)
      }

      if (filter.length > 0) {
        parameters.where = {
          OR: [
            { nameFirst_contains: filter },
            { nameMiddle_contains: filter },
            { namePaternal_contains: filter },
            { nameMaternal_contains: filter }
          ]
        }
        if (!isNaN(Number(filter))) {
          parameters.where.OR.push({ zkTimePin: Number(filter) })
        }
      }

      if (pagination.sortBy !== null) {
        parameters.orderBy = `${pagination.sortBy}_${pagination.descending ? 'DESC' : 'ASC'}`
      }

      this.table.loading = true
      this.$gql.request(QUERY_EMPLOYEES, parameters)
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
        .catch(error => console.log(error))
        .finally(() => {
          this.table.loading = false
        })
    },
    update (employee) {
      const parameters = employee

      employee.updating = false
      this.gql(UPDATE_EMPLOYEE, parameters)
        .then(() => {

        })
        .catch(error => console.log(error))
        .finally(() => {
          employee.updating = false
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
