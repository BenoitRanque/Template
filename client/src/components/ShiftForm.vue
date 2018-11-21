<template>
  <div class="relative-position">
    <div class="row gutter-x-xs q-pa-sm">
      <div class="col-6">
        <employee-select placeholder="Empleado" v-model="model.employee.id"></employee-select>
      </div>
      <div class="col-6">
        <q-input placeholder="Comentario" v-model="model.description"></q-input>
      </div>
      <div class="col-6">
        <q-datetime placeholder="Fecha Inicial" v-model="model.startDate"></q-datetime>
      </div>
      <div class="col-6">
        <q-datetime placeholder="Fecha Final" v-model="model.endDate"></q-datetime>
      </div>
    </div>
    <div class="text-center group">
      <schedule-select color="primary" size="md" dense @select="model.slots.push({ schedule: $event.schedule, valid: false })"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="model.slots.push({ schedule: $event.schedule, valid: true })" mode="preset"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="model.slots.push({ schedule: $event.schedule, valid: true })" :employee-id="model.employee.id" mode="date"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="$event => model.slots.push(...$event.map(({ schedule }) => ({ schedule, valid: true })))" :employee-id="model.employee.id" mode="range"></schedule-select>
    </div>
    <div class="group">
      <q-card color="teal-8" text-color="black" dark v-for="(slot, index) in model.slots" :key="`slot_card_${index}`">
        <q-card-main>
          <schedule-input v-model="slot.schedule" :valid.sync="slot.valid" :readonly="!!slot.schedule.id" advanced>
            <template slot="top-left">
              <q-btn-group class="q-mr-xs">
                <q-btn :disable="index < 1" @click="setSlotIndex(index, index - 1)" dense color="secondary" icon="keyboard_arrow_up">
                  <q-tooltip>Mover Hacia Arriba</q-tooltip>
                </q-btn>
                <q-btn :disable="index > (model.slots.length - 1)" @click="setSlotIndex(index, index + 1)" dense color="secondary" icon="keyboard_arrow_down">
                  <q-tooltip>Mover Hacia Abajo</q-tooltip>
                </q-btn>
              </q-btn-group>
              {{slotLabel(index)}}
            </template>
            <template slot="top-right">
              <div class="col-auto">
                <q-btn v-if="!!slot.schedule.id" @click="$delete(slot.schedule, 'id')" class="q-mr-xs" dense color="secondary" icon="edit">
                  <q-tooltip>Modificar Horario</q-tooltip>
                </q-btn>
                <q-btn @click="removeSlot(index)" dense color="negative" icon="close">
                  <q-tooltip>Quitar</q-tooltip>
                </q-btn>
              </div>
            </template>
          </schedule-input>
        </q-card-main>
      </q-card>
    </div>
    <div class="q-py-md flex justify-around">
      <q-btn @click="deleteShift" v-if="canDelete" color="negative" size="md" rounded>Eliminar</q-btn>
      <q-btn @click="createShift" v-if="canCreate" :disable="!valid" color="positive" size="md" rounded>Crear</q-btn>
      <q-btn @click="updateShift" v-if="canUpdate" :disable="!valid" color="positive" size="md" rounded>Guardar</q-btn>
    </div>
    <!-- <pre>{{model}}</pre> -->
    <q-inner-loading :visible="loading">
      <q-spinner size="36px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
import { date } from 'quasar'
import { ShiftWithScheduleData, CreateShiftMutation, UpdateShiftMutation, DeleteShiftMutation } from 'assets/queries/Shift.graphql'
import ScheduleInput from 'components/ScheduleInput'
import ScheduleSelect from 'components/ScheduleSelect'
import EmployeeSelect from 'components/EmployeeSelect'

export default {
  name: 'ShiftForm',
  components: { ScheduleInput, ScheduleSelect, EmployeeSelect },
  props: {
    shiftId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      modified: false,
      modelCopy: null,
      model: {
        employee: {
          id: null
        },
        description: '',
        startDate: null,
        endDate: null,
        slots: []
      }
    }
  },
  computed: {
    employeeChanged () {
      // shift with an id but an employee diferent from the original should be created not updated
      return this.model.employee.id && this.modelCopy && this.modelCopy.employee && this.modelCopy.employee.id !== this.model.employee.id
    },
    canCreate () {
      return this.valid
    },
    canUpdate () {
      return this.modified && this.valid && this.model.id && !this.employeeChanged
    },
    canDelete () {
      return this.model.id && !this.employeeChanged
    },
    valid () {
      if (!this.model.employee.id) return false
      if (!this.model.startDate) return false
      if (this.model.slots.length < 1) return false
      if (this.model.slots.some(slot => !slot.valid)) return false
      return true
    }
  },
  watch: {
    model: {
      deep: true,
      handler () {
        this.modified = true
      }
    },
    shiftId (shiftId) {
      if (shiftId) {
        this.loadShift()
      } else {
        this.reset()
      }
    }
  },
  methods: {
    removeSlot (index) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Quitar elemento?',
        ok: true,
        cancel: true
      })
        .then(() => this.$delete(this.model.slots, index))
        .catch(() => {})
    },
    setSlotIndex (fromIndex, toIndex) {
      if (toIndex < 0 || toIndex > (this.model.slots.length - 1)) return
      const [ slot ] = this.model.slots.splice(fromIndex, 1)
      slot.index = toIndex
      this.model.slots.splice(toIndex, 0, slot)
    },
    reset () {
      this.originalEmployeeId = null
      this.model = {
        employee: {
          id: null
        },
        description: '',
        startDate: null,
        endDate: null,
        slots: []
      }
      this.modified = false
    },
    slotLabel (slotIndex) {
      if (this.model.startDate) {
        const slotDate = date.addToDate(this.model.startDate, { days: slotIndex })
        return `Dia ${slotIndex + 1}: ${date.formatDate(slotDate, 'dddd')}`
      } else {
        return `Dia ${slotIndex + 1}`
      }
    },
    loadShift () {
      if (!this.shiftId) return

      this.loading = true
      this.$gql.request(ShiftWithScheduleData, { where: { id: this.shiftId } })
        .then(response => {
          const model = {
            ...response.shift,
            slots: response.shift.slots
              .sort((a, b) => a.index - b.index)
              .map(({ schedule }) => ({
                schedule,
                valid: true
              }))
          }
          this.model = model
          this.modelCopy = JSON.parse(JSON.stringify(model))
          this.$nextTick(() => {
            this.modified = false
          })
          this.loading = false
        })
        .catch(error => {
          this.$defaulErrorHandler(error)
          this.loading = false
        })
    },
    createShift () {
      const parameters = {
        data: {
          employee: {
            id: this.model.employee.id
          },
          startDate: this.model.startDate,
          endDate: this.model.endDate,
          description: this.model.description,
          slots: this.model.slots.map(({ schedule }, index) => ({
            index,
            schedule: schedule.id
              ? { connect: { id: schedule.id } }
              : {
                create: {
                  description: schedule.description,
                  baseTime: schedule.baseTime,
                  timeline: schedule.timeline,
                  restline: schedule.restline,
                  offline1: schedule.offline1,
                  offline2: schedule.offline2
                }
              }
          }))
        }
      }

      this.loading = true
      this.$gql.request(CreateShiftMutation, parameters)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Horario ${response.shift.description} de empleado ${response.shift.employee.nameFull} creado`
          })
          this.$emit('created')
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.$defaultErrorHandler(error)
          this.loading = false
        })
    },
    updateShift () {
      const parameters = {
        where: {
          id: this.model.id
        },
        data: {
          employee: {
            id: this.model.employee.id
          },
          startDate: this.model.startDate,
          endDate: this.model.endDate,
          description: this.model.description,
          slots: this.model.slots.map(({ schedule }, index) => ({
            index,
            schedule: schedule.id
              ? { connect: { id: schedule.id } }
              : {
                create: {
                  description: schedule.description,
                  baseTime: schedule.baseTime,
                  timeline: schedule.timeline,
                  restline: schedule.restline,
                  offline1: schedule.offline1,
                  offline2: schedule.offline2
                }
              }
          }))
        }
      }

      this.loading = true
      this.$gql.request(UpdateShiftMutation, parameters)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Horario ${response.shift.description} de empleado ${response.shift.employee.nameFull} modificado`
          })
          this.$emit('updated')
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.$defaultErrorHandler(error)
          this.loading = false
        })
    },
    deleteShift () {
      const parameters = {
        where: {
          id: this.model.id
        }
      }

      this.loading = true
      this.$gql.request(DeleteShiftMutation, parameters)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Horario ${response.shift.description} de empleado ${response.shift.employee.nameFull} eliminado`
          })
          this.$emit('deleted')
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.$defaultErrorHandler(error)
          this.loading = false
        })
    }
  },
  mounted () {
    this.loadShift()
  }
}
</script>

<style scoped>

</style>
