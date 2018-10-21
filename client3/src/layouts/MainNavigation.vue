<template>
  <q-layout-drawer v-model="drawerOpen">
    <!-- QScrollArea is optional -->
    <q-scroll-area class="fit">
      <!-- Content here -->
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item inset v-for="(route, index) in routes" :key="`${index}_${route.hash}`" link :to="`/${route.hash}`" replace>
          <q-item-main>
            {{route.label}}
          </q-item-main>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-layout-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainNavigation',
  data () {
    return {
      drawerOpen: false,
      routes: [
        {
          label: 'Inicio',
          hash: ''
        },
        {
          label: 'Empleados',
          hash: 'Employees'
        },
        {
          label: 'Boletas',
          hash: 'Exceptions'
        },
        {
          label: 'Horarios',
          hash: 'Shifts'
        },
        {
          label: 'Reportes',
          hash: 'Reports'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('session', {
      authenticated: 'isAuthenticated'
    })
  },
  methods: {
    toggledrawer (state) {
      if (state === undefined) {
        this.drawerOpen = !this.drawerOpen
      } else {
        this.drawerOpen = state
      }
    }
  },
  created () {
    this.$root.$on('TOGGLE_NAVIGATION', this.toggledrawer)
  },
  beforeDestroy () {
    this.$root.$off('TOGGLE_NAVIGATION', this.toggledrawer)
  }
}
</script>

<style>
</style>
