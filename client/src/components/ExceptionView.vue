<template>
  <pre>{{value}}</pre>
  <!-- <schedule :value="value" readonly/> -->
</template>

<script>
import Schedule from './Schedule'
export default {
  name: 'ExceptionView',
  components: { Schedule },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
  // compact READ ONLY view of exception

}
</script>

<style scoped>

</style>
