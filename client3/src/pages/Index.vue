<template>
  <q-page class="">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <div class="bg-grey-4 q-pa-md grid-wrapper">
      <div :style="`grid-area: label; display: grid; grid-template-columns: repeat(${gridColumns}, 1fr)`">
        <div v-for="(label, index) in gridTimeLabels" :key="`label_${index}`"
          class="q-caption text-center q-pt-xs"
          :style="`border-right: solid 0.5px black; grid-column: ${label.col} / span 24`"
        >
          {{label.time}}

          <div class="row items-end">
            <div class="col-3" style="height: 4px; border-right: solid black 1px"></div>
            <div class="col-3" style="height: 2px; border-right: solid black 1px"></div>
            <div class="col-3" style="height: 4px; border-right: solid black 1px"></div>
          </div>
        </div>
      </div>
      <div class="" :style="`grid-area: uptime; display: grid; grid-template-columns: repeat(${gridColumns}, 1fr)`">
        <q-tooltip>agregar tiempo de alta</q-tooltip>
        <div v-for="(gap, index) in gaps" :key="`gap_${index}`" :style="gap.style">

          <q-btn icon="add" color="green" outline dense class="fit"></q-btn>
        </div>
      </div>
      <div class="" :style="`grid-area: pausetime; display: grid; grid-template-columns: repeat(${gridColumns}, 1fr)`">
        <q-tooltip>agregar tiempo de pausa</q-tooltip>
        <q-btn icon="add" color="yellow" outline dense :style="`grid-column: 1 / span ${gridColumns}`"></q-btn>
      </div>
        <!-- <div class="" :style="`grid-area: pausetime; display: grid; grid-template-columns: repeat(${gridColumns}, 1fr)`">
          <q-btn icon="add" color="yellow" outline dense :style="`grid-column: 1 / span ${gridColumns}`"></q-btn>
        </div>
        <div class="" :style="`grid-area: downtime-1; display: grid; grid-template-columns: repeat(${gridColumns}, 1fr)`">
          <q-btn icon="add" color="blue" outline dense :style="`grid-column: 1 / span ${gridColumns}`"></q-btn>
        </div>
        <div class="" :style="`grid-area: downtime-1; display: grid; grid-template-columns: repeat(${gridColumns}, 1fr)`">
        </div> -->
      <!-- <div class="bg-yellow-1" style="grid-area: pausetime"></div> -->
      <div style="grid-area: downtime-1">
        <q-tooltip>tiempo de baja 1</q-tooltip>
        <q-btn v-if="schedule.downtime1 === null" class="fit" icon="add" color="blue" outline dense>
        </q-btn>
        <div v-else class="flex flex-center fit">
          <!-- todo: map value to label -->
          {{schedule.downtime1}}
        </div>
        <q-popover self="top middle" anchor="bottom middle" fit>
          <q-list link>
            <q-item v-for="(downtimeType, index) in downtimeTypes" :key="`donwtimeType_${index}`">
              <q-item-main v-close-overlay :label="downtimeType.label" @click.native="schedule.downtime1 = downtimeType.value"></q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </div>
      <div style="grid-area: downtime-2">
        <q-tooltip>tiempo de baja 2</q-tooltip>
        <q-btn v-if="schedule.downtime2 === null" class="fit" icon="add" color="blue" outline dense>
        </q-btn>
        <div v-else class="flex flex-center fit">
          <!-- todo: map value to label -->
          {{schedule.downtime2}}
        </div>
        <q-popover self="top middle" anchor="bottom middle" fit>
          <q-list link>
            <q-item v-for="(downtimeType, index) in downtimeTypes" :key="`donwtimeType_${index}`">
              <q-item-main v-close-overlay :label="downtimeType.label" @click.native="schedule.downtime2 = downtimeType.value"></q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </div>

      <!-- <div class="bg-blue-1" style="grid-area: downtime-1">
        hello
      </div> -->
      <!-- <div class="bg-blue-1" style="grid-area: downtime-2">
        hello
        <q-popover self="top middle" anchor="bottom middle" fit>
          hello
        </q-popover>
      </div> -->
    </div>
    <!-- <div class="q-pa-lg">
      <div>
        <div class="q-title">
          schedule name
        </div>
        <div class="q-headline">
          schedule description
        </div>
        <div style="display: grid; grid-template-rows: repeat(3, 3px); grid-template-columns: repeat(2, 1fr);">
          <div class="bg-blue" style="grid-row: 1; grid-column: 1"></div>
          <div class="bg-blue" style="grid-row: 1; grid-column: 2"></div>
          <div class="bg-green" style="grid-row: 2; grid-column: 1 / span 2"></div>
          <div class="bg-yellow" style="grid-row: 3; grid-column: 1 / span 2"></div>
        </div>
      </div>
    </div> -->
    <pre>{{gridColumns}}</pre>
    <pre>{{visibleAreaStart}}</pre>
    <pre>{{visibleAreaEnd}}</pre>
  </q-page>
</template>

<style lang="stylus">
.grid-wrapper
  display grid
  grid-template-rows auto repeat(3, 40px)
  grid-template-columns repeat(2, 1fr)
  grid-column-gap 0
  grid-row-gap 0
  grid-template-areas "label label" "uptime uptime" "pausetime pausetime" "downtime-1 downtime-2"
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      downtimeTypes: [
        {
          label: 'Niguno',
          value: null
        },
        {
          label: 'Dia Libre',
          value: 'TIMEOFF'
        },
        {
          label: 'Vacacion',
          value: 'VACACION'
        },
        {
          label: 'Feriado',
          value: 'FERIADO'
        }
      ],
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
  methods: {
    formatAsTime (minutes) {
      return `0${Math.floor(minutes / 60)}:0${minutes % 60}`.replace(/0([0-9][0-9])/g, '$1')
    }
  },
  computed: {
    visibleAreaStart () {
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
    visibleAreaEnd () {
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
    gridColumns () {
      return (this.visibleAreaEnd - this.visibleAreaStart) / 5
    },
    gridTimeLabels () {
      const labels = []
      const startBound = this.visibleAreaStart
      const endBound = this.visibleAreaEnd

      for (let time = Math.ceil(startBound / 60) * 60; time + 120 <= endBound; time += 120) {
        labels.push({
          col: ((time - startBound) / 5) + 1,
          time: this.formatAsTime(time + 60)
        })
      }
      return labels
    },
    gaps () {
      return [
        {
          style: {
            gridColumn: `${1} / ${((2 * 60) / 5) + 1}`
          }
        },
        {
          style: {
            gridColumn: `${((8 * 60) / 5) + 1} / ${(this.visibleAreaEnd - this.visibleAreaStart) + 1}`
          }
        }
      ]
    }
  }
}
</script>
