  <template>
  <div class="q-mx-md q-my-lg">
    <div class="q-headline text-center q-mx-md">Crear Boleta</div>
    <div class="q-body-1 text-weight-bold q-mx-md q-my-xs text-center" :class="{
      'text-positive': valid,
      'text-negative': validationCode >= 10
    }">
      {{validationHelper}}
    </div>
    <employee-select v-model="model.employee.id"></employee-select>
    <div class="text-center group">
      <schedule-select color="primary" size="md" dense @select="model.slots.push({ schedule: $event.schedule, valid: false, source1: null, source2: null })"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="model.slots.push({ date: null, schedule: $event.schedule, valid: true, source1: null, source2: null })" mode="preset"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="model.slots.push({ date: $event.date, schedule: $event.schedule, valid: true, source1: null, source2: null })" :employee-id="model.employee.id" mode="date"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="$event => model.slots.push(...$event.map(({ schedule, date }) => ({ schedule, date, valid: true })))" :employee-id="model.employee.id" mode="range"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="$event => model.slots.push(...$event.map(({ schedule, date }) => ({ schedule, date, valid: true })))" :employee-id="model.employee.id" mode="switch"></schedule-select>
      <schedule-select color="primary" size="md" dense @select="$event => model.slots.push(...$event.map(({ schedule, date }) => ({ schedule, date, valid: true })))" :employee-id="model.employee.id" mode="vacation"></schedule-select>
    </div>

    <div class="group">
      <q-card color="teal-8" text-color="black" dark v-for="(slot, index) in model.slots" :key="`slot_card_${index}`">
        <q-card-main>
          <schedule-input :advanced="isAuthorized(['ADMIN', 'HR'])" v-model="slot.schedule" :valid.sync="slot.valid" :readonly="!!slot.schedule.id">
            <div class="col" slot="top-left">
              <q-datetime
                color="teal-8"
                :display-value="slotLabel(slot)"
                placeholder="Seleccionar Fecha..."
                slot="top-left"
                hide-underline
                v-model="slot.date"
              ></q-datetime>
            </div>
            <div class="col-auto" slot="top-right">
              <q-btn v-if="!!slot.schedule.id" @click="$delete(slot.schedule, 'id')" class="q-mr-xs" dense color="secondary" icon="edit">
                <q-tooltip>Modificar Horario</q-tooltip>
              </q-btn>
              <q-btn @click="removeSlot(index)" dense color="negative" icon="close">
                <q-tooltip>Quitar</q-tooltip>
              </q-btn>
            </div>

            <span slot="offline1-header">
              <q-icon v-if="slot.source1 !== null" class="text-bold" style="font-size: 16px" name="check">
                <q-tooltip>Tiene Fuente</q-tooltip>
              </q-icon>
            </span>

            <span slot="offline2-header">
              <q-icon v-if="slot.source2 !== null" class="text-bold" style="font-size: 16px" name="check">
                <q-tooltip>Tiene Fuente</q-tooltip>
              </q-icon>
            </span>

            <template slot="offline1-source">
              <q-item v-if="slot.schedule.offline1">
                <template v-if="slot.source1">
                  <q-item-main>
                    {{formatDate(slot.source1.sourceDate, 'dddd')}} {{formatDate(slot.source1.sourceDate, 'D')}} de {{formatDate(slot.source1.sourceDate, 'MMMM YYYY')}}
                  </q-item-main>
                  <q-item-side>
                    <q-btn dense color="negative" icon="close" @click="slot.source1 = null"></q-btn>
                  </q-item-side>
                </template>
                <q-item-main v-else class="text-center">
                  <credit-select
                    v-close-overlay
                    @select="$event => { slot.source1 = $event }"
                    :employee-id="model.employee.id"
                    :category="slot.schedule.offline1 ? slot.schedule.offline1.category : null"
                    :exclude="usedCredits"
                    label="Aggregar Fuente"
                    color="secondary"
                  ></credit-select>
                </q-item-main>
              </q-item>
            </template>

            <template slot="offline2-source">
              <q-item v-if="slot.schedule.offline2">
                <template v-if="slot.source2">
                  <q-item-main>
                    {{formatDate(slot.source2.sourceDate, 'dddd')}} {{formatDate(slot.source2.sourceDate, 'D')}} de {{formatDate(slot.source2.sourceDate, 'MMMM YYYY')}}
                  </q-item-main>
                  <q-item-side>
                    <q-btn dense color="negative" icon="close" @click="slot.source2 = null"></q-btn>
                  </q-item-side>
                </template>
                <q-item-main v-else class="text-center">
                  <credit-select
                    v-close-overlay
                    @select="$event => { slot.source2 = $event }"
                    :employee-id="model.employee.id"
                    :category="slot.schedule.offline2 ? slot.schedule.offline2.category : null"
                    :exclude="usedCredits"
                    label="Aggregar Fuente"
                    color="secondary"
                  ></credit-select>
                </q-item-main>
              </q-item>
            </template>
          </schedule-input>
        </q-card-main>
      </q-card>
    </div>
    <!-- <div class="text-center q-py-md">
      <q-btn @click="validateException" :disable="!valid" color="secondary" size="lg">Validar</q-btn>
    </div> -->
    <div class="text-center q-py-md">
      <q-btn @click="createException" :disable="!valid" color="secondary" size="lg">Solicitar</q-btn>
    </div>
    <q-inner-loading :visible="loading">
      <q-spinner size="36px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CreateExceptionMutation } from 'assets/queries/Exception.graphql'
import { date } from 'quasar'
import ScheduleInput from 'components/ScheduleInput/index'
import EmployeeSelect from 'components/EmployeeSelect'
import ScheduleSelect from 'components/ScheduleSelect'
import CreditSelect from 'components/CreditSelect'
export default {
  name: 'ExceptionForm',
  components: { EmployeeSelect, ScheduleSelect, ScheduleInput, CreditSelect },
  data () {
    return {
      loading: false,
      model: {
        type: 'MIXED',
        employee: {
          id: null
        },
        slots: []
      }
    }
  },
  computed: {
    ...mapGetters('session', {
      isAuthorized: 'isAuthorized'
    }),
    usedCredits () {
      return this.model.slots.reduce((credits, slot) => {
        if (slot.source1) {
          credits.push(slot.source1.id)
        }
        if (slot.source2) {
          credits.push(slot.source2.id)
        }
        return credits
      }, [])
    },
    validationCode () {
      const duplicateDates = this.model.slots
        .map(({ date }) => date ? new Date(date).getTime() : null)
        .some((date, index, dates) => date && dates.indexOf(date) !== index)
      if (duplicateDates) return 12
      if (this.model.slots.some(slot => !slot.valid)) return 10

      if (!this.model.employee.id) return 1
      if (this.model.slots.length < 1) return 2
      if (this.model.slots.some(slot => slot.date === null)) return 3

      return 0
    },
    valid () {
      return this.validationCode === 0
    },
    validationHelper () {
      switch (this.validationCode) {
        case 0: return 'Boleta valida'
        case 1: return `Bienvenido. Por favor escoja un empleado`
        case 2: return `Ahora puede empezar aggregar dias`
        case 3: return `Se requiere fecha para dia ${this.model.slots.findIndex(slot => slot.date === null) + 1}`
        case 10: return `Horario invalido para dia ${this.model.slots.findIndex(slot => !slot.valid) + 1}`
        case 12:
          const dateSrings = this.model.slots
            .map(({ date }) => date ? new Date(date).getTime() : null)

          const duplicateDate = dateSrings
            .filter(date => date)
            .find((date, index, dates) => dates.indexOf(date) !== index)

          const instances = dateSrings
            .reduce((acc, val, index) => {
              if (val === duplicateDate) acc.push(index)
              return acc
            }, [])

          return `Fecha ${this.formatDate(new Date(duplicateDate), 'DD/MM/YYYY')} duplicada en dias ${instances.map(i => i + 1).join(', ')}`
      }
    }
  },
  methods: {
    slotLabel (slot) {
      if (!slot.date) return ''
      return `${this.formatDate(slot.date, 'dddd')} ${this.formatDate(slot.date, 'D')} de ${this.formatDate(slot.date, 'MMMM YYYY')}`
    },
    formatDate: date.formatDate,
    differenceInDays: (a, b) => date.getDateDiff(a, b, 'days'),
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
    reset () {
      this.model.slots = []
    },
    validateException () {
      // TODO: load current schedule, use it to validate schedule
    },
    createException () {
      const parameters = {
        data: {
          employee: {
            id: this.model.employee.id
          },
          type: this.model.type,
          slots: this.model.slots.map(({ date, schedule, source1, source2 }) => ({
            date,
            source1: source1 && source1.id ? { id: source1.id } : null,
            source2: source2 && source1.id ? { id: source2.id } : null,
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
      this.$gql.request(CreateExceptionMutation, parameters)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Boleta para empleado ${response.exception.employee.nameFull} creada por usuario ${response.exception.owner.username}`
          })
          this.loading = false
          // reset model
          this.reset()
          this.$emit('created', response.exception)
        })
        .catch(error => {
          console.log(error)
          this.$defaultErrorHandler(error)
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
