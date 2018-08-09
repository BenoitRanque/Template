<template>
  <div>
    <q-field v-for="(slot, index) in value.slots" :key="index" :label="$date.formatDate(slot.date, 'YYYY/MM/DD - dddd')">
      <!-- <schedule-compact :value="slot.schedule.$model"></schedule-compact> -->
      <!-- <pre>{{slot.schedule.$model}}</pre> -->
      <schedule-view :value="slot.schedule"></schedule-view>
    </q-field>
  </div>
</template>

<script>
import ScheduleView from './ScheduleView'
export default {
  name: 'ExceptionView',
  components: { ScheduleView },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
  // compact READ ONLY view of exception

}
</script>

<style scoped>

</style>
