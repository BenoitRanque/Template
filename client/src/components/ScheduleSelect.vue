<template>
  <div class="row">
    <div class="col">
      <q-select
        :options="presetOptions"
        :value="value ? value.schedule_id : null"
        @input="$event => $emit('input', $event ? presets.find(p => p.schedule_id === $event) : null)"
        ></q-select>
    </div>
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
  }
}
</script>

<style scoped>

</style>
