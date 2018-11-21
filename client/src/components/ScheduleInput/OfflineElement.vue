<template>
  <div v-if="value === null" class="offline-gap round-borders">
    <q-btn class="fit bg-indigo-2" icon="add" color="indigo" outline dense @click="modal = true" v-if="!$parent.readonly">
      <q-tooltip>Aggregar elemento libre</q-tooltip>
    </q-btn>
    <q-modal v-model="modal">
      <q-modal-layout>
        <!-- <q-toolbar slot="header" class="q-py-none q-pr-none">
          <q-toolbar-title>
            Aggregar Elemento
          </q-toolbar-title>
          <q-btn icon="close" class="no-shadow no-border" flat color="" size="lg" @click="modal = false"></q-btn>
        </q-toolbar> -->
        <q-toolbar slot="header" class="col">
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
          <q-item>
            <q-item-main class="text-center">
              <q-btn rounded color="primary" @click="add" :disable="!validModel">Aggregar</q-btn>
            </q-item-main>
          </q-item>
        </q-list>
      </q-modal-layout>
    </q-modal>
  </div>
  <div v-else :style="style" class="round-borders offline-element q-caption text-weight-bold row items-center justify-center no-wrap">
    {{categoryDescription(value.category)}}
    <slot name="header"></slot>
    <q-tooltip>{{tooltip}}</q-tooltip>
    <q-popover self="top middle" anchor="bottom middle" :disable="$parent.readonly">
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
          {{categoryDescription(value.category)}}
        </q-list-header>
        <!-- <q-item>
          <q-item-main>
            <q-field label-width="6" label="">
              config goes here
            </q-field>
          </q-item-main>
        </q-item> -->
        <!-- <q-list-header>
          Quitar Elemento
        </q-list-header> -->
        <slot name="source"></slot>
        <q-item-separator></q-item-separator>
        <q-item>
          <q-item-side>
            <q-btn rounded outline v-close-overlay color="negative" @click="remove">Quitar</q-btn>
          </q-item-side>
          <q-item-main></q-item-main>
          <q-item-side>
            <q-btn rounded flat v-close-overlay color="primary">Ok</q-btn>
          </q-item-side>
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
      return this.categoryDescription(this.value.category)
    }
  },
  methods: {
    reset () {
      // reset model to default values here
      this.model.category = 'SCH_DAY_OFF'
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
