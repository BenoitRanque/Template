<template>
  <drag class="q-pa-xs bg-red q-caption" :draggable="draggable" :style="style" :transfer-data="value">
    <div class="row justify-between">
      <div class="col-auto order-first">
        {{Math.floor(value.offset / 60)}}:{{value.offset % 60}}
      </div>
      <div class="col-auto order-last">
        {{Math.floor((value.offset + value.duration) / 60)}}:{{(value.offset + value.duration) % 60}}
      </div>
    </div>
    <div class="row justify-between">
      <div class="col-auto">
        <q-btn-group rounded @mouseenter.native="draggable = false" @mouseleave.native="draggable = true">
          <q-btn @click.native="value.offset -= 1" color="white" text-color="black" rounded dense size="xs" icon="keyboard_arrow_left"></q-btn>
          <q-btn v-touch-pan.horizontal="pan" color="white" text-color="black" rounded dense size="xs" icon="code"></q-btn>
          <q-btn @click.native="value.offset += 1" color="white" text-color="black" rounded dense size="xs" icon="keyboard_arrow_right"></q-btn>
        </q-btn-group>
      </div>
      <div class="col-auto">
        <q-btn color="white" text-color="black" rounded dense size="xs" icon="build"></q-btn>
      </div>
    </div>
  </drag>
</template>

<script>
export default {
  name: 'ScheduleItem',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      draggable: true
    }
  },
  computed: {
    parentWidth () {
      return this.$el ? this.$el.parentNode.offsetWidth : 0
    },
    style () {
      return {
        'overflow': 'hidden',
        'min-width': 0,
        'grid-column': `${this.value.offset / 5} / span ${this.value.duration / 5}`,
        'grid-row': this.value.index + 2
      }
    }
  },
  methods: {
    pan (info) {
      const parentWidth = this.$el.parentNode.offsetWidth

      this.value.offset += Math.round((info.delta.x / parentWidth) * (24 * 60))
    }
  }
}
</script>

<style scoped>

</style>
