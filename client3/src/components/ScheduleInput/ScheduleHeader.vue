<template>
  <div class="row items-center q-py-xs q-pl-xs">
    <slot name="top-left">
      <div class="col q-mr-xs">
        <q-input hide-underline v-model="$parent.model.description"></q-input>
      </div>
    </slot>
    <span v-if="!$parent.readonly" class="col-auto">
      <q-chip
        :color="$parent.usedTime > $parent.model.baseTime
        ? 'negative' : $parent.usedTime < $parent.model.baseTime
        ? 'grey-6' : 'positive'"
        square pointing="right" small>
        {{Math.round(($parent.usedTime / $parent.model.baseTime) * 100)}}%
        <q-tooltip>Porcentaje Utilizado</q-tooltip>
      </q-chip>
    </span>
    <span v-if="!$parent.readonly" class="col-auto q-caption text-bold q-px-xs">
      <span>
        {{$parent.formatTime($parent.usedTime)}}
        <q-tooltip>Tiempo Utilizado</q-tooltip>
      </span>
      /
      <span>
        {{$parent.formatTime($parent.model.baseTime)}}
        <q-tooltip>Tiempo Total Disponible</q-tooltip>
      </span>
    </span>
    <div class="col-auto q-ml-xs" v-if="$parent.advanced">
      <q-btn flat dense icon="more_vert">
        <q-popover anchor="bottom right" self="top right">
          <q-list>
            <q-list-header class="row items-center">
              <div class="col">
                Ajustes Avanzados
              </div>
              <div class="col-auto">
                <q-tooltip>Habilitar Edición</q-tooltip>
                <q-toggle v-model="canEdit"></q-toggle>
              </div>
            </q-list-header>
            <q-item>
              <q-item-main>
                <q-field label-width="6" label="Nombre descriptivo">
                  <q-input :readonly="!canEdit" align="right" hide-underline v-model="$parent.model.description"></q-input>
                </q-field>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-field label-width="6" label="Tiempo base">
                  <time-input :readonly="!canEdit" align="right" hide-underline v-model="$parent.model.baseTime"></time-input>
                </q-field>
              </q-item-main>
            </q-item>
            <!-- <q-item>
              <q-item-main>
                <q-field label-width="6" label="Horario Preestablecido" class="text-right">
                  <q-checkbox :readonly="!canEdit" v-model="$parent.model.isPreset"></q-checkbox>
                </q-field>
              </q-item-main>
            </q-item> -->
          </q-list>
        </q-popover>
      </q-btn>
    </div>
    <slot name="top-right"></slot>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput'
export default {
  name: 'ScheduleHeader',

  components: { TimeInput },
  data () {
    return {
      canEdit: false
    }
  }
}
</script>

<style scoped>

</style>
