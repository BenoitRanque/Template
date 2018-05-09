<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters({
    isAuthenticated: 'core/isAuthenticated'
  }),
  methods: mapGetters({
    isAuthorized: 'core/isAuthorized'
  }),
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      const { requireAuthentication, requireAuthorization } = to.meta

      if ((requireAuthentication || requireAuthorization) && !this.isAuthenticated) {
        this.$root.$emit('AUTHENTICATION_REQUIRED')
        next(false)
      } else if (requireAuthorization && !this.isAuthorized(requireAuthorization.resource, requireAuthorization.action, requireAuthorization.possession)) {
        this.$root.$emit('ACCESS_DENIED')
        next(false)
      } else {
        next()
      }
    })
  }
}
</script>

<style>
</style>
