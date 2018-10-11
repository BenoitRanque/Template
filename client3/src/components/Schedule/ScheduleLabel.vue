<template>
  <div
    class="q-caption text-center q-pt-xs schedule-label"
    :style="`grid-row: 2; grid-column: ${value.col} / span 24`"
  >
    {{value.time}}

    <div class="row items-end">
      <div class="col-3 separator"></div>
      <div class="col-3 separator"></div>
      <div class="col-3 separator"></div>
      <div class="col-3 separator"></div>
    </div>
  </div>
  <!-- <div :style="gridStyle"> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: 'ScheduleLabel',
  props: {
    value: {
      type: Object,
      required: true
    }
  // },
  // inject: ['$schedule'],
  // computed: {
  //   gridStyle () {
  //     return {
  //       display: 'grid',
  //       gridTemplateColumns: `repeat(${this.$schedule.gridColumns}, 1fr)`
  //     }
  //   },
  //   gridLabels () {
  //     const labels = []
  //     const innerBound = this.$schedule.innerBound
  //     const outerBound = this.$schedule.outerBound

  //     for (let time = Math.ceil(innerBound / 60) * 60; time + 120 <= outerBound; time += 120) {
  //       labels.push({
  //         col: ((time - innerBound) / 5) + 1,
  //         time: this.$schedule.formatTime(time + 60)
  //       })
  //     }
  //     return labels
  //   }
  }
}
</script>

<style scoped lang="stylus">
.schedule-label
  border-right solid 0.5px black
  border-left solid 0.5px black

.separator
  &:nth-child(1)
    height 3px
    border-right solid black 1px
  &:nth-child(2)
    height 3px
    border-right solid black 1px
    border-left solid black 1px
  &:nth-child(3)
    height 3px
    border-right solid black 1px
    border-left solid black 1px
  &:nth-child(4)
    height 3px
    border-left solid black 1px
</style>
