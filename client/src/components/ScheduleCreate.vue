<template>
  <div>
    <q-input placeholder="Nombre de la jornada" v-model="$v.model.schedule_name.$model"></q-input>
    <q-input placeholder="Descripcion" v-model="$v.model.description.$model"></q-input>
    <div class="row gutter-sm q-my-sm">
      <div class="col">
        <div class="q-title">Tiempo Laboral</div>
        <schedule-uptime :editable="advanced" :removable="advanced" v-for="(item, index) in $v.model.uptime.$each.$iter" :key="index" v-model="item.$model" @remove="model.uptime.splice(Number(index), 1)"></schedule-uptime>
      </div>
      <div class="col">
        <div class="q-title">Tiempo Pausa</div>
        <schedule-break :editable="advanced" :removable="advanced" v-for="(item, index) in $v.model.break.$each.$iter" :key="index" v-model="item.$model" @remove="model.break.splice(Number(index), 1)"></schedule-break>
      </div>
      <div class="col">
        <div class="q-title">Tiempo Libre</div>
        <schedule-downtime :editable="advanced" :removable="advanced" v-for="(item, index) in $v.model.downtime.$each.$iter" :key="index" v-model="item.$model" @remove="model.downtime.splice(Number(index), 1)"></schedule-downtime>
      </div>
    </div>
    <q-slide-transition>
      <div class="row" v-show="advanced">
        <div class="col text-center q-my-md">
          <q-btn
            @click="model.break.push({
              timetype_id: null,
              description: '',
              start_time: null,
              start_require_event: true,
              end_time: null,
              end_require_event: true,
              value: 0
            })"
            flat rounded icon="add">
            <q-tooltip>
              Aggregar Tiempo Laboral
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col text-center q-my-md">
          <q-btn
            @click="model.break.push({
              timetype_id: null,
              description: '',
              start_time: null,
              start_require_event: true,
              end_time: null,
              end_require_event: true,
              duration: null
            })"
            flat rounded icon="add">
            <q-tooltip>
              Aggregar Tiempo de Pausa
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col text-center q-my-md">
          <q-btn
            @click="model.break.push({
              timetype_id: null,
              description: '',
              value: 0
            })"
            flat rounded icon="add">
            <q-tooltip>
              Aggregar Tiempo Libre
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-slide-transition>
    <div class="text-center q-my-md">
      <q-btn-group rounded>
        <q-btn rounded dense size="sm" icon="build" @click="advanced = !advanced">
          <q-tooltip>
            Modo avanzado
          </q-tooltip>
        </q-btn>
        <q-btn-dropdown rounded size="md" label="Selecionar">
          <q-list link>
            <q-item v-for="(preset, index) in presets" :key="index" v-close-overlay @click.native="model = JSON.parse(JSON.stringify(preset))">
              <q-item-main>
                <q-item-tile label>{{preset.schedule_name}}</q-item-tile>
                <q-item-tile sublabel>{{preset.description}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </div>
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
import { mapGetters } from 'vuex'
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK } = ATT

function newModel (standard) {
  return {
    schedule_name: '',
    description: '',
    standard: standard,
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
      advanced: false,
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
      totalModelValue: function (model) { return this.totalModelValue === 1 },
      schedule_name: {
        requiredIf: requiredIf(function (model) {
          return this.standard
        })
      },
      description: {
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
  computed: {
    ...mapGetters('hr', {
      presets: 'schedulePresets'
    }),
    valid: {
      get () {
        return !this.$v.model.$invalid
      }
    },
    totalUpValue: {
      get () {
        return this.model.uptime.reduce((acc, val) => acc + val.value, 0)
      }
    },
    totalDownValue: {
      get () {
        return this.model.downtime.reduce((acc, val) => acc + val.value, 0)
      }
    },
    totalModelValue: {
      get () {
        return this.totalUpValue + this.totalDownValue
      }
    }
  },
  watch: {
    value (value) {
      if (value === this.model) {
        console.log('value and model are equal')
      } else if (value !== null) {
        this.model = value
      }
    },
    model: {
      deep: true,
      handler () {
        if (this.valid) {
          this.$q.notify('hello')
          this.$emit('input', this.model)
        } else {
          this.$q.notify('bye')
          this.$emit('input', null)
        }
      }
    }
  },
  methods: {

    // reset () {
    //   this.model = newModel(this.standard)
    //   this.$refs.stepper.reset()
    // },
    // finish () {
    //   if (!this.$v.model.$invalid) {
    //     this.$emit('input', this.model)
    //     this.reset()
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
