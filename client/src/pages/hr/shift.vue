<template>
  <div>
    <!-- <div class="bg-green" v-for="(slot, index) in shift.slots" :key="index" style="height: 50px; border: 1px solid black">
      <div class="row">
        <div class="col">
        </div>
        <div class="col-auto">
          <q-btn size="lg" color="negative" dense flat round icon="cancel" :disable="shift.slots <= 1" @click="shift.slots -= 1"></q-btn>
        </div>
      </div>
    </div> -->
    <div v-for="(timetable, index) in shift.timetable" :key="index">
      <q-input v-model="timetable.name"></q-input>
      <q-input v-model="timetable.description"></q-input>
      <q-datetime type="time" class="col" v-model="shift.timetable[index].in_time"></q-datetime>
      <q-datetime type="time" class="col" v-model="shift.timetable[index].out_time"></q-datetime>
      <q-color v-model="timetable.color"></q-color>
      <q-btn dense size="xs" @click="timetable.slot -= 1" :disable="timetable.slot <= 0" icon="keyboard_arrow_up"></q-btn>
      <q-btn dense size="xs" @click="timetable.slot += 1" icon="keyboard_arrow_down"></q-btn>
    </div>
    <div class="grid-container">
      <span class="grid-col-label" v-for="n in 23" :key="n" :style="{ 'grid-column-start': n * 12, 'grid-column-end': (n * 12) + 1}">{{String(n).padStart(2, '0')}}:00</span>
      <span class="grid-row-label" v-for="n in shift.timetable.reduce((v, t) => v > t.slot ? v : t.slot, 0)" :key="n" :style="{ 'grid-row-start': n + 1 }">{{n}}</span>
      <template v-for="(timetable, index) in shift.timetable">
        <div class="grid-item q-pa-xs row items-center" :style="timetableHead(timetable)" :key="index">
          <div class="col">
            {{timetable.name}}
            <br/>
            <small>{{timetable.description}}</small>
          </div>
          <div class="col-auto">
            <q-btn-group push>
              <q-btn dense push color="primary" size="sm" @click="timetable.slot -= 1" :disable="timetable.slot <= 1" icon="keyboard_arrow_up"></q-btn>
              <q-btn dense push color="primary" size="sm" @click="timetable.slot += 1" icon="keyboard_arrow_down"></q-btn>
            </q-btn-group>
          </div>
          <!-- <pre>
            {{timetableHead(shift.timetable[index])}}
          </pre> -->
          <!-- <q-btn dense size="xs" @click="timetable.slot -= 1" :disable="timetable.slot <= 0" icon="keyboard_arrow_up"></q-btn>
          <q-btn dense size="xs" @click="timetable.slot += 1" icon="keyboard_arrow_down"></q-btn> -->
        </div>
        <div class="grid-item q-pa-xs" :style="timetableTail(shift.timetable[index])" v-if="timetable.out_time < timetable.in_time" :key="index"></div>
      </template>
    </div>
    <q-btn
      @click="shift.timetable.push({
        in_time: null,
        out_time: null,
        color: null,
        description: '',
        name: '',
        slot: 1
      })"
      icon="add"
      ouline
      color="positive"
      size="lg"
      round
    ></q-btn>
    <pre>{{shift.timetable[0] && timetableHead(shift.timetable[0])}}</pre>
    <pre>{{$data}}</pre>
  </div>
</template>

<script>
export default {
  name: 'AttShift',
  data () {
    return {
      shift: {
        name: '',
        description: '',
        timetable: [
        ]
      }
    }
  },
  methods: {
    timetableHead (timetable) {
      // console.log(timetable)
      if (!timetable.in_time || !timetable.out_time) return {}
      let inTime = new Date(timetable.in_time)
      let outTime = new Date(timetable.out_time)
      return {
        'background-color': timetable.color,
        'grid-column-start': ((inTime.getHours() * 60) + inTime.getMinutes()) / 5,
        // 'grid-column-start': new Date(timetable.in_time).getTime() / (1000 * 60),
        'grid-column-end': outTime < inTime ? 289 : ((outTime.getHours() * 60) + outTime.getMinutes()) / 5,
        // 'grid-column-end': new Date(timetable.out_time).getTime() < new Date(timetable.in_time).getTime() ? 1440 : new Date(timetable.out_time).getTime() / (1000 * 60),
        'grid-row-start': timetable.slot + 1
        // 'grid-row-end': this.item.itemRow
      }
    },
    timetableTail (timetable) {
      let outTime = new Date(timetable.out_time)
      return {
        'background-color': timetable.color,
        'grid-column-start': 1,
        'grid-column-end': ((outTime.getHours() * 60) + outTime.getMinutes()) / 5,
        'grid-row-start': timetable.slot + 2
        // 'grid-row-end': this.item.itemRow
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .grid-container
    display grid
    grid-template-columns repeat(288, 1fr)
    grid-auto-rows 1fr
    grid-template-rows 20px
    grid-gap 0 0

  .grid-col-label
    text-align center
    font-size 10px
    justify-self center

  .grid-row-label
    font-size 10px
    grid-col-start 1
    align-self center

  .grid-item
    // height 30px
    font-size 12px
    // color white

</style>
