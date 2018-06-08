<template>
  <q-field
    :label="$t(`field.${fieldName}.label`)"
    :helper="$t(`field.${fieldName}.helper`)"
    :error="validation.$invalid"
    :error-label="validationError(validation)"
  >
    <q-select
      v-if="type === 'select'"
      v-model="validation.$model"
      :placeholder="$t(`field.${fieldName}.placeholder`)"
      @blur="validation.$touch()"
      :options="options"
      :multiple="!!value && Array.isArray(value)"
      :filter="options.length > 6"
    />
    <q-datetime
      v-else-if="type === 'date' || type === 'time' || type === 'datetime'"
      v-model="validation.$model"
      :type="type"
      :placeholder="$t(`field.${fieldName}.placeholder`)"
      @blur="validation.$touch()"
    />
    <q-input
      v-else
      v-model="validation.$model"
      :type="type"
      :placeholder="$t(`field.${fieldName}.placeholder`)"
      @blur="validation.$touch()"
    />
  </q-field>
</template>

<script>
import validationError from '../mixins/validationError'

export default {
  name: 'FormElement',
  props: {
    validation: {
      type: Object,
      required: true
    },
    fieldName: {
      required: true,
      type: String
    },
    type: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  mixins: [
    validationError
  ]
}
</script>

<style scoped lang="stylus">
// @media print
//   .q-field
//     width 50%
</style>
