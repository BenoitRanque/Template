<template>
  <div class="q-py-md">
    <div class="row items-center q-mx-md">
      <div class="col">
        <div class="q-headline">Crear Boleta</div>
      </div>
      <div class="col-auto">
        <q-btn @click="$refs.exchangeModal.show()" :disable="!exception.employee_id" dense color="primary" icon="swap_horiz" class="q-mr-sm">
          <q-tooltip>Generar Intercambio de Horarios</q-tooltip>
        </q-btn>
        <q-btn @click="$refs.vacationModal.show()" :disable="!exception.employee_id" dense color="primary" icon="date_range">
          <q-tooltip>Generar Periodo de Vacaciones</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-field class="q-mx-md q-mb-md">
      <q-select float-label="Empleado" v-model="exception.employee_id" filter :options="subordinateEmployeeOptions"></q-select>
    </q-field>
    <div class="row item-center q-mx-md">
      <div class="q-title col">Dias</div>
      <div class="col-auto">
        <q-btn @click="exception.slots.push({ date: null, schedule_id: null})" dense color="primary" icon="add">
          <q-tooltip>Aggregar Dia a Boleta</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="bg-grey-3" :style="`min-height: 20px; display: grid; grid-template-columns: repeat(${scheduleColumns}, 1fr);`">
      <div v-for="(up, index) in schedule.up" :key="`up_${index}`"
        :class="`row items-center justify-between bg-${up.color} full-height`"
        :style="`overflow: hidden; grid-column: ${Math.floor(schedule.base * up.offset) + 1} / span ${Math.floor(schedule.base * up.span)}`">
        <div class="q-caption col-auto">{{time(up.start)}}</div>
        some_long_text
        <div class="q-caption col-auto">{{time(up.end)}}</div>
      </div>
      <div v-for="(down, index) in schedule.down" :key="`down_${index}`"
        :class="`row items-center justify-center bg-${down.color} full-height`"
        :style="`overflow: hidden; grid-column: ${Math.floor(schedule.base * down.offset) + 1} / span ${Math.floor(schedule.base * down.span)}`">
        <div class="q-caption">{{down.class}}</div>
      </div>
      <template v-for="(gap, index) in gaps">
        <drop :key="`gap_${index}_start`" :style="`overflow: hidden; grid-column: ${Math.floor(schedule.base * gap.offset) + 1} / span ${Math.floor(schedule.base * (gap.span / 2))} ;`">
          start
        </drop>
        <drop :key="`gap_${index}_end`" :style="`overflow: hidden; grid-column: ${Math.floor(schedule.base * (gap.offset + (gap.span / 2))) + 1} / span ${Math.floor(schedule.base * (gap.span / 2))} ;`">
          end
        </drop>
      </template>
    </div>
    <q-btn class="col-auto" dense flat color="primary" size="sm" icon="fingerprint"></q-btn>
    <q-icon class="" name="fingerprint"></q-icon>
    <pre>{{gaps}}</pre>
    <pre>{{Math.floor(totalDuration * schedule.up[0].offset) + 1}}</pre>
    <pre>{{Math.floor(totalDuration * schedule.up[0].span) + 1}}</pre>
    <template v-for="(slot, index) in exception.slots">
      <!-- <hr  :key="index"> -->
      <q-collapsible :key="index" icon-toggle>
        <template slot="header">
          <div class="col">
            <q-datetime hide-underline float-label="fecha" v-model="slot.date"></q-datetime>
            <q-select hide-underline float-label="horario" v-model="slot.schedule_id" :options="[{ value: 1, label: 'h' }]"></q-select>
          </div>
        </template>
        <div class="bg-blue" draggable>
          hi
        </div>
      </q-collapsible>
      <hr  :key="`hr_${index}`">
    </template>
    <q-modal ref="exchangeModal" content-classes="q-pa-lg group">
      <div class="q-title">
        Generar Intercambio de Horarios
      </div>
      <q-datetime float-label="Fecha A" v-model="exchange.dateA"></q-datetime>
      <q-datetime float-label="Fecha B" v-model="exchange.dateB"></q-datetime>
      <div class="text-center q-pt-md">
        <q-btn :disable="!exchange.dateA || !exchange.dateB" color="secondary" size="lg">Generar</q-btn>
      </div>
    </q-modal>
    <q-modal ref="vacationModal" content-classes="q-pa-lg group">
      <div class="q-title">
        Generar Periodo de Vacaciones
      </div>
      <q-datetime float-label="Desde" :max="vacation.dateB" v-model="vacation.dateA"></q-datetime>
      <q-datetime float-label="Hasta" :min="vacation.dateA" v-model="vacation.dateB"></q-datetime>
      <div class="text-center q-pt-md">
        <q-btn :disable="!vacation.dateA || !vacation.dateB" color="secondary" size="lg">Generar</q-btn>
      </div>
    </q-modal>
    <q-btn @click="$refs.scheduleModal.show()">show</q-btn>
    <q-modal ref="scheduleModal" maximized>
      <div class="bg-blue" style="width: 576px; display: grid; grid-template-columns: repeat(288, 2px); grid-template-rows: 30px repeat(1, 40px) 40px">
        <div class="row justify-between items-center bg-green" :style="`grid-column: ${start} / span 96; grid-row: 2;`">
          <div class="col-auto q-caption">
            {{Math.floor(start / 12)}}:{{Math.floor(((start - 1) % 12) * 5)}}
            <q-checkbox></q-checkbox>
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
            <q-checkbox></q-checkbox>
          </div>
        </div>
        <div class="bg-red" style="grid-column: 35 / span 96; grid-row: 3;"></div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ExceptionSidebar',
  data () {
    return {
      start: 1,
      value: 0,
      vacation: {
        dateA: null,
        dateB: null
      },
      exchange: {
        dateA: null,
        dateB: null
      },
      exception: {
        employee_id: null,
        slots: [
          {
            schedule_id: null,
            date: null
          }
        ]
      },
      schedule: {
        base: 8 * 60, // 8 hours in minutes
        up: [
          {
            class: 'WORK',
            color: 'green',
            offset: 0,
            span: 0.5,
            start: 8.5 * 60,
            end: 12.5 * 60
          },
          {
            class: 'EXTRA',
            color: 'yellow',
            offset: 0.5,
            span: 0.25,
            start: 12.5 * 60,
            end: 14.5 * 60
          }
        ],
        down: [
          // {
          //   class: 'OFF',
          //   color: 'blue',
          //   offset: 0.75,
          //   span: 0.5
          // }
        ],
        pause: [
          {
            class: 'LUNCH',
            start: 11.5 * 60, // 11:30
            end: 13.5 * 60,
            duration: 30
          }
        ]
      }
      // schedule: {
      //   baseTime: '8h', // date, total length of date
      //   uptime: [
      //     {
      //       class: 'WORK',
      //       start: 0.5,
      //       value: 0.5,
      //       startTime: null,
      //       endTime: null,
      //       startRequireEvent: true,
      //       endRequireEvent: true
      //     }
      //   ],
      //   downtime: [
      //     {
      //       class: 'TIMEOFF',
      //       start: 0,
      //       value: 0.5
      //     }
      //   ]
      // }
    }
  },
  methods: {
    time (time) {
      const hours = Math.floor(time / 60)
      const minutes = Math.floor(time % 60)

      return `0${hours}:0${minutes}`.replace(/0([0-9][0-9])/g, '$1')
    },
    handler ({ direction, distance, delta }) {
      const newStart = this.start + (delta.x / 2)
      if (newStart < 1) {
        this.start = 1
      } else if (newStart > 288) {
        this.start = 288
      } else {
        this.start = newStart
        // this.start += (delta.x / 2)
      }
      // if (direction === 'left') {
      //   this.start += (delta.x / 2)
      // } else if (direction === 'right') {
      //   this.start -= (delta.x / 2)
      // }
    }
  },
  computed: {
    totalDuration () {
      return this.schedule.base + this.schedule.up
        .filter(up => ['EXTRA'].includes(up.class))
        .reduce((acc, val) => acc + (val.end - val.start), 0)
    },
    totalSpace () {
      return this.totalDuration / this.schedule.base
    },
    occupiedSpace () {
      // return [{ offset: 0, span: 0.25 }, { offset: 0.5, span: 0.25 }]
      return this.schedule.up.map(({ offset, span }) => ({ offset, span }))
        .concat(this.schedule.down.map(({ offset, span }) => ({ offset, span })))
        .sort((a, b) => a.offset - b.offset)
    },
    gaps () {
      const gaps = []
      let currentOffset = 0

      this.occupiedSpace.forEach(space => {
        if (currentOffset < space.offset) {
          gaps.push({ offset: currentOffset, span: space.offset - currentOffset })
        }

        currentOffset = space.offset + space.span
      })

      if (currentOffset !== this.totalSpace) {
        gaps.push({ offset: currentOffset, span: this.totalSpace - currentOffset })
      }
      return gaps
    },
    scheduleColumns () {
      return this.totalDuration
    },
    ...mapGetters('hr', {
      subordinateEmployeeOptions: 'subordinateEmployeeOptions'
    })
  }
}
</script>

<style scoped lang="stylus">
.schedule-item-up,
.schedule-item-down,
.schedule-item-extra
  z-index 1

  &:hover
    z-index 3
.schedule-item-pause
  z-index 2

  &:hover
    z-index 3
</style>
