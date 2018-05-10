<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{$t($route.meta.label)}}
          <div v-if="authenticated" slot="subtitle">{{ authenticated ? $store.state.core.session.user.displayname : '' }}</div>
        </q-toolbar-title>
        <user-session></user-session>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <template v-if="$route.meta.pages">
          <q-list-header>{{$t('pages')}}</q-list-header>
          <q-item inset v-for="(route, index) in $route.meta.pages" :key="`${index}_${route.path}`" link :to="`/${route.path}`" replace exact>
            <q-item-main>
              {{route.meta.label}}
            </q-item-main>
          </q-item>
        </template>
        <q-list-header>{{$t('modules')}}</q-list-header>
        <q-item inset v-for="(route, index) in routes" :key="`${index}_${route.path}`" link :to="`/${route.path}`" replace exact>
          <q-item-main>
            {{route.meta.label}}
          </q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import configurationRoutes from 'src/router/configuration'
import documentationRoutes from 'src/router/documentation'

import UserSession from 'components/UserSession'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'LayoutDefault',
  components: {
    UserSession
  },
  data () {
    return {
      leftDrawerOpen: false,
      routes: [ configurationRoutes[0], documentationRoutes[0] ]
    }
  },
  computed: {
    ...mapGetters('core', {
      authenticated: 'isAuthenticated'
    }),
    ...mapState('core', {
      session: 'session'
    })
  },
  methods: {
    ...mapGetters('core', {
      authorized: 'isAuthorized'
    })
  }
}
</script>

<style>
</style>
