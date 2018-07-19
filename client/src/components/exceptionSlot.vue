<template>
  <div>
    <q-modal v-model="modal">
      hello
      <pre>{{value}}</pre>
    </q-modal>
  </div>
</template>

<script>
export default {
  name: 'ExceptionSlot',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modal: true
    }
  }
}
</script>

<style scoped>

</style>
