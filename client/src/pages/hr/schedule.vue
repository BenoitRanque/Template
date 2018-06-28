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
            {{isAuthorized(resource, 'delete', 'any')}}
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
          <q-field
            :label="$t(`field.standard.label`)"
            :helper="$t(`field.standard.helper`)"
            :error="$v.item.standard.$error"
            :error-label="validationError($v.item.standard)"
          >
            <q-select :options="options.boolean" v-model="$v.item.standard.$model" :placeholder="$t(`field.standard.placeholder`)"></q-select>
          </q-field>
          <template v-for="(timetable, index) in $v.item.timetable.$each.$iter">
            <q-field
              :key="index"
              :label="$t(`field.att_type.label`)"
              :helper="$t(`field.att_type.helper`)"
              :error="timetable.type.$error"
              :error-label="validationError(timetable.type)"
            >
              <q-select :options="options.att_type" v-model="timetable.type.$model" :placeholder="$t(`field.att_type.placeholder`)"></q-select>
            </q-field>
            <q-field
              :key="index"
              :label="$t(`field.start_time.label`)"
              :helper="$t(`field.start_time.helper`)"
              :error="timetable.start_time.$error"
              :error-label="validationError(timetable.start_time)"
            >
              <q-datetime type="time" v-model="timetable.start_time.$model" :placeholder="$t(`field.start_time.placeholder`)"></q-datetime>
            </q-field>
            <q-field
              :key="index"
              :label="$t(`field.start_register.label`)"
              :helper="$t(`field.start_register.helper`)"
              :error="timetable.start_register.$error"
              :error-label="validationError(timetable.start_register)"
            >
              <q-select :options="options.boolean" v-model="timetable.type.$model" :placeholder="$t(`field.start_register.placeholder`)"></q-select>
            </q-field>
            <q-field
              :key="index"
              :label="$t(`field.end_time.label`)"
              :helper="$t(`field.end_time.helper`)"
              :error="timetable.end_time.$error"
              :error-label="validationError(timetable.end_time)"
            >
              <q-datetime type="time" v-model="timetable.end_time.$model" :placeholder="$t(`field.end_time.placeholder`)"></q-datetime>
            </q-field>
            <q-field
              :key="index"
              :label="$t(`field.end_register.label`)"
              :helper="$t(`field.end_register.helper`)"
              :error="timetable.end_register.$error"
              :error-label="validationError(timetable.end_register)"
            >
              <q-select :options="options.boolean" v-model="timetable.type.$model" :placeholder="$t(`field.end_register.placeholder`)"></q-select>
            </q-field>
            <q-field
              :key="index"
              :label="$t(`field.duration.label`)"
              :helper="$t(`field.duration.helper`)"
              :error="timetable.duration.$error"
              :error-label="validationError(timetable.duration)"
            >
              <q-datetime type="time" v-model="timetable.duration.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
            </q-field>
            <q-field
              :key="index"
              :label="$t(`field.flexible.label`)"
              :helper="$t(`field.flexible.helper`)"
              :error="timetable.flexible.$error"
              :error-label="validationError(timetable.flexible)"
            >
              <q-select :options="options.boolean" v-model="timetable.type.$model" :placeholder="$t(`field.flexible.placeholder`)"></q-select>
            </q-field>
          </template>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_SCHEDULE, HR_ATT_TYPE } from 'assets/apiRoutes'
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
    schedule_name: '',
    description: '',
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
        $each: {
          type_id: {},
          start_time: {},
          start_register: {},
          end_time: {},
          end_register: {},
          duration: {},
          flexible: {}
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
        this.$axios.get(HR_ATT_TYPE, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.att_type = (response[1] && response[1].data) ? response[1].data.map(t => ({
            value: t.type_id,
            label: t.type_name,
            sublabel: t.description
          })) : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ schedule_id: item.schedule_id })
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
