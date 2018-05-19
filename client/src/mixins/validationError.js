export default {
  methods: {
    validationError (validations) {
      for (let validationName in validations.$params) {
        if (validations.hasOwnProperty(validationName)) {
          if (validations[validationName] === false) return this.$t(`validation.${validationName}`)
        }
      }
      return this.$t('validation.error')
    }
  }
}
