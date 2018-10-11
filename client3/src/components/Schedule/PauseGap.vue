<template>
  <div :style="style" class="pause-gap">
    <q-btn icon="add" color="amber" outline dense class="fit"></q-btn>
  </div>
</template>

<script>
export default {
  name: 'PauseGap',
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  computed: {
    style () {
      const start = Math.floor(((this.value.start < this.$schedule.innerBound ? this.$schedule.innerBound : this.value.start) - this.$schedule.innerBound) / 5) + 1
      const end = Math.floor(((this.value.end > this.$schedule.outerBound ? this.$schedule.outerBound : this.value.end) - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: 4
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.pause-gap
  white-space nowrap
  overflow hidden
</style>
