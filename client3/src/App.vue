
<template>
  <div id="q-app">
    <router-view />
    <printing />
  </div>
</template>

<script>
import Printing from 'components/Printing/index.vue'
export default {
  name: 'App',
  components: { Printing }
}
</script>

<style>
</style>
