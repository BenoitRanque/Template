<template>
  <drop :class="{ drop-area-valid: dragging }">
  </drop>
</template>

<script>
export default {

}
</script>

<style scoped>
.drop-area-valid
  border-top: 2px dotted black
  border-bottom: 2px dotted black
</style>
