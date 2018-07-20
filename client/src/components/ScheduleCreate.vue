<template>
  <div>
    <q-stepper vertical :order="0" ref="stepper">
      <q-step default name="first" title="Bienvenido" subtitle="Empecemos">
        <div class="q-headline">
          Bievenido al formulario de creacion de jornada
        </div>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.next()" size="lg" color="primary" icon-right="arrow_forward">Empezar</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="1" name="second" title="Nombre e Descripcion">
        <div class="q-headline">
          Nombre e descripcion
        </div>
        <q-input placeholder="Nombre de la jornada" v-model="model.schedule_name"></q-input>
        <q-input placeholder="Descripcion" v-model="model.description"></q-input>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="2" name="third" title="Tiempo Laboral">
        <div class="q-headline">
          Tiempo laboral
        </div>
        <schedule-uptime v-for="(item, index) in model.uptime" :key="index" v-model="model.uptime[index]" @remove="model.uptime.splice(index, 1)"></schedule-uptime>
        <div class="text-center q-pa-md">
          <q-btn size="lg" icon="add">
            Aggregar
            <q-popover>
              <q-list link>
                <q-item v-for="(preset, index) in uptimePresets" :key="index" v-close-overlay @click.native="model.uptime.push(preset.preset())">
                  <q-item-main>
                    <q-item-tile label>{{preset.label}}</q-item-tile>
                    <q-item-tile sublabel>{{preset.sublabel}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </div>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="3" name="fourth" title="Tiempo Pausa">
        <div class="q-headline">
          Tiempo pausa
        </div>
        <schedule-break v-for="(item, index) in model.break" :key="index" v-model="model.break[index]" @remove="model.break.splice(index, 1)"></schedule-break>
        <div class="text-center q-pa-md">
          <q-btn size="lg" icon="add">
            Aggregar
            <q-popover>
              <q-list link>
                <q-item v-for="(preset, index) in breakPresets" :key="index" v-close-overlay @click.native="model.break.push(preset.preset())">
                  <q-item-main>
                    <q-item-tile label>{{preset.label}}</q-item-tile>
                    <q-item-tile sublabel>{{preset.sublabel}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </div>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="4" name="fifth" title="Tiempo Libre">
        <div class="q-headline">
          Tiempo libre
        </div>
        <schedule-downtime v-for="(item, index) in model.downtime" :key="index" v-model="model.downtime[index]" @remove="model.downtime.splice(index, 1)"></schedule-downtime>
        <div class="text-center q-pa-md">
          <q-btn size="lg" icon="add">
            Aggregar
            <q-popover>
              <q-list link>
                <q-item v-for="(preset, index) in downtimePresets" :key="index" v-close-overlay @click.native="model.downtime.push(preset.preset())">
                  <q-item-main>
                    <q-item-tile label>{{preset.label}}</q-item-tile>
                    <q-item-tile sublabel>{{preset.sublabel}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </div>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="5" name="sixth" title="Terminar">
        <div class="q-display-1">
          Terminar
        </div>
        <div class="text-negative" v-if="!$v.model.scheduleLength">
          La suma del tiempo trabajado y del tiempo libre debe ser 100% de un dia
        </div>
        <schedule-dense :value="model"></schedule-dense>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn @click="finish()" :disable="$v.model.$invalid" size="lg" color="primary" icon-right="arrow_forward">Terminar</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <pre>{{model}}</pre>
    <pre>{{$v}}</pre>
  </div>
</template>

<script>
import ScheduleBreak from './ScheduleBreak'
import ScheduleUptime from './ScheduleUptime'
import ScheduleDowntime from './ScheduleDowntime'
import ScheduleDense from './ScheduleDense'
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
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK } = ATT

function newModel (standard) {
  return {
    schedule_name: '',
    description: '',
    standard,
    break: [],
    uptime: [],
    downtime: []
  }
}

export default {
  name: 'ScheduleCreate',
  components: { ScheduleBreak, ScheduleUptime, ScheduleDowntime, ScheduleDense },
  props: {
    standard: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Object, null],
      default: function () {
        return newModel(this.standard)
      }
    }
  },
  data () {
    return {
      model: newModel(this.standard),
      breakPresets: [
        {
          label: 'Almuerzo',
          sublabel: '',
          timetype_id: ATT_BREAK,
          preset: () => ({
            timetype_id: ATT_BREAK,
            description: 'Almuerzo',
            start_time: this.$date.buildDate({hours: 11, minutes: 0, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            duration: this.$date.buildDate({hours: 0, minutes: 30, seconds: 0, milliseconds: 0})
          })
        }
      ],
      uptimePresets: [
        {
          label: 'Dia Laboral Continuo',
          sublabel: '08:30 - 16:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Dia Laboral Continuo 08:30 - 16:30',
            start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 1
          })
        },
        {
          label: 'Dia Laboral Continuo',
          sublabel: '09:30 - 17:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Dia Laboral Continuo 09:30 - 17:30',
            start_time: this.$date.buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 1
          })
        },
        {
          label: 'Dia Laboral Continuo',
          sublabel: '10:30 - 18:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Dia Laboral Continuo 10:30 - 18:30',
            start_time: this.$date.buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 1
          })
        },
        {
          label: 'Medio Dia Laboral',
          sublabel: '08:30 - 12:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Medio Dia Laboral 08:30 - 12:30',
            start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5
          })
        },
        {
          label: 'Medio Dia Laboral',
          sublabel: '09:30 - 13:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Medio Dia Laboral 09:30 - 13:30',
            start_time: this.$date.buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5
          })
        },
        {
          label: 'Medio Dia Laboral',
          sublabel: '10:30 - 14:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Medio Dia Laboral 10:30 - 14:30',
            start_time: this.$date.buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5
          })
        },
        {
          label: 'Medio Dia Laboral',
          sublabel: '12:30 - 16:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Medio Dia Laboral 12:30 - 16:30',
            start_time: this.$date.buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5
          })
        },
        {
          label: 'Medio Dia Laboral',
          sublabel: '13:30 - 17:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Medio Dia Laboral 13:30 - 17:30',
            start_time: this.$date.buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5
          })
        },
        {
          label: 'Medio Dia Laboral',
          sublabel: '14:30 - 18:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Medio Dia Laboral 14:30 - 18:30',
            start_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5
          })
        },
        {
          label: 'Mañana Laboral',
          sublabel: '08:30 - 12:00',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Mañana Laboral 08:30 - 12:00',
            start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 12, minutes: 0, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.4375
          })
        },
        {
          label: 'Tarde Laboral',
          sublabel: '14:00 - 18:30',
          timetype_id: ATT_WORK,
          preset: () => ({
            timetype_id: ATT_WORK,
            description: 'Tarde Laboral 14:00 - 18:30',
            start_time: this.$date.buildDate({hours: 14, minutes: 0, seconds: 0, milliseconds: 0}),
            start_require_event: true,
            end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
            end_require_event: true,
            value: 0.5625
          })
        }
      ],
      downtimePresets: [
        {
          label: 'Dia libre',
          sublabel: '',
          timetype_id: ATT_TIMEOFF,
          preset: () => ({
            description: 'Dia Libre',
            timetype_id: ATT_TIMEOFF,
            value: 1
          })
        },
        {
          label: 'Medio Dia Libre',
          sublabel: '',
          timetype_id: ATT_TIMEOFF,
          preset: () => ({
            description: 'Medio Dia Libre',
            timetype_id: ATT_TIMEOFF,
            value: 0.5
          })
        }
      ]
    }
  },
  validations: {
    model: {
      required,
      scheduleLength: schedule =>
        schedule.uptime.reduce((acc, val) => acc + val.value, 0) +
        schedule.downtime.reduce((acc, val) => acc + val.value, 0) === 1,
      schedule_name: {
        requiredIf: requiredIf(function (model) {
          return this.standard
        })
      },
      description: {
        requiredIf: requiredIf(function (model) {
          return this.standard
        })
      },
      break: {
        $each: {
          timetype_id: { required },
          description: { },
          start_time: { required },
          start_require_event: { },
          end_time: { required },
          end_require_event: { },
          duration: { required }
        }
      },
      uptime: {
        $each: {
          timetype_id: { required },
          description: { },
          start_time: { required },
          start_require_event: { },
          end_time: { required },
          end_require_event: { },
          value: { required }
        }
      },
      downtime: {
        $each: {
          timetype_id: { required },
          description: { },
          value: { required }
        }
      }
    }
  },
  watch: {
    value () {
      if (this.value === null) {
        this.model = newModel(this.standard)
      }
    }
  },
  methods: {
    reset () {
      this.model = newModel(this.standard)
      this.$refs.stepper.reset()
    },
    finish () {
      if (!this.$v.model.$invalid) {
        this.$emit('input', this.model)
        this.reset()
      }
    }
  }
}
</script>

<style scoped>

</style>
