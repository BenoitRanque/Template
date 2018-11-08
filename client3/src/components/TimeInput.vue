<template>
  <q-input v-bind="$attrs" ref="input" @focus="$refs.input.select()" v-model="model" @input="debounce" @blur="update" inputmode="numeric"></q-input>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      timeout: null,
      model: this.formatTime(this.value)
    }
  },
  computed: {
    match () {
      return this.model.match(/(\d?\d?):?([0-5]\d)/)
    },
    valid () {
      if (!this.match) return false
      const value = this.parseTime(this.match)

      if (value < 0) return false

      if (this.min !== null && value < this.min) return false
      if (this.max !== null && value > this.max) return false

      return true
    }
  },
  watch: {
    value (value) {
      this.model = this.formatTime(value)
    }
  },
  methods: {
    debounce () {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(this.update, 1500)
    },
    update () {
      if (this.valid) {
        this.$emit('input', this.parseTime(this.match))
      } else {
        this.model = this.formatTime(this.value)
      }
    },
    formatTime (minutes) {
      return `0${Math.floor(minutes / 60)}:0${minutes % 60}`.replace(/0(\d\d)/g, '$1')
    },
    parseTime ([ , hours, minutes ]) {
      return hours ? (Number(hours) * 60) + Number(minutes) : Number(minutes)
    }
  }
}
</script>

<style scoped>

</style>
