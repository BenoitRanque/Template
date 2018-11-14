<template>
  <q-td :props="props" @click.native="modal = true">
    <div class="text-center">
      <template v-if="date.compliance">
        <q-icon v-if="date.compliance.lateStart.count" name="warning" color="warning" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>Ingreso con Retraso de {{formatTime(date.compliance.lateStart.time)}}</q-tooltip>
        </q-icon>

        <q-icon v-if="date.compliance.missingStartEventCount" name="warning" color="warning" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>Falta {{date.compliance.missingStartEventCount}} Marcacion de Ingreso</q-tooltip>
        </q-icon>

        <q-icon v-if="date.compliance.earlyEnd.count" name="warning" color="warning" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>Salida Adelantada de {{formatTime(date.compliance.earlyEnd.time)}}</q-tooltip>
        </q-icon>

        <q-icon v-if="date.compliance.unauthorizedExtraTime > 120" name="warning" color="purple" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>Tiempo extra no autorizado de {{formatTime(date.compliance.unauthorizedExtraTime)}}</q-tooltip>
        </q-icon>

        <q-icon v-if="date.compliance.missingEndEventCount" name="warning" color="warning" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>Falta {{date.compliance.missingEndEventCount}} Marcacion de Salida</q-tooltip>
        </q-icon>

        <q-icon v-if="date.compliance.absentTime.value" name="warning" color="negative" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>Falta {{(date.compliance.absentTime.value).toFixed(2).replace(/.?0+$/,'')}} Dia</q-tooltip>
        </q-icon>

        <q-icon v-if="date.compliance.requiredEventCount === 0 && date.compliance.eventCount > 0" name="error" color="purple" class="q-mx-xs" style="font-size: 20px">
          <q-tooltip>No se esperaban marcaciones</q-tooltip>
        </q-icon>
      </template>

      <q-icon v-if="date.exception" name="error" color="info" class="q-mx-xs" style="font-size: 20px">
        <q-tooltip>Horario modificado por boleta</q-tooltip>
      </q-icon>
    </div>

    <q-modal v-model="modal">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            {{formatDate(date.date, 'dddd DD MMMM YYYY')}} - {{employee.nameFull}}
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <div class="q-px-sm q-pt-sm q-pb-lg">
          <div class="q-my-sm q-title">Marcaciones</div>
          <div v-if="!date.events || !date.events.length" class="q-pa-md text-center">
            <span class="text-tertiary">
              No existen marcaciones
            </span>
          </div>
          <div v-else class="row">
            <div class="col-6"></div>
            <div class="col-6">
              <div class="q-my-xs" v-for="(event, index) in date.events" :key="index">
                {{formatDate(event, 'HH:mm - DD/MM/YYYY')}}
              </div>
            </div>
          </div>
          <template v-if="date.compliance">
            <div class="q-my-sm q-title">Asistencia</div>
            <div class="row gutter-xs">
              <div class="col-6">Retraso en ingreso</div>
              <div class="col-6">{{formatTime(date.compliance.lateStart.time)}} | {{date.compliance.lateStart.count}}</div>
              <div class="col-6">Adelanto en salida</div>
              <div class="col-6">{{formatTime(date.compliance.earlyEnd.time)}} | {{date.compliance.earlyEnd.count}}</div>
              <div class="col-6">Sobretiempo en descanso</div>
              <div class="col-6">{{formatTime(date.compliance.restOvertime.time)}} | {{date.compliance.restOvertime.count}}</div>
              <div class="col-6">Tiempo Extra No Autorizado</div>
              <div class="col-6">{{formatTime(date.compliance.unauthorizedExtraTime)}}</div>
              <div class="col-6">Tiempo Extra Autorizado</div>
              <div class="col-6">{{formatTime(date.compliance.authorizedExtraTime)}}</div>
              <div class="col-6">Dias de falta</div>
              <div class="col-6">{{(date.compliance.absentTime.value).toFixed(2).replace(/.?0+$/,'')}}</div>
              <div class="col-6">Marcaciones</div>
              <div class="col-6">{{date.compliance.eventCount}}</div>
              <div class="col-6">Marcaciones esperadas</div>
              <div class="col-6">{{date.compliance.requiredEventCount}}</div>
              <div class="col-6">Marcaciones de ingreso faltantes</div>
              <div class="col-6">{{date.compliance.missingStartEventCount}}</div>
              <div class="col-6">Marcaciones de salido faltantes</div>
              <div class="col-6">{{date.compliance.missingEndEventCount}}</div>
              <div class="col-6">Marcaciones de almuerzo faltantes</div>
              <div class="col-6">{{date.compliance.missingRestEventCount}}</div>
            </div>
          </template>
          <template v-if="date.schedule">
            <div class="q-my-sm q-title">Horario</div>
            <q-card color="teal-8" text-color="black" dark>
              <q-card-main>
                <schedule-input readonly :value="date.schedule"></schedule-input>
              </q-card-main>
            </q-card>
          </template>
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
    formatDate: date.formatDate,
    formatTime (minutes) {
      return `0${Math.floor(minutes / 60)}:0${minutes % 60}`.replace(/0(\d\d)/g, '$1')
    }
  }
}
</script>

<style scoped>

</style>
