<template>
  <div>
    <div class="row">
      <slot name="header"></slot>
      <div class="col-auto">
        <q-toggle label="Configuracion Avanzada" left-label v-model="advanced"></q-toggle>
      </div>
      <div class="col-auto">
        <q-btn icon="close" @click="$emit('remove')" size="md" dense color="negative"></q-btn>
      </div>
    </div>
    <slot></slot>
    <slot name="advanced" v-if="advanced"></slot>
  </div>
</template>

<script>
export default {
  name: 'TimetableWrapper',
  data () {
    return {
      advanced: false
    }
  }
}
</script>

<style scoped>

</style>
