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
              <q-item v-if="slot.source1">
                <q-item-main>
                  {{formatDate(slot.source1.sourceDate, 'dddd')}} {{formatDate(slot.source1.sourceDate, 'D')}} de {{formatDate(slot.source1.sourceDate, 'MMMM YYYY')}}
                </q-item-main>
              </q-item>
            </template>

            <template slot="offline2-source">
              <q-item v-if="slot.source2">
                <q-item-main>
                  {{formatDate(slot.source2.sourceDate, 'dddd')}} {{formatDate(slot.source2.sourceDate, 'D')}} de {{formatDate(slot.source2.sourceDate, 'MMMM YYYY')}}
                </q-item-main>
              </q-item>
            </template>

          </schedule-input>
        </q-card-main>
      </q-card>
    </div>
    <div class="q-py-md flex justify-around">
      <q-btn v-if="canReject" @click="rejectException" color="warning" size="md" rounded>Rechazar Boleta</q-btn>
      <q-btn v-if="canAuthorize" @click="authorizeException" color="positive" size="md" rounded>Autorizar Boleta</q-btn>
      <q-btn v-if="canCancel" @click="cancelException" color="negative" size="md" rounded>Anular Boleta</q-btn>
      <q-btn v-if="canDelete" @click="deleteException" color="negative" size="md" rounded>Eliminar Boleta</q-btn>
      <!-- <q-btn @click="createExceptionAuthorization(true)" color="positive" size="md" rounded>Authorizar</q-btn> -->
      <q-btn @click="$root.$emit('PRINT', { template: 'exception', payload: model, preview: true })" color="secondary" round icon="print"></q-btn>
    </div>
    <!-- <pre>{{model}}</pre> -->
    <q-inner-loading :visible="loading">
      <q-spinner size="36px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
import { date } from 'quasar'
import {
  ExceptionWithScheduleDataQuery,
  RejectExceptionMutation,
  AuthorizeExceptionMutation,
  CancelExceptionMutation,
  DeleteExceptionMutation
} from 'assets/queries/Exception.graphql'
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
    canDelete () {
      // TODO
      return true
    },
    canReject () {
      // TODO
      return true
    },
    canAuthorize () {
      // TODO
      return true
    },
    canCancel () {
      // TODO
      return true
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
          this.loading = false
        })
        .catch(error => {
          this.$defaulErrorHandler(error)
          this.loading = false
        })
    },
    rejectException () {
      this.$q.dialog({
        title: 'Rechazar Boleta',
        message: 'Rechazar esta boleta con un comentario',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        ok: true,
        color: 'primary'
      })
        .then(description => {
          this.loading = true
          this.$gql.request(RejectExceptionMutation, { where: { id: this.exceptionId }, data: { description } })
            .then(response => {
              this.$q.notify({
                type: 'positive',
                message: `Boleta Rechazada`
              })
              this.$emit('updated')
              this.loading = false
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.loading = false
            })
        })
        .catch(() => {})
    },
    authorizeException () {
      this.$q.dialog({
        title: 'Autorizar Boleta',
        message: 'Autorizar esta boleta con un comentario',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        ok: true,
        color: 'primary'
      })
        .then(description => {
          this.loading = true
          this.$gql.request(AuthorizeExceptionMutation, { where: { id: this.exceptionId }, data: { description } })
            .then(response => {
              this.$q.notify({
                type: 'positive',
                message: `Boleta Autorizada`
              })
              this.$emit('updated')
              this.loading = false
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.loading = false
            })
        })
        .catch(() => {})
    },
    cancelException () {
      this.$q.dialog({
        title: 'Cancelar Boleta',
        message: 'Cancelar esta boleta con un comentario',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        ok: true,
        color: 'primary'
      })
        .then(description => {
          this.loading = true
          this.$gql.request(CancelExceptionMutation, { where: { id: this.exceptionId }, data: { description } })
            .then(response => {
              this.$q.notify({
                type: 'positive',
                message: `Boleta Cancelada`
              })
              this.$emit('updated')
              this.loading = false
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.loading = false
            })
        })
        .catch(() => {})
    },
    deleteException () {
      this.$q.dialog({
        title: 'Eliminar Boleta',
        message: 'Eliminar esta boleta',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        ok: true,
        color: 'primary'
      })
        .then(description => {
          this.loading = true
          this.$gql.request(DeleteExceptionMutation, { where: { id: this.exceptionId }, data: { description } })
            .then(response => {
              this.$q.notify({
                type: 'positive',
                message: `Boleta Eliminada`
              })
              this.$emit('updated')
              this.loading = false
            })
            .catch(error => {
              this.$defaultErrorHandler(error)
              this.loading = false
            })
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.loadException()
  }
}
</script>

<style scoped>

</style>
