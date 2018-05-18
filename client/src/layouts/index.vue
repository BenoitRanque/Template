<template>
  <q-layout view="hHh Lpr lFf">

    <main-header></main-header>

    <main-drawer></main-drawer>

    <q-page-container>
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
