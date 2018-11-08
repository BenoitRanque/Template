<template>
  <q-btn icon="style" @click="modal = true" rounded text-color="primary" class="q-pa-sm" color="white">
    <q-modal v-model="modal">
      <q-modal-layout>
        <q-toolbar slot="header" class="col">
          <q-toolbar-title>
            Theme
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>

        <div class="group q-pa-sm">
          <q-color color="primary" inverted modal v-model="primary"></q-color>
          <q-color color="secondary" inverted modal v-model="secondary"></q-color>
          <q-color color="tertiary" inverted modal v-model="tertiary"></q-color>
          <q-color color="positive" inverted modal v-model="positive"></q-color>
          <q-color color="negative" inverted modal v-model="negative"></q-color>
          <q-color color="warning" inverted modal v-model="warning"></q-color>
          <q-color color="info" inverted modal v-model="info"></q-color>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-btn>
</template>

<script>
import { colors } from 'quasar'
export default {
  name: 'ThemeSettings',
  data () {
    return {
      modal: false
    }
  },
  computed: {
    primary: {
      get: () => colors.getBrand('primary'),
      set: (value) => colors.setBrand('primary', value)
    },
    secondary: {
      get: () => colors.getBrand('secondary'),
      set: (value) => colors.setBrand('secondary', value)
    },
    tertiary: {
      get: () => colors.getBrand('tertiary'),
      set: (value) => colors.setBrand('tertiary', value)
    },
    positive: {
      get: () => colors.getBrand('positive'),
      set: (value) => colors.setBrand('positive', value)
    },
    negative: {
      get: () => colors.getBrand('negative'),
      set: (value) => colors.setBrand('negative', value)
    },
    warning: {
      get: () => colors.getBrand('warning'),
      set: (value) => colors.setBrand('warning', value)
    },
    info: {
      get: () => colors.getBrand('info'),
      set: (value) => colors.setBrand('info', value)
    }
  }
}
</script>

<style scoped>

</style>
