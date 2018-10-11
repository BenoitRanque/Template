<template>
  <div :style="style" class="timeline-gap">
    <q-btn icon="add" color="green" outline dense class="fit">
      <q-popover anchor="bottom middle" self="top middle">
        <q-list>
          <q-item>
            <q-item-main>
              <time-input></time-input>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <time-input></time-input>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput.vue'
export default {
  name: 'TimelineGap',
  components: { TimeInput },
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  data () {
    return {
      model: {
        startTime: 0,
        startEvent: true,
        endTime: 0,
        endEvent: true
      }
    }
  },
  computed: {
    style () {
      const start = Math.floor(((this.value.start < this.$schedule.innerBound ? this.$schedule.innerBound : this.value.start) - this.$schedule.innerBound) / 5) + 1
      const end = Math.floor(((this.value.end > this.$schedule.outerBound ? this.$schedule.outerBound : this.value.end) - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: 3
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.timeline-gap
  white-space nowrap
  overflow hidden
</style>
