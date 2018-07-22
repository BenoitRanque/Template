<template>
  <div class="row">
    <div class="col">
      <q-select hide-underline v-if="standard" :value="value.schedule_id" @input="inputScheduleId" :options="standardScheduleOptions"></q-select>
      <q-input hide-underline v-else :value="value.schedule ? value.schedule.schedule_name : ''"></q-input>
    </div>
    <div class="col-auto">
      <q-btn v-if="value.schedule" dense color="primary" flat icon="info">
        <q-popover>
          <schedule-compact :value="value.schedule"></schedule-compact>
        </q-popover>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="primary" flat icon="search" @click="standard = true">
        <q-tooltip>
          Escojer desde lista
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="primary" flat icon="edit" @click="standard = false; $refs.modal.show()">
        <q-tooltip>
          Crear jornada
        </q-tooltip>
      </q-btn>
    </div>
    <q-modal content-css="width: 80vw; height: 80vh;" ref="modal" @hide="!value.schedule ? standard = true : standard = false">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="$refs.modal.hide()"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
          <q-btn size="lg" rounded color="positive" icon="check" :disable="!value.schedule" @click="$refs.modal.hide()">Listo</q-btn>
        </q-toolbar>
        <div class="layout-padding">
          <schedule :value="value.schedule" @input="inputSchedule"></schedule>
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
      required: true,
      type: Object
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
    })
  },
  methods: {
    inputSchedule (schedule) {
      const copy = Object.assign({}, this.value, {
        schedule
      })
      this.$emit('input', copy)
    },
    inputScheduleId (scheduleId) {
      const copy = Object.assign({}, this.value, {
        schedule_id: scheduleId
      })
      delete copy.schedule
      this.$emit('input', copy)
    }
  }
}
</script>

<style scoped>

</style>
