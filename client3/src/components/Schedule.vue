<template>
  <div class="bg-grey-4 pa-md" :style="gridStyle">
    <schedule-label style="grid-area: label"></schedule-label>
    <schedule-uptime v-model="schedule.uptime" style="grid-area: uptime"></schedule-uptime>
    <schedule-pausetime v-model="schedule.pausetime" style="grid-area: pausetime"></schedule-pausetime>
    <schedule-downtime v-model="schedule.downtime1" style="grid-area: downtime1"></schedule-downtime>
    <schedule-downtime v-model="schedule.downtime2" style="grid-area: downtime2"></schedule-downtime>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  data () {
    return {
      schedule: {
        basetime: 8 * 60,
        uptime: [
          {
            time: 9.5 * 60,
            bound: true,
            type: null, // the type of time starting. null if nothing is starting
            startEvent: false,
            endEvent: false
          },
          {
            time: 17.5 * 60,
            bound: true,
            type: null, // the type of time starting. null if nothing is starting
            startEvent: false,
            endEvent: false
          }
        ],
        downtime1: null,
        downtime2: null,
        pausetime: [
          {

          }
        ]
      }
    }
  },
  provide: {
    '$schedule': this
  },
  computed: {
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: '2',
        gridTemplateRows: 'auto repeat(3, 30px)',
        gridTemplateAreas: `
          "label label"
          "uptime uptime"
          "pausetime pausetime"
          "downtime1 downtime2"
        `
      }
    },
    innerBound () {
      const maxBound = 8 * 60
      const minBound = 0
      if (this.schedule.uptime.length === 0) {
        return maxBound
      }

      const smallBound = this.schedule.uptime.reduce((acc, val) => val.time < acc ? val.time : acc, maxBound) // smallest bound in uptime
      const roundedSmallBound = Math.floor((smallBound - 60) / 60) * 60 // rounded to closest hour

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
      if (this.schedule.uptime.length === 0) {
        return minBound
      }

      const largeBound = this.schedule.uptime.reduce((acc, val) => val.time > acc ? val.time : acc, minBound) // largest bound in uptime
      const roundedLargeBound = Math.ceil((largeBound + 60) / 60) * 60 // rounded to closest hour

      if (roundedLargeBound > maxBound) {
        return maxBound
      } else if (roundedLargeBound < minBound) {
        return minBound
      } else {
        return roundedLargeBound
      }
    },
  },
  methods: {
    formatAsTime (minutes) {
      return `0${Math.floor(minutes / 60)}:0${minutes % 60}`.replace(/0([0-9][0-9])/g, '$1')
    }
  }
}
</script>

<style scoped>
</style>