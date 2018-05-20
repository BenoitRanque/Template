<template>
  <q-page padding class="group">
    <!-- content -->
    <q-field :label="$t('displayname')">
      <q-input readonly :value="user.displayname"></q-input>
    </q-field>
    <q-field :label="$t('username')">
      <q-input readonly :value="user.username"></q-input>
    </q-field>

    <div class="text-center q-my-md">
      <q-btn @click="$refs.passwordResetModal.show()" icon="lock_open" color="negative">{{$t('reset_password')}}</q-btn>
    </div>

    <q-modal content-css="width: 80vw; height: 80vh;" ref="passwordResetModal" @hide="$refs.passwordreset.reset()">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            {{$t('reset_password')}}
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" v-close-overlay></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer" class="justify-around q-py-sm" align="around">
        </q-toolbar>
        <div class="layout-padding">
          <reset-password own ref="passwordreset"></reset-password>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import ResetPassword from 'components/ResetPassword'
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  components: {
    ResetPassword
  },
  computed: {
    ...mapGetters('core', { user: 'sessionUser', authenticated: 'isAuthenticated' })
  }
}
</script>

<style>
</style>

<i18n>
{
  "es": {
    "reset_password": "Cambiar contraseña",
    "username": "Login",
    "displayname": "Nombre"
  }
}
</i18n>
