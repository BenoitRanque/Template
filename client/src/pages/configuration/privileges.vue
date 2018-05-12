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

      <template slot="header" slot-scope="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th class="text-right">
            <q-btn class="q-mx-xs generic-transition" size="md" round :class="{ 'rotate-180': showEdit(null) }" :color="showEdit(null) ? 'negative' : 'positive'" dense :icon="showEdit(null) ? 'close' : 'add'" flat @click="toggleEdit(null)"></q-btn>
          </q-th>
        </q-tr>
      </template>

      <template slot="top-row" slot-scope="props">
        <q-tr :props="props" v-if="showEdit()" class="bg-light inset-shadow">
          <q-th v-for="col in props.cols" :key="col.name" >
            <q-input v-model="text" hide-underline :placeholder="col.label"></q-input>
          </q-th>
          <q-th class="text-right">
            <q-btn class="q-mx-xs" size="md" round outline color="positive" icon="save" dense></q-btn>
          </q-th>
        </q-tr>
      </template>

      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td class="text-right">
            <q-btn class="q-mx-xs generic-transition" size="md" :class="{ 'rotate-180': showEdit(props.row.__index) }" round :color="showEdit(props.row.__index) ? 'negative' : 'positive'" dense flat :icon="showEdit(props.row.__index) ? 'close' : 'edit'" @click="toggleEdit(props.row.__index)"></q-btn>
          </q-td>
        </q-tr>
        <q-tr :props="props" v-if="showEdit(props.row.__index)" class="inset-shadow bg-light">
          <q-th v-for="col in props.cols" :key="col.name">
            <q-input v-model="text" hide-underline :placeholder="col.label"></q-input>
          </q-th>
          <q-th class="text-right">
            <q-btn class="q-mx-xs" size="md" round outline color="negative" icon="delete" dense @click="$v.item.$touch()"></q-btn>
            <q-btn class="q-mx-xs" size="md" round outline color="positive" icon="save" dense></q-btn>
          </q-th>
        </q-tr>
      </template>

      <!-- <q-tr slot="header" slot-scope="props" :props="props" @click.native="rowClick(props.row)">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr> -->
      <!-- <q-th slot="header-cell-edit" slot-scope="props" :props="props" key="edit">
        <q-btn size="sm">edit</q-btn>
      </q-th>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props.row)" class="cursor-pointer">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>
      <q-td slot="body-cell-edit" slot-scope="props" :props="props">
        <q-btn size="sm">edit</q-btn>
      </q-td> -->
    </q-table>
    <pre>{{$v}}</pre>
    <!-- <pre>{{table.data}}</pre> -->
  </q-page>
</template>

<script>
import { CORE_PRIVILEGE } from 'assets/apiRoutes'
import { required } from 'vuelidate/lib/validators'

// const newItem = () => ({
//   'privilege_name': '',
//   'resource': '',
//   'action': '',
//   'posession': '',
//   'attributes': [],
//   'module_id': ''
// })

function createItem (item) {

}

export default {
  name: 'ConfigurePrivileges',
  data () {
    return {
      edit: {
        index: null,
        open: false
      },
      showCreate: false,
      apiRoute: CORE_PRIVILEGE,
      newItem: {
        __showEdit: false
      },
      itemSchema: {

      },
      item: createItem(),
      text: '',
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
          }
        ]
      }
    }
  },
  validations: {
    item: {
      name: {
        required
      }
    }
  },
  methods: {
    showEdit (index) {
      return (index === undefined ? this.edit.index === null : this.edit.index === index) && this.edit.open
    },
    async toggleEdit (index) {
      try {
        if (this.showEdit(index)) {
          this.edit.open = false
        } else if (index === this.edit.index) {
          this.edit.open = true
        } else {
          if (this.$v.item.$dirty) {
            await this.$q.dialog({
              title: 'Confirm Edit',
              message: 'Changes will be lost',
              ok: this.$t('ok'),
              cancel: this.$t('cancel')
            })
            this.$v.item.$reset()
          }

          // create new copy of item to edit

          this.edit.index = index
          this.edit.open = true
        }
      } catch (error) {
      }
    },
    read () {
      this.$axios.get(this.apiRoute)
        .then(response => {
          this.table.data = response.data.map(item => ({ ...item, __showEdit: false })) || []
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
