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

      <q-td slot="body-cell-type" slot-scope="props" :props="props" auto-width>
        <q-chip :style="{ 'background': props.row.type.color }">{{props.row.type.code}}</q-chip>
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
            :label="$t(`field.schedule_name.label`)"
            :helper="$t(`field.schedule_name.helper`)"
            :error="$v.item.schedule_name.$error"
            :error-label="validationError($v.item.schedule_name)"
          >
            <q-input v-model="$v.item.schedule_name.$model" :placeholder="$t(`field.schedule_name.placeholder`)"></q-input>
          </q-field>
          <q-field
            :label="$t(`field.description.label`)"
            :helper="$t(`field.description.helper`)"
            :error="$v.item.description.$error"
            :error-label="validationError($v.item.description)"
          >
            <q-input v-model="$v.item.description.$model" :placeholder="$t(`field.description.placeholder`)"></q-input>
          </q-field>
          <q-toggle v-model="advancedTimetable" label="modo avanzado"></q-toggle>
          <div
            class="shadow-6 q-my-sm q-pb-sm"
            :style="{'background-color': timetable.type_id.$model === null ? null : timetableTypes && timetableTypes[timetable.type_id.$model] ? timetableTypes[timetable.type_id.$model].color : null}"
            v-for="(timetable, index) in $v.item.timetable.$each.$iter" :key="index">
            <div class="row items-center">
              <q-input class="col" v-model="timetable.timetable_name.$model" hide-underline></q-input>
              <div class="col">{{timetableSummary(timetable.$model)}}</div>
              <div class="col-auto">
                <q-btn icon="close" @click="$v.item.timetable.$model.splice(Number(index), 1)" size="md" dense color="negative"></q-btn>
              </div>
            </div>
            <div class="row q-px-sm" v-if="advancedTimetable">
              <q-select class="col-6" :options="options.type_id" v-model="timetable.type_id.$model"></q-select>
              <q-datetime :format24h="true" class="col-6" type="time" v-model="timetable.duration.$model"></q-datetime>
              <q-datetime :format24h="false" class="col-6" type="time" v-model="timetable.start_time.$model"></q-datetime>
              <q-datetime :format24h="false" class="col-6" type="time" v-model="timetable.end_time.$model"></q-datetime>
              <div class="col-6 q-pt-sm">
                <q-checkbox v-model="timetable.start_register.$model" label="debe marcar inicio"></q-checkbox>
              </div>
              <div class="col-6 q-pt-sm">
                <q-checkbox v-model="timetable.end_register.$model" label="debe marcar fin"></q-checkbox>
              </div>
            </div>
          </div>
          <div class="row justify-around q-pa-md">
            <q-btn icon="add" color="positive">
              <q-popover self="top middle" anchor="bottom middle">
                <q-list link>
                  <q-item v-for="(preset, index) in timetablePresets" :key="index" v-close-overlay @click.native="$v.item.timetable.$model.push(clonePreset(preset))">
                    <q-item-main :label="preset.timetable_name" :sublabel="timetableSummary(preset)"></q-item-main>
                    <q-item-side>
                      <q-chip :style="{ 'background': timetableTypes && timetableTypes[preset.type_id] ? timetableTypes[preset.type_id].color : null}">{{timetableTypes && timetableTypes[preset.type_id] ? timetableTypes[preset.type_id].code : null}}</q-chip>
                    </q-item-side>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </div>
        </div>
        <pre>{{$v}}</pre>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_SCHEDULE, HR_ATT_TYPE } from 'assets/apiRoutes'
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK, ATT_EXTRA } = ATT
import tableMixin from 'src/mixins/tableMixin'
import validationError from 'src/mixins/validationError'
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
    schedule_name: '',
    description: '',
    standard: true,
    timetable: []
  }
}
export default {
  name: 'HRAttSchedule',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttSchedule',
      apiRoute: HR_ATT_SCHEDULE,
      editMode: false,
      item: newItem(),
      advancedTimetable: false,
      timetablePresets: [
        {
          type_id: ATT_TIMEOFF,
          timetable_name: 'Dia Libre',
          start_time: null,
          start_register: false,
          end_time: null,
          end_register: false,
          duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_TIMEOFF,
          timetable_name: 'Medio Dia Libre',
          start_time: null,
          start_register: false,
          end_time: null,
          end_register: false,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_BREAK,
          timetable_name: 'Almuerzo',
          start_time: this.$date.buildDate({hours: 11, minutes: 0, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 0, minutes: 30, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Dia Laboral Continuo',
          start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Dia Laboral Continuo',
          start_time: this.$date.buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Dia Laboral Continuo',
          start_time: this.$date.buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Medio Dia Laboral',
          start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Medio Dia Laboral',
          start_time: this.$date.buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Medio Dia Laboral',
          start_time: this.$date.buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Medio Dia Laboral',
          start_time: this.$date.buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Medio Dia Laboral',
          start_time: this.$date.buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        },
        {
          type_id: ATT_WORK,
          timetable_name: 'Medio Dia Laboral',
          start_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
          start_register: true,
          end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
          end_register: true,
          duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
        }
      ],
      timetableTypes: null,
      options: {
        boolean: [{value: true, label: this.$t('options.boolean.true')}, {value: false, label: this.$t('options.boolean.false')}],
        type_id: []
      },
      table: {
        loading: false,
        rowKey: 'schedule_id',
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
            name: 'schedule_name',
            required: true,
            label: this.$t('field.schedule_name.label'),
            align: 'left',
            field: 'schedule_name',
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
            name: 'standard',
            required: true,
            label: this.$t('field.standard.label'),
            align: 'left',
            field: 'standard',
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
      schedule_name: {
        required
      },
      description: {

      },
      standard: {

      },
      timetable: {
        required,
        dailyHours: value => value.reduce((acc, val) => [ATT_WORK, ATT_TIMEOFF].includes(val.type_id) ? acc + (new Date(val.duration).getHours() + (new Date(val.duration).getMinutes() / 60)) : acc, 0) === 8, // 8 hours daily
        $each: {
          type_id: { required },
          timetable_name: { },
          start_time: {
            requiredIf: requiredIf(timetable => [ATT_WORK, ATT_BREAK].includes(timetable.type_id))
          },
          start_register: {},
          end_time: {
            requiredIf: requiredIf(timetable => [ATT_WORK, ATT_BREAK].includes(timetable.type_id))
          },
          end_register: {},
          duration: {
            requiredIf: requiredIf(timetable => [ATT_WORK, ATT_BREAK, ATT_TIMEOFF].includes(timetable.type_id))
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
        this.$axios.get(HR_ATT_SCHEDULE, { params: { eager: '[timetable]' } }),
        this.$axios.get(HR_ATT_TYPE, { params: { eager: '', type_id: [ATT_TIMEOFF, ATT_WORK, ATT_BREAK, ATT_EXTRA] } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.type_id = (response[1] && response[1].data) ? response[1].data.map(t => ({
            value: t.type_id,
            label: t.type_name,
            sublabel: t.description
          })) : []
          this.timetableTypes = (response[1] && response[1].data) ? response[1].data.reduce((acc, val) => {
            acc[val.type_id] = val
            return acc
          }, {}) : {}
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ schedule_id: item.schedule_id }),
    clonePreset (preset) {
      let clone = {
        ...preset
      }
      Object.keys(clone).forEach(propName => {
        if (clone[propName] instanceof Date) clone[propName] = this.$date.clone(clone[propName])
      })
      return clone
    },
    timetableSummary (timetable) {
      switch (timetable.type_id) {
        case ATT_TIMEOFF:
          return `Duración ${this.$date.formatDate(timetable.duration, 'HH:mm')}`
        case ATT_BREAK:
          return `${this.$date.formatDate(timetable.duration, 'HH:mm')} entre ${this.$date.formatDate(timetable.start_time, 'HH:mm')}-${this.$date.formatDate(timetable.end_time, 'HH:mm')}`
        case ATT_WORK:
          return `${this.$date.formatDate(timetable.start_time, 'HH:mm')}-${this.$date.formatDate(timetable.end_time, 'HH:mm')} duración ${this.$date.formatDate(timetable.duration, 'HH:mm')}`
      }
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
      "title": "Horario",
      "subtitle": " "
    }
  }
}
</i18n>
