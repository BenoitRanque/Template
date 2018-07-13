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
            :label="$t(`field.type_id.label`)"
            :helper="$t(`field.type_id.helper`)"
            :error="$v.item.type_id.$error"
            :error-label="validationError($v.item.type_id)"
          >
            <q-input type="number" v-model="$v.item.type_id.$model" :placeholder="$t(`field.type_id.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.type_name.label`)"
            :helper="$t(`field.type_name.helper`)"
            :error="$v.item.type_name.$error"
            :error-label="validationError($v.item.type_name)"
          >
            <q-input v-model="$v.item.type_name.$model" :placeholder="$t(`field.type_name.placeholder`)"></q-input>
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
            :label="$t(`field.type_code.label`)"
            :helper="$t(`field.type_code.helper`)"
            :error="$v.item.code.$error"
            :error-label="validationError($v.item.code)"
          >
            <q-input v-model="$v.item.code.$model" :placeholder="$t(`field.type_code.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.color.label`)"
            :helper="$t(`field.color.helper`)"
            :error="$v.item.color.$error"
            :error-label="validationError($v.item.color)"
          >
            <q-color v-model="$v.item.color.$model" :placeholder="$t(`field.color.placeholder`)"></q-color>
          </q-field>
          <q-field
            :label="$t(`field.start_early_threshold.label`)"
            :helper="$t(`field.start_early_threshold.helper`)"
            :error="$v.item.start_early_threshold.$error"
            :error-label="validationError($v.item.start_early_threshold)"
          >
            <q-datetime type="time" :format24h="false" v-model="$v.item.start_early_threshold.$model" :placeholder="$t(`field.start_early_threshold.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.start_late_threshold.label`)"
            :helper="$t(`field.start_late_threshold.helper`)"
            :error="$v.item.start_late_threshold.$error"
            :error-label="validationError($v.item.start_late_threshold)"
          >
            <q-datetime type="time" format24h v-model="$v.item.start_late_threshold.$model" :placeholder="$t(`field.start_early_threshold.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.end_early_threshold.label`)"
            :helper="$t(`field.end_early_threshold.helper`)"
            :error="$v.item.end_early_threshold.$error"
            :error-label="validationError($v.item.end_early_threshold)"
          >
            <q-datetime type="time" format24h v-model="$v.item.end_early_threshold.$model" :placeholder="$t(`field.start_early_threshold.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.end_late_threshold.label`)"
            :helper="$t(`field.end_late_threshold.helper`)"
            :error="$v.item.start_late_threshold.$error"
            :error-label="validationError($v.item.end_late_threshold)"
          >
            <q-datetime type="time" format24h v-model="$v.item.end_late_threshold.$model" :placeholder="$t(`field.start_early_threshold.placeholder`)"></q-datetime>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_TYPE } from 'assets/apiRoutes'
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
    type_id: null,
    type_name: '',
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
  name: 'HRAttType',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttType',
      apiRoute: HR_ATT_TYPE,
      editMode: false,
      item: newItem(),
      table: {
        loading: false,
        rowKey: 'type_id',
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
            name: 'type_id',
            required: true,
            label: this.$t('field.type_id.label'),
            align: 'left',
            field: 'type_id',
            sortable: true
          },
          {
            name: 'type_name',
            required: true,
            label: this.$t('field.type_name.label'),
            align: 'left',
            field: 'type_name',
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
            name: 'start_early_threshold',
            label: this.$t('field.start_early_threshold.label'),
            align: 'left',
            sortable: true,
            field: row => this.$date.formatDate(row.start_early_threshold, 'HH:mm')
          },
          {
            name: 'start_late_threshold',
            label: this.$t('field.start_late_threshold.label'),
            align: 'left',
            sortable: true,
            field: row => this.$date.formatDate(row.start_late_threshold, 'HH:mm')
          },
          {
            name: 'end_early_threshold',
            label: this.$t('field.end_early_threshold.label'),
            align: 'left',
            sortable: true,
            field: row => this.$date.formatDate(row.end_early_threshold, 'HH:mm')
          },
          {
            name: 'end_late_threshold',
            label: this.$t('field.end_late_threshold.label'),
            align: 'left',
            sortable: true,
            field: row => this.$date.formatDate(row.end_late_threshold, 'HH:mm')
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
      type_id: {
        required
      },
      type_name: {
        required
      },
      description: {

      },
      code: {
        required
      },
      color: {
        required
      },
      start_early_threshold: { required },
      start_late_threshold: { required },
      end_early_threshold: { required },
      end_late_threshold: { required }
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
        this.$axios.get(HR_ATT_TYPE, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ type_id: item.type_id })
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
