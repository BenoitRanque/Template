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
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="table.visibleColumns"
          :columns="table.columns"
        />
        <q-btn round color="positive" @click="createEmployeeModal = true" icon="add"></q-btn>
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

      <template slot="body-cell-department" slot-scope="props">
        <table-cell-edit
          :props="props"
          type="select"
          field="department"
          :options="options.department"
          @update="$set(props.row.update, 'department', $event)"
          @revert="$delete(props.row.update, 'department')"
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

    <q-modal v-model="createEmployeeModal">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            Empleado
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <div class="q-pa-md">
          <employee-form @create="createEmployeeModal = false; request()"></employee-form>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { EmployeePagination, UpdateEmployeeMutation, EmployeeFieldOptionLabels } from 'assets/queries/Employee.graphql'
import TableCellEdit from 'components/TableCellEdit'
import EmployeeSelect from 'components/EmployeeSelect'
import EmployeeForm from 'components/EmployeeForm'

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
  components: { TableCellEdit, EmployeeSelect, EmployeeForm },
  data () {
    return {
      createEmployeeModal: false,
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
            field: row => row.department,
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
        employeesFilter: [],
        loading: false,
        visibleColumns: ['nameFirst', 'namePaternal', 'cargo', 'department'],
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
  watch: {
    'table.employeesFilter': function () {
      this.request()
    }
  },
  methods: {
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
          { id: filter },
          { nameFirst_contains: filter },
          { nameMiddle_contains: filter },
          { namePaternal_contains: filter },
          { nameMaternal_contains: filter },
          { cargo_contains: filter },
          { department: { name_contains: filter } }
        ]
        if (!isNaN(Number(filter))) {
          PARAMETERS.where.OR.push({ zkTimePin: Number(filter) })
        }
      }

      if (this.table.employeesFilter.length > 0) {
        PARAMETERS.where.id_in = this.table.employeesFilter
      }

      if (pagination.sortBy !== null) {
        PARAMETERS.orderBy = `${pagination.sortBy}_${pagination.descending ? 'DESC' : 'ASC'}`
      }

      this.table.loading = true
      this.$gql.request(EmployeePagination, PARAMETERS)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data.map(employee => ({
            id: employee.id,
            data: {
              ...employee,
              department: employee.department ? employee.department.id : null
            },
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
      const update = {
        ...employee.update
      }
      if (update.department !== undefined) update.department = { connect: { id: update.department } }

      const PARAMETERS = { where: { id: employee.data.id }, data: update }

      employee.updating = true
      this.$gql.request(UpdateEmployeeMutation, PARAMETERS)
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
      this.$gql.request(EmployeeFieldOptionLabels)
        .then(response => {
          this.options = {
            ...response,
            department: response.departments.map(({ id, name }) => ({
              value: id,
              label: name
            }))
          }
        })
        .catch(this.$defaultErrorHandler)
    }
  },
  mounted () {
    this.loadFieldOptionLabels()
    if (this.$route.query && this.$route.query.employeeId) {
      this.table.employeesFilter = Array.isArray(this.$route.query.employeeId) ? this.$route.query.employeeId : [ this.$route.query.employeeId ]
    }
    this.request()
  }
}
</script>

<style scoped>

</style>
