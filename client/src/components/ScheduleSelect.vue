<template>
  <div class="row">
    <div class="col">
      <q-select filter hide-underline v-if="showSelect" :value="value ? value.schedule_id : null" @input="inputScheduleId" :options="standardScheduleOptions"></q-select>
      <q-input hide-underline v-else :value="value ? value.schedule_name : ''"></q-input>
    </div>
    <div class="col-auto">
      <q-btn v-if="value" dense color="primary" flat icon="info">
        <q-popover>
          <schedule-compact :value="value"></schedule-compact>
        </q-popover>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="primary" flat icon="search" @click="$emit('input', null)">
        <q-tooltip>
          Escojer desde lista
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="primary" flat icon="edit" @click="$refs.modal.show()">
        <q-tooltip>
          Crear jornada
        </q-tooltip>
      </q-btn>
    </div>
    <q-modal content-css="width: 80vw; height: 80vh;" ref="modal">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="$refs.modal.hide()"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
          <q-btn size="lg" rounded color="positive" icon="check" :disable="!value" @click="$refs.modal.hide()">Listo</q-btn>
        </q-toolbar>
        <div class="layout-padding">
          <schedule :value="value" @input="inputSchedule"></schedule>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Schedule from './Schedule'
import ScheduleCompact from './ScheduleCompact'
export default {
  name: 'ScheduleSelect',
  components: {
    Schedule,
    ScheduleCompact
  },
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      standard: true
    }
  },
  computed: {
    ...mapGetters('hr', {
      standardScheduleOptions: 'standardScheduleOptions'
    }),
    showSelect () {
      return !this.value || this.value.standard
    }
  },
  methods: {
    ...mapGetters('hr', {
      standardScheduleById: 'standardScheduleById'
    }),
    inputSchedule (schedule) {
      // console.log(schedule)
      // const copy = Object.assign({}, this.value, {
      //   schedule
      // })
      // if (schedule.schedule_id) {
      //   copy.schedule_id = schedule.schedule_id
      // } else {
      //   delete copy.schedule_id
      // }
      this.$emit('input', schedule)
    },
    inputScheduleId (scheduleId) {
      console.log(this.standardScheduleOptions)
      console.log(scheduleId)
      const schedule = this.standardScheduleById()(scheduleId)
      console.log(schedule)
      const copy = JSON.parse(JSON.stringify(schedule))
      this.$emit('input', copy)
      // const copy = Object.assign({}, this.value, {
      //   schedule_id: scheduleId
      // })
      // delete copy.schedule
      // this.$emit('input', copy)
    }
  }
}
</script>

<style scoped>

</style>
