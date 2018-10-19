<template>
  <q-page>
    <q-table
      ref="table"
      :data="table.data"
      :columns="table.columns"
      :filter="table.filter"
      row-key="id"
      selection="single"
      :selected.sync="table.selected"
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
    <employee-select multiple v-model="employee"></employee-select>
    <pre>
      {{employee}}
      {{table}}
    </pre>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'
import EmployeeSelect from 'components/EmployeeSelect'

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
  name: 'Employees',
  components: { EmployeeSelect },
  data () {
    return {
      employee: '',
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
        selected: [],
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
  methods: {
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
