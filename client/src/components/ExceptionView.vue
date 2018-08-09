<template>
  <div>
    <schedule-view :value="slot.schedule"  v-for="(slot, index) in value.slots" :key="index"/>
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
