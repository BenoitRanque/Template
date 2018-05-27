<template>
  <q-page padding>
    <!-- content -->
    <div class="bg-grey-2 row" style="height: 20px">
      <div v-for="(block, index) in shift.blocks" :key="index" class="col-auto" :class="`bg-green-${index + 1}`" style="width: 60px; height: 20px">

      </div>
    </div>
    <pre>{{$data}}</pre>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      shift: {
        name: 'Shift Name',
        blocks: [
          {
            name: 'full day'
          },
          {
            name: 'morning'
          },
          {
            name: 'afternoon'
          },
          {
            name: 'discontiguous'
          },
          {
            name: 'day off'
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
