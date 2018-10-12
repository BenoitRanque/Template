<template>
  <div :style="style" class="q-pa-xs round-borders restline-element bg-amber-4 row items-center no-wrap">
    <div class="col-auto q-caption">
      {{$schedule.formatTime(value.startTime)}}
    </div>
    <div class="col"></div>
    <div v-if="value.startEvent" class="col-auto">
      <q-tooltip>Marcación de inicio</q-tooltip>
      <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
    </div>
    <div class="col-auto q-caption">
      {{$schedule.formatTime(value.duration)}}
    </div>
    <div v-if="value.endEvent" class="col-auto">
      <q-tooltip>Marcación de fin</q-tooltip>
      <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
    </div>
    <div class="col"></div>
    <div class="col-auto q-caption">
      {{$schedule.formatTime(value.endTime)}}
    </div>
    <q-popover self="top middle" anchor="bottom middle">
      <q-list>
        <q-list-header>
          Detalles del Elemento
        </q-list-header>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Hora Inicio">
              <time-input align="right" hide-underline :min="innerBound" :max="value.endTime" v-model="value.startTime" />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Marca Entrada" class="text-right">
              <q-checkbox v-model="value.startEvent"></q-checkbox>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Hora Fin">
              <time-input align="right" hide-underline :min="value.startTime" :max="outerBound" v-model="value.endTime" />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Marca Salida" class="text-right">
              <q-checkbox v-model="value.endEvent"></q-checkbox>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Duracion">
              <time-input align="right" hide-underline :min="0" :max="value.endTime - value.startTime" v-model="value.duration" />
            </q-field>
          </q-item-main>
        </q-item>
        <q-list-header>
          Quitar Elemento
        </q-list-header>
        <q-item>
          <q-item-main class="text-center">
            <q-btn rounded outline v-close-overlay color="negative" @click="remove">Quitar</q-btn>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput.vue'
export default {
  name: 'ReslineElement',
  components: { TimeInput },
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  computed: {
    style () {
      const start = Math.floor((this.value.startTime - this.$schedule.innerBound) / 5) + 1
      const end = Math.floor((this.value.endTime - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: 4
      }
    },
    valid () {
      const ParentGroup = this.$schedule.timelineElementGroups.find(group => (group.start + 30) <= this.value.startTime && (group.end - 30) >= this.value.endTime)
      if (ParentGroup === undefined) return false
      return true
    },
    innerBound () {
      const previousGap = this.$schedule.restlineGaps.find(gap => gap.end === this.value.startTime)
      return previousGap !== undefined ? previousGap.start : this.value.startTime
    },
    outerBound () {
      const nextGap = this.$schedule.restlineGaps.find(gap => gap.start === this.value.endTime)
      return nextGap !== undefined ? nextGap.end : this.value.endTime
    }
  },
  watch: {
    valid (valid) {
      if (!valid) this.$emit('remove')
    }
  },
  methods: {
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
