<template>
  <div>
    <div class="row" v-if="value">
      <div
        class="col text-center q-pa-sm"
        v-for="(uptime, index) in value.uptime"
        :key="`uptime_${index}`"
        :style="{ 'background': timetypeById(uptime.timetype_id).color, width: `${uptime.value * 100}%` }"
      >
        {{timetypeById(uptime.timetype_id).code}}
        <br />
        <span class="q-caption">
          {{$date.formatDate(uptime.start_time, 'HH:mm')}}
          -
          {{$date.formatDate(uptime.end_time, 'HH:mm')}}
        </span>
        <q-tooltip>
          {{uptime.description}}
        </q-tooltip>
      </div>
      <div
        class="col text-center q-pa-sm"
        v-for="(downtime, index) in value.downtime"
        :key="`downtime_${index}`"
        :style="{ 'background': timetypeById(downtime.timetype_id).color, width: `${downtime.value * 100}%` }"
      >
        {{timetypeById(downtime.timetype_id).code}}
        <q-tooltip>
          {{downtime.description}}
        </q-tooltip>
      </div>
      <div
        class="col-auto text-center q-pa-sm"
        v-for="(breaktime, index) in value.breaktime"
        :key="`breaktime_${index}`"
        :style="{ 'background': timetypeById(breaktime.timetype_id).color }"
      >
        {{timetypeById(breaktime.timetype_id).code}}
        <q-tooltip>
          {{breaktime.description}}
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ScheduleView',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('hr', {
      timetypeById: 'timetypeById'
    })
  }
  // compact READ ONLY view of schedule

}
</script>

<style scoped>

</style>
