<template>
  <div id="q-app">
    <router-view class="print-hide"/>
    <print-preview></print-preview>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PrintPreview from 'components/PrintPreview'

export default {
  name: 'App',
  components: {
    PrintPreview
  },
  computed: mapGetters('core', {
    isAuthenticated: 'isAuthenticated',
    isAuthorized: 'isAuthorized'
  }),
  data () {
    return {
      printData: null
    }
  },
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
        this.$q.notify({ type: 'negative', message: 'Access Denied' })
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
      } else {
        this.$q.notify({ type: 'negative', message: error.response.data })
      }
      return Promise.reject(error)
    })

    this.$store.subscribeAction((action, state) => {
      switch (action.type) {
        case 'core/sessionTimeout': return this.$root.$emit('SESSION_TIMEOUT')
      }
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
