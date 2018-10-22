<template>
  <q-modal v-model="modal">
    <q-table
      hide-header
      title="Aggregar Jornada"
      ref="table"
      :data="table.data"
      :columns="table.columns"
      :filter="table.filter"
      row-key="id"
      :pagination.sync="table.pagination"
      :loading="table.loading"
      @request="request"
    >
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="table.filter" />
      </template>

      <q-td slot="body-cell-actions" slot-scope="props">
        <q-btn rounded color="primary" size="sm" @click="$emit('selected', JSON.parse(JSON.stringify(props.row.schedule))), modal = false">Aggregar</q-btn>
      </q-td>
    </q-table>
    <!-- <q-modal-layout header-class="no-shadow" footer-class="no-shadow">
      <q-toolbar slot="header" color="white" class="q-px-lg">
        <q-search class="col" hide-underline v-model="table.filter" />
        <q-btn color="primary" v-close-overlay flat>ok</q-btn>
      </q-toolbar>
    </q-modal-layout> -->
</q-modal>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'SchedulePresetSelect',
  data () {
    return {
      modal: false,
      table: {
        data: [],
        columns: [
          {
            name: 'description',
            field: 'description',
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
  methods: {
    show () {
      this.modal = true
      this.request({
        pagination: this.table.pagination,
        filter: this.table.filter
      })
    },
    request ({ pagination, filter }) {
      const query = gql`
        query ($first: Int! $skip: Int! $where: ScheduleWhereInput) {
          meta: schedulesConnection (where: $where) {
            aggregate {
              count
            }
          }
          data: schedules (first: $first skip: $skip where: $where orderBy: createdAt_ASC) {
            id
            description
            baseTime
            timeline {
              category
              startTime
              startRequireEvent
              endTime
              endRequireEvent
            }
            restline {
              category
              startTime
              startRequireEvent
              endTime
              endRequireEvent
              duration
            }
            offline1 {
              category
            }
            offline2 {
              category
            }
          }
        }
      `

      const parameters = {
        first: pagination.rowsPerPage,
        skip: pagination.rowsPerPage * (pagination.page - 1),
        where: { isPreset: true }
      }

      if (filter.length > 0) {
        parameters.where.description_contains = filter
      }

      this.loading = true
      this.$gql.request(query, parameters)
        .then(response => {
          this.table.pagination = pagination
          this.table.pagination.rowsNumber = response.meta.aggregate.count
          this.table.data = response.data.map(schedule => ({
            description: schedule.description,
            schedule
          }))
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
