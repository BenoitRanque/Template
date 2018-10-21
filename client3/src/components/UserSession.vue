<template>
  <q-btn
    class="q-pa-sm"
    rounded
    :color="isAuthenticated ? 'negative' : 'secondary'"
    icon="power_settings_new"
    @click="isAuthenticated ? logout() : modal = true"
  >
    <q-modal ref="modal" minimized content-css="width: 400px; min-width: 30vw; min-height: 30vh" content-classes="q-py-xl text-center" @show="$refs.username.focus()" @hide="reset">
      <span class="q-display-1 q-my-md">
        Iniciar Session
      </span>
      <q-input ref="username" @keydown.enter="$refs.password.focus" class="q-my-md" type="text" align="center" :placeholder="Usuario" v-model="username"></q-input>
      <q-input ref="password" @keydown.enter="login" class="q-my-md" type="password" align="center" :placeholder="Contraseña" v-model="password"></q-input>
      <q-btn :loading="loading" class="q-my-md" dark outline rounded @click="login" :label="$t('login')"></q-btn>
    </q-modal>
  </q-btn>
</template>

<script>
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
  methods: {
    ...mapMutations('session', {
      loginMutation: 'login',
      logoutMutation: 'logout'
    }),
    showLoginForm () {
      this.modal = true
    },
    reset() {
      this.loading = false
      this.username = ''
      this.password = ''
    },
    login () {
      this.loading = true
      this.$gql.request(gql`
        mutation ($username: String! $password: String!) {
          authenticate(username: $username password: $password) {
            token
            user {
              username
            }
          }
        }
      `, {
        username: this.username,
        password: this.password
      })
        .then(response => {
          // handle successfule login
        })
        .catch(() => {
          this.reset()
        })
        .finally(() => {
          this.modal = false
          this.reset()
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LoginLogout',
  data () {
    return {
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
    loginRequested () {
      this.$refs.modal.show()
    },
    reset () {
      this.username = ''
      this.password = ''
    },
    login () {
      this.$q.loading.show()
      this.loginAction({
        username: this.username,
        password: this.password,
        success: () => {
          this.reset()
          this.$q.loading.hide()
          this.$refs.modal.hide()
          this.$q.notify({
            message: this.$t('login_success'),
            type: 'positive'
          })
        },
        failure: () => {
          this.reset()
          this.$q.loading.hide()
          this.$refs.username.focus()
          this.$q.notify({
            message: this.$t('login_failure'),
            type: 'warning'
          })
        }
      })
    },
    logout () {
      this.$q.dialog({
        title: this.$t('logout_confirm_title'),
        message: this.$t('logout_confirm_message'),
        ok: true,
        cancel: true
      })
        .then(() => {
          this.$q.loading.show()
          this.logoutAction({
            success: () => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('logout_success'),
                type: 'positive'
              })
            },
            failure: () => {
              this.$q.loading.hide()
              // this.$q.notify({
              //   message: this.$t('logout_failure'),
              //   type: 'warning'
              // })
            }
          })
        })
        .catch(() => {})
    }
  },
  created () {
    this.$root.$on('AUTHENTICATION_REQUIRED', this.loginRequested)
    this.$root.$on('SESSION_TIMEOUT', this.loginRequested)
  },
  beforeDestroy () {
    this.$root.$off('AUTHENTICATION_REQUIRED', this.loginRequested)
    this.$root.$off('SESSION_TIMEOUT', this.loginRequested)
  }
}
</script>


