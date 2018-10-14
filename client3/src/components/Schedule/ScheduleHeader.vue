<template>
  <div class="row items-center q-py-xs q-pl-xs">
    <div class="col">
      <q-input hide-underline v-model="$schedule.model.name"></q-input>
    </div>
    <div class="col-auto q-caption text-bold q-px-xs" :class="{
      'text-positive': $schedule.usedStandardTime === $schedule.availableStandardTime,
      'text-negative': $schedule.usedStandardTime > $schedule.availableStandardTime
    }">
      {{$schedule.formatTime($schedule.usedStandardTime)}}
      /
      {{$schedule.formatTime($schedule.availableStandardTime)}}
      <q-tooltip>Uso del tiempo</q-tooltip>
    </div>
    <div class="col-auto">
      <q-btn flat dense color="primary" icon="more_vert">
        <q-popover anchor="bottom right" self="top right">
          <q-list>
            <q-list-header class="row items-center">
              <div class="col">
                Ajustes Avanzados
              </div>
              <div class="col-auto">
                <q-tooltip>Editar</q-tooltip>
                <q-toggle v-model="canEdit"></q-toggle>
              </div>
            </q-list-header>
            <q-item>
              <q-item-main>
                <q-field label-width="8" label="tiempo base">
                  <time-input :readonly="!canEdit" align="right" label="hello" hide-underline v-model="$schedule.model.baseTime"></time-input>
                </q-field>
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                <q-field label-width="8" label="horario standar" class="text-right">
                  <q-checkbox :readonly="!canEdit" v-model="$schedule.model.standard"></q-checkbox>
                </q-field>
              </q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </div>
  </div>
</template>

<script>
import TimeInput from 'components/TimeInput'
export default {
  name: 'ScheduleHeader',
  inject: ['$schedule'],
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
