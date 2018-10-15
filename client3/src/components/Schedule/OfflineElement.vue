<template>
  <div v-if="value === null" class="offline-gap round-borders">
    <q-btn class="fit" icon="add" color="indigo" outline dense @click="modal = true"></q-btn>
    <q-modal v-model="modal">
      <q-modal-layout>
        <!-- <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            Aggregar Elemento
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow no-border" flat color="" size="lg" @click="modal = false"></q-btn>
        </q-toolbar> -->
        <q-toolbar slot="header" glossy class="col">
          <q-toolbar-title>
            Aggregar Elemento
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <q-list>
          <q-item>
            <q-item-main>
              <q-select hide-underline placeholder="Tipo de tiempo" v-model="model.category" :options="offlineCategoryOptions"></q-select>
            </q-item-main>
          </q-item>
        </q-list>
        <q-toolbar slot="footer" glossy class="justify-center">
          <q-btn rounded glossy color="positive" @click="add" :disable="!validModel">Aggregar</q-btn>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
  </div>
  <div v-else :style="style" class="round-borders offline-element text-weight-bold row items-center justify-center no-wrap">
    {{categoryDescription(value.category)}}
    <q-tooltip>{{tooltip}}</q-tooltip>
    <q-popover self="top middle" anchor="bottom middle">
      <q-list>
        <!-- <q-list-header>
          Tipo de Elemento
        </q-list-header>
        <q-item>
          <q-item-main>
            {{value.category}}
          </q-item-main>
        </q-item> -->
        <q-list-header>
          Detalles del Elemento
        </q-list-header>
        <q-item>
          <q-item-main>
            <q-field label-width="6" label="">

            </q-field>
          </q-item-main>
        </q-item>
        <q-list-header>
          Quitar Elemento
        </q-list-header>
        <q-item>
          <q-item-main class="text-center">
            <q-btn rounded outline v-close-overlay color="negative" @click="remove">Quitar</q-btn>
          </q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OfflineElement',
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {
      modal: false,
      model: {
        category: 'SCH_DAY_OFF'
      }
    }
  },
  computed: {
    ...mapGetters('schedule', [
      'offlineCategoryOptions',
      'categoryCanEvent',
      'categoryBackgroundColor',
      'categoryForegroundColor',
      'categoryDescription',
      'formatTime'
    ]),
    validModel () {
      // wether model ie new item is valid
      return true
    },
    validValue () {
      // wether value ie current item is valid
      return true
    },
    style () {
      return {
        color: this.categoryForegroundColor(this.value.category),
        backgroundColor: this.categoryBackgroundColor(this.value.category)
      }
    },
    tooltip () {
      return ``
    }
  },
  methods: {
    reset () {
      // reset model to default values here
    },
    add () {
      this.$emit('input', {...this.model})
      this.modal = false
      this.reset()
    },
    remove () {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Quitar elemento?',
        ok: true,
        cancel: true
      })
        .then(() => this.$emit('input', null))
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="stylus">
.offline-gap,
.offline-element
  white-space nowrap
  overflow hidden
</style>
