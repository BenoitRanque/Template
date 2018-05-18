<template>
  <q-page padding class="row justify-center items-center gutter-x-md">
    <!-- <div :style="computedStyle">

    </div> -->
    <div class="col-12 text-center q-my-xl">
      <img src="statics/logo.png" style="width: 400px; max-width: 80%" alt="">
      <p class="q-display-3 text-primary text-weight-bold">{{$t($route.meta.label)}}</p>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>

<style>
</style>
