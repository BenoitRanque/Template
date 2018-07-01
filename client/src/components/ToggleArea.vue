<template>
  <div>
    <slot name="header" :state="state"></slot>
    <slot v-show="state.show"></slot>
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
