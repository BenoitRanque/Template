import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('core', {
      isAuthorized: 'isAuthorized'
    })
  },
  methods: {
    createItem (item) {
      this.$q.dialog({
        title: this.$t('confirm.createItem.title'),
        message: this.$t('confirm.createItem.message'),
        ok: true,
        cancel: true
      })
        .then(() => {
          this.$q.loading.show()
          this.$axios.post(this.apiRoute, item)
            .then(() => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('operation.create.success'),
                type: 'positive'
              })
              this.reset()
              this.fetchItems()
            })
            .catch(() => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('operation.create.failure'),
                type: 'warning'
              })
            })
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify('SYSTEM ERROR')
        })
    },
    updateItem (item) {
      this.$q.dialog({
        title: this.$t('confirm.updateItem.title'),
        message: this.$t('confirm.updateItem.message'),
        ok: true,
        cancel: true
      })
        .then(() => {
          this.$q.loading.show()
          this.$axios.put(this.apiRoute, item)
            .then(() => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('operation.update.success'),
                type: 'positive'
              })
              this.reset()
              this.fetchItems()
            })
            .catch(() => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('operation.update.failure'),
                type: 'warning'
              })
            })
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify('SYSTEM ERROR')
        })
    },
    deleteItem (item) {
      this.$q.dialog({
        title: this.$t('confirm.deleteItem.title'),
        message: this.$t('confirm.deleteItem.message'),
        ok: true,
        cancel: true
      })
        .then(() => {
          this.$q.loading.show()
          this.$axios.delete(this.apiRoute, { params: this.deleteParams(item) })
            .then(() => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('operation.delete.success'),
                type: 'positive'
              })
              this.reset()
              this.fetchItems()
            })
            .catch(() => {
              this.$q.loading.hide()
              this.$q.notify({
                message: this.$t('operation.delete.failure'),
                type: 'positive'
              })
            })
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.notify('SYSTEM ERROR')
        })
    },

    edit (item) {
      if (item) {
        this.editMode = true
        this.item = JSON.parse(JSON.stringify(item))
        if (this.mapItemOptions) {
          Object.keys(this.mapItemOptions).forEach(propName => {
            if (Array.isArray(this.item[propName])) {
              this.item[propName] = this.item[propName].map(this.mapItemOptions[propName])
            } else if (this.item[propName]) {
              this.item[propName] = this.mapItemOptions[propName](this.item[propName])
            }
          })
        }
        delete this.item.__index
      } else {
        this.editMode = false
      }
      this.$refs.modal.show()
    },
    reset () {
      this.$refs.modal.hide()
      this.$v.$reset()
      this.item = this.newItem()
    },
    cancel () {
      if (this.$v.$anyDirty) {
        this.$q.dialog({
          title: this.$t('confirm.cancelEdit.title'),
          message: this.$t('confirm.cancelEdit.message'),
          ok: true,
          cancel: true
        })
          .then(() => {
            this.reset()
          })
      } else {
        this.reset()
      }
    }
  }
}
