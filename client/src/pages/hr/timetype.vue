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

      <q-td slot="body-cell-colorcode" slot-scope="props" :props="props" auto-width>
        <q-chip :style="{ 'background': props.row.color }">{{props.row.code}}</q-chip>
      </q-td>

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
          <q-field
            :label="$t(`field.timetype_id.label`)"
            :helper="$t(`field.timetype_id.helper`)"
            :error="$v.item.timetype_id.$error"
            :error-label="validationError($v.item.timetype_id)"
          >
            <q-input type="number" v-model="$v.item.timetype_id.$model" :placeholder="$t(`field.timetype_id.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.timetype_name.label`)"
            :helper="$t(`field.timetype_name.helper`)"
            :error="$v.item.timetype_name.$error"
            :error-label="validationError($v.item.timetype_name)"
          >
            <q-input v-model="$v.item.timetype_name.$model" :placeholder="$t(`field.timetype_name.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.description.label`)"
            :helper="$t(`field.description.helper`)"
            :error="$v.item.description.$error"
            :error-label="validationError($v.item.description)"
          >
            <q-input v-model="$v.item.description.$model" :placeholder="$t(`field.description.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.timetype_code.label`)"
            :helper="$t(`field.timetype_code.helper`)"
            :error="$v.item.code.$error"
            :error-label="validationError($v.item.code)"
          >
            <q-input v-model="$v.item.code.$model" :placeholder="$t(`field.timetype_code.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.color.label`)"
            :helper="$t(`field.color.helper`)"
            :error="$v.item.color.$error"
            :error-label="validationError($v.item.color)"
          >
            <q-color v-model="$v.item.color.$model" :placeholder="$t(`field.color.placeholder`)"></q-color>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_TIMETYPE } from 'assets/apiRoutes'
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
    timetype_id: null,
    timetype_name: '',
    description: '',
    code: '',
    color: null,
    start_early_threshold: null,
    start_late_threshold: null,
    end_early_threshold: null,
    end_late_threshold: null
  }
}

export default {
  name: 'HRAttTimeType',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttTimeType',
      apiRoute: HR_ATT_TIMETYPE,
      editMode: false,
      item: newItem(),
      table: {
        loading: false,
        rowKey: 'timetype_id',
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
            name: 'timetype_id',
            required: true,
            label: this.$t('field.timetype_id.label'),
            align: 'left',
            field: 'timetype_id',
            sortable: true
          },
          {
            name: 'timetype_name',
            required: true,
            label: this.$t('field.timetype_name.label'),
            align: 'left',
            field: 'timetype_name',
            sortable: true
          },
          {
            name: 'description',
            required: true,
            label: this.$t('field.description.label'),
            align: 'left',
            field: 'description',
            sortable: true
          },
          {
            name: 'colorcode',
            required: true,
            label: this.$t('field.color.label'),
            align: 'left',
            sortable: true,
            field: 'code'
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
      timetype_id: {
        required
      },
      timetype_name: {
        required
      },
      description: {

      },
      code: {
        required
      },
      color: {
        required
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
        this.$axios.get(HR_ATT_TIMETYPE, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ timetype_id: item.timetype_id })
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
      "title": "Tipo de Asistencia",
      "subtitle": " "
    }
  }
}
</i18n>
