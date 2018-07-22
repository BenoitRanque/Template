<template>
  <div>
    <q-stepper ref="stepper" vertical>
      <q-step :order="0" default title="Bienvenido" subtitle="empecemos">
        bienvenido al formulario de creacion de boleta
        <q-stepper-navigation class="justify-center q-pa-md">
          <q-btn label="Empezar" color="primary" size="xl" icon-right="arrow_forward" @click="$refs.stepper.next()"></q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="1" title="Sellecione un empleado" subtitle="">
        <q-select v-model="$v.exception.employee_id.$model" :options="options.employee_id"></q-select>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.exception.employee_id.$invalid" @click="$refs.stepper.goToStep('home')" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <template v-if="mode === 1">
        <q-step name="1" :order="3">
          <q-datetime v-model="$v.date1.$model"></q-datetime>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="mode = 0; $refs.stepper.goToStep('home')" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.date1.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step :order="4">
          <q-datetime v-model="$v.date2.$model"></q-datetime>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn :disable="$v.date2.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step :order="5">
          <q-stepper ref="stepper2">
            <q-step>
              <q-datetime v-model="date1"></q-datetime>
              <q-stepper-navigation class="justify-around">
                <q-btn @click="$refs.stepper2.previous()" flat icon="arrow_back">Anterior</q-btn>
                <q-btn @click="$refs.stepper2.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
              </q-stepper-navigation>
            </q-step>
            <q-step>
              <q-datetime v-model="date2"></q-datetime>
              <q-stepper-navigation class="justify-around">
                <q-btn @click="$refs.stepper2.previous()" flat icon="arrow_back">Anterior</q-btn>
                <q-btn @click="$refs.stepper2.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
          <q-stepper-navigation class="justify-around">
            <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
            <q-btn @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
          </q-stepper-navigation>
        </q-step>
      </template>
      <q-step :order="10" name="home" title="Agregue Dias" subtitle="">
        <div class="row justify-center q-pa-md">
          <div class="col-12 col-md-6 group text-center">
            <q-btn class="" size="lg" icon="add" @click="mode = 1; $refs.stepper.goToStep('1')" label="Cambio de Libre"></q-btn>
            <q-btn class="" size="lg" icon="add" label="Cambio de Horario"></q-btn>
            <q-btn class="" size="lg" icon="add" label="Vacaciones"></q-btn>
          </div>
        </div>
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.previous()" flat icon="arrow_back">Anterior</q-btn>
          <q-btn :disable="$v.exception.slots.$invalid" @click="$refs.stepper.next()" color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step :order="12" title="" subtitle="">
        Revisar y solicitar
        <q-stepper-navigation class="justify-around">
          <q-btn @click="$refs.stepper.reset()" flat icon="refresh">Iniciar de Nuevo</q-btn>
          <q-btn color="primary" icon-right="arrow_forward">Siguiente</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import ExceptionSlot from 'components/ExceptionSlot'
import {
  // requiredIf,
  // requiredUnless,
  // minLength,
  // maxLength,
  // minValue,
  // maxValue,
  // between,
  // alpha,
  // alphaNum,
  // numeric,
  // email,
  // ipAddress,
  // macAddress,
  // sameAs,
  // url,
  // or,
  // and,
  // withParams,
  required
} from 'vuelidate/lib/validators'
export default {
  name: 'HRAttExceptionRequest',
  components: { ExceptionSlot },
  data () {
    return {
      date1: null,
      date2: null,
      mode: 0,
      exception: {
        description: '',
        employee_id: null,
        slots: []
      },
      options: {
        employee_id: [
          {label: 'Benoit', value: 1}
        ]
      }
    }
  },
  validations: {
    date1: {
      required
    },
    date2: {
      required
    },
    exception: {
      description: { required },
      employee_id: { required },
      slots: {
        required,
        $each: {
          date: { required },
          schedule: { required }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
