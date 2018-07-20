<template>
  <div>
    <div class="row items-center">
      <q-input class="col" v-model="timetable.timetable_name.$model" hide-underline></q-input>
      <div class="col">{{timetableSummary}}</div>
      <div class="col-auto">
        <q-btn icon="close" @click="$emit('remove')" size="md" dense color="negative"></q-btn>
      </div>
    </div>
    <div class="row q-px-sm" v-if="advancedTimetable">
      <q-select class="col-6" :options="options.type_id" v-model="model.timetype_id"></q-select>
      <q-datetime :format24h="true" class="col-6" type="time" v-model="model.duration"></q-datetime>
      <q-datetime :format24h="false" class="col-6" type="time" v-model="model.start_time"></q-datetime>
      <q-datetime :format24h="false" class="col-6" type="time" v-model="model.end_time"></q-datetime>
      <div class="col-6 q-pt-sm">
        <q-checkbox v-model="model.start_require_event" label="debe marcar inicio"></q-checkbox>
      </div>
      <div class="col-6 q-pt-sm">
        <q-checkbox v-model="model.end_require_event" label="debe marcar fin"></q-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import attType from 'assets/attType'
const { ATT_TIMEOFF, ATT_BREAK, ATT_WORK } = attType

export default {
  name: 'TimetableSelect',
  data () {
    return {
      model: {
        type_id: null,
        duration: null,
        start_time: null,
        start_require_event: true,
        end_time: null,
        end_require_event: true
      }
    }
  },
  computed: {
    timetableSummary () {
      switch (this.model.timetype_id) {
        case ATT_TIMEOFF:
          return `Duración ${this.$date.formatDate(this.model.duration, 'HH:mm')}`
        case ATT_BREAK:
          return `${this.$date.formatDate(this.model.duration, 'HH:mm')} entre ${this.$date.formatDate(this.model.start_time, 'HH:mm')}-${this.$date.formatDate(this.model.end_time, 'HH:mm')}`
        case ATT_WORK:
          return `${this.$date.formatDate(this.model.start_time, 'HH:mm')}-${this.$date.formatDate(this.model.end_time, 'HH:mm')} duración ${this.$date.formatDate(this.model.duration, 'HH:mm')}`
      }
    }
  }
}
</script>

<style scoped>

</style>
