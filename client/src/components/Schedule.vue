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
            @click="model.uptime.push({
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
            @click="model.downtime.push({
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
            <q-item v-for="(preset, index) in presets" :key="index" v-close-overlay @click.native="setPresetModelValue(preset)">
              <q-item-main>
                <q-item-tile label>{{preset.schedule_name}}</q-item-tile>
                <q-item-tile sublabel>{{preset.description}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </div>
    <pre>valid: {{valid}}</pre>
    <pre>model: {{!!model}}</pre>
    <pre>value: {{!!value}}</pre>
  </div>
</template>

<script>
import ScheduleBreak from './ScheduleBreak'
import ScheduleUptime from './ScheduleUptime'
import ScheduleDowntime from './ScheduleDowntime'
import ScheduleCompact from './ScheduleCompact'
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
  name: 'Schedule',
  components: { ScheduleBreak, ScheduleUptime, ScheduleDowntime, ScheduleCompact },
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
      model: newModel(this.standard)
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
        return this.model.uptime.reduce((acc, val) => acc + Number(val.value), 0)
      }
    },
    totalDownValue: {
      get () {
        return this.model.downtime.reduce((acc, val) => acc + Number(val.value), 0)
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
      if (value !== null && value !== this.model) {
        this.model = value
      }
    },
    model: {
      deep: true,
      handler () {
        this.$emit('input', this.model)
        // this.$emit('input', this.valid ? this.model : null)
      }
    }
  },
  methods: {
    setPresetModelValue (preset) {
      this.model = Object.assign(this.model,
        this.value ? this.value : {},
        { standard: this.standard },
        JSON.parse(JSON.stringify(preset))
      )
    }
  }
}
</script>

<style scoped>

</style>
