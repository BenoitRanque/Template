<template>
  <div :style="style" class="restline-gap">
    <q-btn icon="add" color="amber" outline dense class="fit" @click="modal = true">
      <q-tooltip>Aggregar elemento de descanso</q-tooltip>
    </q-btn>
    <q-modal v-model="modal" @show="reset">
      <q-modal-layout>
        <!-- <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            Aggregar Elemento
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow no-border" flat color="" size="lg" @click="modal = false"></q-btn>
        </q-toolbar> -->
        <q-toolbar slot="header" glossy class="col">
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
              <q-field label-width="6" label="Marca Entrada" class="text-right">
                <q-checkbox v-model="model.startEvent"></q-checkbox>
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
              <q-field label-width="6" label="Marca Salida" class="text-right">
                <q-checkbox v-model="model.endEvent"></q-checkbox>
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Duracion">
                <time-input align="right" hide-underline v-model="model.duration" :min="0" :max="model.endTime - model.startTime"></time-input>
              </q-field>
            </q-item-main>
          </q-item>
        </q-list>
        <q-toolbar slot="footer" glossy class="justify-center">
          <q-btn rounded glossy color="positive" @click="add" :disable="!valid">Aggregar</q-btn>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput.vue'
export default {
  name: 'RestlineGap',
  components: { TimeInput },
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  inject: ['$schedule'],
  data () {
    return {
      modal: false,
      model: {
        category: null,
        startTime: 0,
        startEvent: true,
        endTime: 0,
        endEvent: true,
        duration: 0
      },
      categoryOptions: [
        {
          value: 'SCH_TIME_LUNCH',
          label: 'Almuerzo'
        }
      ]
    }
  },
  computed: {
    style () {
      const start = Math.floor(((this.value.start < this.$schedule.innerBound ? this.$schedule.innerBound : this.value.start) - this.$schedule.innerBound) / 5) + 1
      const end = Math.floor(((this.value.end > this.$schedule.outerBound ? this.$schedule.outerBound : this.value.end) - this.$schedule.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: 4
      }
    },
    valid () {
      if (!this.model.category) return false
      return true
    }
  },
  methods: {
    reset () {
      this.model.category = null
      this.model.startTime = this.value.start < this.$schedule.innerBound ? this.$schedule.innerBound : this.value.start
      this.model.startEvent = true
      this.model.endTime = this.value.end > this.$schedule.outerBound ? this.$schedule.outerBound : this.value.end
      this.model.endEvent = true
    },
    add () {
      this.$emit('add', {...this.model})
      this.modal = false
    }
  }
}
</script>

<style scoped lang="stylus">
.restline-gap
  white-space nowrap
  overflow hidden
</style>
