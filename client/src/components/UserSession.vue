<template>
  <q-btn outline rounded size="sm" v-if="authenticated" label="logout" @click="logout"></q-btn>
  <q-btn outline rounded size="sm" v-else label="login" @click="loginModal = !loginModal">
    <q-modal v-model="loginModal" content-css="min-height: 60vh; min-width: 40vw" content-classes="q-pa-md row items-center justify-center">
      <div>
        <q-input align="center" placeholder="username" v-model="username"></q-input>
        <q-input type="password" align="center" placeholder="password" v-model="password"></q-input>
        <q-btn flat @click="login({username, password})" label="login"></q-btn>
      </div>
    </q-modal>
  </q-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginLogout',
  data () {
    return {
      username: '',
      password: '',
      loginModal: false
    }
  },
  computed: {
    ...mapGetters('session', {
      authenticated: 'isAuthenticated'
    })
  },
  methods: {
    ...mapActions('session', {
      stateLogin: 'login',
      stateLogout: 'logout'
    }),
    login () {
      this.loginModal = false
      this.stateLogin({ username: this.username, password: this.password })
    },
    logout () {
      this.stateLogout()
    }
  }
}
</script>

<style>
</style>
