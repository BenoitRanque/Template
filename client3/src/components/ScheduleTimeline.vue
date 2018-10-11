<template>
  <div :style="gridStyle" class="bg-green-2">
    <timeline-gap v-for="(gap, index) in gaps" :key="`gap_${index}`" :value="gap"></timeline-gap>
    <timeline-element v-for="(element, index) in $schedule.model.timeline" :key="`element_${index}`" :value="element"></timeline-element>
  </div>
</template>

<script>
import TimelineGap from './ScheduleTimelineGap.vue'
import TimelineElement from './ScheduleTimelineElement.vue'
export default {
  name: 'ScheduleTimeline',
  components: { TimelineGap, TimelineElement },
  inject: ['$schedule'],
  computed: {
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.$schedule.gridColumns}, 1fr)`
      }
    },
    gaps () {
      const gaps = []

      let start = 0, end = 0

      this.$schedule.model.timeline
        .forEach(element => {
          end = element.startTime

          if (end > start) {
            gaps.push({
              start,
              end
            })
          }

          start = element.endTime
        })

      end = 48 * 60

      if (end > start) {
        gaps.push({
          start,
          end
        })
      }

      return gaps
    }
  }
}
</script>

<style scoped>

</style>
