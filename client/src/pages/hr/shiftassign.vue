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
            :label="$t(`field.employee_id.label`)"
            :helper="$t(`field.employee_id.helper`)"
            :error="$v.item.employee_id.$error"
            :error-label="validationError($v.item.employee_id)"
          >
            <q-select v-model="$v.item.employee_id.$model" :options="options.employee_id" :placeholder="$t(`field.employee_id.placeholder`)"></q-select>
          </q-field>
          <q-field
            :label="$t(`field.shift_id.label`)"
            :helper="$t(`field.shift_id.helper`)"
            :error="$v.item.shift_id.$error"
            :error-label="validationError($v.item.shift_id)"
          >
            <q-select v-model="$v.item.shift_id.$model" :options="options.shift_id" :placeholder="$t(`field.shift_id.placeholder`)"></q-select>
          </q-field>
          <q-field
            :label="$t(`field.shift_start_index.label`)"
            :helper="$t(`field.shift_start_index.helper`)"
            :error="$v.item.shift_start_index.$error"
            :error-label="validationError($v.item.shift_start_index)"
          >
            <q-input type="number" v-model="$v.item.shift_start_index.$model" :placeholder="$t(`field.shift_start_index.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.start_date.label`)"
            :helper="$t(`field.start_date.helper`)"
            :error="$v.item.start_date.$error"
            :error-label="validationError($v.item.start_date)"
          >
            <q-datetime type="date" v-model="$v.item.start_date.$model" :placeholder="$t(`field.start_date.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.end_date.label`)"
            :helper="$t(`field.end_date.helper`)"
            :error="$v.item.end_date.$error"
            :error-label="validationError($v.item.end_date)"
          >
            <q-datetime clearable type="date" v-model="$v.item.end_date.$model" :placeholder="$t(`field.end_date.placeholder`)"></q-datetime>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_SHIFT_ASSIGN, HR_ATT_SHIFT, HR_EMPLOYEE } from 'assets/apiRoutes'
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
    shift_id: null,
    employee_id: null,
    user_id: null,
    shift_start_index: 0,
    start_date: null,
    end_date: null
  }
}

export default {
  name: 'HRAttShift',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttShiftAssign',
      apiRoute: HR_ATT_SHIFT_ASSIGN,
      editMode: false,
      item: newItem(),
      options: {
        shift_id: [],
        employee_id: []
      },
      table: {
        loading: false,
        rowKey: 'shift_assign_id',
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
            name: 'shift_name',
            required: true,
            label: this.$t('field.shift_name.label'),
            align: 'left',
            field: row => row.shift.shift_name,
            sortable: true
          },
          {
            name: 'employee',
            required: true,
            label: this.$t('field.employee.label'),
            align: 'left',
            field: row => row.employee.name_first + ' ' + row.employee.name_paternal,
            sortable: true
          },
          {
            name: 'start_date',
            required: true,
            label: this.$t('field.start_date.label'),
            align: 'left',
            field: 'start_date',
            sortable: true
          },
          {
            name: 'end_date',
            required: true,
            label: this.$t('field.end_date.label'),
            align: 'left',
            field: 'end_date',
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
      shift_id: {
        required
      },
      employee_id: {
        required
      },
      start_date: {
        required
      },
      end_date: {
        // required
      },
      shift_start_index: {
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
        this.$axios.get(HR_ATT_SHIFT_ASSIGN, { params: { eager: '[employee, shift]' } }),
        this.$axios.get(HR_ATT_SHIFT, { params: { eager: '' } }),
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.shift_id = (response[1] && response[1].data) ? response[1].data.map(shift => ({
            value: shift.shift_id,
            label: shift.shift_name,
            sublabel: shift.description
          })) : []
          this.options.employee_id = (response[2] && response[2].data) ? response[2].data.map(employee => ({
            value: employee.employee_id,
            label: employee.name_first + ' ' + employee.name_paternal
          })) : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ shift_assign_id: item.shift_assign_id })
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
      "title": "Assignacion de Turno",
      "subtitle": " "
    }
  }
}
</i18n>
