<template>
  <div :style="gridStyle" class="bg-amber-2">
    <pause-gap v-for="(gap, index) in gaps" :key="`gap_${index}`" :value="gap"></pause-gap>
  </div>
</template>

<script>
import PauseElement from './SchedulePauseElement.vue'
import PauseGap from './SchedulePauseGap'
export default {
  name: 'SchedulePausetime',
  components: { PauseElement, PauseGap },
  inject: ['$schedule'],
  computed: {
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.$schedule.gridColumns}, 1fr)`
      }
    },
    uptime () {
      // concatenate gaps from possibly multiple elements
      const uptime = []

      if (!this.$schedule.model.timeline.length) return uptime

      let start = 0, end = 0, previousElement = null

      this.$schedule.model.timeline.forEach((element, index) => {
        if (element.superclass !== 'UPTIME' || element.startTime > end || element.startEvent || (previousElement && previousElement.endEvent)) {
          if (end > start) {
            uptime.push({
              start,
              end
            })
          }
          start = element.startTime
        }
        if (element.superclass !== 'UPTIME') {
          start = 0
          end = 0
        } else {
          end = element.endTime
          previousElement = element
        }
      })
      if (end > start) {
        uptime.push({
          start,
          end
        })
      }

      // filter gaps smaller than one hour and shrink by 30 minutes each end
      return uptime
    },
    gaps () {
      const trimmedGaps = this.uptime
        .filter(({ start, end }) => (end - 60) > start)
        .map(({ start, end }) => ({
          start: start + 30,
          end: end - 30
        }))

      return trimmedGaps
    }
  }
}
</script>

<style scoped>

</style>
