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
        <!-- <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
          <template v-if="editMode">
            <q-btn v-if="isAuthorized(resource, 'delete', 'any')" size="lg" rounded color="negative" icon="delete" @click="deleteItem(item)">{{$t('buttons.deleteItem')}}</q-btn>
            <q-btn v-if="isAuthorized(resource, 'update', 'any')" size="lg" rounded color="positive" icon="save" :disable="$v.item.$invalid" @click="updateItem(item)">{{$t('buttons.updateItem')}}</q-btn>
          </template>
          <template v-else>
            <q-btn v-if="isAuthorized(resource, 'create', 'any')" size="lg" rounded color="positive" icon="create" :disable="$v.item.$invalid" @click="createItem(item)">{{$t('buttons.createItem')}}</q-btn>
          </template>
        </q-toolbar> -->
        <q-tabs inverted>
          <!-- Tabs -->
          <q-tab default slot="title" name="tab-1" label="data"/>
          <q-tab slot="title" name="tab-2" label="data2" />
          <q-tab slot="title" name="tab-3" label="contact" />
          <q-tab slot="title" name="tab-4" label="identification_document" />

          <!-- Targets -->
          <q-tab-pane name="tab-1">Tab One</q-tab-pane>
          <q-tab-pane name="tab-2">Tab Two</q-tab-pane>
          <q-tab-pane name="tab-3">Tab Three</q-tab-pane>
          <q-tab-pane name="tab-4">Tab Four</q-tab-pane>
        </q-tabs>
        <!-- <div class="layout-padding group">
          <q-field :label="$t('item.employee_external_id.label')">
            <q-input v-model="item.employee_external_id" :placeholder="$t('item.employee_external_id.placeholder')"/>
          </q-field>
        </div> -->
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_EMPLOYEE } from 'assets/apiRoutes'
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
// required
} from 'vuelidate/lib/validators'

function newItem () {
  // return default item. Important
  return {
    data: {
      employee_id: '',
      name_first: '',
      name_middle: '',
      name_married: '',
      name_paternal: '',
      name_maternal: '',
      nationality: '',
      place_of_birth: '',
      date_of_birth: '',
      sex: '',
      marital_status: ''
    }
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
        rowKey: 'employee_id',
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
            name: 'employee_external_id',
            required: true,
            label: this.$t('item.employee_external_id.label'),
            align: 'left',
            field: 'internal_id',
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
      employee_id: {}
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
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '[data, data2, contract, contact, identification_document]' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
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
