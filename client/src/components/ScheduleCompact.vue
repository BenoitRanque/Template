<template>
  <div class="row q-caption">
    <div class="col-6">
      <div class="">Tiempo Laboral</div>
      <div class="row" v-for="(uptime, index) in value.uptime" :key="index">
        <div class="col-4">
          {{$date.formatDate(uptime.start_time, 'HH:mm')}}
          <q-tooltip>Hora Entrada</q-tooltip>
        </div>
        <div class="col-2">
          <q-checkbox :value="uptime.start_require_event" readonly>
            <q-tooltip>Marca Entrada</q-tooltip>
          </q-checkbox>
        </div>
        <div class="col-4">
          {{$date.formatDate(uptime.end_time, 'HH:mm')}}
          <q-tooltip>Hora Salida</q-tooltip>
        </div>
        <div class="col-2">
          <q-checkbox :value="uptime.end_require_event" readonly>
            <q-tooltip>Marca Salida</q-tooltip>
          </q-checkbox>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="">Tiempo Pausa</div>
      <div class="row" v-for="(b, index) in value.break" :key="index">
        <div class="col-3">
          <q-checkbox :value="b.start_require_event" readonly>
            <q-tooltip>Marca Inicio</q-tooltip>
          </q-checkbox>
        </div>
        <div class="col-6">
          {{$date.formatDate(b.duration, 'HH:mm')}}
        </div>
        <div class="col-3">
          <q-checkbox :value="b.end_require_event" readonly>
            <q-tooltip>Marca Fin</q-tooltip>
          </q-checkbox>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="">Tiempo Libre</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleCompact',
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
