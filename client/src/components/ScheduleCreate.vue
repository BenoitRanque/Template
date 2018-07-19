<template>
  <div>
    <q-stepper ref="stepper">
      <q-step default name="first">

      </q-step>
      <q-step name="second"></q-step>
      <q-step name="third"></q-step>
    </q-stepper>
    <q-input v-model="model.schedule_name"></q-input>
    <q-input v-model="model.description"></q-input>
    <div class="row justify-around q-pa-md">
      <q-btn icon="add" color="positive">
        <q-popover self="top middle" anchor="bottom middle">
          <q-list link>
            <q-item v-for="(preset, index) in breakPresets" :key="index" v-close-overlay @click.native="model.break.push(preset.timetable())">
              <q-item-main :label="preset.label" :sublabel="preset.sublabel"></q-item-main>
              <q-item-side>
                <q-chip :style="{ 'background': typeColor(preset.type_id) }">{{typeCode(preset.type_id)}}</q-chip>
              </q-item-side>
            </q-item>
          </q-list>
        </q-popover>
        <q-tooltip>Aggregar Componente</q-tooltip>
      </q-btn>
    </div>
    <div class="row justify-around q-pa-md">
      <q-btn icon="add" color="positive">
        <q-popover self="top middle" anchor="bottom middle">
          <q-list link>
            <q-item v-for="(preset, index) in uptimePresets" :key="index" v-close-overlay @click.native="model.uptime.push(preset.timetable())">
              <q-item-main :label="preset.label" :sublabel="preset.sublabel"></q-item-main>
              <q-item-side>
                <q-chip :style="{ 'background': typeColor(preset.type_id) }">{{typeCode(preset.type_id)}}</q-chip>
              </q-item-side>
            </q-item>
          </q-list>
        </q-popover>
        <q-tooltip>Aggregar Componente</q-tooltip>
      </q-btn>
    </div>
    <div class="row justify-around q-pa-md">
      <q-btn icon="add" color="positive">
        <q-popover self="top middle" anchor="bottom middle">
          <q-list link>
            <q-item v-for="(preset, index) in downtimePresets" :key="index" v-close-overlay @click.native="model.downtime.push(preset.timetable())">
              <q-item-main :label="preset.label" :sublabel="preset.sublabel"></q-item-main>
              <q-item-side>
                <q-chip :style="{ 'background': typeColor(preset.type_id) }">{{typeCode(preset.type_id)}}</q-chip>
              </q-item-side>
            </q-item>
          </q-list>
        </q-popover>
        <q-tooltip>Aggregar Componente</q-tooltip>
      </q-btn>
    </div>
    <pre>{{value}}</pre>
  </div>
</template>

<script>
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK } = ATT
export default {
  name: 'ScheduleCreate',
  props: {
    standard: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({
        schedule_name: '',
        description: '',
        break: [],
        uptime: [],
        downtime: []
      })
    },
    timetypes: {
      type: Array
    },
    breakPresets: {
      type: Array,
      default () {
        return [
          {
            label: 'Almuerzo',
            sublabel: '',
            timetype_id: ATT_BREAK,
            timetable: () => ({
              timetype_id: ATT_BREAK,
              description: 'Almuerzo',
              start_time: this.$date.buildDate({hours: 11, minutes: 0, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 0, minutes: 30, seconds: 0, milliseconds: 0})
            })
          }
        ]
      }
    },
    uptimePresets: {
      type: Array,
      default () {
        return [
          {
            label: 'Dia Laboral Continuo',
            sublabel: '08:30 - 16:30',
            timetype_id: ATT_WORK,
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
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
            timetable: () => ({
              timetype_id: ATT_WORK,
              description: 'Medio Dia Laboral 14:30 - 18:30',
              start_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              value: 0.5
            })
          }
        ]
      }
    },
    downtimePresets: {
      type: Array,
      default () {
        return [
          {
            label: 'Dia libre',
            sublabel: '',
            timetype_id: ATT_TIMEOFF,
            timetable: () => ({
              description: 'Dia Libre',
              timetype_id: ATT_TIMEOFF,
              value: 1
            })
          },
          {
            label: 'Medio Dia Libre',
            sublabel: '',
            timetype_id: ATT_TIMEOFF,
            timetable: () => ({
              description: 'Medio Dia Libre',
              timetype_id: ATT_TIMEOFF,
              value: 0.5
            })
          }
        ]
      }
    }
  },
  data () {
    return {
      model: {
        schedule_name: '',
        description: '',
        standard: this.standard,
        break: [],
        uptime: [],
        downtime: []
      }
    }
  },
  watch: {
    model: {
      deep: true,
      handler () {
        this.$emit('input', this.model)
      }
    }
  },
  // computed: {
  //   model: {
  //     get () {
  //       return this.value
  //     },
  //     set (value) {
  //       this.$emit('input', value)
  //     }
  //   }
  // },
  methods: {
    typeCode (typeId) {
      if (!this.timetableTypes || !this.timetableTypes.length) return
      let type = this.timetableTypes.find(item => item.type_id === typeId)
      if (!type) return

      return type.code
    },
    typeColor (typeId) {
      if (!this.timetableTypes || !this.timetableTypes.length) return
      let type = this.timetableTypes.find(item => item.type_id === typeId)
      if (!type) return

      return type.color
    }
  }
}
</script>

<style scoped>

</style>
