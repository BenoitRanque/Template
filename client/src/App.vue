<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters('core', {
    isAuthenticated: 'isAuthenticated',
    isAuthorized: 'isAuthorized'
  }),
  methods: {
    ...mapMutations('core', {
      logoutMutation: 'logout'
    })
  },
  created () {
    // route guards
    this.$router.beforeEach((to, from, next) => {
      let { requireAuthentication, requireAuthorization } = to.meta

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

    // Add a request interceptor
    this.$axios.interceptors.request.use(config => {
      // Do something before request is sent
      return config
    }, error => {
      // Do something with request error
      return Promise.reject(error)
    })

    // Add a response interceptor
    this.$axios.interceptors.response.use(response => {
      // Do something with response data
      return response
    }, error => {
      // Do something with response error
      if (error.response.status === 401) {
        // session expired
        if (this.isAuthenticated) this.logoutMutation()
        this.$root.$emit('AUTHENTICATION_REQUIRED')
        console.log('auth required')
      }
      return Promise.reject(error)
    })

    this.$store.subscribeAction((action, state) => {
      if (action.type === 'core/sessionTimeout') console.log('session tiemout')
      switch (action.type) {
        case 'core/sessionTimeout': return this.$root.$emit('SESSION_TIMEOUT')
      }
    })
  }
}
</script>

<style>
</style>
