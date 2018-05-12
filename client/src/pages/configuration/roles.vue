<template>
  <q-page padding>
    <!-- content -->
    <configuration-table>
      <template slot="fun">
        fun content
      </template>
      default
    </configuration-table>
  </q-page>
</template>

<script>
import ConfigurationTable from 'components/ConfigurationTable'

export default {
  // name: 'PageName',
  components: {
    ConfigurationTable
  }
}
</script>

<style>
</style>
