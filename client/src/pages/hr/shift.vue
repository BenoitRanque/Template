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
            :label="$t(`field.shift_name.label`)"
            :helper="$t(`field.shift_name.helper`)"
            :error="$v.item.shift_name.$error"
            :error-label="validationError($v.item.shift_name)"
          >
            <q-input v-model="$v.item.shift_name.$model" :placeholder="$t(`field.shift_name.placeholder`)"></q-input>
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
            <q-datetime type="date" clearable v-model="$v.item.end_date.$model" :placeholder="$t(`field.end_date.placeholder`)"></q-datetime>
          </q-field>
          <div class="shadow-3 q-pa-md">
              shift
            <div class="shadow-6" v-for="(slot, index) in $v.item.slots.$each.$iter" :key="index">
              <schedule-select v-model="slot.schedule.$model" select standard @input="$event => { slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null }" :schedule-presets="schedulePresets">
                <div class="col" slot="header">{{slotLabel(index)}}</div>
              </schedule-select>
            </div>
            <!-- <div class="shadow-6 q-pa-md">
              slot/schedule (add toggle here for advanced mode)
              <div class="shadow-12 q-pa-md">
                timetable (optional) (other toggle for mor advanced options)
              </div>
            </div> -->
            <div class="row justify-around items-center q-mt-lg">
                <q-btn color="negative" icon="remove" @click="$v.item.slots.$model.pop()"></q-btn>
                <q-btn color="positive" icon="add" @click="$v.item.slots.$model.push({
                  index: $v.item.slots.$model.length,
                  schedule: null,
                  schedule_id: null
                })"></q-btn>
            </div>
          </div>
          <pre>{{item}}</pre>
          <pre>{{$v}}</pre>
          <!-- <q-field
            v-for="(slot, index) in $v.item.slots.$each.$iter"
            :key="index"
            :label="`${$t('field.shift_slot.label')} ${Number(index) + 1}`"
            :helper="$t(`field.shift_slot.helper`)"
            :error="slot.$error"
            :error-label="validationError(slot.timetable)"
          >
            <q-select v-model="slot.timetable.$model" :options="options.timetable" multiple :placeholder="$t('field.shift_slot.placeholder')"></q-select>
          </q-field> -->
          <!-- <div class="row justify-around q-pa-md">
            <q-btn round icon="remove" color="negative"
              @click="item.slots.pop()"
            ></q-btn>
            <q-btn round icon="add" color="positive"
              @click="item.slots.push({ timetable: [], index: item.slots.length })"
            ></q-btn>
          </div> -->
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_SHIFT, HR_EMPLOYEE, HR_ATT_SCHEDULE } from 'assets/apiRoutes'
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
    shift_name: '',
    description: '',
    employee_id: null,
    start_date: null,
    end_date: null,
    slots: []
  }
}

export default {
  name: 'HRAttShift',
  mixins: [tableMixin, validationError],
  components: { ScheduleSelect },
  data () {
    return {
      resource: 'HRAttShift',
      apiRoute: HR_ATT_SHIFT,
      editMode: false,
      item: newItem(),
      schedulePresets: [],
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
        rowKey: 'shift_id',
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
            field: 'shift_name',
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
      shift_name: {
        required
      },
      description: {

      },
      employee_id: {
        required
      },
      start_date: {
        required
      },
      end_date: {

      },
      slots: {
        $each: {
          schedule: {
            required
          },
          schedule_id: {
            requiredIf: requiredIf(model => model.schedule && model.schedule.schedule_id)
          },
          index: {
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
        this.$axios.get(HR_ATT_SHIFT, { params: { eager: '[employee, slots.schedule.timetable]' } }),
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '' } }),
        this.$axios.get(HR_ATT_SCHEDULE, { params: { eager: 'timetable', standard: true } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.employee_id = (response[1] && response[1].data) ? response[1].data.map(employee => ({
            value: employee.employee_id,
            label: employee.name_first + ' ' + employee.name_paternal,
            stamp: String(employee.zktime_pin)
          })) : []
          this.schedulePresets = response[2] ? response[2].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ shift_id: item.shift_id }),
    slotLabel (index) {
      return this.item.start_date ? this.$date.formatDate(this.$date.addToDate(new Date(this.item.start_date), { days: Number(index) }), 'dddd D') : Number(index) + 1
    }
  },
  watch: {
    'item.slots.index': function () {
      console.log('there was a change')
    }
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
