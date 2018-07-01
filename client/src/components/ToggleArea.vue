<template>
  <div>
    <slot name="header" :state="state"></slot>
    <q-slide-transition>
      <slot v-if="state.show"></slot>
    </q-slide-transition>
  </div>
</template>

<script>
export default {
  name: 'ToggleArea',
  data () {
    return {
      state: {
        show: false
      }
    }
  }
}
</script>

<style scoped>

</style>
