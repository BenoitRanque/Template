<template>
  <div class="group">
    <q-field :label="$t('password')" :error="$v.password1.$error" :error-label="''" :helper="$t('password_new')">
      <q-input @input="$v.password1.$touch()" v-model="password1" type="password"></q-input>
    </q-field>
    <q-field :label="$t('password')" :error="$v.password2.$error" :error-label="$t('password_missmatch')" :helper="$t('password_repeat')">
      <q-input @blur="$v.password2.$touch()" v-model="password2" type="password"></q-input>
    </q-field>
    <q-field :label="$t('password_strength')">
      <q-progress class="q-my-md" :percentage="passwordStrength * 20" :color="passwordStrengthColor" height="6px"></q-progress>
    </q-field>
    <div class="text-center q-py-sm">
      <q-btn :disable="$v.$invalid" size="lg" color="negative" outline :label="$t('password_reset')" @click="confirm()"/>
    </div>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import { CORE_PASSWORD } from 'assets/apiRoutes'
import { mapState } from 'vuex'
import {
  // requiredIf,
  // requiredUnless,
  // minLength,
  // maxLength,
  // minValue,
  // maxValue,
  // between,
  // alpha,
  // alphaNum,
  // numeric,
  // email,
  // ipAddress,
  // macAddress,
  sameAs
  // url,
  // or,
  // and,
  // withParams,
  // required
} from 'vuelidate/lib/validators'

export default {
  name: 'ResetPassword',
  props: {
    userId: String,
    username: String,
    own: Boolean
  },
  data () {
    return {
      password1: '',
      password2: ''
    }
  },
  validations: {
    password1: {

    },
    password2: {
      sameAs: sameAs('password1')
    }
  },
  computed: {
    passwordStrength () {
      if (this.password1 === '') return 0
      return (zxcvbn(this.password1).score + 1)
    },
    passwordStrengthColor () {
      switch (this.passwordStrength) {
        case 0: return 'negative'
        case 1: return 'negative'
        case 2: return 'warning'
        case 3: return 'info'
        case 4: return 'positive'
        case 5: return 'positive'
      }
    },
    ...mapState('core', {
      session: 'session'
    })
  },
  methods: {
    confirm () {
      this.$q.dialog({
        title: this.$t('reset_title'),
        message: `${this.$t('reset_message')} ${this.username ? this.username : this.session ? this.session.user.username : ''}`,
        ok: true,
        cancel: true
      })
        .then(() => {
          this.update()
        })
        .catch(() => {})
    },
    update () {
      let params = {}
      if (this.own) {
        params.own = true
      } else {
        params.user_id = this.userId
      }

      this.$axios.put(CORE_PASSWORD, { password: this.password1 }, { params })
        .then(() => {
          this.$q.notify({
            message: this.$t('password_reset_success'),
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: this.$t('password_reset_error'),
            type: 'negative'
          })
        })
    }
  }
}
</script>

<style>
</style>

<i18n>
{
  "es": {
    "password": "Contrasena",
    "password_new": "Contrasena nueva",
    "password_reset": "Restablecer Contrasena",
    "password_strength": "Fuerza de la Contrasena",
    "password_repeat": "Repita la contrasena",
    "password_missmatch": "Las contrasenas no son iguales",
    "reset_title": "Restablecer Contrasena",
    "reset_message": "La contrasena sera restablecida para usuario:",
    "password_reset_success": "Contrasena Restablecida",
    "password_reset_error": "Error"
  }
}
</i18n>
