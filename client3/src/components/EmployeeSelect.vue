<template>
  <div>
    <q-table
      ref="table"
      :data="table.data"
      :columns="table.columns"
      :filter="table.filter"
      row-key="id"
      :selection="multiple ? 'multiple' : 'single'"
      :selected="selectedModel"
      @update:selected="updateSelected"
      :pagination.sync="table.pagination"
      :loading="table.loading"
      @request="request"
    >
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline v-model="table.filter" />
      </template>

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
    </q-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

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
          },
          {
            name: 'actions'
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
  // watch: {
  //   'table.selected': function (value) {
  //     const employeeIDs = value.map(({ id }) => id)

  //     this.$emit('input', this.multiple ? employeeIDs [])
  //   }
  // },
  computed: {
    selectedModel () {
      if (Array.isArray(this.value)) {
        return this.value.map(id => ({ id }))
      } else if (!this.value) {
        return []
      } else {
        return [{ id: this.value }]
      }
    },
    label () {
      // display label for current selection
      return ''
    }
  },
  methods: {
    updateSelected (selected) {
      if (this.multiple) {
        this.$emit('input', selected.map(({ id }) => id))
      } else if (!selected || !selected.length) {
        this.$emit('input', null)
      } else {
        this.$emit('input', selected[0].id)
      }
    },
    request ({ pagination, filter }) {
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
  }
}
</script>

<style scoped>

</style>
