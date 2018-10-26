<template>
  <q-layout-header>
    <q-toolbar color="primary">
      <q-btn
        flat
        dense
        round
        :disable="!isAuthenticated"
        @click="$root.$emit('TOGGLE_NAVIGATION')"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        {{$route.meta.label}}
        <div v-if="isAuthenticated" slot="subtitle">{{$route.path.slice(1)}}</div>
      </q-toolbar-title>
        <q-btn-group
          rounded
        >

          <!-- implement documentation button on every page in the future -->
          <!-- <q-btn
            class="q-pa-sm"
            rounded
            color="white"
            text-color="primary"
            icon="help_outline"
            @click="$router.push($route.meta.documentation)"
          ></q-btn> -->

          <q-btn
            rounded
            color="white"
            text-color="primary"
            icon="account_circle"
            class="q-pa-sm"
            :disable="!isAuthenticated"
            @click="$router.push('/user')"
          >
            <q-tooltip v-if="username">{{username}}</q-tooltip>
          </q-btn>

          <q-btn
            class="q-pa-sm"
            rounded
            color="white"
            text-color="primary"
            icon="home"
            @click="$router.push('/')"
          ></q-btn>

          <theme-settings></theme-settings>

          <user-session></user-session>

        </q-btn-group>
    </q-toolbar>

  </q-layout-header>
</template>

<script>
import UserSession from 'components/UserSession'
import ThemeSettings from 'components/ThemeSettings'
import { mapGetters } from 'vuex'

export default {
  name: 'MainHeader',
  components: {
    UserSession,
    ThemeSettings
  },
  computed: {
    ...mapGetters('session', {
      isAuthenticated: 'isAuthenticated',
      username: 'username'
    })
  }
}

</script>

<style>
</style>
