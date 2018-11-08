<template>
  <q-page class="">
    <div>
      <!-- <drop @drop="remove" class="bg-yellow" style="display: grid; grid-template-columns: repeat(288, 1fr); grid-auto-rows: 1fr; grid-template-rows: none">
        <drag v-for="(preset, index) in presets" :key="index" :transfer-data="preset" class="bg-purple" :style="`grid-column: ${preset.offset / 5} / span ${preset.duration / 5}; grid-row: ${index + 1};`">d</drag>
      </drop> -->

      <!-- <div style="display: grid; grid-auto-columns: 1fr; justify-items: center">
        <div class="q-caption" v-for="n in 12" :key="`timelabel_${n}`" :style="`grid-column: ${n} / span 1; grid-row: 1; justify-self: center;`">{{(n * 2) - 1}}:00</div>
      </div> -->
      <!-- <div class="bg-blue" style="display: grid; grid-template-columns: repeat(288, 1fr); grid-template-rows: auto; grid-auto-rows: 1fr; min-width: 0; min-height: 0;"> -->
        <!-- <div class="q-caption" v-for="n in 12" :key="`timelabel_${n}`" :style="`grid-column: ${(n * 24) - 23} / span 24 ; grid-row: 1; justify-self: center;`">{{(n * 2) - 1}}:00</div>
        <drop v-for="row in 6" :key="`row_${row}`" @drop="$event => drop($event, row - 1)" class="bg-green-3" :style="`min-height: 30px; grid-column: 1 / span 288; grid-row: ${row + 1};`"></drop>
        <schedule-item v-for="(item, index) in items" :key="`item_${index}`" :value="item"></schedule-item>
        <drop @drop="$event => drop($event, 6)" class="" :style="`min-height: 30px; grid-column: 1 / span 288; grid-row: ${8};`"></drop> -->
        <!-- <drag v-for="(item, index) in items" :key="`item_${index}`" class="bg-red" :transfer-data="item" :style="`grid-column: ${item.offset / 5} / span ${item.duration / 5}; grid-row: ${item.index + 1};`">
          <q-btn @click="" color="white" text-color="black" rounded dense size="xs" icon="unfold_more"></q-btn>
          <q-btn v-touch-pan.horizontal="$event => pan($event, item, index)" color="white" text-color="black" rounded dense size="xs" icon="code"></q-btn>
        </drag> -->

        <!-- <div class="row justify-between items-center bg-green" :style="`grid-column: ${start} / span 96; grid-row: 2;`">
          <div class="col-auto q-caption">
            {{Math.floor(start / 12)}}:{{Math.floor(((start - 1) % 12) * 5)}}
          </div>
          <div class="col-auto">
            <q-btn-group rounded>
              <q-btn color="white" text-color="black" rounded dense size="xs" icon="keyboard_arrow_left"></q-btn>
              <q-btn v-touch-pan.horizontal="handler" color="white" text-color="black" rounded dense size="xs" icon="code"></q-btn>
              <q-btn color="white" text-color="black" rounded dense size="xs" icon="keyboard_arrow_right"></q-btn>
            </q-btn-group>
          </div>
          <div class="col-auto q-caption">
            {{Math.floor(start / 12)}}:{{Math.floor(((start - 1) % 12) * 5)}}
          </div>
        </div>
        <div class="bg-red" style="grid-column: 35 / span 96; grid-row: 3;"></div> -->
      <!-- </div> -->
      <schedule-presets></schedule-presets>
      <schedule-row></schedule-row>
      <!-- <div class="row">
        <div class="col-auto"><q-icon name="add_circle"></q-icon></div>
        <div class="bg-yellow-3 col" style="display: grid; grid-template-columns: repeat(96, 1fr); grid-auto-columns: 1fr">
          <drag class="bg-red" transfer-data="Item 1" style="grid-row: 1; grid-column: 25 / span 48">drag</drag>
          <drop class="" @drop="$event => $q.notify(`${$event} dropped on area 1`)" style="border: 2px dashed black; border-right: none; grid-row: 1; grid-column: 1 / span 48"></drop>
          <drop class="" @drop="$event => $q.notify(`${$event} dropped on area 2`)" style="border: 2px dashed black; border-left: none; grid-row: 1; grid-column: 49 / span 48"></drop>
        </div>
        <div class="col-auto"><q-icon name="add_circle"></q-icon></div>
      </div> -->
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import ScheduleItem from 'components/ScheduleItem'
import SchedulePresets from 'components/SchedulePresets'
import ScheduleRow from 'components/ScheduleRow'
import gql from 'graphql-tag'
export default {
  name: 'PageIndex',
  components: { ScheduleItem, SchedulePresets, ScheduleRow },
  data () {
    return {
      users: null,
      minutes: 0,
      itemRow: 1,
      dragInfo: null,
      presets: [
        {
          offset: 8.5 * 60,
          duration: 8 * 60,
          label: 'Dia Laboral Completo',
          value: 1,
          class: 'WORK'
        },
        {
          offset: 18.5 * 60,
          duration: 1 * 60,
          label: '1 Hora extra',
          value: (1 / 8) + 1,
          class: 'WORK'
        },
        {
          offset: 18.5 * 60,
          duration: 2 * 60,
          label: '2 Hora extra',
          value: (1 / 4) + 1,
          class: 'WORK'
        },
        {
          offset: 8.5 * 60,
          duration: 4 * 60,
          label: 'Medio Dia Laboral',
          value: 0.5,
          class: 'WORK'
        }
      ],
      items: [],
      shift: {
        slots: [
          {
            index: 0,
            schedule: {
              base: 8 * 60,
              uptime: [
                {
                  class: 'WORK',
                  color: 'bg-green',
                  value: 0.5,
                  offset: 8.5 * 60,
                  duration: 8 * 60
                }
              ],
              downtime: [
                {
                  class: 'OFF',
                  color: 'bg-blue',
                  value: 0.5
                }
              ],
              pausetime: [
                {
                  class: 'LUNCH',
                  duration: 30
                }
              ]
            }
          }
        ]
      }
      // schedule: {
      // base // how many minutes must this cover
      //   breaktime: [
      //     {
      //       rangeStart
      //       rangeEnd
      //       requireStartEvent
      //       requireEndEvent
      //       duration
      //     }
      //   ],
      //   uptime: [
      //     {
      //       requireStartEvent
      //       requireEndEvent
      //       offset // when this starts in minutes, starting from begining of day
      //       duration // how long this lasts in minutes, starting from offset
      //       size // how much of a day this covers, as a fraction of one
      //       index // position of this segment in the day
      //       class
      //     }
      //   ],
      //   downtime: {
      //     size
      //     index
      //     class
      //   }
      // }
    }
  },
  methods: {
    pan (info, item, index) {
      this.dragInfo = info
      item.offset += Math.floor(info.delta.x / 3)
    },
    drop (payload, index) {
      if (this.presets.includes(payload)) {
        this.items.push({ ...payload, index })
      } else {
        payload.index = index
      }
    },
    remove (payload) {
      if (!this.presets.includes(payload)) {
        this.items.splice(this.items.indexOf(payload), 1)
      }
    },
    async queryUsers () {
      const query = gql`
        query {
          users {
            username
            id
          }
        }
      `
      const users = await this.$gql.request(query)
      this.users = users
    }
  }
}
</script>
