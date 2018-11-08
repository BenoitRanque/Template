<template>
  <q-layout view="hHh Lpr lFf">

    <main-header></main-header>

    <main-navigation></main-navigation>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import MainHeader from 'layouts/MainHeader'
import MainNavigation from 'layouts/MainNavigation'
export default {
  name: 'MainLayout',
  components: { MainHeader, MainNavigation }
}
</script>

<style>
</style>
