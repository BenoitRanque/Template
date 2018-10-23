<template>
  <q-td :props="props">
    <!-- todo: align to top with flex self classes -->
    {{formatedDisplayValue}}
    <q-btn icon="edit" class="q-mb-md" color="primary" size="xs" dense v-if="fieldIsUpdated">
      <q-tooltip class="text-no-wrap">Cambio no guardado</q-tooltip>
    </q-btn>
    <q-popover :disable="readonly" @show="showEditPopover" fit cover>
      <q-list class="q-mx-sm" v-if="type === 'select'" no-border link>
        <q-item v-for="(option, index) in options" :key="`option_${index}`" :class="{ active: model === option.value }" @click.native="model = option.value">
          <q-item-main>
            {{option.label}}
          </q-item-main>
        </q-item>
      </q-list>
      <q-datetime-picker minimal class="q-ma-sm" v-else-if="type === 'date'" v-model="model"></q-datetime-picker>
      <q-checkbox class="q-ma-sm" v-else-if="type === 'boolean'" v-model="model" :label="formatBoolean(model)"></q-checkbox>
      <q-input class="q-ma-sm" v-else ref="input" :type="type" v-model="model"></q-input>
      <div class="group q-mt-sm flex justify-around">
        <q-btn size="sm" rounded outline color="negative" v-close-overlay @click="revert">revertir</q-btn>
        <q-btn size="sm" rounded flat color="negative" v-close-overlay>cancelar</q-btn>
        <q-btn size="sm" rounded flat color="positive" v-close-overlay @click="update">ok</q-btn>
      </div>
    </q-popover>
  </q-td>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'EmployeeTableCell',
  props: {
    props: {
      required: true,
      type: Object
    },
    field: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator (value) {
        const validValues = ['text', 'number', 'select', 'date', 'boolean']
        if (!validValues.includes(value)) throw new Error(`Invalid value provided for prop type on EmployeeTableCell: expected one of ${validValues.join(', ')}, got ${value}`)
        return true
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: null
    }
  },
  computed: {
    formatedDisplayValue () {
      switch (this.type) {
        case 'select': return this.formatSelect(this.displayValue)
        case 'date': return this.formatDate(this.displayValue, 'DD/MM/YYYY')
        case 'boolean': return this.formatBoolean(this.displayValue)
        default: return this.displayValue
      }
    },
    displayValue () {
      return this.fieldIsUpdated ? this.props.row.update[this.field] : this.props.row.data[this.field]
    },
    fieldIsUpdated () {
      return this.props.row.update.hasOwnProperty(this.field)
    },
    inputType () {
      switch (this.type) {
        case 'text':
        case 'number':
          return 'textInput'
        case 'select':
          return 'selectInput'
        case 'date':
          return 'dateInput'
        default: throw new Error(`Unknown type ${this.type}`)
      }
    }
  },
  methods: {
    formatDate: date.formatDate,
    formatBoolean (booleanValue) {
      const stringBoolean = String(booleanValue)
      const option = this.options.find(({ value }) => value === stringBoolean)
      return option ? option.label : null
    },
    formatSelect (selectValue) {
      const option = this.options.find(({ value }) => value === selectValue)
      return option ? option.label : null
    },
    isSameDate: (a, b) => date.getDateDiff(a, b, 'days') === 0,
    showEditPopover () {
      // set curent model value to either original or updated value if it exists
      this.model = this.fieldIsUpdated ? this.props.row.update[this.field] : this.props.row.data[this.field]
      // focus input
      if (this.type === 'number' || this.type === 'text') this.$refs.input.focus()
    },
    update () {
      if ((this.type === 'date' && this.isSameDate(this.model, this.props.row.data[this.field])) || this.model === this.props.row.data[this.field]) {
        this.revert()
      } else {
        this.$emit('update', this.model)
      }
    },
    revert () {
      this.$emit('revert')
    }
  }
}
</script>

<style scoped>

</style>
