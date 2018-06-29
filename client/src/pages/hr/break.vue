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
          <q-field
            :label="$t(`field.break_name.label`)"
            :helper="$t(`field.break_name.helper`)"
            :error="$v.item.break_name.$error"
            :error-label="validationError($v.item.break_name)"
          >
            <q-input v-model="$v.item.break_name.$model" :placeholder="$t(`field.break_name.placeholder`)"></q-input>
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
            :label="$t(`field.start.label`)"
            :helper="$t(`field.start.helper`)"
            :error="$v.item.start.$error"
            :error-label="validationError($v.item.start)"
          >
            <q-datetime type="time" v-model="$v.item.start.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.end.label`)"
            :helper="$t(`field.end.helper`)"
            :error="$v.item.end.$error"
            :error-label="validationError($v.item.end)"
          >
            <q-datetime type="time" v-model="$v.item.end.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.duration.label`)"
            :helper="$t(`field.duration.helper`)"
            :error="$v.item.duration.$error"
            :error-label="validationError($v.item.duration)"
          >
            <q-datetime type="time" v-model="$v.item.duration.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_BREAK } from 'assets/apiRoutes'
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
    break_name: '',
    description: '',
    start: null,
    end: null,
    duration: null
  }
}

export default {
  name: 'HRAttBreak',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttBreak',
      apiRoute: HR_ATT_BREAK,
      editMode: false,
      item: newItem(),
      table: {
        loading: false,
        rowKey: 'break_id',
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
            name: 'break_name',
            required: true,
            label: this.$t('field.break_name.label'),
            align: 'left',
            field: 'break_name',
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
            name: 'start',
            required: true,
            label: this.$t('field.start.label'),
            align: 'left',
            field: row => row.start ? this.$date.formatDate(new Date(row.start), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'end',
            required: true,
            label: this.$t('field.end.label'),
            align: 'left',
            field: row => row.end ? this.$date.formatDate(new Date(row.end), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'duration',
            required: true,
            label: this.$t('field.duration.label'),
            align: 'left',
            field: row => row.duration ? this.$date.formatDate(new Date(row.duration), 'HH:mm') : '',
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
      break_name: {
        required
      },
      description: {

      },
      start: {
        required
      },
      end: {
        required
      },
      duration: {
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
        this.$axios.get(HR_ATT_BREAK, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ break_id: item.break_id })
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
      "title": "Pausa",
      "subtitle": " "
    }
  }
}
</i18n>
