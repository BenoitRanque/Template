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
            <q-select filter :options="subordinateEmployeeOptions" v-model="$v.item.employee_id.$model" :placeholder="$t(`field.employee_id.placeholder`)"></q-select>
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
          <div class="q-headline">Jornadas</div>
          <div class="q-py-md">

            <div v-for="(slot, index) in $v.item.slots.$each.$iter" :key="index">
              <q-field :label="slotLabel(index)">
                <div class="row">
                  <schedule-select class="col"
                    v-model="slot.schedule.$model"
                    @input="slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null"
                  ></schedule-select>
                  <div class="col-auto">
                    <q-btn dense color="negative" icon="close" @click="$v.item.slots.$model.splice(Number(index), 1)">
                      <q-tooltip>Quitar Dia</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-field>
              <!-- <schedule-select
                v-model="slot.schedule.$model"
                @input="$event => { slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null }"
                :timetable-types="timetableTypes"
                :schedule-presets="schedulePresets">
                <div class="col" slot="header">{{slotLabel(index)}}</div>
              </schedule-select> -->
              <hr>
            </div>
            <!-- <div class="shadow-6 q-pa-md">
              slot/schedule (add toggle here for advanced mode)
              <div class="shadow-12 q-pa-md">
                timetable (optional) (other toggle for mor advanced options)
              </div>
            </div> -->
            <div class="row justify-around items-center q-mt-lg">
                <q-btn rounded color="positive" icon="add" @click="$v.item.slots.$model.push({
                  index: $v.item.slots.$model.length,
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
import { HR_ATT_SHIFT } from 'assets/apiRoutes'
import { mapActions, mapGetters } from 'vuex'
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
    slots: [
      {
        index: 0,
        schedule: null,
        schedule_id: null
      },
      {
        index: 1,
        schedule: null,
        schedule_id: null
      },
      {
        index: 2,
        schedule: null,
        schedule_id: null
      },
      {
        index: 3,
        schedule: null,
        schedule_id: null
      },
      {
        index: 4,
        schedule: null,
        schedule_id: null
      },
      {
        index: 5,
        schedule: null,
        schedule_id: null
      },
      {
        index: 6,
        schedule: null,
        schedule_id: null
      }
    ]
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
            name: 'employee',
            required: true,
            label: this.$t('field.name.label'),
            align: 'left',
            field: row => row.employee.name_first,
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
        // required
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
            requiredIf: requiredIf(model => {
              console.log(model)
              return !model.schedule_id
            })
          },
          schedule_id: {
            requiredIf: requiredIf(model => !model.schedule || (model.schedule && model.schedule.schedule_id))
          },
          index: {
            required
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('hr', {
      subordinateEmployeeOptions: 'subordinateEmployeeOptions'
    })
  },
  methods: {
    ...mapActions('hr', {
      fetchTimetypes: 'fetchTimetypes',
      fetchSubordinateEmployees: 'fetchSubordinateEmployees',
      fetchStandardSchedules: 'fetchStandardSchedules'
    }),
    slotInput (input, index) {
      this.$q.notify('input received')
      this.$set(this.item.slots, index, input)
    },
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(HR_ATT_SHIFT, { params: { eager: '[employee, slots.schedule.[breaktime, uptime, downtime]]' } }),
        this.fetchTimetypes(),
        this.fetchSubordinateEmployees(),
        this.fetchStandardSchedules()
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ shift_id: item.shift_id }),
    slotLabel (index) {
      return `Jornada ${Number(index) + 1}` + (this.item.start_date ? this.$date.formatDate(this.$date.addToDate(new Date(this.item.start_date), { days: Number(index) }), ' - dddd D') : '')
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
