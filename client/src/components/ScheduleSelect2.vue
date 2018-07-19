<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'ScheduleSelect',
  props: {
    value: {
      required: true,
      type: [Object, null]
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
    }
  }
}
</script>

<style scoped>

</style>
