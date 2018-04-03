<template>
  <q-page>
    <!-- <div :style="computedStyle">

    </div> -->
    <img src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  // inject: {
  //   layout: {}
  // },
  // computed: {
  //   computedStyle () {
  //     const offset =
  //       (this.layout.header.space ? this.layout.header.size : 0) +
  //       (this.layout.footer.space ? this.layout.footer.size : 0)

  //     return {
  //       minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh'
  //     }
  //   }
  // },
  mounted () {
    const V = class {
      constructor () {
        this.validations = []
        this.string = this.constructor.string
        this.required = this.constructor.required
        this.init = this.constructor.init
      }

      hello () {
        console.log('hi')
      }

      static init () {
        console.log(this)
        if (!this.validations) {
          console.log(this.validations)
          console.log('no validations')
          return new V()
        }
        console.log('validations present')
        console.log(this)
        return this
      }

      static string () {
        let v = this.init()
        // console.log(v)
        v.validations.push(prop => typeof prop === 'string')
        console.log(v)
        return v
      }

      static required () {
        let v = this.init()
        // console.log(v)
        v.validations.push(prop => prop !== undefined)
        console.log(v)
        return v
      }
    }
    let obj = {
      prop1: V.required().string(),
      prop2: V.string()
    }
    console.log(obj)
  }
}
</script>
