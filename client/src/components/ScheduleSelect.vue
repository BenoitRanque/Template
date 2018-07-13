<template>
  <div>
    <div class="row">
      <slot name="header"></slot>
      <div class="col-auto">
        <q-toggle v-if="withSchedulePresets" v-model="advanced" left-label class="q-caption" label="Mas opciones"></q-toggle>
      </div>
    </div>
    <slot></slot>
    <q-field v-if="withSchedulePresets && !advanced" :label="$t('field.schedule.label')">
      <q-select
        :placeholder="$t('field.schedule.placeholder')"
        :options="presetScheduleOptions"
        :value="value ? value.schedule_id : null"
        @input="$event => $emit('input', $event ? schedulePresets.find(p => p.schedule_id === $event) : null)"
      ></q-select>
    </q-field>
    <template v-else>
      <q-field :label="$t('field.schedule_name.label')">
        <q-input v-model="model.schedule_name"></q-input>
      </q-field>
      <q-field :label="$t('field.description.label')">
        <q-input v-model="model.description"></q-input>
      </q-field>
      <timetable-wrapper :style="{ 'background': typeColor(model.timetable[index].type_id) }" v-for="(timetable, index) in model.timetable" :key="index" @remove="model.timetable.splice(index, 1)">
        <template slot="header">
          <q-input class="col" hide-underline v-model="model.timetable[index].timetable_name"></q-input>
        </template>
        <template>

        </template>
        <template slot="advanced">
          <div class="row q-px-sm">
            <q-select class="col-6" float-label="Tipo de tiempo" :options="timetableTypesOptions" v-model="model.timetable[index].type_id"></q-select>
            <q-datetime :format24h="true" float-label="Duracion" class="col-6" type="time" v-model="model.timetable[index].duration"></q-datetime>
            <q-datetime :format24h="false" float-label="Inicio" class="col-6" type="time" v-model="model.timetable[index].start_time"></q-datetime>
            <q-datetime :format24h="false" float-label="Fin" class="col-6" type="time" v-model="model.timetable[index].end_time"></q-datetime>
            <div class="q-caption col-6 q-pt-sm">
              <q-checkbox v-model="model.timetable[index].start_require_event" label="debe marcar inicio"></q-checkbox>
            </div>
            <div class="q-caption col-6 q-pt-sm">
              <q-checkbox v-model="model.timetable[index].end_require_event" label="debe marcar fin"></q-checkbox>
            </div>
          </div>
        </template>
      </timetable-wrapper>
      <div class="row justify-around q-pa-md">
        <q-btn icon="add" color="positive">
          <q-popover self="top middle" anchor="bottom middle">
            <q-list link>
              <q-item v-for="(preset, index) in timetablePresets" :key="index" v-close-overlay @click.native="addPreset(preset)">
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
    </template>
  </div>
</template>

<script>
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK } = ATT
import TimetableWrapper from 'components/TimetableWrapper'

export default {
  name: 'ScheduleSelect',
  components: { TimetableWrapper },
  props: {
    value: {
      type: Object,
      default: null
    },
    standard: {
      type: Boolean,
      default: false
    },
    schedulePresets: {
      type: Array,
      default: () => ([])
    },
    timetablePresets: {
      type: Array,
      default: function () {
        return [
          {
            label: 'Dia libre',
            sublabel: '',
            type_id: ATT_TIMEOFF,
            timetable: () => ({
              type_id: ATT_TIMEOFF,
              timetable_name: 'Dia Libre',
              start_time: null,
              start_require_event: false,
              end_time: null,
              end_require_event: false,
              duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Libre',
            sublabel: '',
            type_id: ATT_TIMEOFF,
            timetable: () => ({
              type_id: ATT_TIMEOFF,
              timetable_name: 'Medio Dia Libre',
              start_time: null,
              start_require_event: false,
              end_time: null,
              end_require_event: false,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Almuerzo',
            sublabel: '',
            type_id: ATT_BREAK,
            timetable: () => ({
              type_id: ATT_BREAK,
              timetable_name: 'Almuerzo',
              start_time: this.$date.buildDate({hours: 11, minutes: 0, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 0, minutes: 30, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Dia Laboral Continuo',
            sublabel: '08:30 - 16:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Dia Laboral Continuo 08:30 - 16:30',
              start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Dia Laboral Continuo',
            sublabel: '09:30 - 17:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Dia Laboral Continuo 09:30 - 17:30',
              start_time: this.$date.buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Dia Laboral Continuo',
            sublabel: '10:30 - 18:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Dia Laboral Continuo 10:30 - 18:30',
              start_time: this.$date.buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 8, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Laboral',
            sublabel: '08:30 - 12:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Medio Dia Laboral 08:30 - 12:30',
              start_time: this.$date.buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Laboral',
            sublabel: '09:30 - 13:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Medio Dia Laboral 09:30 - 13:30',
              start_time: this.$date.buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Laboral',
            sublabel: '10:30 - 14:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Medio Dia Laboral 10:30 - 14:30',
              start_time: this.$date.buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Laboral',
            sublabel: '12:30 - 16:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Medio Dia Laboral 12:30 - 16:30',
              start_time: this.$date.buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Laboral',
            sublabel: '13:30 - 17:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Medio Dia Laboral 13:30 - 17:30',
              start_time: this.$date.buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          },
          {
            label: 'Medio Dia Laboral',
            sublabel: '14:30 - 18:30',
            type_id: ATT_WORK,
            timetable: () => ({
              type_id: ATT_WORK,
              timetable_name: 'Medio Dia Laboral 14:30 - 18:30',
              start_time: this.$date.buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
              start_require_event: true,
              end_time: this.$date.buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
              end_require_event: true,
              duration: this.$date.buildDate({hours: 4, minutes: 0, seconds: 0, milliseconds: 0})
            })
          }
        ]
      }
    },
    timetableTypes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      advanced: false
      // model: {
      //   // schedule_id: null,
      //   description: '',
      //   standard: this.standard,
      //   timetable: []
      // }
    }
  },
  watch: {
    advanced (newVal, oldVal) {
      if (newVal) {
        let copy = this.value ? JSON.parse(JSON.stringify(this.value)) : {
          schedule_name: '',
          description: '',
          standard: false,
          timetable: []
        }

        copy.standard = false
        delete copy.schedule_id
        delete copy.created_at
        delete copy.updated_at
        copy.timetable.forEach(t => {
          delete t.schedule_id
          delete t.timetable_id
          delete t.created_at
          delete t.updated_at
        })

        this.model = copy
      } else {
        this.$emit('input', null)
      }
    },
    model: {
      deep: true,
      handler () {
        this.$emit('input', this.model)
      }
    }
  },
  computed: {
    model: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    },
    withSchedulePresets () {
      return !!(this.schedulePresets && this.schedulePresets.length > 0)
    },
    presetScheduleOptions () {
      return this.withSchedulePresets ? this.schedulePresets.map(p => ({
        label: p.schedule_name,
        sublabel: p.description,
        value: p.schedule_id
      })) : []
    },
    presetTimetableOptions () {
      return this.timetablePresets ? this.timetablePresets : []
    },
    timetableTypesOptions () {
      return this.timetableTypes ? this.timetableTypes.map(type => ({
        value: type.type_id,
        label: type.type_name,
        sublabel: type.description,
        stamp: type.code
      })) : []
    }
  },
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
    },
    addPreset (preset) {
      let t = preset.timetable()
      console.log(t)
      this.model.timetable.push(t)
    }
  }
}
</script>

<style scoped>

</style>
