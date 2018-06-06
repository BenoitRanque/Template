<template>
  <q-page padding class="row justify-center items-center gutter-md">
    <!-- <div :style="computedStyle">

    </div> -->
    <div class="col-12 text-center q-my-xl">
      <img src="statics/logo.png" style="width: 400px; max-width: 80%" alt="">
    </div>
    <div class="col-6">
      <q-btn size="xl" color="primary" class="full-width" @click="$router.push('/hr')" :label="$t('hr')" icon="supervisor_account" />
    </div>
    <div class="col-6">
      <q-btn size="xl" color="primary" class="full-width" @click="$router.push('/config')" :label="$t('config')" icon="settings" />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  methods: {
  }
  // inject: {
  //   layout: {}
  // },
  // computed: {
  //   computedStyle () {
  //     const offset =
  //       (this.layout.header.space ? this.layout.header.size : 0) +
  //       (this.layout.footer.space ? this.layout.footer.size : 0)

  //     return {
  //       minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh'
  //     }
  //   }
  // }
}
</script>
