<template>
  <q-td class="row">
    <div class="col-8 column">
      <div v-for="(event, index) in events"
        :style="{ 'background': event.type_id && attTypes && attTypes.length > 0 ? attTypes.find(t => t.type_id === event.type_id).color : null }" :key="index"
        class="col">
        <div class="q-pa-xs">

          {{$date.formatDate(event.time, 'HH:mm')}}
        </div>
      </div>
    </div>
    <div class="col-4 full-height">
      <q-icon name="settings" size="xs"></q-icon>
    </div>
  </q-td>
</template>

<script>
export default {
  name: 'AttReportCell',
  props: {
    attTypes: {
      type: Array,
      required: true
    },
    attendance: {
      type: Object,
      required: true
    }
  },
  computed: {
    events () {
      let e = []
      if (!this.attendance) return e

      return this.attendance.timetable.reduce((acc, val) => {
        acc.push({
          time: val.start_event,
          reference: val.start_time,
          type_id: val.type_id
        })
        acc.push({
          time: val.end_event,
          reference: val.end_time,
          type_id: val.type_id
        })
        return acc
      }, []).sort((a, b) => this.$date.getDateDiff(new Date(a.time), new Date(b.time), 'minutes'))
    }
  }
}
</script>

<style scoped>

</style>
