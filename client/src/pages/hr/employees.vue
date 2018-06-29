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
          <q-tab default slot="title" name="tab-1" label="Datos"/>
          <q-tab slot="title" name="tab-2" label="Contacto" />
          <q-tab slot="title" name="tab-3" label="Contrato" />

          <!-- Targets -->
          <q-tab-pane name="tab-1">
            <div class="group">

              <q-field
                v-for="(type, field) in {
                  zktime_pin: 'number',
                  name_first: 'text',
                  name_middle: 'text',
                  name_paternal: 'text',
                  name_maternal: 'text',
                  name_married: 'text',
                  sex: 'select',
                  date_of_birth: 'date',
                  place_of_birth: 'text',
                  nationality: 'text',
                  marital_status: 'select',
                  document_type: 'select',
                  document_number: 'text',
                  document_extension: 'text',
                  document_emitted: 'text',
                  jubilado: 'select',
                  aporta_afp: 'select',
                  persona_con_descapacidad: 'select',
                  tutor_persona_con_descapacidad: 'select',
                  caja_de_salud: 'select',
                  afp: 'select',
                  nua_cua: 'text'
                }"
                :key="field"
                :label="$t(`field.${field}.label`)"
                :helper="$t(`field.${field}.helper`)"
                :error="$v.item[field].$error"
                :error-label="validationError($v.item[field])"
              >
                <q-select v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-if="type === 'select'" :options="options[field] || options.boolean"></q-select>
                <q-datetime v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else-if="['date','time','datetime'].includes(type)" :type="type"></q-datetime>
                <q-input v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else :type="type"></q-input>
              </q-field>
            </div>

          </q-tab-pane>
          <q-tab-pane name="tab-2">
            <div v-for="(contact, index) in $v.item.contact.$each.$iter" :key="`contact_${index}`" class="group">
              <div class="row items-center">
                <div class="col q-headline">{{$t('field.contact.label')}} {{Number(index) + 1}}</div>
                <div class="col-auto">
                  <q-btn size="lg" color="negative" dense flat round icon="cancel" @click="item.contact.splice(Number(index), 1)"></q-btn>
                </div>
              </div>
              <q-field
                :label="$t(`field.contact_description.label`)"
                :helper="$t(`field.contact_description.helper`)"
                :error="contact.description.$error"
                :error-label="validationError(contact.description)"
              >
                <q-input v-model="contact.description.$model" :placeholder="$t(`field.contact_description.placeholder`)"></q-input>
              </q-field>
              <q-field
                :label="$t(`field.contact_type.label`)"
                :helper="$t(`field.contact_type.helper`)"
                :error="contact.type.$error"
                :error-label="validationError(contact.type)"
              >
                <q-select v-model="contact.type.$model" :placeholder="$t(`field.contact_type.placeholder`)" :options="options.contact_type"></q-select>
              </q-field>
              <q-field
                :label="$t(`field.contact_value.label`)"
                :helper="$t(`field.contact_value.helper`)"
                :error="contact.value.$error"
                :error-label="validationError(contact.value)"
              >
                <q-input v-model="contact.value.$model" :placeholder="$t(`field.contact_value.placeholder`)"></q-input>
              </q-field>
              <q-field
                :label="$t(`field.contact_emergency_contact.label`)"
                :helper="$t(`field.contact_emergency_contact.helper`)"
                :error="contact.emergency_contact.$error"
                :error-label="validationError(contact.emergency_contact)"
              >
                <q-select v-model="contact.emergency_contact.$model" :placeholder="$t(`field.contact_emergency_contact.placeholder`)" :options="options.boolean"></q-select>
              </q-field>
              <hr>
            </div>
            <div class="text-center q-ma-md">
              <q-btn @click="item.contact.push({ type: 'mobile', description: '', value: '', emergency_contact: false })" icon="add" ouline color="positive" size="lg" round></q-btn>
            </div>
          </q-tab-pane>
          <q-tab-pane name="tab-3">
            <div v-for="(contract, index) in $v.item.contract.$each.$iter" :key="`contract_${index}`" class="group">
              <div class="row items-center">
                <div class="col q-headline">{{$t('field.contract.label')}} {{Number(index) + 1}}</div>
                <div class="col-auto">
                  <q-btn size="lg" color="negative" dense flat round icon="cancel" :disable="!!item.contract[Number(index)].contract_id" @click="item.contract.splice(Number(index), 1)"></q-btn>
                </div>
              </div>
              <q-field
                v-for="(type, field) in {
                  external_contract_id: 'text',
                  contract_sign_date: 'date',
                  contract_start_date: 'date',
                  contract_end_date: 'date',
                  contract_active: 'select',
                  contract_cancel_date: 'date',
                  contract_cancel_motive: 'text',
                  tipo_contrato: 'select',
                  modalidad_contrato: 'select',
                  sucursal: 'number',
                  clasificacion_laboral: 'select'
                }"
                :key="field"
                :label="$t(`field.${field}.label`)"
                :helper="$t(`field.${field}.helper`)"
                :error="contract[field].$error"
                :error-label="validationError(contract[field])"
              >
                <q-select v-model="contract[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-if="type === 'select'" :options="options[field] || options.boolean"></q-select>
                <q-datetime v-model="contract[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else-if="['date','time','datetime'].includes(type)" :type="type"></q-datetime>
                <q-input v-model="contract[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else :type="type"></q-input>
              </q-field>
            </div>
            <div class="text-center q-ma-md">
              <q-btn
                @click="item.contract.push({
                  external_contract_id: null,
                  contract_sign_date: date.startOfDate(new Date(), 'day'),
                  contract_start_date: null,
                  contract_end_date: null,
                  contract_active: true,
                  contract_cancel_date: null,
                  contract_cancel_motive: null,
                  tipo_contrato: 1,
                  modalidad_contrato: 1,
                  sucursal: null,
                  clasificacion_laboral: null
                })"
                icon="add"
                ouline
                color="positive"
                size="lg"
                round
              ></q-btn>
            </div>
          </q-tab-pane>
        </q-tabs>
        <portal to="print">
          <div class="row gutter-sm">
            <q-field
              class="col-6"
              v-for="(type, field) in {
                name_first: 'text',
                name_middle: 'text',
                name_paternal: 'text',
                name_maternal: 'text',
                name_married: 'text',
                sex: 'select',
                date_of_birth: 'date',
                place_of_birth: 'text',
                nationality: 'text',
                marital_status: 'select',
                document_type: 'select',
                document_number: 'text',
                document_extension: 'text',
                document_emitted: 'text',
                jubilado: 'select',
                aporta_afp: 'select',
                persona_con_descapacidad: 'select',
                tutor_persona_con_descapacidad: 'select',
                caja_de_salud: 'select',
                afp: 'select',
                nua_cua: 'text',
                zktime_pin: 'number'
              }"
              :key="field"
              :label="$t(`field.${field}.label`)"
              :helper="$t(`field.${field}.helper`)"
              :error="$v.item[field].$error"
              :error-label="validationError($v.item[field])"
            >
              <q-select readonly v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-if="type === 'select'" :options="options[field] || options.boolean"></q-select>
              <q-datetime readonly v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else-if="['date','time','datetime'].includes(type)" :type="type"></q-datetime>
              <q-input readonly v-model="$v.item[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else :type="type"></q-input>
            </q-field>
            <div v-for="(contact, index) in $v.item.contact.$each.$iter" :key="'contact_' + index" class="col-12 gutter-md row">
              <div class="col-12 q-headline">{{$t('field.contact.label')}} {{Number(index) + 1}}</div>
              <q-field
                class="col-6"
                :label="$t(`field.contact_description.label`)"
                :helper="$t(`field.contact_description.helper`)"
                :error="contact.description.$error"
                :error-label="validationError(contact.description)"
              >
                <q-input readonly v-model="contact.description.$model" :placeholder="$t(`field.contact_description.placeholder`)"></q-input>
              </q-field>
              <q-field
                class="col-6"
                :label="$t(`field.contact_type.label`)"
                :helper="$t(`field.contact_type.helper`)"
                :error="contact.type.$error"
                :error-label="validationError(contact.type)"
              >
                <q-select readonly v-model="contact.type.$model" :placeholder="$t(`field.contact_type.placeholder`)" :options="options.contact_type"></q-select>
              </q-field>
              <q-field
                class="col-6"
                :label="$t(`field.contact_value.label`)"
                :helper="$t(`field.contact_value.helper`)"
                :error="contact.value.$error"
                :error-label="validationError(contact.value)"
              >
                <q-input readonly v-model="contact.value.$model" :placeholder="$t(`field.contact_value.placeholder`)"></q-input>
              </q-field>
              <q-field
                class="col-6"
                :label="$t(`field.contact_emergency_contact.label`)"
                :helper="$t(`field.contact_emergency_contact.helper`)"
                :error="contact.emergency_contact.$error"
                :error-label="validationError(contact.emergency_contact)"
              >
                <q-select readonly v-model="contact.emergency_contact.$model" :placeholder="$t(`field.contact_emergency_contact.placeholder`)" :options="options.boolean"></q-select>
              </q-field>
              <hr>
            </div>
            <div v-for="(contract, index) in $v.item.contract.$each.$iter" :key="'contract_' + index" class="col-12 row gutter-md">
              <q-field
                class="col-6"
                v-for="(type, field) in {
                  external_contract_id: 'text',
                  contract_sign_date: 'date',
                  contract_start_date: 'date',
                  contract_end_date: 'date',
                  contract_active: 'select',
                  contract_cancel_date: 'date',
                  contract_cancel_motive: 'text',
                  tipo_contrato: 'select',
                  modalidad_contrato: 'select',
                  sucursal: 'number',
                  clasificacion_laboral: 'select'
                }"
                :key="field"
                :label="$t(`field.${field}.label`)"
                :helper="$t(`field.${field}.helper`)"
                :error="contract[field].$error"
                :error-label="validationError(contract[field])"
              >
                <q-select readonly v-model="contract[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-if="type === 'select'" :options="options[field] || options.boolean"></q-select>
                <q-datetime readonly v-model="contract[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else-if="['date','time','datetime'].includes(type)" :type="type"></q-datetime>
                <q-input readonly v-model="contract[field].$model" :placeholder="$t(`field.${field}.placeholder`)" v-else :type="type"></q-input>
              </q-field>
            </div>
          </div>
        </portal>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { HR_EMPLOYEE } from 'assets/apiRoutes'
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
    name_first: '',
    name_middle: '',
    name_paternal: '',
    name_maternal: '',
    name_married: '',
    sex: null,
    date_of_birth: null,
    place_of_birth: '',
    nationality: 'Bolivia',
    marital_status: null,

    document_type: 'CI',
    document_number: '',
    document_extension: '',
    document_emitted: 'SCZ',

    jubilado: false,
    aporta_afp: false,
    persona_con_descapacidad: false,
    tutor_persona_con_descapacidad: false,
    caja_de_salud: null,
    afp: null,
    nua_cua: '',
    zktime_pin: null,

    contract: [
      {
        external_contract_id: null,
        contract_sign_date: date.startOfDate(new Date(), 'day'),
        contract_start_date: null,
        contract_end_date: null,
        contract_active: true,
        contract_cancel_date: null,
        contract_cancel_motive: null,
        tipo_contrato: 1,
        modalidad_contrato: 1,
        sucursal: null,
        clasificacion_laboral: null
      }

    ],

    contact: [
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
  mixins: [tableMixin, validationError],
  data () {
    return {
      date,
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
            'marital_status',
            'zktime_pin'
          ].map(name => ({
            name,
            label: this.$t(`field.${name}.label`),
            field: name,
            align: 'left',
            sortable: true
          })),
          {
            name: 'date_of_birth',
            label: this.$t('field.date_of_birth.label'),
            field: row => row.date_of_birth ? new Date(row.date_of_birth).toDateString() : '',
            align: 'left',
            sortable: true
          },
          {
            name: 'age',
            label: this.$t('field.age.label'),
            field: row => !row.date_of_birth ? '' : Math.floor((new Date() - new Date(row.date_of_birth)) / (1000 * 60 * 60 * 24 * 365.25)),
            align: 'left',
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
      name_first: {
        required
      },
      name_middle: {
        // required
      },
      name_paternal: {
        // required
      },
      name_maternal: {
        // required
      },
      name_married: {
        // required
      },
      sex: {
        // required
      },
      date_of_birth: {
        // required
      },
      place_of_birth: {
        // required
      },
      nationality: {
        // required
      },
      marital_status: {
        // required
      },
      document_type: {
        // required
      },
      document_number: {
        // required
      },
      document_extension: {
        // required
      },
      document_emitted: {
        // required
      },
      jubilado: {
        // required
      },
      aporta_afp: {
        // required
      },
      persona_con_descapacidad: {
        // required
      },
      tutor_persona_con_descapacidad: {
        // required
      },
      caja_de_salud: {
        // required
      },
      afp: {
        // required
      },
      nua_cua: {
        // required
      },
      zktime_pin: {
        // required
      },
      contact: {
        // required,
        // minLength: minLength(2),
        $each: {
          type: { },
          value: { },
          description: { },
          emergency_contact: { }
        }
      },
      contract: {
        $each: {
          external_contract_id: {
            // required
          },
          contract_sign_date: {

          },
          contract_start_date: {
            // required
          },
          contract_end_date: {
            // required
          },
          contract_active: {
            // required
          },
          contract_cancel_date: {
            // required
          },
          contract_cancel_motive: {
            // required
          },
          tipo_contrato: {
            // required
          },
          modalidad_contrato: {
            // required
          },
          sucursal: {
            // required
          },
          clasificacion_laboral: {
            // required
          }
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

<i18n>
{
  "es": {
    "modal": {
      "title": "Empleado",
      "subtitle": " "
    }
  }
}
</i18n>
