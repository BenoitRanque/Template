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
      :visible-columns="table.visibleColumns"
      class="no-shadow"
    >
      <template slot="top-left" slot-scope="props">
        <q-btn class="q-mr-sm" round flat color="primary" icon="refresh" size="md" @click="fetchItems()" />
        <q-search hide-underline color="secondary"  v-model="table.filter" class="col-6" />
      </template>

      <template slot="top-right" slot-scope="props">
        <q-table-columns
          v-model="table.visibleColumns"
          :columns="table.columns"
          color="secondary"
        />
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
          <q-btn icon="print" class="no-shadow" style="border-radius: 0" color="info" size="lg" @click="$root.$emit('PRINT', true)"></q-btn>
          <q-btn icon="print" class="no-shadow" style="border-radius: 0" color="info" size="lg" @click="$root.$emit('PRINT')"></q-btn>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="cancel()"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="print-hide justify-around q-py-sm" align="around">
          <template v-if="editMode">
            <q-btn v-if="isAuthorized(resource, 'delete', 'any')" size="lg" rounded color="negative" icon="delete" @click="deleteItem(item)">{{$t('buttons.deleteItem')}}</q-btn>
            <q-btn v-if="isAuthorized(resource, 'update', 'any')" size="lg" rounded color="positive" icon="save" :disable="$v.item.$invalid" @click="updateItem(item)">{{$t('buttons.updateItem')}}</q-btn>
          </template>
          <template v-else>
            <q-btn v-if="isAuthorized(resource, 'create', 'any')" size="lg" rounded color="positive" icon="create" :disable="$v.item.$invalid" @click="createItem(item)">{{$t('buttons.createItem')}}</q-btn>
          </template>
        </q-toolbar>
        <q-tabs inverted no-pane-border align="justify">
          <!-- Tabs -->
          <q-tab default slot="title" name="tab-1" label="data"/>
          <q-tab slot="title" name="tab-2" label="data2" />
          <q-tab slot="title" name="tab-3" label="contact" />
          <q-tab slot="title" name="tab-4" label="identification_document" />

          <!-- Targets -->
          <q-tab-pane name="tab-1">
            <div class="group">
              <form-element type="text" v-model="item.name_first" :validation="$v.item.name_first" field-name="name_first"></form-element>
              <form-element type="text" v-model="item.name_middle" :validation="$v.item.name_middle" field-name="name_middle"></form-element>
              <form-element type="text" v-model="item.name_paternal" :validation="$v.item.name_paternal" field-name="name_paternal"></form-element>
              <form-element type="text" v-model="item.name_maternal" :validation="$v.item.name_maternal" field-name="name_maternal"></form-element>
              <form-element type="text" v-model="item.name_married" :validation="$v.item.name_married" field-name="name_married"></form-element>
              <form-element type="select" :options="options.sex" v-model="item.sex" :validation="$v.item.sex" field-name="sex"></form-element>
              <form-element type="date" v-model="item.date_of_birth" :validation="$v.item.date_of_birth" field-name="date_of_birth"></form-element>
              <form-element type="text" v-model="item.place_of_birth" :validation="$v.item.place_of_birth" field-name="place_of_birth"></form-element>
              <form-element type="text" v-model="item.nationality" :validation="$v.item.nationality" field-name="nationality"></form-element>
              <form-element type="select" :options="options.marital_status" v-model="item.marital_status" :validation="$v.item.marital_status" field-name="marital_status"></form-element>
              <form-element type="select" :options="options.boolean" v-model="item.jubilado" :validation="$v.item.jubilado" field-name="jubilado"></form-element>
              <pre>{{$v}}</pre>
            </div>
            <portal to="print">
              <div class="row gutter-sm">
                <form-element class="col-6" type="text" v-model="item.name_first" :validation="$v.item.name_first" field-name="name_first"></form-element>
                <form-element class="col-6" type="text" v-model="item.name_middle" :validation="$v.item.name_middle" field-name="name_middle"></form-element>
                <form-element class="col-6" type="text" v-model="item.name_paternal" :validation="$v.item.name_paternal" field-name="name_paternal"></form-element>
                <form-element class="col-6" type="text" v-model="item.name_maternal" :validation="$v.item.name_maternal" field-name="name_maternal"></form-element>
                <form-element class="col-6" type="text" v-model="item.name_married" :validation="$v.item.name_married" field-name="name_married"></form-element>
                <form-element class="col-6" type="select" :options="options.sex" v-model="item.sex" :validation="$v.item.sex" field-name="sex"></form-element>
                <form-element class="col-6" type="date" v-model="item.date_of_birth" :validation="$v.item.date_of_birth" field-name="date_of_birth"></form-element>
                <form-element class="col-6" type="text" v-model="item.place_of_birth" :validation="$v.item.place_of_birth" field-name="place_of_birth"></form-element>
                <form-element class="col-6" type="text" v-model="item.nationality" :validation="$v.item.nationality" field-name="nationality"></form-element>
                <form-element class="col-6" type="select" :options="options.marital_status" v-model="item.marital_status" :validation="$v.item.marital_status" field-name="marital_status"></form-element>
              </div>
            </portal>
          </q-tab-pane>
          <q-tab-pane name="tab-2">

            <pre>{{item.contacts}}</pre>
          </q-tab-pane>
          <q-tab-pane name="tab-3">
            <div v-for="(contact, index) in item.contacts" :key="index" class="group">
              <p class="text-center q-my-md q-display-1">Contact {{index + 1}}</p>
              <form-element type="text" v-model="item.contacts[index].description" :validation="$v.item.contacts.$each[index].description" field-name="contact_description"></form-element>
              <form-element type="select" :options="options.contact_type" v-model="item.contacts[index].type" :validation="$v.item.contacts.$each[index].type" field-name="contact_type"></form-element>
              <form-element type="text" v-model="item.contacts[index].value" :validation="$v.item.contacts.$each[index].value" field-name="contact_value"></form-element>
              <form-element type="select" :options="options.boolean" v-model="item.contacts[index].emergency_contact" :validation="$v.item.contacts.$each[index].emergency_contact" field-name="contact_emergency_contact"></form-element>
              <hr>
            </div>
          </q-tab-pane>
          <q-tab-pane name="tab-4">Tab Four</q-tab-pane>
        </q-tabs>
        <!-- <div class="layout-padding group">
          <q-field :label="$t('item.employee_external_id.label')">
            <q-input v-model="item.employee_external_id" :placeholder="$t('item.employee_external_id.placeholder')"/>
          </q-field>
        </div> -->
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { HR_EMPLOYEE } from 'assets/apiRoutes'
import tableMixin from 'src/mixins/tableMixin'
import validationError from 'src/mixins/validationError'
import FormElement from 'components/FormElement'
import {
// requiredIf,
// requiredUnless,
  minLength,
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
    name_first: '',
    name_middle: '',
    name_paternal: '',
    name_maternal: '',
    name_married: '',
    sex: null,
    date_of_birth: null,
    place_of_birth: '',
    nationality: '',
    marital_status: null,

    jubilado: false,
    aporta_afp: false,
    persona_con_descapacidad: false,
    tutor_persona_con_descapacidad: false,
    caja_de_salud: null,
    afp_aporte: null,
    nua_cua: '',
    sucursal: null,
    clasificacion_laboral: null,

    contract: [

    ],

    contacts: [
      {
        description: 'Telefono Celular',
        type: 'mobile',
        value: '',
        emergency_contact: false
      },
      {
        description: 'Telefono Celular 2',
        type: 'mobile',
        value: '',
        emergency_contact: false
      },
      {
        description: 'Telefono Fijo',
        type: 'phone',
        value: '',
        emergency_contact: false
      },
      {
        description: 'Correo Electronico',
        type: 'email',
        value: '',
        emergency_contact: false
      },
      {
        description: 'Telefono Celular Conyuge',
        type: 'mobile',
        value: '',
        emergency_contact: true
      },
      {
        description: 'Correo Electronico Conyuge',
        type: 'email',
        value: '',
        emergency_contact: true
      }
    ]
  }
}

export default {
  name: 'Employees',
  components: {
    FormElement
  },
  mixins: [tableMixin, validationError],
  data () {
    return {
      passwordResetUserId: null,
      resource: 'HREmployee',
      apiRoute: HR_EMPLOYEE,
      editMode: false,
      item: newItem(),
      options: {
        boolean: [
          {
            label: this.$t('options.boolean.false'),
            value: false
          },
          {
            label: this.$t('options.boolean.true'),
            value: true
          }
        ],
        contact_type: [
          {
            label: this.$t('options.contact.mobile'),
            value: 'mobile'
          },
          {
            label: this.$t('options.contact.phone'),
            value: 'phone'
          },
          {
            label: this.$t('options.contact.email'),
            value: 'email'
          }
        ],
        caja_de_salud: [
          {
            label: 'Caja Nacional de Salud (C.N.S.)',
            value: 1
          },
          {
            label: 'Caja Petrolera de Salud (C.P.S.)',
            value: 2
          },
          {
            label: 'Caja de Salud de Caminos',
            value: 3
          },
          {
            label: 'Caja Bancaria Estatal de Salud (C.B.E.S.)',
            value: 4
          },
          {
            label: 'Caja de Salud de la Banca Privada (C.S.B.P.)',
            value: 5
          },
          {
            label: 'Caja de Salud Cordes',
            value: 6
          },
          {
            label: 'Seguro Social Universitario (S.I.S.S.U.B.)',
            value: 7
          },
          {
            label: 'Corporación del Seguro Social Militar (COOSMIL)',
            value: 8
          },
          {
            label: 'Seguro Integral de Salud (SINEC)',
            value: 9
          }
        ],
        document_type: [
          {
            label: this.$t('options.document_type.carnet'),
            value: 'CI'
          },
          {
            label: this.$t('options.document_type.passport'),
            value: 'PASSAPORTE'
          }
        ],
        afp: [
          {
            label: 'AFP Previsión',
            value: 1
          },
          {
            label: 'AFP Futuro',
            value: 2
          }
        ],
        clasificacion_laboral: [
          {
            label: 'Ocupaciones de dirección en la administración pública y empresas',
            value: 1
          },
          {
            label: 'Ocupaciones de profesionales científicos e intelectuales',
            value: 2
          },
          {
            label: 'Ocupaciones de técnicos y profesionales de apoyo',
            value: 3
          },
          {
            label: 'Empleados de oficina',
            value: 4
          },
          {
            label: 'Trabajadores de los servicios y vendedores del comercio',
            value: 5
          },
          {
            label: 'Productores y trabajadores en la agricultura, pecuaria, agropecuaria y pesca',
            value: 6
          },
          {
            label: 'Trabajadores de la industria extractiva, construcción, industria manufacturera y otros oficios',
            value: 7
          },
          {
            label: 'Operadores de instalaciones y maquinarias',
            value: 8
          },
          {
            label: 'Trabajadores no calificados',
            value: 9
          },
          {
            label: 'Fuerzas armada',
            value: 10
          }
        ],
        modalidad_contrato: [
          {
            label: 'Tiempo indefinido',
            value: 1
          },
          {
            label: 'A plazo fijo',
            value: 2
          },
          {
            label: 'Por temporada',
            value: 3
          },
          {
            label: 'Por realización de obra o servicio',
            value: 4
          },
          {
            label: 'Condicional o eventual',
            value: 5
          }
        ],
        tipo_contrato: [
          {
            label: 'Escrito',
            value: 1
          },
          {
            label: 'Verbal',
            value: 2
          }
        ],
        sex: [
          {
            label: this.$t('options.sex.female'),
            value: 'F'
          },
          {
            label: this.$t('options.sex.male'),
            value: 'M'
          }
        ],
        marital_status: [
          {
            value: 0,
            label: this.$t('options.marital_status.single')
          },
          {
            value: 1,
            label: this.$t('options.marital_status.married')
          },
          {
            value: 2,
            label: this.$t('options.marital_status.divorced')
          },
          {
            value: 3,
            label: this.$t('options.marital_status.civil_union')
          }
        ]
      },
      table: {
        loading: false,
        rowKey: 'employee_id',
        title: '',
        filter: '',
        data: [],
        visibleColumns: [
          'name_first',
          'name_paternal',
          'date_of_birth'
        ],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 10 // current rows per page being displayed
        },
        columns: [
          ...[
            'name_first',
            'name_middle',
            'name_paternal',
            'name_maternal',
            'name_married',
            'sex',
            'place_of_birth',
            'nationality',
            'marital_status'
          ].map(name => ({
            name,
            label: this.$t(`field.${name.match(/[^.]*$/)}.label`),
            field: name.indexOf('.') < 0 ? name : row => name.split('.').reduce((obj, prop) => obj[prop], row),
            sortable: true
          })),
          {
            name: 'date_of_birth',
            label: this.$t('field.date_of_birth.label'),
            field: row => row.date_of_birth ? new Date(row.date_of_birth).toDateString() : '',
            sortable: true
          },
          {
            name: 'age',
            label: this.$t('field.age.label'),
            field: row => !row.date_of_birth ? '' : Math.floor((new Date() - new Date(row.date_of_birth)) / (1000 * 60 * 60 * 24 * 365.25)),
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
      'name_first': {
        required
      },
      'name_middle': {
        // required
      },
      'name_paternal': {
        required
      },
      'name_maternal': {
        // required
      },
      'name_married': {
        // required
      },
      'sex': {
        required
      },
      'date_of_birth': {
        required
      },
      'place_of_birth': {
        // required
      },
      'nationality': {
        // required
      },
      'marital_status': {
        // required
      },
      contacts: {
        required,
        minLength: minLength(2),
        $each: {
          type: { required },
          value: { required },
          description: { required },
          emergency_contact: { }
        }
      }
    }
  },
  methods: {
    schemaToColumns (schema, prefix) {
      return schema.map(field => ({
        name: prefix ? prefix + '.' + field.name : field.name,
        label: this.$t(`item.${field.name.match(/[^.]*$/)}.label`),
        field: !prefix ? field.name : row => row[prefix][field.name],
        ...field.column
      }))
    },
    print () {
      this.$root.$emit('PRINT', { template: 'raw', data: this.$refs.printArea.cloneNode(true) })
      // if (!this.$q.platform.is.electron) return
      // const { remote } = require('electron')
      // remote.getCurrentWebContents().print()
      // const { remote } = require('electron')
      // let printWindow = new remote.BrowserWindow({
      //   width: 1000,
      //   height: 600,
      //   useContentSize: true
      // })
      // console.log(process.env.APP_URL)
      // // window.getElementByTagName('script')
      // // window.getElementByTagName('')
      // let template = `
      //     <!DOCTYPE html>
      //     <html lang="en">
      //     <head>
      //       <meta charset="UTF-8">
      //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
      //       <title>Document</title>
      //     </head>
      //     <body>
      //       <div id="q-app">
      //         <button onclick="print" tabindex="0" type="button" class="q-btn inline relative-position q-btn-item non-selectable fixed-top-right z-top print-hide q-btn-rectangle q-focusable q-hoverable bg-info text-white"><div class="q-focus-helper"></div><div class="q-btn-inner row col items-center justify-center"><i aria-hidden="true" class="q-icon material-icons">print</i></div></button>
      //         ${this.$el.innerHTML}
      //       </div>
      //       <script type="text/javascript" src="app.js"><\/script>
      //     </body>
      //     </html>
      //   `
      // printWindow.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(template), {
      //   baseURLForDataURL: 'http://localhost:8080'
      // })

      // printWindow.on('closed', () => {
      //   printWindow = null
      // })
      // remote.getCurrentWebContents().print()
    },
    newItem () {
      // return default item. Important
      return newItem()
    },
    fetchItems () {
      this.table.loading = true
      Promise.all([
        this.$axios.get(HR_EMPLOYEE, { params: { eager: '[contract, contact]' } })
      ])
        .then(response => {
          this.table.data = (response[0] && response[0].data) ? response[0].data : []
          this.table.loading = false
        })
        .catch(() => {
          this.table.loading = false
        })
    },
    deleteParams: (item) => ({ employee_id: item.employee_id })
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
    "reset_password": "Restablecer Contraseña",
    "modal": {
      "title": "Usuario",
      "subtitle": " "
    },
    "options": {
      "sex": {
        "female": "Femenino",
        "male": "Masculino"
      }
    },
    "item": {
      "name_first": {
        "label": "Primer Nombre",
        "placeholder": " ",
        "helper": " "
      },
      "name_middle": {
        "label": "Segundo Nombre",
        "placeholder": " ",
        "helper": " "
      },
      "name_paternal": {
        "label": "Apellido Paterno",
        "placeholder": " ",
        "helper": " "
      },
      "name_maternal": {
        "label": "Apellido Materno",
        "placeholder": " ",
        "helper": " "
      },
      "name_married": {
        "label": "Apellido Casado",
        "placeholder": " ",
        "helper": " "
      },
      "sex": {
        "label": "Sexo",
        "placeholder": " ",
        "helper": " "
      },
      "date_of_birth": {
        "label": "Fecha de Nacimiento",
        "placeholder": " ",
        "helper": " "
      },
      "place_of_birth": {
        "label": "Lugar de Nacimiento",
        "placeholder": " ",
        "helper": " "
      },
      "nationality": {
        "label": "Nacionalidad",
        "placeholder": " ",
        "helper": " "
      },
      "marital_status": {
        "label": "Estado Civil",
        "placeholder": " ",
        "helper": " "
      }
    }
  }
}
</i18n>
