<template>
  <div>
    <div class="row gutter-sm">
      <div class="col-6">
        <employee-input v-model="model.employee.id"></employee-input>
      </div>
      <div class="col-6">
        <q-input v-model="model.description"></q-input>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.startDate"></q-datetime>
      </div>
      <div class="col-6">
        <q-datetime v-model="model.endDate"></q-datetime>
      </div>
    </div>
    <div class="group">
      <q-card color="teal-8" text-color="black" dark v-for="(slot, index) in model.slots" :key="`slot_card_${index}`">
        <q-card-main>
          <schedule-input v-model="slot.schedule" :valid.sync="slot.valid" :readonly="!!slot.schedule.id">
            <q-datetime
              color="teal-8"
              :display-value="slot.date ? `${formatDate(slot.date, 'dddd')} ${formatDate(slot.date, 'D')} de ${formatDate(slot.date, 'MMMM YYYY')}` : ''"
              placeholder="Seleccionar Fecha..." slot="top-left" hide-underline v-model="slot.date"></q-datetime>
            <q-btn v-if="!!slot.schedule.id" @click="$delete(slot.schedule, 'id')" class="q-mr-xs" slot="top-right" dense color="secondary" icon="edit">
              <q-tooltip>editar</q-tooltip>
            </q-btn>
            <q-btn @click="removeSlot(index)" slot="top-right" dense color="negative" icon="close">
              <q-tooltip>Quitar</q-tooltip>
            </q-btn>
          </schedule-input>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShiftInput',
  data () {
    return {
      model: {
        employee: {
          id: null
        },
        description: '',
        startDate: null,
        endDate: null,
        startIndex: 0,
        slots: []
      }
    }
  }
}
</script>

<style scoped>

</style>
