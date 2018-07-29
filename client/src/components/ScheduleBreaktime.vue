<template>
  <div>
    <div class="row">
      <div class="col">
        <q-input placeholder="Descripcion" :readonly="readonly || !expanded" hide-underline v-model="model.description"></q-input>
      </div>
      <div class="col-auto">
        <q-btn
          v-if="expandable"
          dense
          flat
          @click="expanded = !expanded"
          :icon="`keyboard_arrow_${expanded ? 'up' : 'down'}`"
        >
        </q-btn>
      </div>
      <div v-if="!readonly" class="col-auto">
        <q-btn dense color="negative" icon="close" @click="$emit('remove')">
          <q-tooltip>
            Quitar {{model.description}}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-slide-transition>
      <div class="row" v-show="expanded">
        <div class="col-6">
          <q-select :readonly="readonly" v-model="model.timetype_id" :options="breaktimeTimetypesOptions"></q-select>
        </div>
        <div class="col-6">
          <q-datetime :readonly="readonly" v-model="model.duration" type="time" format24h></q-datetime>
        </div>
        <div class="col-6">
          <q-datetime :readonly="readonly" v-model="model.start_time" type="time" :format24h="false" ></q-datetime>
          <q-checkbox :readonly="readonly" v-model="model.start_require_event">
            <q-tooltip>Debe Marcar Inicio</q-tooltip>
          </q-checkbox>
        </div>
        <div class="col-6">
          <q-datetime :readonly="readonly" v-model="model.end_time" type="time" :format24h="false" ></q-datetime>
          <q-checkbox :readonly="readonly" v-model="model.end_require_event">
            <q-tooltip>Debe Marcar Fin</q-tooltip>
          </q-checkbox>
        </div>
      </div>
    </q-slide-transition>
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
    hoursInDay: {
      type: Number,
      default: 8
    },
    expandable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expanded: false
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
      'breaktimeTimetypesOptions': 'breaktimeTimetypesOptions'
    })
  }
}
</script>

<style scoped>

</style>
