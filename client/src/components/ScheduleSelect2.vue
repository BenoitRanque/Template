<template>
  <div class="row">
    <div class="col">
      <q-select hide-underline v-if="standard" v-model="value.schedule_id" :options="[]"></q-select>
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
    <q-modal maximized ref="modal" @hide="!value.schedule ? standard = true : standard = false">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="$refs.modal.hide()"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
        </q-toolbar>
        <schedule-create @input="value.schedule = $event; $refs.modal.hide()"></schedule-create>
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
  }
}
</script>

<style scoped>

</style>
