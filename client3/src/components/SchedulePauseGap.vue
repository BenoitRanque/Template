<template>
  <div :style="style" class="timeline-gap">
    <q-btn icon="add" color="amber" outline dense class="fit"></q-btn>
  </div>
</template>

<script>
export default {
  name: 'SchedulePauseGap',
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  computed: {
    style () {
      const start = (((this.value.start < this.$schedule.innerBound ? this.$schedule.innerBound : this.value.start) - this.$schedule.innerBound) / 5) + 1
      const end = (((this.value.end > this.$schedule.outerBound ? this.$schedule.outerBound : this.value.end) - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.timeline-gap
  grid-row 1
</style>
