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
            v-for="(type, field) in {
              transaction_name: 'text',
              description: 'text',
              employee_id: 'select',
              timetype_id: 'select',
              type: 'text',
              amount: 'number'
            }"
            :key="field"
            :label="$t(`field.${field}.label`)"
            :helper="$t(`field.${field}.helper`)"
            :error="$v.item[field].$error"
            :error-label="validationError($v.item[field])"
          >
            <q-select v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-if="type === 'select'" :options="_self[field]"></q-select>
            <q-datetime v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else-if="['date','time','datetime'].includes(type)" :type="type"></q-datetime>
            <q-input v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else :type="type"></q-input>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_TRANSACTION } from 'assets/apiRoutes'
import tableMixin from 'src/mixins/tableMixin'
import validationError from 'src/mixins/validationError'
import { mapGetters, mapActions } from 'vuex'
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
    transaction_name: '',
    description: '',
    employee_id: null,
    timtype_id: null,
    type: null,
    amount: 0
  }
}

export default {
  name: 'HRAttTransaction',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttTransaction',
      apiRoute: HR_ATT_TRANSACTION,
      editMode: false,
      item: newItem(),
      table: {
        loading: false,
        rowKey: 'transaction_id',
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
            name: 'transaction_name',
            required: true,
            label: this.$t('field.transaction_name.label'),
            align: 'left',
            field: 'transaction_name',
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
            name: 'employee_id',
            required: true,
            label: this.$t('field.employee_id.label'),
            align: 'left',
            field: 'employee_id',
            sortable: true
          },
          {
            name: 'timetype_id',
            required: true,
            label: this.$t('field.timetype_id.label'),
            align: 'left',
            field: 'timetype_id',
            sortable: true
          },
          {
            name: 'type',
            required: true,
            label: this.$t('field.type.label'),
            align: 'left',
            field: 'type',
            sortable: true
          },
          {
            name: 'amount',
            required: true,
            label: this.$t('field.amount.label'),
            align: 'left',
            field: 'amount',
            sortable: true
          },
          {
            name: 'user_id',
            required: true,
            label: this.$t('field.user_id.label'),
            align: 'left',
            field: 'user_id',
            sortable: true
          }
        ]
      }
    }
  },
  validations: {
    item: {
      transaction_name: {
        required
      },
      description: {

      },
      employee_id: {
        required
      },
      timetype_id: {
        required
      },
      type: {
        required
      },
      amount: {
        required
      },
      user_id: {
        required
      }
    }
  },
  computed: {
    ...mapGetters('hr', {
      timetype_id: 'downtimeTimetypesOptions',
      employee_id: 'subordinateEmployeeOptions'
    })
  },
  methods: {
    ...mapActions('hr', {
      fetchTimetypes: 'fetchTimetypes',
      fetchSubordinateEmployees: 'fetchSubordinateEmployees'
    }),
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(HR_ATT_TRANSACTION, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ transaction_id: item.transaction_id })
  },
  mounted () {
    console.log(this)
    this.fetchTimetypes()
    this.fetchSubordinateEmployees()
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
