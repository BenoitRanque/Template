<template>
  <q-page>
    <!-- content -->
    <!-- <q-btn @click="read">read</q-btn> -->
    <q-table
      title="Table Title"
      row-key="privilege_id"
      :data="table.data"
      :columns="table.columns"
      :filter="table.filter"
    >
      <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="table.filter"
          class="col-6"
        />
      </template>

      <!-- <q-tr slot="header" slot-scope="props" :props="props" @click.native="rowClick(props.row)">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th>
          edit
          <q-btn size="sm">edit</q-btn>
        </q-th>
      </q-tr> -->
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>
      <q-td slot="body-cell-edit" slot-scope="props" :props="props">
        <q-btn size="sm">edit</q-btn>
      </q-td>
    </q-table>
    <!-- <pre>{{table.data}}</pre> -->
  </q-page>
</template>

<script>
import { CORE_PRIVILEGE } from 'assets/apiRoutes'

export default {
  name: 'ConfigurePrivileges',
  data () {
    return {
      table: {
        filter: '',
        data: [],
        columns: [
          {
            name: 'name',
            required: true,
            label: 'name',
            align: 'left',
            field: 'privilege_name',
            sortable: true
          },
          {
            name: 'resource',
            required: true,
            label: 'resource',
            align: 'left',
            field: 'resource',
            sortable: true
          },
          {
            name: 'action',
            required: true,
            label: 'action',
            align: 'left',
            field: 'action',
            sortable: true
          },
          {
            name: 'possession',
            required: true,
            label: 'possession',
            align: 'left',
            field: 'possession',
            sortable: true
          },
          {
            name: 'attributes',
            required: true,
            label: 'attributes',
            align: 'left',
            field: row => row.attributes.join(', '),
            sortable: true
          },
          {
            name: 'module_id',
            required: true,
            label: 'module',
            align: 'left',
            field: 'module_id',
            sortable: true
          },
          {
            name: 'edit',
            required: true,
            align: 'right',
            label: 'edit'
          }
        ]
      }
    }
  },
  methods: {
    rowClick (data) {
      this.$q.notify(JSON.stringify(data))
    },
    read () {
      this.$axios.get(CORE_PRIVILEGE)
        .then(response => {
          this.table.data = response.data || []
        })
    },
    create () {

    },
    update () {

    },
    remove () {

    }
  },
  mounted () {
    this.read()
  }
}
</script>

<style>
</style>
