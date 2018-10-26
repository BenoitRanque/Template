<template>
  <div class="relative-position">
    <div class="row gutter-x-xs q-pa-sm">
      <div class="col-12">
        <q-input readonly stack-label="Empleado" :value="model.employee ? model.employee.nameFull : ''"></q-input>
      </div>
      <div class="col-6">
        <q-datetime readonly stack-label="Fecha Solicitud" :value="model.createdAt"></q-datetime>
      </div>
      <div class="col-6">
        <q-input readonly stack-label="Usuario Solicitud" :value="model.owner ? model.owner.username : ''"></q-input>
      </div>
      <div class="col-6">
        <q-datetime readonly stack-label="Fecha Aprobacion" :value="model.authorization ? model.authorization.createdAt : null"></q-datetime>
      </div>
      <div class="col-6">
        <q-input readonly stack-label="Usuario Aprobacion" :value="model.authorization && model.authorization.owner ? model.authorization.owner.username : ''"></q-input>
      </div>
    </div>
    <div class="group">
      <q-card color="teal-8" text-color="black" dark v-for="(slot, index) in model.slots" :key="`slot_card_${index}`">
        <q-card-main>
          <schedule-input v-model="slot.schedule" readonly>
            <template slot="top-left">
              {{slotLabel(slot)}}
            </template>
          </schedule-input>
        </q-card-main>
      </q-card>
    </div>
    <div class="q-py-md flex justify-around" v-if="canAuthorize">
      <q-btn @click="createExceptionAuthorization(false)" color="negative" size="md" rounded>Negar</q-btn>
      <q-btn @click="createExceptionAuthorization(true)" color="positive" size="md" rounded>Authorizar</q-btn>
    </div>
    <!-- <pre>{{model}}</pre> -->
    <q-inner-loading :visible="loading">
      <q-spinner size="36px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
import { date } from 'quasar'
import { ExceptionWithScheduleDataQuery, CreateExceptionAuthorizationMutation } from 'assets/queries/Exception.graphql'
import ScheduleInput from 'components/ScheduleInput'

export default {
  name: 'ExceptionAuthorizationForm',
  components: { ScheduleInput },
  props: {
    exceptionId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
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
    canAuthorize () {
      return !this.model.authorization
    },
    valid () {
      return true
    }
  },
  watch: {
    exceptionId (exceptionId) {
      if (exceptionId) {
        this.loadException()
      } else {
        this.reset()
      }
    }
  },
  methods: {
    reset () {
      this.model = {
        owner: {
          id: null
        },
        employee: {
        },
        slots: []
      }
    },
    formatDate: date.formatDate,
    slotLabel (slot) {
      if (!slot.date) return ''
      return `${this.formatDate(slot.date, 'dddd')} ${this.formatDate(slot.date, 'D')} de ${this.formatDate(slot.date, 'MMMM YYYY')}`
    },
    loadException () {
      if (!this.exceptionId) return

      this.loading = true
      this.$gql.request(ExceptionWithScheduleDataQuery, { where: { id: this.exceptionId } })
        .then(response => {
          this.model = response.exception
        })
        .catch(this.$defaulErrorHandler)
        .finally(() => { this.loading = false })
    },
    createExceptionAuthorization (granted) {
      const parameters = {
        data: {
          granted,
          exception: {
            id: this.exceptionId
          }
        }
      }

      this.loading = true
      this.$gql.request(CreateExceptionAuthorizationMutation, parameters)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: `Boleta ${response.authorization.granted ? 'authorizada' : 'denegada'}`
          })
          this.$emit('created')
        })
        .catch(error => {
          console.log(error)
          this.$defaultErrorHandler(error)
        })
        .finally(() => { this.loading = false })
    }
  },
  mounted () {
    this.loadException()
  }
}
</script>

<style scoped>

</style>
