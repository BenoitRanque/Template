<template>
  <div class="" :style="gridStyle">
    <schedule-header :style="{ gridRow: headerRow, gridColumn: `1 / ${gridColumns + 1}`}">
      <slot name="header" slot="header"></slot>
    </schedule-header>
    <schedule-label v-for="(label, index) in labels" :key="`label_${index}`" :value="label"></schedule-label>
    <!-- <div class="bg-teal-2" :style="{ gridRow: 3, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <div class="bg-amber-2" :style="{ gridRow: 4, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <div class="bg-indigo-2" :style="{ gridRow: 5, gridColumn: `1 / ${gridColumns + 1}`}"></div> -->
    <timeline-gap v-for="(gap, index) in timelineGaps" :key="`timeline_gap_${index}`" :value="gap" @add="addTimelineElement"></timeline-gap>
    <timeline-element v-for="(element, index) in model.timeline" :key="`timeline_element_${index}`" :value="element" @remove="model.timeline.splice(index, 1)"></timeline-element>
    <restline-gap v-for="(gap, index) in restlineGaps" :key="`restline_gap_${index}`" :value="gap" @add="addRestlineElement"></restline-gap>
    <restline-element v-for="(element, index) in model.restline" :key="`restline_element_${index}`" :value="element" @remove="model.restline.splice(index, 1)"></restline-element>
    <offline-element v-model="model.offline1" :style="{ gridRow: offlineRow, gridColumn: `1 / ${ Math.floor(gridColumns / 2) + 1}` }"></offline-element>
    <offline-element v-model="model.offline2" :style="{ gridRow: offlineRow, gridColumn: `${Math.floor(gridColumns / 2) + 1} / ${gridColumns + 1}` }"></offline-element>
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

import { mapGetters } from 'vuex'

function defaultValue () {
  return {
    name: '',
    baseTime: 8 * 60,
    standard: true,
    restline: [],
    offline1: null,
    offline2: null,
    timeline: []
  }
}
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
  props: {
    value: {
      type: Object,
      default: defaultValue
    },
    valid: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      headerRow: 1,
      labelRow: 2,
      offlineRow: 3,
      timelineRow: 4,
      restlineRow: 5
      // model: {
      //   name: '',
      //   baseTime: 8 * 60,
      //   standard: true,
      //   restline: [],
      //   offline1: null,
      //   offline2: null,
      //   timeline: []
      // }
    }
  },
  provide () {
    return {
      $parent: this
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    ...mapGetters('schedule', [
      'categoryCanRest',
      'categoryCanEvent',
      'categoryIsStandardTime',
      'formatTime'
    ]),
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.gridColumns}, 1fr)`,
        gridTemplateRows: 'auto auto 30px 30px 30px'
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

      this.model.timeline.forEach(element => {
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
    timelineRestGroups () {
      // concatenate gaps from possibly multiple elements
      const restGroups = []

      if (!this.model.timeline.length) return restGroups

      for (let i = 0, l = this.model.timeline.length, start = null, end = null; i < l; i += 1) {
        let currentElement = this.model.timeline[i]
        let previousElement = i > 0 ? this.model.timeline[i - 1] : null
        let nextElement = i < (l - 1) ? this.model.timeline[i + 1] : null

        if (this.categoryCanRest(currentElement.category)) {
          if (start === null) {
            if (currentElement.startEvent || (previousElement &&
              previousElement.endEvent &&
              (previousElement.endTime + 30) > currentElement.startTime)) {
              start = currentElement.startTime + 30
            } else {
              start = currentElement.startTime
            }
          }

          if (currentElement.endEvent ||
            !nextElement ||
            !this.categoryCanRest(nextElement.category) ||
            nextElement.startTime > currentElement.endTime ||
            nextElement.startEvent) {
            if (currentElement.endEvent || (nextElement &&
              nextElement.startEvent &&
              (nextElement.startTime - 30) < currentElement.endTime)) {
              end = currentElement.endTime - 30
            } else {
              end = currentElement.endTime
            }
          }
        }

        if (start !== null && end !== null) {
          restGroups.push({
            start,
            end
          })

          start = null
          end = null
        }
      }

      return restGroups
    },
    restlineGaps () {
      const gaps = []

      this.timelineRestGroups.forEach(gap => {
        let start = gap.start, end = gap.end

        this.model.restline.forEach(rest => {
          if (rest.startTime <= end && rest.endTime >= start) {
            end = rest.startTime
            if (end > start) {
              gaps.push({
                start,
                end
              })
            }
            start = rest.endTime
            end = gap.end
          }
        })
        if (end > start) {
          gaps.push({
            start,
            end
          })
        }
      })

      return gaps
    },
    usedTime () {
      return this.model.timeline
        .reduce((acc, val) => this.categoryIsStandardTime(val.category) ? acc + (val.endTime - val.startTime) : acc, 0) +
        ((this.model.offline1 === null ? 0 : this.model.baseTime / 2) +
        (this.model.offline2 === null ? 0 : this.model.baseTime / 2))
    },
    isValid () {
      if (this.usedTime !== this.model.baseTime) return false
      return true
    }
  },
  watch: {
    isValid (isValid) {
      console.log('valid:', isValid)
      this.$emit('update:valid', isValid)
    }
  },
  methods: {
    // formatTime (minutes) {
    //   return `0${Math.floor(minutes / 60)}:0${Math.floor(minutes % 60)}`.replace(/0(\d\d)/g, '$1')
    // },
    // parseTime (time) {
    //   const [ , hours, minutes ] = time.match(/(\d?\d)?:?([0-5]\d)/)

    //   return hours ? (Number(hours) * 60) + Number(minutes) : Number(minutes)
    // },
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
  },
  created () {
    if (this.value === null) {
      this.$emit('input', defaultValue())
    }
  }
}
</script>

<style scoped>
</style>
