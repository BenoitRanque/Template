<template>
  <q-page class="">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <div class="bg-green-2 q-ma-sm grid-wrapper">
      <div class="bg-blue-2" style="grid-area: downtime-1">
        hello
        <q-popover self="top middle" anchor="bottom middle" fit>
          hello
        </q-popover>
      </div>
      <div class="bg-blue-2" style="grid-area: downtime-2">
        hello
        <q-popover self="top middle" anchor="bottom middle" fit>
          hello
        </q-popover>
      </div>
      <div class="bg-green-2" style="grid-area: uptime"></div>
      <div class="bg-yellow-2" style="grid-area: pausetime"></div>
    </div>
  </q-page>
</template>

<style lang="stylus">
.grid-wrapper
  display grid
  grid-template-rows repeat(3, 1fr)
  grid-template-columns repeat(2, 1fr)
  grid-column-gap 0
  grid-row-gap 0
  grid-template-areas "downtime-1 downtime-2" "uptime uptime" "pausetime pausetime"
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      schedule: {
        basetime: 8 * 60,
        uptime: [
          {

          }
        ],
        downtime1: null,
        downtime2: null,
        pausetime: [
          {

          }
        ]
      }
    }
  }
}
</script>
