<template>
  <div class="row">
    <div class="col">
      <q-field :label="label">
        <q-select v-model="model.schedule_id" options=""></q-select>
        <div class="col-auto">
          <q-btn>Jornada a medida</q-btn>
        </div>
      </q-field>
    </div>
    <div class="col-auto">
      <q-btn dense color="negative" icon="close" @click="$emit('remove')"></q-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
