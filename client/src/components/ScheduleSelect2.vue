<template>
  <div class="row">
    <div class="col">
      <q-select hide-underline v-if="standard" :value="value.schedule_id" @input="inputScheduleId" :options="[]"></q-select>
      <q-input hide-underline v-else :value="value.schedule ? value.schedule.schedule_name : ''"></q-input>
    </div>
    <div class="col-auto">
      <q-btn v-if="value.schedule" dense color="primary" flat icon="info">
        <q-popover>
          <schedule-dense :value="value.schedule"></schedule-dense>
        </q-popover>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="primary" flat icon="search" @click="standard = true">
        <q-tooltip>
          Escojer jornada predeterminada
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="primary" flat icon="edit" @click="standard = false; $refs.modal.show()">
        <q-tooltip>
          Crear o Editar jornada a medida
        </q-tooltip>
      </q-btn>
    </div>
    <div class="col-auto">
      <q-btn dense color="negative" icon="close" @click="$emit('remove')"></q-btn>
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
          <schedule-create :value="value.schedule" @input="inputSchedule"></schedule-create>
          <pre>{{value}}</pre>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import ScheduleCreate from './ScheduleCreate'
import ScheduleDense from './ScheduleDense'
export default {
  name: 'ScheduleSelect',
  components: {
    ScheduleCreate,
    ScheduleDense
  },
  props: {
    value: {
      required: true,
      type: [Object, null]
    }
  },
  data () {
    return {
      standard: true
    }
  },
  watch: {
    standard (s) {
      if (s) {
        delete this.value.schedule
        this.value.schedule_id = null
      } else {
        this.value.schedule = null
        this.value.schedule_id = null
      }
    }
  },
  methods: {
    inputSchedule (schedule) {
      console.log(schedule)
      this.$emit('input', {
        ...this.value,
        schedule
      })
    },
    inputScheduleId (scheduleId) {
      console.log(scheduleId)
      this.$emit('input', {
        ...this.value,
        schedule_id: scheduleId
      })
    }
  }
}
</script>

<style scoped>

</style>
