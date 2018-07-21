<template>
  <div>
    <div class="row">
      <div class="col">
        <q-input placeholder="Descripcion" :readonly="!edit" hide-underline v-model="model.description"></q-input>
      </div>
      <div v-if="editable" class="col-auto">
        <q-btn dense flat icon="edit" @click="edit = !edit"></q-btn>
      </div>
      <div v-if="removable" class="col-auto">
        <q-btn dense color="negative" icon="close" @click="$emit('remove')">
          <q-tooltip>
            Quitar {{model.description}}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-slide-transition>
      <div class="row" v-show="edit">
        <div class="col-6">
          <q-select v-model="model.timetype_id" :options="downtimeTimetypesOptions"></q-select>
        </div>
        <div class="col-6">
          <q-input type="number" prefix="Cubre" align="center" suffix="%" :value="model.value * 100" @input="model.value = $event > 0 ? $event / 100 : 0"></q-input>
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
    editable: {
      type: Boolean,
      default: true
    },
    removable: {
      type: Boolean,
      default: true
    },
    validation: {
      type: Object
    },
    hoursInDay: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      edit: false
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
