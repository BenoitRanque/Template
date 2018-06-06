<template>
  <q-field
    :label="$t(`field.${fieldName}.label`)"
    :helper="$t(`field.${fieldName}.helper`)"
    :error="validation.$error"
    :error-label="validationError(validation)"
  >
    <q-select
      v-if="type === 'select'"
      :value="value"
      @input="$event => $emit('input', $event)"
      :placeholder="$t(`field.${fieldName}.placeholder`)"
      @blur="validation.$touch()"
      :options="options"
      :multiple="value && Array.isArray(value)"
      :filter="options.length > 6"
    />
    <q-datetime
      v-else-if="type === 'date' || type === 'time' || type === 'datetime'"
      :type="type"
      :placeholder="$t(`field.${fieldName}.placeholder`)"
      @blur="validation.$touch()"
      :value="value"
      @input="$event => $emit('input', $event)"
    />
    <q-input
      v-else
      :type="type"
      :placeholder="$t(`field.${fieldName}.placeholder`)"
      @blur="validation.$touch()"
      :value="value"
      @input="$event => $emit('input', $event)"
    />
  </q-field>
</template>

<script>
import validationError from '../mixins/validationError'

export default {
  name: 'FormElement',
  props: {
    value: {
      required: true
    },
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

<style>
</style>
