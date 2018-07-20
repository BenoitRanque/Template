<template>
  <div>
    <div class="row">
      <div class="col">
        <q-input placeholder="Descripcion" hide-underline v-model="model.description"></q-input>
      </div>
      <div class="col-auto">
        <q-btn dense color="negative" icon="close" @click="$emit('remove')"></q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-select v-model="model.timetype_id" :options="uptimeTimetypesOptions"></q-select>
      </div>
      <div class="col-6">
        <q-input align="center" type="number" prefix="Cubre" suffix="%" :value="model.value * 100" @input="model.value = $event > 0 ? $event / 100 : 0"></q-input>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.start_time" type="time" :format24h="false" ></q-datetime>
        <q-checkbox v-model="model.start_require_event">
          <q-tooltip>Debe Marcar Entrada</q-tooltip>
        </q-checkbox>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.end_time" type="time" :format24h="false" ></q-datetime>
        <q-checkbox v-model="model.end_require_event">
          <q-tooltip>Debe Marcar Salida</q-tooltip>
        </q-checkbox>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ScheduleUptime',
  props: {
    value: {
      type: Object,
      required: true
    },
    validation: {
      type: Object
    },
    hoursInDay: {
      type: Number,
      default: 8
    }
  },
  watch: {
    'model': {
      deep: true,
      handler: function () {
        this.$emit('input', this.model)
      }
    },
    'model.start_time': function () {
      this.setModelValue()
    },
    'model.end_time': function () {
      this.setModelValue()
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    ...mapGetters('hr', {
      'uptimeTimetypesOptions': 'uptimeTimetypesOptions'
    })
  },
  methods: {
    setModelValue () {
      if (!this.model.start_time || !this.model.end_time) return
      const diff = this.$date.getDateDiff(this.model.end_time, this.model.start_time, 'minutes')
      if (diff < 0) return
      this.model.value = diff / 60 / this.hoursInDay
    }
  }
}
</script>

<style scoped>

</style>
