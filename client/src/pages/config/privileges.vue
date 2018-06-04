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
        <q-btn v-if="isAuthorized(resource, 'create', 'any')" round color="info" icon="print" size="md" @click="print"  />
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
          <q-btn @click="print" class="no-shadow" style="border-radius: 0" color="info" size="lg" icon="print"></q-btn>
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
          <q-field :label="$t('item.privilege_name.label')" :helper="$t('item.privilege_name.helper')" :error="$v.item.privilege_name.$error" :error-label="validationError($v.item.privilege_name)">
            <q-input v-model="item.privilege_name" @blur="$v.item.privilege_name.$touch()" :placeholder="$t('item.privilege_name.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.description.label')" :helper="$t('item.description.helper')" :error="$v.item.description.$error" :error-label="validationError($v.item.description)">
            <q-input v-model="item.description" @blur="$v.item.description.$touch()" :placeholder="$t('item.description.placeholder')"/>
          </q-field>
          <q-field :label="$t('item.resource_id.label')" :helper="$t('item.resource_id.helper')" :error="$v.item.resource_id.$error" :error-label="validationError($v.item.resource_id)">
            <q-select v-model="item.resource_id" :options="options.resources" filter @blur="$v.item.resource_id.$touch()" :placeholder="$t('item.resource_id.placeholder')"></q-select>
          </q-field>
          <q-field :label="$t('item.action.label')" :helper="$t('item.action.helper')" :error="$v.item.action.$error" :error-label="validationError($v.item.action)">
            <q-select v-model="item.action" :options="options.actions" @blur="$v.item.action.$touch()" :placeholder="$t('item.action.placeholder')"></q-select>
          </q-field>
          <q-field :label="$t('item.possession.label')" :helper="$t('item.possession.helper')" :error="$v.item.possession.$error" :error-label="validationError($v.item.possession)">
            <q-select v-model="item.possession" :options="options.possessions" @blur="$v.item.possession.$touch()" :placeholder="$t('item.possession.placeholder')"></q-select>
          </q-field>
          <q-field :label="$t('item.attributes.label')" :helper="$t('item.attributes.helper')" :error="$v.item.attributes.$error" :error-label="validationError($v.item.attributes)">
            <q-chips-input v-model="item.attributes" @blur="$v.item.attributes.$touch()" :placeholder="$t('item.attributes.placeholder')"></q-chips-input>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
    <pre>{{table.data}}</pre>
  </q-page>
</template>

<script>
// import { remote } from 'electron'
import { CORE_PRIVILEGE, CORE_RESOURCE } from 'assets/apiRoutes'
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
    privilege_name: '',
    description: '',
    resource_id: '',
    action: 'read',
    possession: 'any',
    attributes: ['*']
  }
}

export default {
  name: 'ConfigurePrivileges',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'CorePrivilege',
      apiRoute: CORE_PRIVILEGE,
      editMode: false,
      item: newItem(),
      options: {
        actions: [
          {value: 'read', label: this.$t('action.read')},
          {value: 'create', label: this.$t('action.create')},
          {value: 'update', label: this.$t('action.update')},
          {value: 'delete', label: this.$t('action.delete')}
        ],
        possessions: [
          {value: 'any', label: this.$t('possession.any')},
          {value: 'own', label: this.$t('possession.own')}
        ],
        resources: []
      },
      table: {
        loading: false,
        rowKey: 'privilege_id',
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
            name: 'privilege_name',
            required: true,
            label: this.$t('item.privilege_name.label'),
            align: 'left',
            field: 'privilege_name',
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
            name: 'resource_id',
            required: true,
            label: this.$t('item.resource_id.label'),
            align: 'left',
            field: 'resource_id',
            sortable: true
          },
          {
            name: 'action',
            required: true,
            label: this.$t('item.action.label'),
            align: 'left',
            field: row => this.$t(`action.${row.action}`),
            sortable: true
          },
          {
            name: 'possession',
            required: true,
            label: this.$t('item.possession.label'),
            align: 'left',
            field: row => this.$t(`possession.${row.possession}`),
            sortable: true
          },
          {
            name: 'attributes',
            required: true,
            label: this.$t('item.attributes.label'),
            align: 'left',
            field: row => row.attributes.join(', '),
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
      privilege_name: {
        required
      },
      description: {

      },
      resource_id: {
        required
      },
      action: {
        required
      },
      possession: {
        required
      },
      attributes: {
        required,
        globNotationSyntax: globs => globs.every(glob => !!glob.match(/^(!?([^\s.!*[\]]+|\*)((\.([^\s.!*[\]]+|\*))|(\[([0-9]+|\*)\]))*)$/))
      }
    }
  },
  methods: {
    // print () {
    //   remote.getCurrentWebContents().print()
    // },
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(CORE_PRIVILEGE),
        this.$axios.get(CORE_RESOURCE)
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.resources = (response[1] && response[1].data) ? response[1].data.map(resource => ({ value: resource.resource_id, label: resource.resource_id, sublabel: resource.description })) : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ privilege_id: item.privilege_id })
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
      "title": "Privilegio",
      "subtitle": " "
    },
    "action": {
      "read": "Leer",
      "create": "Crear",
      "update": "Modificar",
      "delete": "Eliminar"
    },
    "possession": {
      "any": "Cualquiera",
      "own": "Propio"
    },
    "item": {
      "privilege_name": {
        "label": "Nombre",
        "placeholder": "Accion Possession Recurso",
        "helper": "Nombre para este privilegio"
      },
      "description": {
        "label": "Descripcion",
        "placeholder": "...",
        "helper": "Descripcion del privilegio"
      },
      "resource_id": {
        "label": "Recurso",
        "placeholder": "Seleccione...",
        "helper": "Recurso para este privielgio"
      },
      "action": {
        "label": "Accion",
        "placeholder": "Seleccione...",
        "helper": "Accion que puede realizar sobre recurso"
      },
      "possession": {
        "label": "Possession",
        "placeholder": "Seleccione...",
        "helper": "Debe ser dueño del recurso para poder aceder ?"
      },
      "attributes": {
        "label": "Atributos",
        "placeholder": "*",
        "helper": "Permitir/Prohibir atributos especificos"
      }
    }
  }
}
</i18n>
