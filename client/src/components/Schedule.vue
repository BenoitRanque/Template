<template>
  <div>
    <q-input :readonly="isReadonly" placeholder="Nombre de la jornada" v-model="$v.model.schedule_name.$model"></q-input>
    <q-input :readonly="isReadonly" placeholder="Descripcion" v-model="$v.model.description.$model"></q-input>
    <div class="row gutter-sm q-my-sm">
      <div class="col">
        <div class="q-title">Tiempo Laboral</div>
        <schedule-uptime :readonly="isReadonly" v-for="(item, index) in $v.model.uptime.$each.$iter" :key="index" v-model="item.$model" @remove="model.uptime.splice(Number(index), 1)"></schedule-uptime>
      </div>
      <div class="col">
        <div class="q-title">Tiempo Pausa</div>
        <schedule-breaktime :readonly="isReadonly" v-for="(item, index) in $v.model.breaktime.$each.$iter" :key="index" v-model="item.$model" @remove="model.breaktime.splice(Number(index), 1)"></schedule-breaktime>
      </div>
      <div class="col">
        <div class="q-title">Tiempo Libre</div>
        <schedule-downtime :readonly="isReadonly" v-for="(item, index) in $v.model.downtime.$each.$iter" :key="index" v-model="item.$model" @remove="model.downtime.splice(Number(index), 1)"></schedule-downtime>
      </div>
    </div>
    <q-slide-transition>
      <template v-if="isReadonly">
        <div class="text-center q-my-md">
          <q-btn rounded size="md" label="modificar" icon="edit" @click="setEditable">
            <q-tooltip>Volver la jornada editable</q-tooltip>
          </q-btn>
        </div>
      </template>
    </q-slide-transition>
    <q-slide-transition>
      <template v-if="!isReadonly">
        <div>
          <div class="row">
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
                @click="model.breaktime.push({
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
          <div class="text-center q-my-md">
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
          </div>
        </div>
      </template>
    </q-slide-transition>
  </div>
</template>

<script>
import ScheduleBreaktime from './ScheduleBreaktime'
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
    breaktime: [],
    uptime: [],
    downtime: []
  }
}

export default {
  name: 'Schedule',
  components: { ScheduleBreaktime, ScheduleUptime, ScheduleDowntime, ScheduleCompact },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    standard: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: function () {
        return newModel(this.standard)
      }
    }
  },
  data () {
    return {
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
      breaktime: {
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
    valid () {
      return !this.$v.model.$invalid
    },
    isReadonly () {
      return this.readonly || (!!this.model && !!this.model.schedule_id)
    },
    totalUpValue () {
      return this.model && this.model.uptime ? this.model.uptime.reduce((acc, val) => acc + Number(val.value), 0) : 0
    },
    totalDownValue () {
      return this.model && this.model.downtime ? this.model.downtime.reduce((acc, val) => acc + Number(val.value), 0) : 0
    },
    totalModelValue () {
      return this.totalUpValue + this.totalDownValue
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
        if (!this.isReadonly) this.$emit('input', this.valid ? this.model : null)
      }
    }
  },
  methods: {
    setEditable () {
      this.$delete(this.model, 'schedule_id')
      this.model.breaktime.forEach(b => {
        this.$delete(b, 'schedule_id')
        this.$delete(b, 'schedule_breaktime_id')
      })
      this.model.uptime.forEach(u => {
        this.$delete(u, 'schedule_id')
        this.$delete(u, 'schedule_uptime_id')
      })
      this.model.downtime.forEach(d => {
        this.$delete(d, 'schedule_id')
        this.$delete(d, 'schedule_downtime_id')
      })
    },
    setPresetModelValue (preset) {
      const copy = JSON.parse(JSON.stringify(preset))
      this.model = Object.assign({},
        { standard: this.standard },
        copy)
    }
  }
}
</script>

<style scoped>

</style>
