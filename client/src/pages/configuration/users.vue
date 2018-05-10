<template>
  <q-page padding>
    <!-- content -->
    <q-btn @click="getUsers">users</q-btn>
    <pre>{{users}}</pre>
  </q-page>
</template>

<script>
import {
  CORE_USER
} from 'assets/apiRoutes'

export default {
  name: 'ConfigureUsers',
  data () {
    return {
      users: []
    }
  },
  methods: {
    getUsers () {
      this.$axios.get(CORE_USER, {
        params: {
          fields: encodeURI(btoa(JSON.stringify([['role', ['privileges', 'privilege']]])))
        }
      })
        .then(response => {
          console.log(response)
          this.users = response.data
        })
    }
  }
}
</script>

<style>
</style>
