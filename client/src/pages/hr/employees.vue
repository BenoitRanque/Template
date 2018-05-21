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
          <q-field :label="$t('item.internal_id.label')" :helper="$t('item.internal_id.helper')" :error="$v.item.internal_id.$error" :error-label="validationError($v.item.internal_id)">
            <q-input v-model="item.internal_id" @blur="$v.item.internal_id.$touch()" :placeholder="$t('item.internal_id.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.firstname.label')" :helper="$t('item.firstname.helper')" :error="$v.item.firstname.$error" :error-label="validationError($v.item.firstname)">
            <q-input v-model="item.firstname" @blur="$v.item.firstname.$touch()" :placeholder="$t('item.firstname.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.lastname.label')" :helper="$t('item.lastname.helper')" :error="$v.item.lastname.$error" :error-label="validationError($v.item.lastname)">
            <q-input v-model="item.lastname" @blur="$v.item.lastname.$touch()" :placeholder="$t('item.lastname.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.date_of_birth.label')" :helper="$t('item.date_of_birth.helper')" :error="$v.item.date_of_birth.$error" :error-label="validationError($v.item.date_of_birth)">
            <q-datetime v-model="item.date_of_birth" @blur="$v.item.date_of_birth.$touch()" :placeholder="$t('item.date_of_birth.placeholder')"></q-datetime>
          </q-field>
          <q-field :label="$t('item.sex.label')" :helper="$t('item.sex.helper')" :error="$v.item.sex.$error" :error-label="validationError($v.item.sex)">
            <q-select v-model="item.sex" @blur="$v.item.sex.$touch()" :placeholder="$t('item.sex.placeholder')" :options="options.sex"></q-select>
          </q-field>
          <q-field :label="$t('item.identification_document.label')" :helper="$t('item.identification_document.helper')" :error="$v.item.identification_document.$error" :error-label="validationError($v.item.identification_document)">
            <div class="row " v-for="(key, index) in item.identification_document" :key="index">
              <q-input class="col-4 q-my-xs" v-model="key.name" :before="[{icon: 'add', handler: () => addJsonArrayElement(item.identification_document, index)}]" :placeholder="$t('item.identification_document.nameplaceholder')"/>
              <q-input class="col-8 q-my-xs" v-model="key.value" :after="[{icon: 'remove', handler: () => removeJsonArrayElement(item.identification_document, index)}]" :placeholder="$t('item.identification_document.valueplaceholder')"/>
            </div>
          </q-field>
          <q-field :label="$t('item.contact.label')" :helper="$t('item.contact.helper')" :error="$v.item.contact.$error" :error-label="validationError($v.item.contact)">
            <div class="row " v-for="(key, index) in item.contact" :key="index">
              <q-input class="col-4 q-my-xs" v-model="key.name" :before="[{icon: 'add', handler: () => addJsonArrayElement(item.contact, index)}]" :placeholder="$t('item.contact.nameplaceholder')"/>
              <q-input class="col-8 q-my-xs" v-model="key.value" :after="[{icon: 'remove', handler: () => removeJsonArrayElement(item.contact, index)}]" :placeholder="$t('item.contact.valueplaceholder')"/>
            </div>
          </q-field>
          <q-field :label="$t('item.address.label')" :helper="$t('item.address.helper')" :error="$v.item.address.$error" :error-label="validationError($v.item.address)">
            <div class="row " v-for="(key, index) in item.address" :key="index">
              <q-input class="col-4 q-my-xs" v-model="key.name" :before="[{icon: 'add', handler: () => addJsonArrayElement(item.address, index)}]" :placeholder="$t('item.address.nameplaceholder')"/>
              <q-input class="col-8 q-my-xs" v-model="key.value" :after="[{icon: 'remove', handler: () => removeJsonArrayElement(item.address, index)}]" :placeholder="$t('item.address.valueplaceholder')"/>
            </div>
          </q-field>
          <q-field :label="$t('item.user_id.label')" :helper="$t('item.user_id.helper')" :error="$v.item.user_id.$error" :error-label="validationError($v.item.user_id)">
            <q-select v-model="item.user_id" clearable :options="options.users" @blur="$v.item.user_id.$touch()" :placeholder="$t('item.user_id.placeholder')"></q-select>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
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
    identification_document: [{ name: '', value: '' }],
    contact: [{ name: '', value: '' }],
    address: [{ name: '', value: '' }],
    user_id: ''
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
        users: [],
        sex: [
          {
            label: this.$t('options.sex.female'),
            value: 'F'
          },
          {
            label: this.$t('options.sex.male'),
            value: 'M'
          }
        ]
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
            label: this.$t('item.internal_id.label'),
            align: 'left',
            field: 'internal_id',
            sortable: true
          },
          {
            name: 'firstname',
            required: true,
            label: this.$t('item.firstname.label'),
            align: 'left',
            field: 'firstname',
            sortable: true
          },
          {
            name: 'lastname',
            required: true,
            label: this.$t('item.lastname.label'),
            align: 'left',
            field: 'lastname',
            sortable: true
          },
          {
            name: 'date_of_birth',
            required: true,
            label: this.$t('item.date_of_birth.label'),
            align: 'left',
            field: 'date_of_birth',
            sortable: true
          },
          {
            name: 'sex',
            required: true,
            label: this.$t('item.sex.label'),
            align: 'left',
            field: 'sex',
            sortable: true
          },
          {
            name: 'identification_document',
            required: true,
            label: this.$t('item.identification_document.label'),
            align: 'left',
            field: row => row.identification_document ? row.identification_document.map(item => item.value).join(', ') : '',
            sortable: true
          },
          {
            name: 'contact',
            required: true,
            label: this.$t('item.contact.label'),
            align: 'left',
            field: row => row.contact ? row.contact.map(item => item.value).join(', ') : '',
            sortable: false
          },
          {
            name: 'address',
            required: true,
            label: this.$t('item.address.label'),
            align: 'left',
            field: row => row.address ? row.address.map(item => item.value).join(', ') : '',
            sortable: false
          },
          {
            name: 'user_id',
            required: true,
            label: this.$t('item.user_id.label'),
            align: 'left',
            field: row => row.user_id ? this.options.users.find(option => option.value === row.user_id).label : '',
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
      internal_id: {},
      firstname: {
        required
      },
      lastname: {},
      date_of_birth: {},
      sex: {},
      identification_document: {},
      contact: {},
      address: {},
      user_id: {}
    }
  },
  methods: {
    removeJsonArrayElement (array, index) {
      array.splice(index, 1)
      if (array.length === 0) this.addJsonArrayElement(array, 0)
    },
    addJsonArrayElement (array, index) {
      array.splice(index + 1, 0, { name: '', value: '' })
    },
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '' } }),
        this.$axios.get(CORE_USER)
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.users = (response[1] && response[1].data) ? response[1].data.map(user => ({
            value: user.user_id,
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
    "options": {
      "sex": {
        "female": "Femenino",
        "male": "Masculino"
      }
    },
    "item": {
      "internal_id": {
        "label": "ID interna",
        "placeholder": "ID",
        "helper": "ID de uso interno"
      },
      "firstname": {
        "label": "Nombre",
        "placeholder": "nombre",
        "helper": "nombre"
      },
      "lastname": {
        "label": "Apellido",
        "placeholder": "apellido",
        "helper": "apellido"
      },
      "date_of_birth": {
        "label": "Fecha de nacimiento",
        "placeholder": "Fecha",
        "helper": "fecha de nacimiento"
      },
      "sex": {
        "label": "Genero",
        "placeholder": "genero",
        "helper": "genero"
      },
      "identification_document": {
        "label": "Documento de Identificación",
        "nameplaceholder": "Tipo",
        "valueplaceholder": "Codigo",
        "helper": "Documentos de identifcacion"
      },
      "contact": {
        "label": "Contacto",
        "nameplaceholder": "Metodo",
        "valueplaceholder": "Dato",
        "helper": "Metodod de contacto"
      },
      "address": {
        "label": "Dirreción",
        "nameplaceholder": "Nombre",
        "valueplaceholder": "Dirreción",
        "helper": "Dirreción"
      },
      "user_id": {
        "label": "Usuario",
        "placeholder": "No tiene usuario",
        "helper": "Usuario en caso lo tenga"
      }
    }
  }
}
</i18n>
