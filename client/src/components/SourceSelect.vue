<template>
  <q-btn v-bind="$attrs" @click="mainBtnAction">
    {{label}}
    <q-tooltip></q-tooltip>
    <q-modal v-model="modal">
      <q-modal-layout>
        <q-toolbar slot="header" class="col">
          <q-toolbar-title>
            {{tooltip}}
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <q-table
          hide-header
          title="Seleccionar Fuente"
          ref="table"
          :data="table.data"
          :columns="table.columns"
          row-key="id"
          :pagination.sync="table.pagination"
          :loading="table.loading"
          @request="requestCredit"
        >
          <q-td slot="body-cell-actions" slot-scope="props">
            <q-btn rounded color="primary" size="sm" @click="selectCredit(props.row)">Seleccionar</q-btn>
          </q-td>
        </q-table>
      </q-modal-layout>
    </q-modal>
  </q-btn>
</template>

<script>
import { CreditPaginationQuery } from 'assets/queries/Exception.graphql'
export default {
  name: 'SourceSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    employeeId: {
      type: [String, null],
      required: true
    },
    category: {
      type: [String, null],
      required: true
    },
    exclude: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modal: false,
      table: {
        data: [],
        columns: [
          {
            name: 'sourceDate',
            field: 'sourceDate',
            align: 'left'
          },
          {
            name: 'sourceType',
            field: 'sourceType',
            align: 'left'
          },
          {
            name: 'actions'
          }
        ],
        filter: '',
        loading: false,
        pagination: {
          page: 1,
          rowsPerPage: 5, // current rows per page being displayed
          rowsNumber: 0
        }
      }
    }
  },
  computed: {
    tooltip () {
      return 'tooltip'
    }
  },
  methods: {
    mainBtnAction () {
      this.modal = true
      this.requestCredit()
    },
    selectCredit (preset) {
      this.$emit('select', { schedule: preset.schedule })
      this.modal = false
    },
    requestCredit ({ pagination, filter } = { pagination: this.table.pagination, filter: this.table.filter }) {
      const parameters = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        where: {
          employee: { id: this.employeeId },
          debit: null,
          id_not_in: this.exclude
        }
      }
      console.log(parameters)
      console.log(CreditPaginationQuery)
      this.loading = true
      this.$gql.request(CreditPaginationQuery, parameters)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data
          this.loading = false
        })
        .catch(error => {
          this.$defaultErrorHandler(error)
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
