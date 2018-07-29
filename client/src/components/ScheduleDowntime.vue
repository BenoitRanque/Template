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
          <q-select :readonly="readonly" v-model="model.timetype_id" :options="downtimeTimetypesOptions"></q-select>
        </div>
        <div class="col-6">
          <q-input :readonly="readonly" type="number" prefix="Cubre" align="center" suffix="%" :value="model.value * 100" @input="model.value = $event > 0 ? $event / 100 : 0"></q-input>
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
      'downtimeTimetypesOptions': 'downtimeTimetypesOptions'
    })
  }
}
</script>

<style scoped>

</style>
