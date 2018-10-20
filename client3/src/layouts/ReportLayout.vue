<template>
  <q-layout view="hHh Lpr lFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Header
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>

    <q-layout-drawer side="right" content-class="shadow-6" v-model="rightDrawer" :width="500">
      <q-scroll-area class="fit">
        <exception-sidebar></exception-sidebar>
      </q-scroll-area>

    </q-layout-drawer>

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
import ExceptionSidebar from 'components/ExceptionSidebar'
export default {
  name: 'ReportLayout',
  components: { ExceptionSidebar },
  data () {
    return {
      leftDrawer: true,
      rightDrawer: false
    }
  }
}
</script>

<style>
</style>
