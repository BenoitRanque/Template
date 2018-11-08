// import something here
import { GraphQLClient } from 'graphql-request'

import { Notify } from 'quasar'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  const endpoint = 'http://localhost:4000' // should be env variable ?
  const client = new GraphQLClient(endpoint, { headers: {} })

  Vue.prototype.$gql = client
  Vue.prototype.$defaultErrorHandler = function (error) {
    console.error(error)
    if (error && error.response && error.response.errors) {
      error.response.errors.forEach(({ message }) => {
        Notify.create({ type: 'negative', message })
      })
    }
  }
}
