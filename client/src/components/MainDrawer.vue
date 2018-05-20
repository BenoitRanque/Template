<template>
  <q-layout-drawer v-model="drawerOpen">
    <q-list
      no-border
      link
      inset-delimiter
    >
      <template v-if="$route.meta.tabs">
        <q-list-header>{{$t('pages')}}</q-list-header>
        <q-item inset v-for="(tab, index) in $route.meta.tabs" :key="`${index}_${tab.hash}`" link :to="`/${tab.root}/${tab.hash}`" replace exact>
          <q-item-main>
            {{$t(tab.meta.label)}}
          </q-item-main>
        </q-item>
      </template>
      <q-list-header>{{$t('modules')}}</q-list-header>
      <q-item inset v-for="(route, index) in routes" :key="`${index}_${route.hash}`" link :to="`/${route.hash}`" replace>
        <q-item-main>
          {{$t(route.meta.label)}}
        </q-item-main>
      </q-item>
    </q-list>
  </q-layout-drawer>
</template>

<script>
import moduleRoutes from 'src/router/modules'

import { mapGetters, mapState } from 'vuex'

export default {
  name: 'MainDrawer',
  data () {
    return {
      drawerOpen: false,
      routes: moduleRoutes
    }
  },
  computed: {
    ...mapGetters('core', {
      authenticated: 'isAuthenticated',
      authorized: 'isAuthorized'
    }),
    ...mapState('core', {
      session: 'session'
    })
  },
  methods: {
    toggledrawer (state) {
      if (state === undefined) {
        this.drawerOpen = !this.drawerOpen
      } else {
        this.drawerOpen = state
      }
    }
  },
  created () {
    this.$root.$on('TOGGLE_DRAWER', this.toggledrawer)
  },
  beforeDestroy () {
    this.$root.$off('TOGGLE_DRAWER', this.toggledrawer)
  }
}
</script>

<style>
</style>
