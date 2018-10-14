<template>
  <q-page class="">
    <div class="q-title">day </div>
    <schedule />
    <!-- <schedule /> -->
    <!-- <schedule /> -->
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
import Schedule from 'components/schedule'
export default {
  name: 'PageIndex',
  components: { Schedule },
  data () {
    return {
      category: null
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
