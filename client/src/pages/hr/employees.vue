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
          <q-field :label="$t('item.username.label')" :helper="$t('item.username.helper')" :error="$v.item.username.$error" :error-label="validationError($v.item.username)">
            <q-input v-model="item.username" @blur="$v.item.username.$touch()" :placeholder="$t('item.username.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.displayname.label')" :helper="$t('item.displayname.helper')" :error="$v.item.displayname.$error" :error-label="validationError($v.item.displayname)">
            <q-input v-model="item.displayname" @blur="$v.item.displayname.$touch()" :placeholder="$t('item.displayname.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.description.label')" :helper="$t('item.description.helper')" :error="$v.item.description.$error" :error-label="validationError($v.item.description)">
            <q-input v-model="item.description" @blur="$v.item.description.$touch()" :placeholder="$t('item.description.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.role.label')" :helper="$t('item.role.helper')" :error="$v.item.role.$error" :error-label="validationError($v.item.role)">
            <q-select v-model="item.role" multiple :options="options.roles" @blur="$v.item.role.$touch()" :placeholder="$t('item.role.placeholder')"></q-select>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
    <pre>{{table.data}}</pre>
  </q-page>
</template>

<script>
import { HR_EMPLOYEE, CORE_USER } from 'assets/apiRoutes'
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
    internal_id: '',
    firstname: '',
    lastname: '',
    date_of_birth: null,
    sex: '',
    identifcation_document: '',
    contact: [],
    address: [],
    user_id: null
  }
}

export default {
  name: 'ConfigurePrivileges',
  mixins: [tableMixin, validationError],
  data () {
    return {
      passwordResetUserId: null,
      resource: 'HREmployee',
      apiRoute: HR_EMPLOYEE,
      editMode: false,
      item: newItem(),
      options: {
        users: []
      },
      table: {
        loading: false,
        rowKey: 'user_id',
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
            name: 'internal_id',
            required: true,
            label: this.$t('item.username.label'),
            align: 'left',
            field: 'username',
            sortable: true
          },
          {
            name: 'firstname',
            required: true,
            label: this.$t('item.username.label'),
            align: 'left',
            field: 'username',
            sortable: true
          },
          {
            name: 'lastname',
            required: true,
            label: this.$t('item.displayname.label'),
            align: 'left',
            field: 'displayname',
            sortable: true
          },
          {
            name: 'date_of_birth',
            required: true,
            label: this.$t('item.description.label'),
            align: 'left',
            field: 'description',
            sortable: true
          },
          {
            name: 'role',
            required: true,
            label: this.$t('item.role.label'),
            align: 'left',
            field: row => (row.role && row.role.length) ? (row.role.map(role => role.role_name).slice(0, 3).join(', ') + (row.role.length > 3 ? `, + ${row.role.length - 3}...` : '')) : '',
            sortable: true
          },
          {
            name: 'password-reset',
            label: '',
            required: true
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
      username: {
        required
        // todo: async backend validation of unique
      },
      displayname: {

      },
      description: {

      },
      role: {

      }
    }
  },
  methods: {
    resetPassword (user) {
      if (!user || !user.user_id) return

      this.passwordResetUserId = user.user_id

      this.$refs.passwordResetModal.show()
    },
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '[user]' } }),
        this.$axios.get(CORE_USER)
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.users = (response[1] && response[1].data) ? response[1].data.map(user => ({
            value: user,
            label: user.username,
            sublabel: user.description
          })) : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ employee_id: item.employee_id })
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
    "reset_password": "Restablecer Contraseña",
    "modal": {
      "title": "Usuario",
      "subtitle": " "
    },
    "item": {
      "username": {
        "label": "Nombre",
        "placeholder": "Nombre de usuario",
        "helper": "Nombre que usara este usuario para login. Debe ser unico"
      },
      "displayname": {
        "label": "Nombre",
        "placeholder": "Nombre Completo",
        "helper": "Nombre propio del usuario"
      },
      "description": {
        "label": "Descripcion",
        "placeholder": "...",
        "helper": "Descripcion del usuario"
      },
      "role": {
        "label": "Rol",
        "placeholder": "Seleccione...",
        "helper": "Roles para este usuario"
      }
    }
  }
}
</i18n>
