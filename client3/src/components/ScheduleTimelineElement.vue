<template>
  <div :style="style" class="q-pa-xs timeline-element bg-green-4 row items-center no-wrap">
    <div v-if="value.startEvent" class="col-auto">
      <q-tooltip>Marcación de Entrada</q-tooltip>
      <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
    </div>
    <div class="col-auto q-caption">
      {{$schedule.formatTime(value.startTime)}}
    </div>
    <div class="col"></div>
    <div class="col-auto q-caption">
      {{$schedule.formatTime(value.endTime)}}
    </div>
    <div v-if="value.endEvent" class="col-auto">
      <q-tooltip>Marcación de Salida</q-tooltip>
      <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
    </div>
    <q-popover self="top middle" anchor="bottom middle">
      <pre>{{value}}</pre>
    </q-popover>
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
  overflow hidden
</style>
