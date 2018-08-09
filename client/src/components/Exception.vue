<template>
  <div>
    <!-- <q-stepper ref="stepper" vertical>
      <q-step :order="0" default title="Bienvenido" subtitle="empecemos">
        bienvenido al formulario de creacion de boleta
        <q-stepper-navigation class="justify-center q-pa-md">
          <q-btn label="Empezar" color="primary" size="xl" icon-right="arrow_forward" @click="$refs.stepper.next()"></q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="1" title="Sellecione un empleado" subtitle="">
        <q-select v-model="$v.exception.employee_id.$model" :options="options.employee_id"></q-select>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.exception.employee_id.$invalid" @click="$refs.stepper.goToStep('home')" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <template v-if="mode === 1">
        <q-step name="1" :order="3">
          <q-datetime v-model="$v.date1.$model"></q-datetime>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="mode = 0; $refs.stepper.goToStep('home')" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.date1.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step :order="4">
          <q-datetime v-model="$v.date2.$model"></q-datetime>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.date2.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step :order="5">
          <q-stepper ref="stepper2">
            <q-step>
              <q-datetime v-model="date1"></q-datetime>
              <q-stepper-navigation class="justify-around">
                <q-btn @click="$refs.stepper2.previous()" flat icon="arrow_back">Anterior</q-btn>
                <q-btn @click="$refs.stepper2.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
              </q-stepper-navigation>
            </q-step>
            <q-step>
              <q-datetime v-model="date2"></q-datetime>
              <q-stepper-navigation class="justify-around">
                <q-btn @click="$refs.stepper2.previous()" flat icon="arrow_back">Anterior</q-btn>
                <q-btn @click="$refs.stepper2.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
      </template>
      <q-step :order="10" name="home" title="Agregue Dias" subtitle="">
        <div class="row justify-center q-pa-md">
          <div class="col-12 col-md-6 group text-center">
            <q-btn class="" size="lg" icon="add" @click="mode = 1; $refs.stepper.goToStep('1')" label="Cambio de Libre"></q-btn>
            <q-btn class="" size="lg" icon="add" label="Cambio de Horario"></q-btn>
            <q-btn class="" size="lg" icon="add" label="Vacaciones"></q-btn>
          </div>
        </div>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.exception.slots.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="12" title="" subtitle="">
        Revisar y solicitar
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.reset()" flat icon="refresh">Iniciar de Nuevo</q-btn>
          <q-btn color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper> -->
    <q-stepper vertical ref="stepper">
      <q-step default :order="0" title="Bienvenido" subtitle="Escoja el tipo de boleta">
        <div class="q-headline">
          Bienvenido
        </div>
        <div class="q-title">
          Empecemos
        </div>
        <q-stepper-navigation class="justify-around q-pa-md">
          <q-btn label="Cambio de Horario" color="primary" size="lg" icon-right="arrow_forward" @click="setMode(1)"></q-btn>
          <q-btn label="Cambio de Libre" color="primary" size="lg" icon-right="arrow_forward" @click="setMode(2)"></q-btn>
          <q-btn label="Vacacion" color="primary" size="lg" icon-right="arrow_forward" @click="setMode(3)"></q-btn>
          <q-btn label="Boleta avanzada" color="primary" size="lg" icon-right="arrow_forward" @click="setMode(0)"></q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="1" title="Empleado" subtitle="Escoja un empleado">
        <q-select v-model="$v.model.employee_id.$model" filter :options="subordinateEmployeeOptions"></q-select>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.model.employee_id.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>

      <!-- <q-step :order="2" title="Detalles de la boleta">
        <template v-if="mode === 0">
          <div v-for="(slot, index) in $v.model.slots.$each.$iter" :key="index">
            <q-field label="Fecha">
              <div class="row">
                <div class="col">
                  <q-datetime v-model="slot.date.$model"></q-datetime>
                </div>
                <div class="col-auto">
                  <q-btn dense color="negative" icon="close" @click="$v.model.slots.$model.splice(Number(index), 1)">
                    <q-tooltip>Quitar Dia</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-field>
            <q-field label="Jornada">
              <schedule-select class="col"
                v-model="slot.schedule.$model"
                @input="slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null"
              ></schedule-select>
            </q-field>
          </div>
          <div class="text-center q-my-md">
            <q-btn icon="add" flat rounded @click="$v.model.slots.$model.push({ date: null, schedule_id: null, schedule: null })">
              <q-tooltip>aggregar dia</q-tooltip>
            </q-btn>
          </div>
        </template>
        <template v-else-if="mode === 1">
          <div v-for="(slot, index) in $v.model.slots.$each.$iter" :key="index">
            <q-field label="Fecha">
              <div class="row">
                <div class="col">
                  <q-datetime v-model="slot.date.$model"></q-datetime>
                </div>
                <div class="col-auto">
                  <q-btn dense color="negative" icon="close" @click="$v.model.slots.$model.splice(Number(index), 1)">
                    <q-tooltip>Quitar Dia</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-field>
            <q-field label="Jornada">
              <schedule-select class="col"
                v-model="slot.schedule.$model"
                @input="slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null"
              ></schedule-select>
            </q-field>
          </div>
        </template>
        <template v-else-if="mode === 2">
          <div v-for="(slot, index) in $v.model.slots.$each.$iter" :key="index">
            <q-field label="Fecha">
              <div class="row">
                <div class="col">
                  <q-datetime v-model="slot.date.$model"></q-datetime>
                </div>
                <div class="col-auto">
                  <q-btn dense color="negative" icon="close" @click="$v.model.slots.$model.splice(Number(index), 1)">
                    <q-tooltip>Quitar Dia</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-field>
            <q-field label="Jornada">
              <schedule-select class="col"
                v-model="slot.schedule.$model"
                @input="slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null"
              ></schedule-select>
            </q-field>
          </div>
        </template>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.model.slots.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step> -->

      <template v-if="mode === 0">
        <q-step title="Detalles" :order="11">
          <div v-for="(slot, index) in $v.model.slots.$each.$iter" :key="index">
            <q-field label="Fecha">
              <div class="row">
                <div class="col">
                  <q-datetime v-model="slot.date.$model"></q-datetime>
                </div>
                <div class="col-auto">
                  <q-btn dense color="negative" icon="close" @click="$v.model.slots.$model.splice(Number(index), 1)">
                    <q-tooltip>Quitar Dia</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-field>
            <q-field label="Jornada">
              <schedule-select class="col"
                v-model="slot.schedule.$model"
                @input="slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null"
              ></schedule-select>
            </q-field>
          </div>
          <div class="text-center q-my-md">
            <q-btn icon="add" flat rounded @click="$v.model.slots.$model.push({ date: null, schedule_id: null, schedule: null })">
              <q-tooltip>aggregar dia</q-tooltip>
            </q-btn>
          </div>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.model.slots.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
      </template>
      <template v-if="mode === 1">
        <q-step title="Escoja la fecha y el horario" :order="11">
          <div v-for="(slot, index) in $v.model.slots.$each.$iter" :key="index">
            <q-field label="Fecha">
              <div class="row">
                <div class="col">
                  <q-datetime v-model="slot.date.$model"></q-datetime>
                </div>
              </div>
            </q-field>
            <q-field label="Jornada">
              <schedule-select class="col"
                v-model="slot.schedule.$model"
                @input="slot.schedule_id.$model = $event && $event.schedule_id ? $event.schedule_id : null"
              ></schedule-select>
            </q-field>
          </div>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.model.slots.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
      </template>
      <template v-if="mode === 2">
        <q-step title="Escoja las fechas" :order="11">

          <q-field label="Fecha 1">
            <q-datetime v-model="dateA"></q-datetime>
          </q-field>
          <q-field label="Fecha 2">
            <q-datetime v-model="dateB"></q-datetime>
          </q-field>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.dateA.$invalid || $v.dateB.$invalid" @click="automate" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
      </template>
      <template v-if="mode === 3">
        <q-step title="Escoja las fechas" :order="11">
          <q-field label="Fecha 1">
            <q-datetime v-model="dateA"></q-datetime>
          </q-field>
          <q-field label="Fecha 2">
            <q-datetime v-model="dateB"></q-datetime>
          </q-field>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.dateA.$invalid || $v.dateB.$invalid" @click="automate" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
      </template>
      <!-- <template v-if="mode === 4">
        <q-step title="" :order="11"></q-step>
        <q-step title="" :order="12"></q-step>
        <q-step title="" :order="13"></q-step>
      </template> -->

      <q-step :order="21" @select="setAutoTitleAndDesc" title="Revisar e Solicitar">
        <q-field v-for="(slot, index) in $v.model.slots.$each.$iter" :key="index" :label="$date.formatDate(slot.date.$model, 'YYYY/MM/DD - dddd')">
          <!-- <schedule-compact :value="slot.schedule.$model"></schedule-compact> -->
          <!-- <pre>{{slot.schedule.$model}}</pre> -->
          <schedule-view :value="slot.schedule.$model"></schedule-view>
        </q-field>
        <q-input v-model="$v.model.description.$model" placeholder="Comentario"></q-input>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.model.$invalid" @click="requestException" color="primary" icon-right="check">Solicitar</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="22" title="Imprimir">
        imprimir
        Boleta Solicitada exitosamente
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.reset()" flat icon="refresh">Nueva Boleta</q-btn>
          <q-btn @click="print" color="info" icon-right="print">Imprimir</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-inner-loading :visible="loading" />
    </q-stepper>
  </div>
</template>

<script>
import { HR_ATT_EXCEPTION_AUTHORIZATION, HR_ATT_EXCEPTION_AUTOMATE } from 'assets/apiRoutes'
import { mapGetters } from 'vuex'
import ScheduleView from 'components/ScheduleView'
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
export default {
  name: 'Exception',
  components: { ScheduleView, ScheduleSelect },
  data () {
    return {
      dateA: null,
      dateB: null,
      loading: false,
      mode: 0,
      model: {
        description: '',
        employee_id: null,
        slots: []
      }
    }
  },
  validations: {
    dateA: { required },
    dateB: { required },
    model: {
      description: {},
      employee_id: { required },
      slots: {
        required,
        $each: {
          date: { required },
          schedule_id: {
            requiredIf: requiredIf(function (slot) {
              return !slot.schedule
            })
          },
          schedule: {
            requiredIf: requiredIf(function (slot) {
              return !slot.schedule_id
            })
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('hr', {
      subordinateEmployeeOptions: 'subordinateEmployeeOptions'
    }),
    valid () {
      return !this.$v.model.$invalid
    }
  },
  watch: {
    model: {
      deep: true,
      handler () {
        this.$emit('input', this.valid ? this.model : null)
      }
    }
  },
  methods: {
    automate () {
      this.loading = true
      this.$axios.post(HR_ATT_EXCEPTION_AUTOMATE, {
        employee: this.model.employee_id,
        dateA: this.dateA,
        dateB: this.dateB
      }, {
        params: {
          mode: this.mode
        }
      }).then(({ data }) => {
        this.loading = false
        this.model.slots = data.slots
        this.$refs.stepper.next()
      }).catch(() => {
        this.loading = false
      })
    },
    print () {
      this.$q.notify('imprimiendo')
    },
    setAutoTitleAndDesc () {
      console.log(HR_ATT_EXCEPTION_AUTHORIZATION)
    },
    requestException () {
      this.loading = true
      this.$emit('create', [
        this.model,
        () => {
          // success callback
          this.loading = false
        },
        () => {
          // failure callback
          this.loading = false
        }
      ])
    },
    setMode (mode) {
      this.mode = mode
      switch (mode) {
        case 0:
          this.model.slots.push({ date: null, schedule_id: null, schedule: null })
          break
        case 1:
          this.model.slots.push({ date: null, schedule_id: null, schedule: null })
          break
        case 2:

          break
        case 3:

          break
        default: throw new Error(`Unknown exception mode: ${mode}`)
      }
      this.$refs.stepper.next()
    }
  }
}
</script>

<style scoped>

</style>
