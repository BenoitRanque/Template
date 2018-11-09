<template>
  <div :style="style" class="q-pa-xs round-borders timeline-element row items-center no-wrap">
    <div class="col-auto q-caption">
      {{formatTime(value.startTime)}}
    </div>
    <div v-if="value.startEventRequired" class="col-auto">
      <q-icon style="font-size: 22px" name="fingerprint"></q-icon>
    </div>
    <div class="col q-caption text-weight-bold text-center overflow-hidden q-px-xs">{{categoryDescription(value.category)}}</div>
    <div v-if="value.endEventRequired" class="col-auto">
      <q-icon style="font-size: 22px" name="fingerprint"></q-icon>
    </div>
    <div class="col-auto q-caption">
      {{formatTime(value.endTime)}}
    </div>
    <q-tooltip>{{tooltip}}</q-tooltip>
    <q-popover self="top middle" anchor="bottom middle" :disable="$parent.readonly">
      <q-list>
        <!-- <q-list-header>
          Tipo de Elemento
        </q-list-header>
        <q-item>
          <q-item-main>
            {{value.category}}
          </q-item-main>
        </q-item> -->
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
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="Hora Fin">
              <time-input align="right" hide-underline :min="value.startTime" :max="outerBound" v-model="value.endTime" />
            </q-field>
          </q-item-main>
        </q-item>
        <q-item v-if="categoryCanEvent(this.value.category)">
          <q-item-main>
            <q-field label-width="6" label="Marca Entrada" class="text-right">
              <q-checkbox :disable="!$parent.advanced" v-model="value.startEventRequired"></q-checkbox>
            </q-field>
          </q-item-main>
        </q-item>
        <q-item v-if="categoryCanEvent(this.value.category)">
          <q-item-main>
            <q-field label-width="6" label="Marca Salida" class="text-right">
              <q-checkbox :disable="!$parent.advanced" v-model="value.endEventRequired"></q-checkbox>
            </q-field>
          </q-item-main>
        </q-item>
        <!-- <q-list-header>
          Quitar Elemento
        </q-list-header> -->
        <q-item-separator></q-item-separator>
        <q-item>
          <q-item-side>
            <q-btn rounded outline v-close-overlay color="negative" @click="remove">Quitar</q-btn>
          </q-item-side>
          <q-item-main></q-item-main>
          <q-item-side>
            <q-btn rounded flat v-close-overlay color="primary">Ok</q-btn>
          </q-item-side>
        </q-item>
      </q-list>
    </q-popover>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput'
import { mapGetters } from 'vuex'
export default {
  name: 'TimelineElement',
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
        gridRow: this.$parent.timelineRow,
        // borderLeft: this.value.startEvent ? 'solid black 1px' : 'solid white 1px',
        // borderRight: this.value.endEvent ? 'solid black 1px' : 'solid white 1px',
        color: this.categoryForegroundColor(this.value.category),
        backgroundColor: this.categoryBackgroundColor(this.value.category)
      }
    },
    innerBound () {
      const previousGap = this.$parent.timelineGaps.find(gap => gap.end === this.value.startTime)
      return previousGap !== undefined ? previousGap.start : this.value.startTime
    },
    outerBound () {
      const nextGap = this.$parent.timelineGaps.find(gap => gap.start === this.value.endTime)
      return nextGap !== undefined ? nextGap.end : this.value.endTime
    },
    tooltip () {
      return `${this.categoryDescription(this.value.category)}: ${this.formatTime(this.value.endTime - this.value.startTime)} de ${this.formatTime(this.value.startTime)} a ${this.formatTime(this.value.endTime)}`
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
.timeline-element
  white-space nowrap
  overflow hidden
</style>
