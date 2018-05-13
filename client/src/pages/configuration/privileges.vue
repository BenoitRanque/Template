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
            <q-input v-model="item[col.name]" hide-underline :placeholder="col.label"></q-input>
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
          <q-td auto-width><q-input v-model="item.privilege_name" hide-underline placeholder="privilege_name" /></q-td>
          <q-td auto-width><q-input v-model="item.description" hide-underline placeholder="description" /></q-td>
          <q-td auto-width><q-select hide-underline v-model="item.resource_id" :options="options.resources" placeholder="resource_id" filter></q-select></q-td>
          <q-td auto-width><q-select hide-underline v-model="item.action" :options="options.actions" placeholder="action"></q-select></q-td>
          <q-td auto-width><q-select hide-underline v-model="item.possession" :options="options.possessions" placeholder="possession"></q-select></q-td>
          <q-td auto-width><q-chips-input chips-color="black" chips-bg-color="light" add-icon="add" hide-underline v-model="item.attributes"></q-chips-input></q-td>
          <q-td auto-width class="text-right">
            <q-btn class="q-mx-xs" size="md" round outline color="negative" icon="delete" dense @click="$v.item.$touch()"></q-btn>
            <q-btn class="q-mx-xs" size="md" round outline color="positive" icon="save" dense></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

  </q-page>
</template>

<script>
import { CORE_PRIVILEGE, CORE_RESOURCE } from 'assets/apiRoutes'
import { required } from 'vuelidate/lib/validators'
import tableMixin from 'src/mixins/tableMixin'

// const newItem = () => ({
//   'privilege_name': '',
//   'resource': '',
//   'action': '',
//   'posession': '',
//   'attributes': [],
//   'module_id': ''
// })

export default {
  name: 'ConfigurePrivileges',
  mixins: [tableMixin],
  data () {
    return {
      options: {
        actions: [
          {value: 'read', label: 'read'},
          {value: 'create', label: 'create'},
          {value: 'update', label: 'update'},
          {value: 'delete', label: 'delete'}
        ],
        possessions: [
          {value: 'any', label: 'any'},
          {value: 'own', label: 'own'}
        ],
        resources: []
      },
      table: {
        columns: [
          {
            name: 'privilege_name',
            required: true,
            label: 'privilege_name',
            align: 'left',
            field: 'privilege_name',
            sortable: true
          },
          {
            name: 'description',
            required: true,
            label: 'description',
            align: 'left',
            field: 'description',
            sortable: true
          },
          {
            name: 'resource_id',
            required: true,
            label: 'resource_id',
            align: 'left',
            field: 'resource_id',
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
    newItem () {
      return {
        name: '',
        description: '',
        resource_id: '',
        action: '',
        possession: '',
        attributes: []
      }
    },
    fetchItems () {
      this.$axios.get(CORE_PRIVILEGE)
        .then(response => {
          this.table.data = response.data || []
        })
      this.$axios.get(CORE_RESOURCE)
        .then(response => {
          this.options.resources = response.data.map(resource => ({ value: resource.resource_id, label: resource.resource_id, sublabel: resource.description })) || []
        })
    },
    createItem () {
      this.$q.dialog({
        title: 'Confirm Edit',
        message: 'Changes will be lost',
        ok: this.$t('ok'),
        cancel: this.$t('cancel')
      })
        .then(() => {
          this.$q.loading.show()
          this.$axios.post(CORE_PRIVILEGE, this.item)
            .then(() => {
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
    },
    updateItem () {
      this.$q.dialog({
        title: 'Confirm Edit',
        message: 'Changes will be lost',
        ok: this.$t('ok'),
        cancel: this.$t('cancel')
      })
        .then(() => {
          this.$q.loading.show()
          this.$axios.put(CORE_PRIVILEGE, this.item)
            .then(() => {
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
    },
    deleteItem () {
      this.$q.dialog({
        title: 'Confirm Edit',
        message: 'Changes will be lost',
        ok: this.$t('ok'),
        cancel: this.$t('cancel')
      })
        .then(() => {
          this.$q.loading.show()
          this.$axios.delete(CORE_PRIVILEGE, { params: { id: this.item.privilege_id } })
            .then(() => {
              this.$q.loading.hide()
            })
            .catch(() => {
              this.$q.loading.hide()
            })
        })
    }
  },
  mounted () {
    this.fetchItems()
  }
}
</script>

<style>
</style>
