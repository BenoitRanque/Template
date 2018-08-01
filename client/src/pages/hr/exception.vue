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
        <q-checkbox v-model="queryParams.own" label="Solo Excepciones Propias"></q-checkbox>
        <q-checkbox v-model="queryParams.pending" label="Solo Excepciones pendientes"></q-checkbox>
        <q-checkbox v-model="queryParams.aproved" label="Solo Excepciones aprobadas"></q-checkbox>
        <q-checkbox v-model="queryParams.denied" label="Solo Excepciones denegadas"></q-checkbox>
        <q-btn v-if="isAuthorized(resource, 'create', 'any')" round color="positive" icon="add" size="md" @click="edit()"  />
      </template>

      <q-td slot="body-cell-edit" slot-scope="props" :props="props" auto-width>
        <q-btn size="md" round dense flat icon="edit" color="dark" @click="view = props.row; $refs.viewModal.show()"></q-btn>
      </q-td>

    </q-table>

    <!-- <q-modal no-esc-dismiss no-backdrop-dismiss content-css="width: 80vw; height: 80vh;" ref="modal">
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
        <exception v-model="item" />
      </q-modal-layout>
    </q-modal> -->

    <q-modal no-esc-dismiss no-backdrop-dismiss content-css="width: 80vw; height: 80vh;" ref="createModal">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            {{ $t('create')}} {{$t('modal.title')}}
            <span slot="subtitle">{{$t('modal.subtitle')}}</span>
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="cancel($refs.createModal)"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
          <q-btn v-if="isAuthorized(resource.create, 'create', 'any')" size="lg" rounded color="positive" icon="create" :disable="$v.item.$invalid" @click="createItem(item)">{{$t('buttons.createItem')}}</q-btn>
        </q-toolbar>
        <exception v-model="item" />
      </q-modal-layout>
    </q-modal>

    <q-modal no-esc-dismiss no-backdrop-dismiss content-css="width: 80vw; height: 80vh;" ref="viewModal">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            {{ $t('edit') }} {{$t('modal.title')}}
            <span slot="subtitle">{{$t('modal.subtitle')}}</span>
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="cancel($refs.viewModal)"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
          <q-btn v-if="isAuthorized(resource.create, 'create', 'any')" size="lg" rounded color="positive" icon="create" :disable="$v.item.$invalid" @click="createItem(item)">{{$t('buttons.createItem')}}</q-btn>
          <template v-else-if="isAuthorized(resource.authorize, 'delete', 'any')">
            <q-btn size="lg" rounded color="negative" icon="delete" @click="grantAuthorization(false)">{{$t('buttons.denyAuthorization')}}</q-btn>
            <q-btn size="lg" rounded color="positive" icon="check" @click="grantAuthorization(true)">{{$t('buttons.grantAuthorization')}}</q-btn>
          </template>
        </q-toolbar>
      </q-modal-layout>
      <div class="layout-padding">
        <exception-view :value="view"></exception-view>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_ATT_EXCEPTION } from 'assets/apiRoutes'
import { mapActions } from 'vuex'
import Exception from 'components/Exception'
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
  components: { Exception },
  data () {
    return {
      resource: 'HRAttException',
      apiRoute: HR_ATT_EXCEPTION,
      view: null, // the item currently being viewed
      queryParams: {
        own: false,
        pending: false,
        approved: false,
        denied: false
      },
      item: newItem(),
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
  computed: {
    canAuthorize () {
      // check privileges and whether item is already authorized
      return true
    },
    canDelete () {
      // check if current user is owner
      return true
    }
  },
  methods: {
    ...mapActions('hr', {
      fetchTimetypes: 'fetchTimetypes',
      fetchSubordinateEmployees: 'fetchSubordinateEmployees',
      fetchStandardSchedules: 'fetchStandardSchedules'
    }),
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(HR_ATT_EXCEPTION, { params: { eager: '[employee, slots.schedule.[breaktime, uptime, downtime]]', ...this.queryParams } }),
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
    deleteParams: (item) => ({ exception_id: item.exception_id }), // REMOVE
    createException () {

    },
    deleteException () {

    },
    grantAuthorization (grant = true) {

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
      "title": "Excepcion",
      "subtitle": " "
    }
  }
}
</i18n>
