<template>
  <q-layout view="lHh Lpr lFf">
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
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
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
        <q-list-header>Modules</q-list-header>
        <q-collapsible v-for="(routeGroup, index) in routes" :key="`${index}_${routeGroup.path}`" :label="routeGroup.meta.label" group="main-sidebar">
          <q-list no-border>
            <q-item v-for="(route, index) in routeGroup.children" :key="`${index}_${route.path}`" link :to="`/${route.path}`" replace>
              <q-item-main>
                {{route.meta.label}}
              </q-item-main>
            </q-item>
          </q-list>
        </q-collapsible>
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://gitter.im/quasarframework/Lobby')">
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

import configurationRoutes from 'src/router/configuration'
import documentationRoutes from 'src/router/documentation'

import UserSession from 'components/UserSession'

export default {
  name: 'LayoutDefault',
  components: {
    UserSession
  },
  data () {
    return {
      leftDrawerOpen: false,
      routes: [].concat(configurationRoutes).concat(documentationRoutes)
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
