<template>
  <div class="bg-yellow-3 col full-height" style="display: grid; grid-template-columns: repeat(96, 1fr); grid-auto-columns: 1fr">
    <drop @drop="$event => $q.notify(`${$event} dropped on area 1`)" style="grid-row: 1; grid-column: 1 / span 48">
      <template v-if="canDrop(transferData)" slot="default" slot-scope="{ transferData }">
        <div class="drop-area-valid full-height"></div>
      </template>
    </drop>
    <drop @drop="$event => $q.notify(`${$event} dropped on area 2`)" style="grid-row: 1; grid-column: 49 / span 48">
      <template v-if="canDrop(transferData)" slot="default" slot-scope="{ transferData }">
        <div class="drop-area-valid full-height"></div>
      </template>
    </drop>
    <drag
      v-for="(uptime, index) in schedule.uptime" :key="`uptime_${index}`"
      class="bg-red" :transfer-data="uptime"
      :style="`grid-row: 1; grid-column: ${Math.floor(uptime.offset / 5)} / span ${Math.floor(uptime.duration / 5)}`"
    >{{uptime.class}}</drag>
    <drag
      v-for="(downtime, index) in schedule.downtime" :key="`downtime_${index}`"
      class="bg-blue" :transfer-data="downtime"
      :style="`grid-row: 1; grid-column: ${Math.floor(downtime.offset / 5)} / span ${Math.floor(downtime.duration / 5)}`"
    >{{downtime.class}}</drag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      over: false,
      schedule: {
        base: 8 / 60,
        uptime: [
          {
            class: 'EXTRA',
            start: 8.5 * 60,
            duration: 60,
            offset: 0,
            span: 0,
            value: 0,
            begin: 0,
            start: 0,
            end: 0,
            finish: 0,
            size: 1 / 8
          },
          {
            class: 'WORK',
            offset: 9.5 * 60,
            duration: 4 * 60
          },
          {
            class: 'EXTRA',
            offset: 13.5 * 60,
            duration: 60
          }
        ],
        downtime: [
          {
            class: 'TIMEOFF',
            duration: 4 * 60,
            offset: 14.5 * 60
          }
        ],
        pause: [
          {
            class: 'LUNCH',
            label: 'Almuerzo',
            duration: 30,
            start: 11.5 * 60,
            end: 14.5 * 60
          }
        ]
      }
    }
  },
  computed: {
    columns () {
      // (BASE_TIME / 5) + (TOTAL_EXTRA_TIME / 5) ??
      return 96
    },
    drops () {
      return [
        {
          from: 0,
          to: 1
        }
      ]
    },
    gaps () {
      return [
        { size: 1, offset: 0 }
      ]
    }
  },
  methods: {
    canDrop (data) {
      return !!data
    }
  }
}
</script>

<style scoped lang="stylus">
.drop-area-valid
  border-top: 2px dotted black
  border-bottom: 2px dotted black

</style>
