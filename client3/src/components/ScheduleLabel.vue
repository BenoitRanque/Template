<template>
  <div :style="gridStyle">
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
</template>

<script>
export default {
  name: 'ScheduleLabel',
  inject: ['$schedule'],
  computed: {
    gridStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`
      }
    },
    gridLabels () {
      const labels = []
      const innerBound = this.$schedule.innerBound
      const outerBound = this.$schedule.outerBound

      for (let time = Math.ceil(innerBound / 60) * 60; time + 120 <= outerBound; time += 120) {
        labels.push({
          col: ((time - innerBound) / 5) + 1,
          time: this.$schedule.formatAsTime(time + 60)
        })
      }
      return labels
    },
  }
}
</script>

<style scoped>
</style>