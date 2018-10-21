<template>
  <q-input-frame @click.native="modal = !modal" v-bind="$attrs" class="q-select">

    <div class="col q-input-target ellipsis" :class="{ 'q-input-target-placeholder': !selectedEmployees.length }">
      {{selectedEmployees.length ? label : placeholder}}
    </div>

    <q-icon slot="after" :name="this.$q.icon.input.dropdown" class="q-if-control"></q-icon>

    <q-modal v-model="modal" minimized @show="() => $refs.search.focus()">
      <q-modal-layout header-class="no-shadow" footer-class="no-shadow">
        <q-toolbar slot="header" color="white" class="q-px-lg">
          <q-search ref="search" class="col" hide-underline v-model="table.filter" />
          <q-btn color="primary" v-close-overlay flat>ok</q-btn>
        </q-toolbar>
        <!-- <div class="row q-pl-lg q-py-md q-pr-md" slot="header">
          <q-search class="col" hide-underline v-model="table.filter" />
          <q-icon class="col-auto cursor-pointer" color="primary" v-close-overlay size="1.6em" name="close"></q-icon>
        </div> -->
        <!-- <q-toolbar slot="header" class="row" color="white"> -->
          <!-- <q-toolbar-title>
          </q-toolbar-title> -->
        <!-- </q-toolbar> -->
        <q-table
          ref="table"
          :data="table.data"
          :columns="table.columns"
          :filter="table.filter"
          row-key="id"
          :selection="multiple ? 'multiple' : 'single'"
          :selected="selectedEmployees"
          @update:selected="updatedSelectedEmployees"
          :pagination.sync="table.pagination"
          :loading="table.loading"
          @request="request"
        >
          <!-- <template slot="top-left" slot-scope="props">
            <q-search hide-underline v-model="table.filter" />
          </template>
          <template slot="top-right" slot-scope="props">
            <q-icon class="cursor-pointer" color="primary" v-close-overlay size="1.6em" name="close"></q-icon>
          </template> -->
        </q-table>
      </q-modal-layout>
    </q-modal>
  </q-input-frame>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'EmployeeSelect',
  props: {
    placeholder: {
      type: String,
      default: 'Seleccionar Empleado...'
    },
    value: {
      type: [String, Array],
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
            name: 'zkTimePin',
            field: 'zkTimePin',
            label: 'PIN ZKTime',
            align: 'left',
            sortable: true
          },
          {
            name: 'nameFull',
            field: 'nameFull',
            label: 'Nombre Completo',
            align: 'left',
            sortable: true
          }
        ],
        filter: '',
        loading: false,
        selected: this.multiple ? this.value : [this.value],
        pagination: {
          sortBy: 'nameFull',
          descending: false,
          page: 1,
          rowsPerPage: 5, // current rows per page being displayed
          rowsNumber: 0
        }
      }
    }
  },
  watch: {
    selectedEmployees () {
      this.setLabel()
    }
  },
  computed: {
    selectedEmployees () {
      if (Array.isArray(this.value)) {
        return this.value.map(id => ({ id }))
      } else if (!this.value) {
        return []
      } else {
        return [{ id: this.value }]
      }
    }
    // label () {
    //   // display label for current selection
    //   switch (this.selectedEmployees.length) {
    //     case 0: return 'Nigun empleado seleccionado'
    //     case 1: return this.selectedEmployeeName
    //     default: return `${this.selectedEmployeeName} & ${this.selectedEmployees.length - 1} mas...`
    //   }
    // }
  },
  methods: {
    setLabel () {
      // this.$q.notify('setting label')
      if (this.selectedEmployees.length === 0) {
        this.label = ''
        // this.label = `Nigun empleado seleccionado`
        return
      }

      const query = gql`
        query ($employees: [ID!]! $count: Int!) {
          employees (first: $count where: {
            id_in: $employees
          }) {
            nameFull
          }
        }
      `
      const parameters = {
        count: 3,
        employees: this.selectedEmployees.map(({ id }) => id)
      }

      this.$gql.request(query, parameters)
        .then(response => {
          this.label = response.employees
            .map(({ nameFull }) => nameFull)
            .join(', ') +
              (this.selectedEmployees.length > response.employees.length ? `, & ${this.selectedEmployees.length - response.employees.length} mas...` : '')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatedSelectedEmployees (selected) {
      if (this.multiple) {
        this.$emit('input', selected.map(({ id }) => id))
      } else if (!selected || !selected.length) {
        this.$emit('input', null)
      } else {
        this.$emit('input', selected[0].id)
      }
    },
    request ({ pagination, filter }) {
      const query = gql`
        query ($first: Int! $skip: Int! $orderBy: EmployeeOrderByInput $where: EmployeeWhereInput) {
          meta: employeesConnection (where: $where) {
            aggregate {
              count
            }
          }
          data: employees (first: $first skip: $skip orderBy: $orderBy where: $where) {
            id
            nameFull
            zkTimePin
          }
        }
      `

      const parameters = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        selectedEmployeeExists: this.selectedEmployees.length > 0,
        selectedEmployeeID: this.selectedEmployees.length > 0 ? this.selectedEmployees[0].id : null
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
        parameters.orderBy = `${pagination.sortBy === 'nameFull' ? 'nameFirst' : pagination.sortBy}_${pagination.descending ? 'DESC' : 'ASC'}`
      }

      this.loading = true
      this.$gql.request(query, parameters)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.request({
      pagination: this.table.pagination,
      filter: this.table.filter
    })
    this.setLabel()
  }
}
</script>

<style scoped>

</style>
