<template>
  <q-btn icon="style" @click="$refs.modal.show()" rounded text-color="primary" class="q-pa-sm" color="white">
    <q-modal ref="modal" :content-css="{minWidth: '60vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            {{ $t('theme') }}
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow" style="border-radius: 0" color="negative" size="lg" @click="$refs.modal.hide()"></q-btn>
        </q-toolbar>
        <q-toolbar slot="footer"></q-toolbar>

        <div class="layout-padding group">
          <q-field v-for="color in colors" :key="color" :label="$t(`${color}-color`)">
            <q-color :color="color" inverted modal :value="getColor(color)" @input="$event => setColor(color, $event)"></q-color>
          </q-field>
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
      modal: false,
      colors: [
        'primary', 'secondary', 'tertiary', 'positive', 'negative', 'info', 'warning'
      ]
    }
  },
  methods: {
    getColor (color) {
      return colors.getBrand(color)
    },
    setColor (color, value) {
      colors.setBrand(color, value)
    }
  }
}
</script>

<style scoped>

</style>

<i18n>
{
  "es": {
    "theme": "Tema",
    "primary-color": "Color Primario",
    "secondary-color": "Color Segundario",
    "tertiary-color": "Color Terciario" ,
    "positive-color": "Color Positivo" ,
    "negative-color": "Color Negativo" ,
    "info-color": "Color Informacion",
    "warning-color": "Color Advertencia"
  }
}
</i18n>
