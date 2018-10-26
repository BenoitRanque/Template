<template>
  <div class="relative-position">
    <div class="row gutter-x-xs q-pa-sm">
      <div class="col-6">
        <q-input placeholder="PIN ZKTime" v-model="model.zkTimePin" type="number" :min="0"></q-input>
      </div>
      <div class="col-6">
        <q-input placeholder="Cargo" v-model="model.cargo"></q-input>
      </div>
      <div class="col-6">
        <q-input placeholder="Primer Nombre" v-model="model.nameFirst"></q-input>
      </div>
      <div class="col-6">
        <q-input placeholder="Segundo Nombre" v-model="model.nameMiddle"></q-input>
      </div>
      <div class="col-6">
        <q-input placeholder="Apellido Paterno" v-model="model.namePaternal"></q-input>
      </div>
      <div class="col-6">
        <q-input placeholder="Apellido Materno" v-model="model.nameMaternal"></q-input>
      </div>
    </div>
    <div class="q-py-md text-center">
      <q-btn @click="createEmployee" :disable="!valid" color="positive" size="md" rounded>Crear</q-btn>
    </div>
    <!-- <pre>{{model}}</pre> -->
    <q-inner-loading :visible="loading">
      <q-spinner size="36px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
import { CreateEmployeeMutation } from 'assets/queries/Employee.graphql'

export default {
  name: 'EmployeeForm',
  data () {
    return {
      loading: false,
      model: {
        zkTimePin: null,
        cargo: '',
        nameFirst: '',
        nameMiddle: '',
        namePaternal: '',
        nameMaternal: ''
      }
    }
  },
  computed: {
    valid () {
      if (this.model.zkTimePin === null) return false
      if (!this.model.nameFirst) return false
      return true
    }
  },
  methods: {
    reset () {
      this.model = {
        cargo: '',
        zkTimePin: null,
        nameFirst: '',
        nameMiddle: '',
        namePaternal: '',
        nameMaternal: ''
      }
    },
    createEmployee () {
      const parameters = { data: this.model }

      this.loading = true
      this.$gql.request(CreateEmployeeMutation, parameters)
        .then(response => {
          this.reset()
          this.$q.notify({
            type: 'positive',
            message: `Empleado ${response.employee.nameFull} creado`
          })
          this.$emit('created')
          this.loading = false
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

<style scoped>

</style>
