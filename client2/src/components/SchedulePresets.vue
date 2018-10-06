<template>
  <div class="row">
    <drag v-for="(preset, index) in presets" :key="`preset_${index}`" :transfer-data="preset" class="text-center" :class="`col-${Math.floor(preset.value * 12)} bg-${preset.color}`">{{preset.label}}</drag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      presets: [
        {
          offset: 0,
          value: 1,
          label: 'Dia Libre',
          class: 'TIMEOFF',
          color: 'blue'
        },
        {
          offset: 0,
          value: 0.5,
          label: 'Medio Dia Libre',
          class: 'TIMEOFF',
          color: 'blue'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
