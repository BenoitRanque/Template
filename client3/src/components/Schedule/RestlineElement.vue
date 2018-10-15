<template>
  <div :style="style" class="q-pa-xs round-borders restline-element row items-center no-wrap">
    <div class="col-auto q-caption">
      {{formatTime(value.startTime)}}
    </div>
    <div class="col"></div>
    <div v-if="value.startEvent" class="col-auto">
      <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
    </div>
    <div class="col-auto q-caption">
      {{formatTime(value.duration)}}
    </div>
    <div v-if="value.endEvent" class="col-auto">
      <q-icon style="font-size: 24px" name="fingerprint"></q-icon>
    </div>
    <div class="col"></div>
    <div class="col-auto q-caption">
      {{formatTime(value.endTime)}}
    </div>
    <q-tooltip>{{tooltip}}</q-tooltip>
    <q-popover self="top middle" anchor="bottom middle">
      <q-list>
        <q-list-header>
          {{categoryDescription(value.category)}}
        </q-list-header>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Hora Inicio">
              <time-input align="right" hide-underline :min="innerBound" :max="value.endTime" v-model="value.startTime" />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item v-if="categoryCanEvent(value.category)">
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
        <q-item v-if="categoryCanEvent(value.category)">
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
        <!-- <q-list-header>
          Quitar Elemento
        </q-list-header> -->
        <q-item-separator></q-item-separator>
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
import { mapGetters } from 'vuex'
export default {
  name: 'ReslineElement',
  components: { TimeInput },
  props: {
    value: {
      required: true,
      type: Object
    }
  },

  computed: {
    ...mapGetters('schedule', [
      'categoryCanEvent',
      'categoryBackgroundColor',
      'categoryForegroundColor',
      'categoryDescription',
      'formatTime'
    ]),
    style () {
      const start = Math.floor((this.value.startTime - this.$parent.innerBound) / 5) + 1
      const end = Math.floor((this.value.endTime - this.$parent.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: this.$parent.restlineRow,
        color: this.categoryForegroundColor(this.value.category),
        backgroundColor: this.categoryBackgroundColor(this.value.category)
      }
    },
    valid () {
      const ParentGroup = this.$parent.timelineRestGroups.find(group => (group.start + 30) <= this.value.startTime && (group.end - 30) >= this.value.endTime)
      if (ParentGroup === undefined) return false
      return true
    },
    innerBound () {
      const previousGap = this.$parent.restlineGaps.find(gap => gap.end === this.value.startTime)
      return previousGap !== undefined ? previousGap.start : this.value.startTime
    },
    outerBound () {
      const nextGap = this.$parent.restlineGaps.find(gap => gap.start === this.value.endTime)
      return nextGap !== undefined ? nextGap.end : this.value.endTime
    },
    tooltip () {
      return `${this.categoryDescription(this.value.category)}: ${this.formatTime(this.value.duration)} entre ${this.formatTime(this.value.startTime)} y ${this.formatTime(this.value.endTime)}`
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
