<template>
  <q-td :props="props" @click.native="modal = true">
    {{employee.nameFull}}
    <q-modal v-model="modal">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            {{formatDate(date.date, 'dddd DD MMMM YYYY')}}
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <div class="q-px-sm q-pt-sm q-pb-lg">
          <div class="q-my-sm q-title">Asistencia</div>
          <div class="row gutter-xs">
            <div class="col-6">Tiempo trabajado total</div>
            <div class="col-6">1</div>
            <div class="col-6">Tiempo retraso en ingreso</div>
            <div class="col-6">1</div>
            <div class="col-6">Tiempo adelanto en salida</div>
            <div class="col-6">1</div>
            <div class="col-6">Tiempo de pausa no sancionando</div>
            <div class="col-6">1</div>
            <div class="col-6">Tiempo de falta</div>
            <div class="col-6">1</div>
            <div class="col-6">Marcaciones faltante</div>
            <div class="col-6">1</div>
          </div>
          <div class="q-my-sm q-title">Marcaciones</div>
          <div class="row">
            <div class="col-6"></div>
            <div class="col-6">
              <div class="q-my-xs" v-for="(event, index) in date.events" :key="index">
                {{formatDate(event, 'HH:mm - DD/MM/YYYY')}}
              </div>
            </div>
          </div>
          <div class="q-my-sm q-title">Horario</div>
          <q-card color="teal-8" text-color="black" dark>
            <q-card-main>
              <schedule-input readonly :value="date.schedule"></schedule-input>
            </q-card-main>
          </q-card>
          <div class="q-my-sm q-title">Boleta</div>
          <div class="q-pa-md text-center">
            <q-btn v-if="date.exception" flat color="secondary" @click="exceptionModal = true">
              Ver boleta
              <q-modal v-model="exceptionModal">
                <q-modal-layout>
                  <q-toolbar slot="header">
                    <q-toolbar-title>
                      Boleta
                    </q-toolbar-title>
                    <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
                  </q-toolbar>
                  <div class="q-pa-md">
                    <exception-readonly-form v-if="date.exception" :exception-id="date && date.exception ? date.exception.id : null"></exception-readonly-form>
                  </div>
                </q-modal-layout>
              </q-modal>
            </q-btn>
            <span v-else class="text-tertiary">
              No aplica boleta
            </span>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-td>
</template>

<script>
import { date } from 'quasar'
import ScheduleInput from 'components/ScheduleInput'
import ExceptionReadonlyForm from 'components/ExceptionReadonlyForm'
export default {
  name: 'AttendanceReportCell',
  components: { ScheduleInput, ExceptionReadonlyForm },
  props: {
    index: {
      type: Number,
      required: true
    },
    props: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modal: false,
      exceptionModal: false
    }
  },
  computed: {
    employee () {
      return this.props.row
    },
    dates () {
      return this.employee.attendanceReport.dates
    },
    date () {
      return this.dates[this.index]
    }
  },
  methods: {
    formatDate: date.formatDate
  }
}
</script>

<style scoped>

</style>
