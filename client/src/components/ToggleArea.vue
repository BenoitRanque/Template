<template>
  <div>
    <div class="row">
      <slot class="col" name="header"></slot>
      <div class="col-auto q-pa-sm">
        <q-toggle v-model="state" left-label="Avanzado"></q-toggle>
      </div>
      <slot class="col-auto" name="header-after"></slot>
    </div>
    <slot v-show="state"></slot>
  </div>
</template>

<script>
export default {
  name: 'ToggleArea',
  data () {
    return {
      state: false
    }
  }
}
</script>

<style scoped>

</style>
