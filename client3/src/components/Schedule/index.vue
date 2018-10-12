<template>
  <div class="" :style="gridStyle">
    <schedule-header :style="{ gridRow: 1, gridColumn: `1 / ${gridColumns + 1}`}"></schedule-header>
    <schedule-label v-for="(label, index) in labels" :key="`label_${index}`" :value="label"></schedule-label>
    <div class="bg-green-2" :style="{ gridRow: 3, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <div class="bg-amber-2" :style="{ gridRow: 4, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <div class="bg-blue-2" :style="{ gridRow: 5, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <timeline-gap v-for="(gap, index) in timelineGaps" :key="`timeline_gap_${index}`" :value="gap" @add="addTimelineElement"></timeline-gap>
    <timeline-element v-for="(element, index) in model.timeline" :key="`timeline_element_${index}`" :value="element" @remove="model.timeline.splice(index, 1)"></timeline-element>
    <restline-gap v-for="(gap, index) in restlineGaps" :key="`restline_gap_${index}`" :value="gap" @add="addRestlineElement"></restline-gap>
    <restline-element v-for="(element, index) in model.restline" :key="`restline_element_${index}`" :value="element" @remove="model.restline.splice(index, 1)"></restline-element>
    <offline-element v-model="model.offline1" :style="{ gridRow: 5, gridColumn: `1 / ${ Math.floor(gridColumns / 2) + 1}` }"></offline-element>
    <offline-element v-model="model.offline2" :style="{ gridRow: 5, gridColumn: `${Math.floor(gridColumns / 2) + 1} / ${gridColumns + 1}` }"></offline-element>
  </div>
</template>

<script>
import ScheduleHeader from './ScheduleHeader'
import ScheduleLabel from './ScheduleLabel.vue'
import OfflineElement from './OfflineElement.vue'
import TimelineGap from './TimelineGap.vue'
import TimelineElement from './TimelineElement.vue'
import RestlineGap from './RestlineGap.vue'
import RestlineElement from './RestlineElement.vue'

export default {
  name: 'Schedule',
  components: {
    ScheduleHeader,
    ScheduleLabel,
    OfflineElement,
    TimelineGap,
    TimelineElement,
    RestlineGap,
    RestlineElement
  },
  data () {
    return {
      model: {
        name: 'Schedule Name',
        baseTime: 8 * 60,
        standard: true,
        restline: [
          // {
          //   superclass: 'PAUSE',
          //   subclass: 'LUNCH',
          //   startTime: 11.5 * 60,
          //   startEvent: true,
          //   endTime: 14.5 * 60,
          //   endEvent: true,
          //   duration: 30
          // }
        ],
        offline1: null,
        offline2: null,
        timeline: [
          // {
          //   category: 'WORK',
          //   startTime: 9.5 * 60,
          //   startEvent: true,
          //   endTime: 17.5 * 60,
          //   endEvent: true
          // }
          // {
          //   superclass: 'UPTIME',
          //   subclass: 'WORK',
          //   startTime: 8.5 * 60,
          //   startEvent: true,
          //   endTime: 12 * 60,
          //   endEvent: true
          // },
          // {
          //   superclass: 'UPTIME',
          //   subclass: 'WORK',
          //   startTime: 14 * 60,
          //   startEvent: true,
          //   endTime: 14.5 * 60,
          //   endEvent: false
          // },
          // {
          //   superclass: 'UPTIME',
          //   subclass: 'EXTRA',
          //   startTime: 14.5 * 60,
          //   startEvent: false,
          //   endTime: 18.5 * 60,
          //   endEvent: true
          // }
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
        gridTemplateColumns: `repeat(${this.gridColumns}, 1fr)`,
        gridTemplateRows: 'auto auto repeat(3, 35px)'
        // gridTemplateAreas: `
        //   "repeat(${this.gridColumns}, header)"
        //   "repeat(${this.gridColumns}, label)"
        //   "repeat(${this.gridColumns}, timeline)"
        //   "repeat(${this.gridColumns}, restline)"
        //   "repeat(${this.gridColumns}, downtime1)"
        //   "repeat(${this.gridColumns}, downtime2)"
        //   "label label"
        //   "timeline timeline"
        //   "restline restline"
        //   "timeoff1 timeoff2"
        // `
      }
    },
    innerBound () {
      const maxBound = 9 * 60
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
      const minBound = 17 * 60
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
    },
    labels () {
      const labels = []
      const innerBound = this.innerBound
      const outerBound = this.outerBound

      for (let time = Math.ceil(innerBound / 60) * 60; time + 120 <= outerBound; time += 120) {
        labels.push({
          col: ((time - innerBound) / 5) + 1,
          time: this.formatTime(time + 60)
        })
      }
      return labels
    },
    timelineGaps () {
      const gaps = []

      let start = 0, end = 0

      this.model.timeline
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
    },
    timelineElementGroups () {
      // concatenate gaps from possibly multiple elements
      const elements = []

      if (!this.model.timeline.length) return elements

      let start = 0, end = 0, previousElement = null

      this.model.timeline.forEach((element, index) => {
        if (element.startTime > end || element.startEvent || (previousElement && previousElement.endEvent)) {
          if (end > start) {
            elements.push({
              start,
              end
            })
          }
          start = element.startTime
        }
        end = element.endTime
        previousElement = element
      })
      if (end > start) {
        elements.push({
          start,
          end
        })
      }

      return elements
    },
    restlineGaps () {
      // filter gaps smaller than one hour and shrink by 30 minutes each end
      const trimmedGaps = this.timelineElementGroups
        .filter(({ start, end }) => (end - 60) > start)
        .map(({ start, end }) => ({
          start: start + 30,
          end: end - 30
        }))

      const availableGaps = []

      // TODO: filter to remove occupied space
      trimmedGaps.forEach(gap => {
        let start = gap.start, end = gap.end

        this.model.restline.forEach(rest => {
          if (rest.startTime <= end && rest.endTime >= start) {
            end = rest.startTime
            if (end > start) {
              availableGaps.push({
                start,
                end
              })
            }
            start = rest.endTime
            end = gap.end
          }
        })
        if (end > start) {
          availableGaps.push({
            start,
            end
          })
        }
      })

      return availableGaps
    }
  },
  methods: {
    formatTime (minutes) {
      return `0${Math.floor(minutes / 60)}:0${Math.floor(minutes % 60)}`.replace(/0(\d\d)/g, '$1')
    },
    parseTime (time) {
      const [ , hours, minutes ] = time.match(/(\d?\d)?:?([0-5]\d)/)

      return hours ? (Number(hours) * 60) + Number(minutes) : Number(minutes)
    },
    addTimelineElement (element) {
      this.model.timeline = this.model.timeline
        .concat([element])
        .sort((a, b) => a.startTime - b.startTime)
    },
    addRestlineElement (element) {
      this.model.restline = this.model.restline
        .concat([element])
        .sort((a, b) => a.startTime - b.startTime)
    }
  }
}
</script>

<style scoped>
</style>
