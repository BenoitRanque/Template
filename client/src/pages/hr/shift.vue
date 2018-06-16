<template>
  <div>
    <!-- <div class="bg-green" v-for="(slot, index) in shift.slots" :key="index" style="height: 50px; border: 1px solid black">
      <div class="row">
        <div class="col">
        </div>
        <div class="col-auto">
          <q-btn size="lg" color="negative" dense flat round icon="cancel" :disable="shift.slots <= 1" @click="shift.slots -= 1"></q-btn>
        </div>
      </div>
    </div> -->
    <div class="bg-green" :style="gridParentStyle">
      <div class="bg-blue" :style="gridChildStyle">
        <q-input v-model="item.itemRow" hide-underline></q-input>
      </div>
    </div>
    <q-btn
      @click="shift.slots += 1"
      icon="add"
      ouline
      color="positive"
      size="lg"
      round
    ></q-btn>
  </div>
</template>

<script>
export default {
  name: 'AttShift',
  data () {
    return {
      shift: {
        name: '',
        description: '',
        slots: 1,
        timetable: []
      },
      item: {
        itemRow: 1
      }
    }
  },
  computed: {
    gridParentStyle () {
      return {
        display: 'grid',
        'grid-template-columns': 'repeat(1440, 1fr)',
        'grid-auto-rows': '1fr',
        'grid-template-rows': `1fr`
      }
    },
    gridChildStyle () {
      return {
        'grid-column-start': 240,
        'grid-column-end': 800,
        'grid-row-start': this.item.itemRow,
        'grid-row-end': this.item.itemRow
      }
    }
  }
}
</script>

<style scoped>

</style>
