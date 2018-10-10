<template>
  <div :style="style" class="timeline-element bg-green-4 row items-center no-wrap">
    <div class="col-auto">
      <span v-if="value.startEvent">
        <q-tooltip>Marcación de Entrada</q-tooltip>
        <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
      </span>
      <span class="q-caption">{{$schedule.formatTime(value.startTime)}}</span>
    </div>
    <div class="col"></div>
    <div class="col-auto ">
      <span class="q-caption">{{$schedule.formatTime(value.endTime)}}</span>
      <span v-if="value.endEvent">
        <q-tooltip>Marcación de Salida</q-tooltip>
        <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleTimelineElement',
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  computed: {
    style () {
      const start = ((this.value.startTime - this.$schedule.innerBound) / 5) + 1
      const end = ((this.value.endTime - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.timeline-element
  grid-row 1
  border solid white 1px
  white-space nowrap

</style>
