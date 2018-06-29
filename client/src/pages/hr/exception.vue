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
            :label="$t(`field.exception_name.label`)"
            :helper="$t(`field.exception_name.helper`)"
            :error="$v.item.exception_name.$error"
            :error-label="validationError($v.item.exception_name)"
          >
            <q-input v-model="$v.item.exception_name.$model" :placeholder="$t(`field.exception_name.placeholder`)"></q-input>
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
            :label="$t(`field.employee_id.label`)"
            :helper="$t(`field.employee_id.helper`)"
            :error="$v.item.employee_id.$error"
            :error-label="validationError($v.item.employee_id)"
          >
            <q-select v-model="$v.item.employee_id.$model" :options="options.employee_id" :placeholder="$t(`field.employee_id.placeholder`)"></q-select>
          </q-field>
          <template v-for="(slot, index) in $v.item.slots.$each.$iter">
            <q-field
              :key="index"
              :label="`${$t('field.exception_slot_date.label')} ${Number(index) + 1}`"
              :helper="$t(`field.exception_slot_date.helper`)"
              :error="slot.date.$error"
              :error-label="validationError(slot.date)"
            >
              <q-datetime type="date" v-model="slot.date.$model" :placeholder="$t(`field.exception_slot_date.placeholder`)"></q-datetime>
            </q-field>
            <q-field
              :key="index"
              :label="`${$t('field.exception_slot_schedule.label')} ${Number(index) + 1}`"
              :helper="$t(`field.exception_slot_schedule.helper`)"
              :error="slot.schedule.$error"
              :error-label="validationError(slot.schedule)"
            >
              <q-select v-model="slot.schedule.$model" :options="options.schedule" multiple :placeholder="$t('field.exception_slot_schedule.placeholder')"></q-select>
            </q-field>
          </template>
          <div class="row justify-around q-pa-md">
            <q-btn round icon="remove" color="negative"
              @click="item.slots.pop()"
            ></q-btn>
            <q-btn round icon="add" color="positive"
              @click="item.slots.push({ schedule: [], date: null })"
            ></q-btn>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_SCHEDULE, HR_ATT_EXCEPTION, HR_EMPLOYEE } from 'assets/apiRoutes'
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
    exception_name: '',
    description: '',
    employee_id: null,
    slots: []

  }
}

export default {
  name: 'HRAttException',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttException',
      apiRoute: HR_ATT_EXCEPTION,
      editMode: false,
      item: newItem(),
      mapItemOptions: {
        slots: slot => {
          slot.schedule = slot.schedule.map(schedule => this.options.schedule.find(option => option.value.schedule_id === schedule.schedule_id).value)
          return slot
        }
      },
      options: {
        schedule: [],
        employee_id: []
      },
      table: {
        loading: false,
        rowKey: 'exception_id',
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
            name: 'exception_name',
            required: true,
            label: this.$t('field.exception_name.label'),
            align: 'left',
            field: 'exception_name',
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
            name: 'slots',
            required: true,
            label: this.$t('field.shift_slots.label'),
            align: 'left',
            field: row => row.slots.map(slot => slot.date).join(', '),
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
      exception_name: {
        required
      },
      description: {

      },
      employee_id: {
        required
      },
      slots: {
        $each: {
          schedule: {

          },
          date: {
            required
          }
        }
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
        this.$axios.get(HR_ATT_EXCEPTION, { params: { eager: '[slots.schedule.break, request, authorization, employee]' } }),
        this.$axios.get(HR_ATT_SCHEDULE, { params: { eager: '[break]' } }),
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.schedule = (response[1] && response[1].data) ? response[1].data.map(schedule => ({
            value: schedule,
            label: schedule.schedule_name,
            sublabel: schedule.description
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
    deleteParams: (item) => ({ exception_id: item.exception_id })
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
      "title": "Turno",
      "subtitle": " "
    }
  }
}
</i18n>
