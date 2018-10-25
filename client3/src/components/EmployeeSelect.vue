<template>
  <q-input-frame @click.native="showModal" v-bind="$attrs" class="q-select">

    <div class="col q-input-target text-truncate" :class="{ 'q-input-target-placeholder': !hasValue }">
      {{hasValue ? label : placeholder}}
    </div>

    <q-icon v-if="!readonly && hasValue" slot="after" :name="$q.icon.input.clear" @click.native="clear" class="q-if-control"></q-icon>
    <q-icon slot="after" :name="$q.icon.input.dropdown" class="q-if-control"></q-icon>

    <q-modal v-model="modal" minimized @show="() => $refs.search.focus()">
      <q-modal-layout>
        <q-toolbar slot="header" class="col">
          <q-toolbar-title>
            Seleccionar Empleado
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <q-table
          ref="table"
          :data="table.data"
          :columns="table.columns"
          :filter="table.filter"
          row-key="id"
          :selection="multiple ? 'multiple' : 'none'"
          :selected="multiple ? value.map(id => ({ id })) : []"
          @update:selected="$emit('input', $event.map(({ id }) => id))"
          :pagination.sync="table.pagination"
          :loading="table.loading"
          @request="request"
        >

          <template slot="top-left" slot-scope="props">
            <q-search slot="top-left" ref="search" class="col" hide-underline v-model="table.filter" />
          </template>
          <template slot="top-right" slot-scope="props">
            <q-btn v-if="multiple" slot="top-right" color="primary" v-close-overlay flat>ok</q-btn>
          </template>
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <q-btn v-if="!multiple" rounded color="primary" size="sm" v-close-overlay @click="$emit('input', props.row.id)">Seleccionar</q-btn>
          </q-td>
        </q-table>
      </q-modal-layout>
    </q-modal>
  </q-input-frame>
</template>

<script>
import { EmployeeSelectPaginationQuery, EmployeeNameFullQuery, EmployeesNameFullQuery } from 'assets/queries/Employee.graphql'
import { event } from 'quasar'
const { stopAndPrevent } = event

export default {
  name: 'EmployeeSelect',
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Seleccionar Empleado...'
    },
    value: {
      type: [String, Array, null],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modal: false,
      label: '',
      table: {
        data: [],
        columns: [
          {
            name: 'nameFirst',
            field: 'nameFirst',
            label: 'Primer Nombre',
            align: 'left',
            sortable: true
          },
          {
            name: 'nameMiddle',
            field: 'nameMiddle',
            label: 'Segundo Nombre',
            align: 'left',
            sortable: true
          },
          {
            name: 'namePaternal',
            field: 'namePaternal',
            label: 'Apellido Paternl',
            align: 'left',
            sortable: true
          },
          {
            name: 'nameMaternal',
            field: 'nameMaternal',
            label: 'Apellido Materno',
            align: 'left',
            sortable: true
          },
          {
            name: 'cargo',
            field: 'cargo',
            label: 'Cargo',
            align: 'left',
            sortable: true
          },
          {
            name: 'actions',
            required: true
          }
        ],
        filter: '',
        loading: false,
        selected: this.multiple && this.value.length ? this.value : [],
        pagination: {
          sortBy: null,
          descending: false,
          page: 1,
          rowsPerPage: 5, // current rows per page being displayed
          rowsNumber: 0
        }
      }
    }
  },
  watch: {
    'value' () {
      this.setLabel()
    }
  },
  computed: {
    hasValue () {
      return this.value && this.value.length
    }
  },
  methods: {
    showModal () {
      if (this.readonly) return
      this.modal = true
      this.request()
    },
    clear (event) {
      if (this.readonly) return
      stopAndPrevent(event)
      this.$emit('input', this.multiple ? [] : null)
    },
    setLabel () {
      if (!this.hasValue) {
        this.label = ''
      } else if (this.multiple) {
        this.setLabelMultiple()
      } else {
        this.setLabelSingle()
      }
    },
    setLabelSingle () {
      const parameters = {
        where: {
          id: this.value
        }
      }

      this.$gql.request(EmployeeNameFullQuery, parameters)
        .then(response => {
          this.label = response.employee.nameFull
        })
        .catch(this.$defaultErrorHandler)
    },
    setLabelMultiple () {
      const parameters = {
        first: 2,
        where: {
          id_in: this.value
        }
      }

      this.$gql.request(EmployeesNameFullQuery, parameters)
        .then(response => {
          this.label = response.employees
            .map(({ nameFull }) => nameFull)
            .join(', ') +
              (this.value.length > response.employees.length ? `, & ${this.value.length - response.employees.length} mas...` : '')
        })
        .catch(this.$defaultErrorHandler)
    },
    request (criteria) {
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
          { nameFirst_contains: filter },
          { nameMiddle_contains: filter },
          { namePaternal_contains: filter },
          { nameMaternal_contains: filter },
          { cargo_contains: filter }
        ]
        if (!isNaN(Number(filter))) {
          PARAMETERS.where.OR.push({ zkTimePin: Number(filter) })
        }
      }

      if (pagination.sortBy !== null) {
        PARAMETERS.orderBy = `${pagination.sortBy}_${pagination.descending ? 'DESC' : 'ASC'}`
      }

      this.table.loading = true
      this.$gql.request(EmployeeSelectPaginationQuery, PARAMETERS)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.table.loading = false
        })
    }
  },
  mounted () {
    this.setLabel()
  }
}
</script>

<style scoped>

</style>
