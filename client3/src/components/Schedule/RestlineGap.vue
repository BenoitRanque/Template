<template>
  <div :style="style" class="restline-gap">
    <q-btn icon="add" color="amber" outline dense class="fit bg-amber-2" @click="modal = true">
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
                <time-input align="right" hide-underline :min="value.start" :max="model.endTime - 30" v-model="model.startTime" />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Marca Entrada" class="text-right">
                <q-checkbox v-model="model.startRequireEvent"></q-checkbox>
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Hora Fin">
                <time-input align="right" hide-underline :min="model.startTime + 30" :max="value.end" v-model="model.endTime" />
              </q-field>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-field label-width="6" label="Marca Salida" class="text-right">
                <q-checkbox v-model="model.endRequireEvent"></q-checkbox>
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
import { mapGetters } from 'vuex'
export default {
  name: 'RestlineGap',
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
        category: 'SCH_REST_LUNCH',
        startTime: 11 * 60,
        startRequireEvent: true,
        endTime: 14.5 * 60,
        endRequireEvent: true,
        duration: 30
      }
    }
  },
  computed: {
    ...mapGetters('schedule', {
      categoryOptions: 'restlineCategoryOptions'
    }),
    style () {
      const start = Math.floor(((this.value.start < this.$parent.innerBound ? this.$parent.innerBound : this.value.start) - this.$parent.innerBound) / 5) + 1
      const end = Math.floor(((this.value.end > this.$parent.outerBound ? this.$parent.outerBound : this.value.end) - this.$parent.innerBound) / 5) + 1
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: this.$parent.restlineRow
      }
    },
    valid () {
      if (!this.model.category) return false
      if ((this.model.endTime - this.model.startTime) < 30) return false
      if (this.model.duration < 5) return false
      return true
    }
  },
  methods: {
    reset () {
      this.model.category = 'SCH_REST_LUNCH'
      this.model.startRequireEvent = true
      this.model.endRequireEvent = true
      this.model.duration = 30
      if (this.value.start <= 11 * 60 && this.value.end >= 14.5 * 60) {
        this.model.startTime = 11 * 60
        this.model.endTime = 14.5 * 60
      } else {
        this.model.startTime = this.value.start < this.$parent.innerBound ? this.$parent.innerBound : this.value.start
        this.model.endTime = this.value.end > this.$parent.outerBound ? this.$parent.outerBound : this.value.end
      }
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
