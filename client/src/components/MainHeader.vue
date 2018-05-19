<template>
  <q-layout-header>
    <q-toolbar color="primary">
      <q-btn
        flat
        dense
        round
        @click="$root.$emit('TOGGLE_DRAWER')"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        {{$t($route.meta.label)}}
        <div v-if="authenticated" slot="subtitle">{{$route.path.slice(1)}}</div>
      </q-toolbar-title>
        <q-btn-group
          rounded

        >
          <q-btn
            class="q-pa-sm"
            rounded
            color="white"
            text-color="primary"
            icon="home"
            @click="$router.push('/')"
          ></q-btn>

          <q-btn
            class="q-pa-sm"
            rounded
            color="white"
            text-color="primary"
            icon="help_outline"
            @click="$router.push($route.meta.documentation)"
          ></q-btn>

          <theme-settings></theme-settings>

          <q-btn
            rounded
            color="white"
            text-color="primary"
            icon="account_circle"
            class="q-pa-sm"
            :disable="!authenticated"
            @click="$router.push('/user')"
          >
          </q-btn>

          <user-session></user-session>

        </q-btn-group>
    </q-toolbar>

  </q-layout-header>
</template>

<script>
import ThemeSettings from './ThemeSettings'
import UserSession from './UserSession'
import { mapGetters } from 'vuex'

export default {
  name: 'MainHeader',
  components: {
    ThemeSettings,
    UserSession
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('core', {
      authenticated: 'isAuthenticated'
    })
  }
}

</script>

<style>
</style>
