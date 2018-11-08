<template>
  <div>
    <div class="row">
      <div class="col-6">
        <pre>{{payload}}</pre>
      </div>
      <div class="col-6">
        <barcode
          :value="payload"
          :options="{
            format: 'CODE128',
            width: 1,
            height: 30,
            fontSize: 12,
            margin: 0,
            fontOptions: 'bold'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Barcode from '@chenfengyuan/vue-barcode'

export default {
  name: 'ExceptionPrintingTemplate',
  props: ['payload'],
  components: {
    Barcode
  }
}
</script>

<style scoped>

</style>
