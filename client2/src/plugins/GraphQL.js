// import something here
import { GraphQLClient } from 'graphql-request'
// import { request, GraphQLClient } from 'graphql-request'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  const endpoint = 'http://localhost:4000' // should be env variable ?
  const client = new GraphQLClient(endpoint, { headers: {} })

  Vue.prototype.$gql = client
}
