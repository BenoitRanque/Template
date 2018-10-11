<template>
  <div class="" :style="gridStyle">
    <div class="row items-center q-py-xs q-pl-xs" style="grid-area: header">
      <div class="col">
        <q-input hide-underline v-model="model.name"></q-input>
      </div>
      <div class="col-auto">
        <q-btn flat dense color="primary" icon="more_vert"></q-btn>
      </div>
    </div>
    <schedule-label style="grid-area: label"></schedule-label>
    <schedule-timeline v-model="model.timeline" style="grid-area: timeline"></schedule-timeline>
    <schedule-pause v-model="model.pausetime" style="grid-area: pause"></schedule-pause>
    <schedule-timeoff v-model="model.timeoff1" style="grid-area: timeoff1"></schedule-timeoff>
    <schedule-timeoff v-model="model.timeoff2" style="grid-area: timeoff2"></schedule-timeoff>
  </div>
</template>

<script>
import ScheduleLabel from './ScheduleLabel.vue'
import ScheduleTimeoff from './ScheduleTimeoff.vue'
import SchedulePause from './SchedulePause.vue'
import ScheduleTimeline from './ScheduleTimeline.vue'
// import SchedulePausetimeGap from './SchedulePausetimeGap.vue'
// import SchedulePausetimeElement from './SchedulePausetimeElement.vue'
// import ScheduleTimelineGap from './ScheduleTimelineGap.vue'
// import ScheduleTimelineElement from './ScheduleTimelineElement.vue'

const
  UPTIME = 'UPTIME',
  // DOWNTIME = 'DOWNTIME',
  WORK = 'WORK',
  EXTRA = 'EXTRA'

export default {
  name: 'Schedule',
  components: {
    ScheduleLabel,
    ScheduleTimeoff,
    SchedulePause,
    ScheduleTimeline
  },
  data () {
    return {
      model: {
        name: 'Schedule Name',
        pauses: [],
        timeoff1: null,
        timeoff2: null,
        timeline: [
          {
            superclass: UPTIME,
            subclass: WORK,
            startTime: 8.5 * 60,
            startEvent: true,
            endTime: 12 * 60,
            endEvent: true
          },
          {
            superclass: UPTIME,
            subclass: WORK,
            startTime: 14 * 60,
            startEvent: true,
            endTime: 14.5 * 60,
            endEvent: false
          },
          {
            superclass: UPTIME,
            subclass: EXTRA,
            startTime: 15 * 60,
            startEvent: false,
            endTime: 18.5 * 60,
            endEvent: true
          }
        ]
      }
    }
  },
  provide () {
    return {
      $schedule: this
    }
  },
  computed: {
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: '2',
        gridTemplateRows: 'auto auto repeat(3, 1fr)',
        gridTemplateAreas: `
          "header header"
          "label label"
          "timeline timeline"
          "pause pause"
          "timeoff1 timeoff2"
        `
      }
    },
    innerBound () {
      const maxBound = 8 * 60
      const minBound = 0
      if (this.model.timeline.length === 0) {
        return maxBound
      }

      const smallBound = this.model.timeline.reduce((acc, val) => val.startTime < acc ? val.startTime : acc, maxBound) // smallest bound in uptime
      const roundedSmallBound = Math.floor((smallBound - 30) / 120) * 120 // rounded to closest hour

      if (roundedSmallBound > maxBound) {
        return maxBound
      } else if (roundedSmallBound < minBound) {
        return minBound
      } else {
        return roundedSmallBound
      }
    },
    outerBound () {
      const maxBound = 48 * 60
      const minBound = 18 * 60
      if (this.model.timeline.length === 0) {
        return minBound
      }

      const largeBound = this.model.timeline.reduce((acc, val) => val.endTime > acc ? val.endTime : acc, minBound) // largest bound in uptime
      const roundedLargeBound = Math.ceil((largeBound + 30) / 120) * 120 // rounded to closest hour

      if (roundedLargeBound > maxBound) {
        return maxBound
      } else if (roundedLargeBound < minBound) {
        return minBound
      } else {
        return roundedLargeBound
      }
    },
    gridColumns () {
      return (this.outerBound - this.innerBound) / 5
    }
  },
  methods: {
    formatTime (minutes) {
      return `0${Math.floor(minutes / 60)}:0${minutes % 60}`.replace(/0([0-9][0-9])/g, '$1')
    }
  }
}
</script>

<style scoped>
</style>
