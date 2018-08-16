<template>
  <q-td class="q-caption" style="padding: 0 2px;">
    <div class="full-height full-width row">
      <div v-if="hasEvents" class="full-height column" :class="leftClass">
        <div v-for="(e, index) in value.summary.events" :key="index" :class="{ 'bg-positive': !e.missing && !e.late, 'bg-negative': e.late, 'bg-tertiary': e.missing, 'bg-warning': e.early, }" class="col row items-center justify-center text-white text-center">
          <div class="col q-pa-xs">
            {{$date.formatDate(e.time, 'HH:mm')}}
            <q-tooltip>
              {{e.label}}
            </q-tooltip>
          </div>
        </div>
      </div>
      <div v-if="hasAbsence || hasDowntime" class="full-height column" :class="rightClass">
        <div v-for="(d, index) in value.summary.downtime" :key="index" :style="{ background: d.color }" class="col row items-center justify-center text-white text-center">
          <div class="col q-pa-xs">
            {{d.code}}
            <q-tooltip>
              {{d.label}}
            </q-tooltip>
          </div>
        </div>
        <div v-if="hasAbsence" class="col row items-center justify-center text-white text-center bg-negative">
          <div class="col q-pa-xs">
            {{value.summary.absent.code}}
            <q-tooltip>
              {{value.summary.absent.label}}
            </q-tooltip>
          </div>
        </div>
      </div>
    </div>
    <q-popover anchor="bottom middle" self="top middle" class="q-pa-md">
      <div class="q-title">Fecha: {{$date.formatDate(value.date, 'DD/MM/YYYY')}}</div>
      <pre>{{value}}</pre>
    </q-popover>
  </q-td>
</template>

<script>
export default {
  name: 'AttReportCell',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasAbsence () {
      return this.value.summary && this.value.summary.absent
    },
    hasDowntime () {
      return this.value.summary && this.value.summary.downtime && this.value.summary.downtime.length
    },
    hasEvents () {
      return this.value.summary && this.value.summary.events && this.value.summary.events.length
    },
    leftClass () {
      return this.hasAbsence || this.hasDowntime ? 'col-8' : 'col-12'
    },
    rightClass () {
      return this.hasEvents ? 'col-4' : 'col-12'
    }
  }
}
</script>

<style scoped>

</style>
