<template>
  <q-page>
    <div class="q-pa-sm row justify-center">
      <q-btn @click="refresh" icon="refresh">refresh</q-btn>
    </div>
    <hr>
    <div class="q-pa-lg bg-blue-3">
      <pre>
        {{data}}
      </pre>
    </div>
  </q-page>
</template>

<script>
import { HR_ATT_REPORT } from 'assets/apiRoutes'

export default {
  data () {
    return {
      data: null
    }
  },
  methods: {
    refresh () {
      this.$axios.get(HR_ATT_REPORT)
        .then(response => {
          this.data = response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
