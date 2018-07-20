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
        <q-select v-model="model.timetype_id" :options="breakTimetypesOptions"></q-select>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.duration" type="time" format24h></q-datetime>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.start_time" type="time" :format24h="false" ></q-datetime>
        <q-checkbox v-model="model.start_require_event">
          <q-tooltip>Debe Marcar Inicio</q-tooltip>
        </q-checkbox>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.end_time" type="time" :format24h="false" ></q-datetime>
        <q-checkbox v-model="model.end_require_event">
          <q-tooltip>Debe Marcar Fin</q-tooltip>
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
    }
  },
  watch: {
    'model': {
      deep: true,
      handler: function () {
        this.$emit('input', this.model)
      }
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
      'breakTimetypesOptions': 'breakTimetypesOptions'
    })
  }
}
</script>

<style scoped>

</style>
