<template>
  <div :style="style" class="q-pa-xs round-borders timeline-element bg-green-4 row items-center no-wrap">
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
      <time-input :min="innerBound" :max="value.endTime" v-model="value.startTime" />
      <q-checkbox label="Marca Entrada" v-model="value.startEvent"></q-checkbox>
      <time-input :min="value.startTime" :max="outerBound" v-model="value.endTime" />
      <q-checkbox label="Marca Salida" v-model="value.endEvent"></q-checkbox>
      <q-btn color="negative" @click="remove">remove</q-btn>
      <pre>{{value}}</pre>
      <pre>{{innerBound}}</pre>
      <pre>{{outerBound}}</pre>
    </q-popover>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput'
export default {
  name: 'TimelineElement',
  components: { TimeInput },
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  computed: {
    style () {
      const start = Math.floor((this.value.startTime - this.$schedule.innerBound) / 5) + 1
      const end = Math.floor((this.value.endTime - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: 3
      }
    },
    innerBound () {
      const previousGap = this.$schedule.timelineGaps.find(gap => gap.end === this.value.startTime)
      return previousGap !== undefined ? previousGap.start : this.value.startTime
    },
    outerBound () {
      const nextGap = this.$schedule.timelineGaps.find(gap => gap.start === this.value.endTime)
      return nextGap !== undefined ? nextGap.end : this.value.endTime
    }
  },
  methods: {
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped lang="stylus">
.timeline-element
  white-space nowrap
  overflow hidden
</style>
