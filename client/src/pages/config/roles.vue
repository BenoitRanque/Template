<template>
  <q-page>
    <!-- content -->
    <!-- <q-btn @click="read">read</q-btn> -->
    <q-table
      :title="table.title"
      :row-key="table.rowKey"
      :loading="table.loading"
      :data="table.data"
      :columns="table.columns"
      :filter="table.filter"
      :pagination.sync="table.pagination"
      class="no-shadow"
    >
      <template slot="top-left" slot-scope="props">
        <q-btn class="q-mr-sm" round flat color="primary" icon="refresh" size="md" @click="fetchItems()" />
        <q-search hide-underline color="secondary"  v-model="table.filter" class="col-6" />
      </template>

      <template slot="top-right" slot-scope="props">
        <q-btn v-if="isAuthorized(resource, 'create', 'any')" round color="positive" icon="add" size="md" @click="edit()"  />
      </template>

      <q-td slot="body-cell-edit" slot-scope="props" :props="props" auto-width>
        <q-btn v-if="isAuthorized(resource, ['update', 'delete'], 'any')" size="md" round dense flat icon="edit" color="dark" @click="edit(props.row)"></q-btn>
      </q-td>

    </q-table>

    <q-modal no-esc-dismiss no-backdrop-dismiss content-css="width: 80vw; height: 80vh;" ref="modal">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            {{ editMode ? $t('edit') : $t('create')}} {{$t('modal.title')}}
            <span slot="subtitle">{{$t('modal.subtitle')}}</span>
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="cancel()"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
          <template v-if="editMode">

            <q-btn v-if="isAuthorized(resource, 'delete', 'any')" size="lg" rounded color="negative" icon="delete" @click="deleteItem(item)">{{$t('buttons.deleteItem')}}</q-btn>
            <q-btn v-if="isAuthorized(resource, 'update', 'any')" size="lg" rounded color="positive" icon="save" :disable="$v.item.$invalid" @click="updateItem(item)">{{$t('buttons.updateItem')}}</q-btn>
          </template>
          <template v-else>
            <q-btn v-if="isAuthorized(resource, 'create', 'any')" size="lg" rounded color="positive" icon="create" :disable="$v.item.$invalid" @click="createItem(item)">{{$t('buttons.createItem')}}</q-btn>
          </template>
        </q-toolbar>
        <div class="layout-padding group">
          <q-field :label="$t('item.role_name.label')" :helper="$t('item.role_name.helper')" :error="$v.item.role_name.$error" :error-label="validationError($v.item.role_name)">
            <q-input v-model="item.role_name" @blur="$v.item.role_name.$touch()" :placeholder="$t('item.role_name.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.description.label')" :helper="$t('item.description.helper')" :error="$v.item.description.$error" :error-label="validationError($v.item.description)">
            <q-input v-model="item.description" @blur="$v.item.description.$touch()" :placeholder="$t('item.description.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.extends.label')" :helper="$t('item.extends.helper')" :error="$v.item.extends.$error" :error-label="validationError($v.item.extends)">
            <q-select v-model="item.extends" multiple filter :options="options.roles.filter(option => option.value.role_id !== item.role_id)" @blur="$v.item.extends.$touch()" :placeholder="$t('item.extends.placeholder')"></q-select>
          </q-field>
          <q-field :label="$t('item.privileges.label')" :helper="$t('item.privileges.helper')" :error="$v.item.privileges.$error" :error-label="validationError($v.item.privileges)">
            <q-select v-model="item.privileges" multiple filter :options="options.privileges" @blur="$v.item.privileges.$touch()" :placeholder="$t('item.privileges.placeholder')"></q-select>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { CORE_PRIVILEGE, CORE_ROLE } from 'assets/apiRoutes'
import tableMixin from 'src/mixins/tableMixin'
import validationError from 'src/mixins/validationError'
import {
  // requiredIf,
  // requiredUnless,
  // minLength,
  // maxLength,
  // minValue,
  // maxValue,
  // between,
  // alpha,
  // alphaNum,
  // numeric,
  // email,
  // ipAddress,
  // macAddress,
  // sameAs,
  // url,
  // or,
  // and,
  // withParams,
  required
} from 'vuelidate/lib/validators'

function newItem () {
  // return default item. Important
  return {
    role_name: '',
    description: '',
    extends: [],
    privileges: []
  }
}

export default {
  name: 'ConfigureRoles',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'CoreRole',
      apiRoute: CORE_ROLE,
      editMode: false,
      item: newItem(),
      mapItemOptions: {
        extends: role => this.options.roles.find(option => option.value.role_id === role.role_id).value,
        privileges: privilege => this.options.privileges.find(option => option.value.privilege_id === privilege.privilege_id).value
      },
      options: {
        roles: [],
        privileges: []
      },
      table: {
        loading: false,
        rowKey: 'role_id',
        title: '',
        filter: '',
        data: [],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 10 // current rows per page being displayed
        },
        columns: [
          {
            name: 'role_name',
            required: true,
            label: this.$t('item.role_name.label'),
            align: 'left',
            field: 'role_name',
            sortable: true
          },
          {
            name: 'description',
            required: true,
            label: this.$t('item.description.label'),
            align: 'left',
            field: 'description',
            sortable: true
          },
          {
            name: 'extends',
            required: true,
            label: this.$t('item.extends.label'),
            align: 'left',
            // field: 'privileges',
            field: row => (row.extends && row.extends.length) ? (row.extends.map(role => role.role_name).slice(0, 3).join(', ') + (row.extends.length > 3 ? `, + ${row.extends.length - 3}...` : '')) : '',
            sortable: true
          },
          {
            name: 'privileges',
            required: true,
            label: this.$t('item.privileges.label'),
            align: 'left',
            // field: 'privileges',
            field: row => (row.privileges && row.privileges.length) ? (row.privileges.map(privilege => privilege.privilege_name).slice(0, 3).join(', ') + (row.privileges.length > 3 ? `, + ${row.privileges.length - 3}...` : '')) : '',
            sortable: true
          },
          {
            name: 'edit',
            label: '',
            required: true
          }
        ]
      }
    }
  },
  validations: {
    item: {
      role_name: {
        required
      },
      description: {

      },
      extends: {

      },
      privileges: {

      }
    }
  },
  methods: {
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(CORE_ROLE, { params: { eager: '[privileges, extends]' } }),
        this.$axios.get(CORE_PRIVILEGE)
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.roles = (response[0] && response[0].data) ? response[0].data.map(role => ({
            value: role,
            label: role.role_name,
            sublabel: role.description
          })) : []
          this.options.privileges = (response[1] && response[1].data) ? response[1].data.map(privilege => ({
            value: privilege,
            label: privilege.privilege_name,
            sublabel: privilege.description
          })) : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ role_id: item.role_id })
  },
  mounted () {
    this.fetchItems()
  }
}
</script>

<style>
</style>

<i18n>
{
  "es": {
    "modal": {
      "title": "Rol",
      "subtitle": " "
    },
    "item": {
      "role_name": {
        "label": "Nombre",
        "placeholder": "Nombre del rol",
        "helper": "Nombre para este rol"
      },
      "description": {
        "label": "Descripcion",
        "placeholder": "...",
        "helper": "Descripcion del rol"
      },
      "extends": {
        "label": "Extiende",
        "placeholder": "Seleccione...",
        "helper": "Roles que extiende este rol"
      },
      "privileges": {
        "label": "Privilegios",
        "placeholder": "Seleccione...",
        "helper": "Privilegios para este rol"
      }
    }
  }
}
</i18n>
