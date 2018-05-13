export default {
  data () {
    return {
      edit: {
        index: null,
        open: false
      },
      item: this.newItem(),
      table: {
        filter: '',
        data: []
      }
    }
  },
  methods: {
    showEdit (index) {
      return (index === undefined ? this.edit.index === null : this.edit.index === index) && this.edit.open
    },
    async toggleEdit (index) {
      try {
        if (this.$v.item.$dirty) {
          await this.$q.dialog({
            title: 'Confirm Edit',
            message: 'Changes will be lost',
            ok: this.$t('ok'),
            cancel: this.$t('cancel')
          })
          this.$v.item.$reset()
        }

        if (this.showEdit(index)) {
          this.edit.open = false
        } else {
          // create new copy of item to edit
          if (index === null) {
            this.item = this.newItem()
          } else {
            this.item = JSON.parse(JSON.stringify(this.table.data[index]))
            delete this.item.__index
          }

          this.edit.index = index
          this.edit.open = true
        }
      } catch (error) {
      }
    }
  }
}
