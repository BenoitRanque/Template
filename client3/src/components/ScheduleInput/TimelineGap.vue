<template>
  <div :style="style" class="timeline-gap">
    <q-btn icon="add" color="teal" outline dense class="fit bg-teal-2" @click="modal = true">
      <q-tooltip>Aggregar elemento laboral</q-tooltip>
    </q-btn>
    <q-modal v-model="modal" @show="reset">
      <q-modal-layout>
        <!-- <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            Aggregar Elemento
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow no-border" flat color="" size="lg" @click="modal = false"></q-btn>
        </q-toolbar> -->
        <q-toolbar slot="header" class="col">
          <q-toolbar-title>
            Aggregar Elemento
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <q-list>
          <q-item>
            <q-item-main>
              <q-select hide-underline placeholder="Tipo de tiempo" v-model="model.category" :options="categoryOptions"></q-select>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Hora Inicio">
                <time-input align="right" hide-underline :min="value.start" :max="model.endTime" v-model="model.startTime" />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Hora Fin">
                <time-input align="right" hide-underline :min="model.startTime" :max="value.end" v-model="model.endTime" />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Marca Entrada" class="text-right">
                <q-checkbox :disable="!categoryCanEvent(model.category)" v-model="model.startEventRequired"></q-checkbox>
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Marca Salida" class="text-right">
                <q-checkbox :disable="!categoryCanEvent(model.category)" v-model="model.endEventRequired"></q-checkbox>
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main class="text-center">
              <q-btn rounded color="primary" @click="add" :disable="!valid">Aggregar</q-btn>
            </q-item-main>
          </q-item>
        </q-list>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'TimelineGap',
  components: { TimeInput },
  props: {
    value: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      modal: false,
      model: {
        category: 'SCH_TIME_WORK',
        startTime: 0,
        startEventRequired: true,
        endTime: 0,
        endEventRequired: true
      }
    }
  },
  computed: {
    ...mapGetters('schedule', {
      categoryOptions: 'timelineCategoryOptions',
      categoryCanEvent: 'categoryCanEvent'
    }),
    style () {
      const start = Math.floor(((this.value.start < this.$parent.innerBound ? this.$parent.innerBound : this.value.start) - this.$parent.innerBound) / 5) + 1
      const end = Math.floor(((this.value.end > this.$parent.outerBound ? this.$parent.outerBound : this.value.end) - this.$parent.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: this.$parent.timelineRow
      }
    },
    valid () {
      if (!this.model.category) return false
      return true
    }
  },
  watch: {
    'model.category' (value) {
      if (this.categoryCanEvent(value)) {
        this.model.startEventRequired = true
        this.model.endEventRequired = true
      } else {
        this.model.startEventRequired = false
        this.model.endEventRequired = false
      }
    }
  },
  methods: {
    reset () {
      this.model.category = 'SCH_TIME_WORK'
      this.model.startTime = this.value.start < this.$parent.innerBound ? this.$parent.innerBound : this.value.start
      this.model.startEventRequired = true
      this.model.endTime = this.value.end > this.$parent.outerBound ? this.$parent.outerBound : this.value.end
      this.model.endEventRequired = true
    },
    add () {
      this.$emit('add', {...this.model})
      this.modal = false
    }
  }
}
</script>

<style scoped lang="stylus">
.timeline-gap
  white-space nowrap
  overflow hidden
</style>
