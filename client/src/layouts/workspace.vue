<template>
  <q-layout view="hHh Lpr lFf">

    <main-header></main-header>

    <main-drawer></main-drawer>

    <q-page-container>
      <div class="fixed full-height full-width row justify-center items-center">
        <div class="col-auto">
          <img src="statics/logo.png" class="" style="max-width: 80%; max-height: 80%; opacity: 0.05" alt="">
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from 'components/MainHeader'
import MainDrawer from 'components/MainDrawer'

export default {
  name: 'LayoutDefault',
  components: {
    MainHeader,
    MainDrawer
  }
}
</script>

<style>
</style>
