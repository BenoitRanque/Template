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
            <q-select filter :options="options.employee_id" v-model="$v.item.employee_id.$model" :placeholder="$t(`field.employee_id.placeholder`)"></q-select>
          </q-field>
          <div class="q-headline">Jornadas</div>
          <div class="q-py-md">

            <div v-for="(slot, index) in $v.item.slots.$each.$iter" :key="index">
              <schedule-select
                v-model="slot.schedule.$model"
                @input="$event => { slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null }"
                :timetable-types="timetableTypes"
                :schedule-presets="schedulePresets">
                <div class="col" slot="header">
                  <q-datetime type="date" v-model="slot.date.$model" :placeholder="$t(`field.slot_date.placeholder`)"></q-datetime>
                </div>
              </schedule-select>
              <hr>
            </div>
            <!-- <div class="shadow-6 q-pa-md">
              slot/schedule (add toggle here for advanced mode)
              <div class="shadow-12 q-pa-md">
                timetable (optional) (other toggle for mor advanced options)
              </div>
            </div> -->
            <div class="row justify-around items-center q-mt-lg">
                <q-btn color="negative" icon="remove" @click="$v.item.slots.$model.pop()">
                  <q-tooltip>Remover Jornada</q-tooltip>
                </q-btn>
                <q-btn color="positive" icon="add" @click="$v.item.slots.$model.push({
                  date: null,
                  schedule: null,
                  schedule_id: null
                })">
                  <q-tooltip>Aggregar Jornada</q-tooltip>
                </q-btn>
            </div>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_EXCEPTION, HR_EMPLOYEE, HR_ATT_SCHEDULE, HR_ATT_TIMETYPE } from 'assets/apiRoutes'
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK, ATT_EXTRA } = ATT
import tableMixin from 'src/mixins/tableMixin'
import validationError from 'src/mixins/validationError'
import ScheduleSelect from 'components/ScheduleSelect'
import {
  requiredIf,
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
  components: { ScheduleSelect },
  data () {
    return {
      resource: 'HRAttException',
      apiRoute: HR_ATT_EXCEPTION,
      editMode: false,
      item: newItem(),
      schedulePresets: [],
      timetableTypes: [],
      mapItemOptions: {
        // slots: slot => {
        //   slot.timetable = slot.timetable.map(timetable => this.options.timetable.find(option => option.value.timetable_id === timetable.timetable_id).value)
        //   return slot
        // }
      },
      options: {
        // timetable: []
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
            label: this.$t('field.exception_slots.label'),
            align: 'left',
            field: row => row.slots.length,
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

      },
      description: {

      },
      employee_id: {
        required
      },
      slots: {
        $each: {
          schedule: {
            required
          },
          schedule_id: {
            requiredIf: requiredIf(model => model.schedule && model.schedule.schedule_id)
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
        this.$axios.get(HR_ATT_EXCEPTION, { params: { eager: '[employee, slots.schedule.timetable]' } }),
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '' } }),
        this.$axios.get(HR_ATT_SCHEDULE, { params: { eager: 'timetable', standard: true } }),
        this.$axios.get(HR_ATT_TIMETYPE, { params: { eager: '', type_id: [ATT_TIMEOFF, ATT_WORK, ATT_BREAK, ATT_EXTRA] } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.employee_id = (response[1] && response[1].data) ? response[1].data.map(employee => ({
            value: employee.employee_id,
            label: employee.name_first + ' ' + employee.name_paternal,
            stamp: String(employee.zktime_pin)
          })) : []
          this.schedulePresets = response[2] ? response[2].data : []
          this.timetableTypes = response[3] ? response[3].data : []
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
      "title": "Excepcion",
      "subtitle": " "
    }
  }
}
</i18n>
