<template>
  <q-page class="">
    <q-btn @click="$router.push('/Employees')">Employees</q-btn>
    <q-btn @click="modal = !modal">modal</q-btn>
    <schedule-input v-for="(day, index) in days" :key="index" v-model="day.schedule" :valid.sync="day.valid" :readonly="day.readonly">
      <div slot="header" class="q-title">Dia {{index + 1}}<q-toggle v-model="day.readonly"></q-toggle></div>
    </schedule-input>
    <pre>{{days}}</pre>
    <q-modal v-model="modal" content-css="min-height: 60vh; min-width: 60vw;">
      <q-modal-layout content-class="q-pa-md">
        <q-toolbar slot="header" glossy class="col">
          <q-toolbar-title>
          </q-toolbar-title>
          <q-icon class="cursor-pointer" color="white" v-close-overlay size="1.6em" name="close"></q-icon>
        </q-toolbar>
        <schedule-input v-for="n in 7" :key="n">
          <div slot="header" class="q-title">Dia {{n}}: fecha 12/34/5678</div>
        </schedule-input>
        <q-toolbar slot="footer" glossy class="justify-center">

        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    <div class="q-pa-xl" :style="style">
      <div class="q-title">
        Testing text
      </div>
      <q-select :style="style" v-model="category" :options="categoryOptions"></q-select>
      <q-color :style="style" v-if="category" v-model="category.backgroundColor"></q-color>
      <q-color :style="style" v-if="category" v-model="category.foregroundColor"></q-color>
    </div>
    <pre>
      {{$store.state.schedule.categories}}
    </pre>
  </q-page>
</template>

<script>
import ScheduleInput from 'components/ScheduleInput'
export default {
  name: 'PageIndex',
  components: { ScheduleInput },
  data () {
    return {
      category: null,
      modal: false,
      days: [
        {
          schedule: {
            description: '',
            baseTime: 8 * 60,
            standard: true,
            restline: [],
            offline1: null,
            offline2: null,
            timeline: []
          },
          valid: false,
          readonly: false
        }
      ]
    }
  },
  computed: {
    style () {
      return {
        backgroundColor: this.category ? this.category.backgroundColor : null,
        color: this.category ? this.category.foregroundColor : null
      }
    },
    categoryOptions () {
      return this.$store.state.schedule.categories
        .map(category => ({ value: category, label: category.description }))
    }
  }
}
</script>
