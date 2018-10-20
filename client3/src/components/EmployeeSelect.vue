<template>
  <div>
    <q-modal v-model="modal">
      <q-modal-layout header-class="no-shadow" footer-class="no-shadow">
        <q-toolbar slot="header" color="white" class="q-px-lg">
          <q-search class="col" hide-underline v-model="table.filter" />
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
    <q-btn @click="modal = !modal">{{label}}</q-btn>
    <pre>{{selectedEmployees}}</pre>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'EmployeeSelect',
  props: {
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
        this.label = `Nigun empleado seleccionado`
        return
      }

      const query = gql`
        query ($includeEmployee1: Boolean! $Employee1: UUID $includeEmployee2: Boolean! $Employee2: UUID $includeEmployee3: Boolean! $Employee3: UUID) {
          employee1: employee (where: { id: $Employee1 }) @include(if: $includeEmployee1) {
            nameFull
          }
          employee2: employee (where: { id: $Employee2 }) @include(if: $includeEmployee2) {
            nameFull
          }
          employee3: employee (where: { id: $Employee3 }) @include(if: $includeEmployee3) {
            nameFull
          }
        }
      `
      const parameters = {
        includeEmployee1: this.selectedEmployees.length >= 1,
        Employee1: this.selectedEmployees.length >= 1 ? this.selectedEmployees[0].id : null,
        includeEmployee2: this.selectedEmployees.length >= 2,
        Employee2: this.selectedEmployees.length >= 2 ? this.selectedEmployees[1].id : null,
        includeEmployee3: this.selectedEmployees.length >= 3,
        Employee3: this.selectedEmployees.length >= 3 ? this.selectedEmployees[2].id : null
      }

      this.$gql.request(query, parameters)
        .then(response => {
          const names = []
          if (response.employee1) names.push(response.employee1.nameFull)
          if (response.employee2) names.push(response.employee2.nameFull)
          if (response.employee3) names.push(response.employee3.nameFull)

          this.label = names.join(', ') + (this.selectedEmployees.length > names.length ? `, & ${this.selectedEmployees.length - names.length} mas...` : '')
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
