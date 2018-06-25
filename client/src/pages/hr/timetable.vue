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
            :label="$t(`field.timetable_name.label`)"
            :helper="$t(`field.timetable_name.helper`)"
            :error="$v.item.timetable_name.$error"
            :error-label="validationError($v.item.timetable_name)"
          >
            <q-input v-model="$v.item.timetable_name.$model" :placeholder="$t(`field.timetable_name.placeholder`)"></q-input>
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
            :label="$t(`field.type.label`)"
            :helper="$t(`field.type.helper`)"
            :error="$v.item.type_id.$error"
            :error-label="validationError($v.item.type_id)"
          >
            <q-select :options="options.type_id" v-model="$v.item.type_id.$model" :placeholder="$t(`field.type.placeholder`)"></q-select>
          </q-field>
          <q-field
            :label="$t(`field.duration.label`)"
            :helper="$t(`field.duration.helper`)"
            :error="$v.item.duration.$error"
            :error-label="validationError($v.item.duration)"
          >
            <q-datetime type="time" v-model="$v.item.duration.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.in_time.label`)"
            :helper="$t(`field.in_time.helper`)"
            :error="$v.item.in_time.$error"
            :error-label="validationError($v.item.in_time)"
          >
            <q-datetime type="time" v-model="$v.item.in_time.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.in_start.label`)"
            :helper="$t(`field.in_start.helper`)"
            :error="$v.item.in_start.$error"
            :error-label="validationError($v.item.in_start)"
          >
            <q-datetime type="time" v-model="$v.item.in_start.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.in_end.label`)"
            :helper="$t(`field.in_end.helper`)"
            :error="$v.item.in_end.$error"
            :error-label="validationError($v.item.in_end)"
          >
            <q-datetime type="time" v-model="$v.item.in_end.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.out_time.label`)"
            :helper="$t(`field.out_time.helper`)"
            :error="$v.item.out_time.$error"
            :error-label="validationError($v.item.out_time)"
          >
            <q-datetime type="time" v-model="$v.item.out_time.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.out_start.label`)"
            :helper="$t(`field.out_start.helper`)"
            :error="$v.item.out_start.$error"
            :error-label="validationError($v.item.out_start)"
          >
            <q-datetime type="time" v-model="$v.item.out_start.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.out_end.label`)"
            :helper="$t(`field.out_end.helper`)"
            :error="$v.item.out_end.$error"
            :error-label="validationError($v.item.out_end)"
          >
            <q-datetime type="time" v-model="$v.item.out_end.$model" :placeholder="$t(`field.description.placeholder`)"></q-datetime>
          </q-field>
          <q-field
            :label="$t(`field.break.label`)"
            :helper="$t(`field.break.helper`)"
            :error="$v.item.break.$error"
            :error-label="validationError($v.item.break)"
          >
            <q-select multiple :options="options.break" v-model="$v.item.break.$model" :placeholder="$t(`field.break.placeholder`)"></q-select>
          </q-field>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_TIMETABLE, HR_ATT_BREAK, HR_ATT_TYPE } from 'assets/apiRoutes'
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
    timetable_name: '',
    description: '',
    type_id: null,
    duration: null,
    in_time: null,
    in_start: null,
    in_end: null,
    out_time: null,
    out_start: null,
    out_end: null,
    break: []
  }
}

export default {
  name: 'HRAttTimetable',
  mixins: [tableMixin, validationError],
  data () {
    return {
      resource: 'HRAttTimetable',
      apiRoute: HR_ATT_TIMETABLE,
      editMode: false,
      item: newItem(),
      mapItemOptions: {
        break: b => this.options.break.find(option => option.value.break_id === b.break_id).value,
        type: t => this.options.type.find(option => option.value.type_id === t.type_id).value
      },
      options: {
        break: [],
        type_id: []
      },
      table: {
        loading: false,
        rowKey: 'timetable_id',
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
            name: 'timetable_name',
            required: true,
            label: this.$t('field.timetable_name.label'),
            align: 'left',
            field: 'timetable_name',
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
            name: 'type',
            required: true,
            label: this.$t('field.type.label'),
            align: 'left',
            field: row => row.type.code,
            sortable: true
          },
          {
            name: 'duration',
            required: true,
            label: this.$t('field.duration.label'),
            align: 'left',
            field: row => row.duration ? this.$date.formatDate(new Date(row.duration).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'in_time',
            required: true,
            label: this.$t('field.in_time.label'),
            align: 'left',
            field: row => row.in_time ? this.$date.formatDate(new Date(row.in_time).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'in_start',
            required: true,
            label: this.$t('field.in_start.label'),
            align: 'left',
            field: row => row.in_start ? this.$date.formatDate(new Date(row.in_start).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'in_end',
            required: true,
            label: this.$t('field.in_end.label'),
            align: 'left',
            field: row => row.in_end ? this.$date.formatDate(new Date(row.in_end).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'out_time',
            required: true,
            label: this.$t('field.out_time.label'),
            align: 'left',
            field: row => row.out_time ? this.$date.formatDate(new Date(row.out_time).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'out_start',
            required: true,
            label: this.$t('field.out_start.label'),
            align: 'left',
            field: row => row.out_start ? this.$date.formatDate(new Date(row.out_start).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'out_end',
            required: true,
            label: this.$t('field.out_end.label'),
            align: 'left',
            field: row => row.out_end ? this.$date.formatDate(new Date(row.out_end).getTime(), 'HH:mm') : '',
            sortable: true
          },
          {
            name: 'break',
            required: true,
            label: this.$t('field.break.label'),
            align: 'left',
            field: row => row.break.map(b => b.break_name).join(', '),
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
      timetable_name: {
        required
      },
      description: {

      },
      type_id: {
        required
      },
      duration: {
        required
      },
      in_time: {
        required
      },
      in_start: {
        required
      },
      in_end: {
        required
      },
      out_time: {
        required
      },
      out_start: {
        required
      },
      out_end: {
        required
      },
      break: {

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
        this.$axios.get(HR_ATT_TIMETABLE, { params: { eager: '[break, type]' } }),
        this.$axios.get(HR_ATT_BREAK, { params: { eager: '' } }),
        this.$axios.get(HR_ATT_TYPE, { params: { eager: '' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.options.break = (response[1] && response[1].data) ? response[1].data.map(b => ({
            value: b,
            label: b.break_name,
            sublabel: b.description
          })) : []
          this.options.type_id = (response[2] && response[2].data) ? response[2].data.map(type => ({
            value: type.type_id,
            label: type.type_name,
            sublabel: type.description
          })) : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ timetable_id: item.timetable_id })
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
