<template>
  <q-layout view="hHh Lpr lFf">

    <main-header></main-header>

    <main-drawer></main-drawer>

    <q-layout-drawer side="right" content-class="shadow-6" v-model="rightDrawer">
      <q-scroll-area class="fit">
        <exception-sidebar></exception-sidebar>
      </q-scroll-area>

    </q-layout-drawer>

    <q-page-container>
      <!-- <div class="fixed full-height full-width row justify-center items-center">
        <div class="col-auto">
          <img src="statics/logo.png" class="" style="max-width: 80%; max-height: 80%; opacity: 0.05" alt="">
        </div>
      </div> -->
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
import MainHeader from 'components/MainHeader'
import MainDrawer from 'components/MainDrawer'
import ExceptionSidebar from 'components/ExceptionSidebar'

export default {
  name: 'LayoutDefault',
  components: {
    MainHeader,
    MainDrawer,
    ExceptionSidebar
  },
  data () {
    return {
      rightDrawer: false
    }
  }
}
</script>

<style>
</style>
