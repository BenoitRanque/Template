<template>
  <q-btn-group
    rounded

  >
    <q-btn
      class="q-pa-sm"
      rounded
      color="white"
      text-color="primary"
      icon="help_outline"
      @click="$router.push($route.meta.documentation)"
    ></q-btn>

    <q-btn
      rounded
      color="white"
      text-color="primary"
      icon="account_circle"
      class="q-pa-sm"
      v-if="authenticated"
    >
    </q-btn>

    <q-btn
      class="q-pa-sm"
      rounded
      :color="authenticated ? 'negative' : 'positive'"
      icon="power_settings_new"
      @click="authenticated ? logout() : $refs.modal.show()"
    >
      <q-modal ref="modal" minimized content-css="width: 400px; min-width: 30vw; min-height: 30vh" content-classes="q-py-xl text-center" @show="$refs.username.focus()" @hide="reset">
        <span class="q-display-1 q-my-md">
          {{$t('login')}}
        </span>
        <q-input ref="username" @keydown.enter="$refs.password.focus" class="q-my-md" type="text" align="center" :placeholder="$t('username')" v-model="username"></q-input>
        <q-input ref="password" @keydown.enter="login" class="q-my-md" type="password" align="center" :placeholder="$t('password')" v-model="password"></q-input>
        <q-btn class="q-my-md" dark outline rounded @click="login" :label="$t('login')"></q-btn>
      </q-modal>
    </q-btn>
  </q-btn-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginLogout',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('core', {
      authenticated: 'isAuthenticated'
    })
  },
  methods: {
    ...mapActions('core', {
      loginAction: 'login',
      logoutAction: 'logout'
    }),
    authenticationRequired () {
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
          this.$router.push(this.$route.path)
        },
        failure: () => {
          this.reset()
          this.$q.loading.hide()
          this.$refs.username.focus()
          this.$q.notify('login failed')
        }
      })
    },
    logout () {
      this.$q.dialog({
        title: this.$t('logout_confirm_title'),
        message: this.$t('logout_confirm_message'),
        ok: this.$t('ok'),
        cancel: this.$t('cancel')
      })
        .then(() => {
          this.$q.loading.show()
          this.logoutAction({
            success: () => {
              this.$q.loading.hide()
            },
            failure: () => {
              this.$q.loading.hide()
            }
          })
        })
        .catch(() => {})
    }
  },
  created () {
    this.$root.$on('AUTHENTICATION_REQUIRED', this.authenticationRequired)
  },
  beforeDestroy () {
    this.$root.$off('AUTHENTICATION_REQUIRED', this.authenticationRequired)
  }
}
</script>

<style>
</style>

<i18n>
{
  "es": {
    "login": "Iniciar Session",
    "logout": "Cerrar Session",
    "logout_confirm_title": "Cerrar Session?",
    "logout_confirm_message": "Cerrar Session?"
  }
}
</i18n>
