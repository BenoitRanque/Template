<template>
  <div v-if="value === null" class="bg-blue-2 restline-gap round-borders">
    <q-btn class="fit" icon="add" color="blue" outline dense></q-btn>
  </div>
  <div v-else class="round-borders restline-element bg-blue-4 row items-center no-wrap">

  </div>
</template>

<script>
export default {
  name: 'OfflineElement',
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {
      model: {
        category: null
      }
    }
  },
  watch: {
    value () {
      this.reset()
    }
  },
  methods: {
    reset () {
      // reset model to default values here
    },
    add () {
      this.$emit('add', {...this.model})
    },
    remove () {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Quitar elemento?',
        ok: true,
        cancel: true
      })
        .then(() => this.$emit('remove'))
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="stylus">
.restline-element
  white-space nowrap
  overflow hidden
</style>
