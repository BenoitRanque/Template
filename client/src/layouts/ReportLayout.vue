<template>
  <q-layout view="hHh Lpr lFf"> <!-- Be sure to play with the Layout demo on docs -->

    <main-header></main-header>

    <q-layout-drawer behavior="desktop" side="right" content-class="shadow-6" v-model="rightDrawer" :width="500">
      <q-scroll-area class="fit">
        <exception-form></exception-form>
      </q-scroll-area>

    </q-layout-drawer>

    <main-navigation></main-navigation>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

    <q-page-sticky
      position="right"
    >
      <q-btn
        size="lg"
        color="secondary"
        dense
        class="shadow-6"
        @click="rightDrawer = !rightDrawer"
        :icon="`keyboard_arrow_${rightDrawer ? 'right' : 'left'}`"
      >
      </q-btn>
    </q-page-sticky>

  </q-layout>
</template>

<script>
import MainHeader from 'layouts/MainHeader'
import MainNavigation from 'layouts/MainNavigation'
import ExceptionForm from 'components/ExceptionForm'
export default {
  name: 'ReportLayout',
  components: { ExceptionForm, MainHeader, MainNavigation },
  data () {
    return {
      rightDrawer: false
    }
  }
}
</script>

<style>
</style>
