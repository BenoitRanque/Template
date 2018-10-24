<template>
  <q-btn
    class="q-pa-sm"
    rounded
    :color="isAuthenticated ? 'negative' : 'secondary'"
    icon="power_settings_new"
    @click="isAuthenticated ? logout() : modal = true"
  >
    <q-modal v-model="modal" minimized content-css="width: 400px; min-width: 30vw; min-height: 30vh" content-classes="q-py-xl text-center" @show="$refs.username.focus()" @hide="reset">
      <span class="q-display-1 q-my-md">
        Iniciar Session
      </span>
      <q-input ref="username" @keydown.enter="$refs.password.focus" class="q-my-md" type="text" align="center" placeholder="Usuario" v-model="username"></q-input>
      <q-input ref="password" @keydown.enter="login" class="q-my-md" type="password" align="center" placeholder="Contraseña" v-model="password"></q-input>
      <q-btn :loading="loading" class="q-my-md" dark outline rounded @click="login" label="Iniciar Session"></q-btn>
    </q-modal>
  </q-btn>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'UserSession',
  data () {
    return {
      loading: false,
      modal: false,
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('session', {
      isAuthenticated: 'isAuthenticated'
    })
  },
  methods: {
    ...mapMutations('session', {
      loginMutation: 'login',
      logoutMutation: 'logout'
    }),
    showLoginForm () {
      this.modal = true
    },
    reset () {
      this.loading = false
      this.username = ''
      this.password = ''
    },
    login () {
      this.loading = true
      this.$gql.request(gql`
        mutation ($username: String! $password: String!) {
          session: authenticate(username: $username password: $password) {
            token
            user {
              username
              role
            }
          }
        }
      `, {
        username: this.username,
        password: this.password
      })
        .then(response => {
          this.loginMutation(response.session)

          this.$gql.setHeaders({
            authorization: `Bearer ${response.session.token}`
          })

          this.modal = false
          this.$q.notify({
            message: 'Session iniciada exitosamente',
            type: 'positive'
          })
        })
        .catch(() => {
          this.password = ''
          this.$refs.username.select()
          this.$q.notify({
            message: 'No se pudo iniciar session',
            type: 'negative'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    logout () {
      this.$q.dialog({
        title: 'Cerrar Session',
        // message: '',
        ok: true,
        cancel: true
      })
        .then(() => {
          // remove token here
          this.logoutMutation()

          this.$gql.setHeaders({})
        })
        .catch(() => {})
    }
  },
  created () {
    this.$root.$on('AUTHENTICATION_REQUIRED', this.showLoginForm)
  },
  beforeDestroy () {
    this.$root.$off('AUTHENTICATION_REQUIRED', this.showLoginForm)
  }
}
</script>
