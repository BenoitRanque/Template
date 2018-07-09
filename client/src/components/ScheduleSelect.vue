<template>
  <div>
    <div class="row">
      <slot name="header"></slot>
      <div class="col-auto">
        <q-toggle v-model="advanced" left-label label="avanzado"></q-toggle>
      </div>
    </div>
    <q-field v-if="!advanced" :label="$t('field.schedule.label')">
      <q-select
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
        <q-input v-mdoel="model.description"></q-input>
      </q-field>
    </template>
    <timetable-select v-for="(t, index) in model.timetable" :key="index" v-model="model.timetable[index]" @remove="model.timetable.splice(index, 1)"></timetable-select>
    <div class="row justify-around q-pa-md">
      <q-btn icon="add" color="positive">
        <q-popover self="top middle" anchor="bottom middle">
          <q-list link>
            <q-item v-for="(preset, index) in timetablePresets" :key="index" v-close-overlay @click.native="$v.item.timetable.$model.push(clonePreset(preset))">
              <q-item-main :label="preset.timetable_name" :sublabel="timetableSummary(preset)"></q-item-main>
              <q-item-side>
                <q-chip :style="{ 'background': timetableTypes && timetableTypes[preset.type_id] ? timetableTypes[preset.type_id].color : null}">{{timetableTypes && timetableTypes[preset.type_id] ? timetableTypes[preset.type_id].code : null}}</q-chip>
              </q-item-side>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </div>
    <pre>{{$data}}</pre>
    <pre>{{value}}</pre>
  </div>
</template>

<script>
import TimetableSelect from './TimetableSelect'

export default {
  name: 'ScheduleSelect',
  components: { TimetableSelect },
  props: {
    value: {
      type: Object,
      default: null
    },
    schedulePresets: {
      type: Array,
      default: () => ([])
    },
    timetablePresets: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      advanced: false,
      model: {
        schedule_id: '',
        description: '',
        standard: false,
        timetable: []
      }
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
    presetScheduleOptions () {
      return this.schedulePresets ? this.schedulePresets.map(p => ({
        label: p.schedule_name,
        sublabel: p.description,
        value: p.schedule_id
      })) : []
    },
    presetTimetableOptions () {
      return this.timetablePresets ? this.timetablePresets : []
    }
  }
}
</script>

<style scoped>

</style>
