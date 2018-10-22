<template>
  <q-td :props="props">
    <!-- todo: align to top with flex self classes -->
    {{formatedDisplayValue}}
    <q-btn icon="edit" class="q-mb-md" color="primary" size="xs" dense v-if="fieldIsUpdated">
      <q-tooltip>Campo Modificado</q-tooltip>
    </q-btn>
    <q-popover :disable="readonly" @show="showEditPopover" fit cover>
      <div class="q-pa-sm">
        <q-input v-if="inputType === 'textInput'" ref="textInput" :type="type" v-model="model"></q-input>
        <q-datetime v-else-if="inputType === 'dateInput'" ref="dateInput" v-model="model"></q-datetime>
        <q-select v-else-if="inputType === 'selectInput'" ref="selectInput" v-model="model" :options="options"></q-select>
        <div class="group q-mt-sm">
          <q-btn size="sm" rounded outline color="negative" v-close-overlay @click="revert">revertir</q-btn>
          <q-btn size="sm" rounded flat color="negative" v-close-overlay>cancelar</q-btn>
          <q-btn size="sm" rounded flat color="positive" v-close-overlay @click="update">ok</q-btn>
        </div>
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
        const validValues = ['text', 'number', 'select', 'date']
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
      if (this.type === 'select') {
        const option = this.options.find(({ value }) => value === this.displayValue)
        return option ? option.label : null
      } else if (this.type === 'date') {
        this.formatDate(this.displayValue, 'DD/MM/YYYY')
      } else {
        return this.displayValue
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
    showEditPopover () {
      // set curent model value to either original or updated value if it exists
      this.model = this.fieldIsUpdated ? this.props.row.update[this.field] : this.props.row.data[this.field]
      // focus input
      this.$refs[this.inputType].focus()
    },
    update () {
      this.$emit('update', this.model)
    },
    revert () {
      this.$emit('revert')
    }
  }
}
</script>

<style scoped>

</style>
