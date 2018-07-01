<template>
  <div>
    <q-select v-if="standard" :options="presetOptions" :value="value.schedule_id" @input="$event => $emit('input', presets.find(p => p.schedule_id === $event))"></q-select>
  </div>
</template>

<script>
export default {
  name: 'ScheduleSelect',
  props: {
    value: {
      type: Object,
      required: true
    },
    presets: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      standard: true // whether this is a standard schedule, or a custom one
    }
  },
  computed: {
    presetOptions () {
      return this.presets.map(p => ({
        value: p.schedule_id,
        label: p.schedule_name,
        sublabel: p.description
      }))
    }
  }
}
</script>

<style scoped>

</style>
