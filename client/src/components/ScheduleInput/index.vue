<template>
  <div class="" :style="gridStyle">
    <schedule-header :style="{ gridRow: headerRow, gridColumn: `1 / ${gridColumns + 1}`}">
      <slot name="top-left" slot="top-left"></slot>
      <slot name="top-right" slot="top-right"></slot>
    </schedule-header>
    <schedule-label v-for="(label, index) in labels" :key="`label_${index}`" :value="label"></schedule-label>
    <!-- <div class="bg-teal-2" :style="{ gridRow: 3, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <div class="bg-amber-2" :style="{ gridRow: 4, gridColumn: `1 / ${gridColumns + 1}`}"></div>
    <div class="bg-indigo-2" :style="{ gridRow: 5, gridColumn: `1 / ${gridColumns + 1}`}"></div> -->
    <timeline-gap v-if="!readonly" v-for="(gap, index) in timelineGaps" :key="`timeline_gap_${index}`" :value="gap" @add="addTimelineElement"></timeline-gap>
    <timeline-element v-for="(element, index) in model.timeline" :key="`timeline_element_${index}`" :value="element" @remove="model.timeline.splice(index, 1)"></timeline-element>
    <restline-gap v-if="!readonly" v-for="(gap, index) in restlineGaps" :key="`restline_gap_${index}`" :value="gap" @add="addRestlineElement"></restline-gap>
    <restline-element v-for="(element, index) in model.restline" :key="`restline_element_${index}`" :value="element" @remove="model.restline.splice(index, 1)"></restline-element>
    <offline-element v-model="model.offline1" :style="{ gridRow: offlineRow, gridColumn: `1 / ${ Math.floor(gridColumns / 2) + 1}` }">
      <slot name="offline1-source" slot="source"></slot>
      <slot name="offline1-header" slot="header"></slot>
    </offline-element>
    <offline-element v-model="model.offline2" :style="{ gridRow: offlineRow, gridColumn: `${Math.floor(gridColumns / 2) + 1} / ${gridColumns + 1}` }">
      <slot name="offline2-source" slot="source"></slot>
      <slot name="offline2-header" slot="header"></slot>
    </offline-element>
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

export default {
  name: 'ScheduleInput',
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
      default: () => ({
        name: '',
        preset: false,
        baseTime: 8 * 60,
        standard: true,
        restline: [],
        offline1: null,
        offline2: null,
        timeline: []
      })
    },
    advanced: {
      type: Boolean,
      default: false
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
      'categoryDescription',
      'formatTime'
    ]),
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.gridColumns}, 1fr)`,
        gridTemplateRows: 'auto auto 28px 28px 28px'
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
          time: this.formatTime(time >= (23 * 60) ? time - (23 * 60) : time + 60)
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
            if (currentElement.startEventRequired || (previousElement &&
              previousElement.endEventRequired &&
              (previousElement.endTime + 30) > currentElement.startTime)) {
              start = currentElement.startTime + 30
            } else {
              start = currentElement.startTime
            }
          }

          if (currentElement.endEventRequired ||
            !nextElement ||
            !this.categoryCanRest(nextElement.category) ||
            nextElement.startTime > currentElement.endTime ||
            nextElement.startEventRequired) {
            if (currentElement.endEventRequired || (nextElement &&
              nextElement.startEventRequired &&
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
    canAutoAddLunch () {
      const lunchStart = 11 * 60
      const lunchEnd = 14.5 * 60
      const lunchGap = this.restlineGaps.find(gap => gap.start <= lunchStart && gap.end >= lunchEnd)
      if (lunchGap) return true
      return false
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
    },
    autoDescription () {
      let desc = []

      if (this.model.offline1 && this.model.offline2 && this.model.offline1.category === this.model.offline2.category) {
        desc.push(`Día ${this.categoryDescription(this.model.offline1.category)}`)
      } else {
        if (this.model.offline1) {
          desc.push(`Mañana ${this.categoryDescription(this.model.offline1.category)}`)
        }
        if (this.model.offline2) {
          desc.push(`Tarde ${this.categoryDescription(this.model.offline2.category)}`)
        }
      }

      desc = desc.concat(this.model.timeline.reduce((timeline, element) => {
        timeline.push(`${this.categoryDescription(element.category)} ${this.formatTime(element.startTime)} - ${this.formatTime(element.endTime)}`)
        return timeline
      }, []))

      desc = desc.concat(this.model.restline.reduce((timeline, element) => {
        timeline.push(`${this.categoryDescription(element.category)} ${this.formatTime(element.duration)}`)
        return timeline
      }, []))

      return desc.join(', ')
    }
  },
  watch: {
    isValid (isValid) {
      this.$emit('update:valid', isValid)
    },
    autoDescription (description) {
      this.model.description = description
    },
    'model.timeline': {
      deep: true,
      handler (timeline) {
        if (this.advanced) return

        for (let i = 0, l = this.model.timeline.length - 1; i < l; i += 1) {
          let currentElement = this.model.timeline[i]
          let nextElement = this.model.timeline[i + 1]

          if (nextElement.startTime === currentElement.endTime && nextElement.category === currentElement.category) {
            currentElement.endTime = nextElement.endTime
            this.model.timeline.splice(i + 1, 1)
            return
          }
        }

        for (let i = 0, l = this.model.timeline.length; i < l; i += 1) {
          let currentElement = this.model.timeline[i]
          let previousElement = i > 0 ? this.model.timeline[i - 1] : null
          let nextElement = i < (l - 1) ? this.model.timeline[i + 1] : null

          if (this.categoryCanEvent(currentElement.category)) {
            if (previousElement && previousElement.endTime === currentElement.startTime && this.categoryCanEvent(previousElement.category)) {
              currentElement.startEventRequired = false
            } else {
              currentElement.startEventRequired = true
            }
            if (nextElement && nextElement.startTime === currentElement.endTime && this.categoryCanEvent(nextElement.category)) {
              currentElement.endEventRequired = false
            } else {
              currentElement.endEventRequired = true
            }
          }
        }
      }
    },
    timelineRestGroups () {
      if (this.canAutoAddLunch) this.autoAddLunch()
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
    autoAddLunch () {
      this.addRestlineElement({
        category: 'SCH_REST_LUNCH',
        startTime: 11 * 60,
        startEventRequired: true,
        endTime: 14.5 * 60,
        endEventRequired: true,
        duration: 30
      })
    },
    addTimelineElement (element) {
      if (this.categoryCanEvent(element.category)) {
        element.startEventRequired = true
        element.endEventRequired = true

        const previousTimelineElement = this.model.timeline.find(({ endTime, category }) => this.categoryCanEvent(category) && endTime === element.startTime)
        const nextTimelineElement = this.model.timeline.find(({ startTime, category }) => this.categoryCanEvent(category) && startTime === element.endTime)

        if (previousTimelineElement) {
          previousTimelineElement.endEventRequired = false
          element.startEventRequired = false
        }
        if (nextTimelineElement) {
          nextTimelineElement.startEventRequired = false
          element.endEventRequired = false
        }
      } else {
        element.startEventRequired = false
        element.endEventRequired = false
      }
      this.model.timeline = this.model.timeline
        .concat([element])
        .sort((a, b) => a.startTime - b.startTime)
    },
    addRestlineElement (element) {
      element.startEventRequired = true
      element.endEventRequired = true

      const previousRestlineElement = this.model.restline.find(({ endTime }) => endTime === element.startTime)
      const nextRestlineElement = this.model.restline.find(({ startTime }) => startTime === element.endTime)

      if (previousRestlineElement) {
        previousRestlineElement.endEventRequired = false
        element.startEventRequired = false
      }
      if (nextRestlineElement) {
        nextRestlineElement.startEventRequired = false
        element.endEventRequired = false
      }
      this.model.restline = this.model.restline
        .concat([element])
        .sort((a, b) => a.startTime - b.startTime)
    }
  }
}
</script>

<style scoped>
</style>
