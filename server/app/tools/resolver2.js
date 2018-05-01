module.exports = class BaseResolver {
  constructor (config) {
    // validate config, set usefull defaults
    let {
      method, // the method tha will be unique per resolver
    } = config

    this.config = { method, action }
    // return resolver function

    return async (parent, { filter, action, input }, { ac, session }, info) => {
      this.config.method({
        // model
        // parent
        // eager expression only authorized resources
        // filter data (recursive)
        // filter input (recursive)
        eager: () => this.__eager(),
        input: () => this.__input(),
        filter: query => query
      })
    }
  }

  __eager (data, info) {
    // return filtered eager expression
  }

  __input (data, info) {
    // return filtered input
  }
}

let res = new BaseResolver({
  method: ({ eager, model, input }) => model.query().eager(...eager()),
  method2: ({ eager, model, input }) => model.query.insertGraph(input()),
  method3: ({ action, model, filter, input }) => {
    switch (action) {
      case 'read':
        return filter(model.query()).eager(...eager())
        break
      case 'create':

        break
      case 'update':
        
        break
      case 'delete':

        break
      default:
        throw new Error(`Invalid action passed to resolver: ${action}`)
    }
  }
})